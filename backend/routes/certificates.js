const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const CertificateService = require('../services/CertificateService');
const EmailService = require('../services/EmailService');
const PromoCode = require('../models/PromoCode');
const Certificate = require('../models/Certificate');

/**
 * POST /api/certificates/generate
 * Generate a new certificate using promo code
 */
router.post('/generate', auth, async (req, res) => {
  try {
    const {
      promoCode,
      certificateType,
      subject,
      keySize = 2048,
      psd2Roles = [],
      subjectAltNames = []
    } = req.body;
    
    const userId = req.user.userId;
    
    // Validate promo code
    const promo = await PromoCode.findOne({ code: promoCode.toUpperCase() });
    if (!promo) {
      return res.status(400).json({
        success: false,
        message: 'Invalid promo code'
      });
    }
    
    // Check if promo code is valid
    if (!promo.isValid()) {
      return res.status(400).json({
        success: false,
        message: 'Promo code is expired or no longer valid'
      });
    }
    
    // Check if user can use this code
    if (!promo.canBeUsedBy(userId)) {
      return res.status(400).json({
        success: false,
        message: 'You have already used this promo code the maximum number of times'
      });
    }
    
    // Check if certificate type is allowed by promo code
    if (!promo.certificateTypes.includes(certificateType) && !promo.certificateTypes.includes('ALL')) {
      return res.status(400).json({
        success: false,
        message: `This promo code does not grant access to ${certificateType} certificates`
      });
    }
    
    // Generate certificate
    const certResult = await CertificateService.generateCertificate({
      type: certificateType,
      subject,
      userId,
      promoCode: promo.code,
      environment: promo.environment,
      keySize,
      psd2Roles,
      subjectAltNames
    });
    
    // Update promo code usage
    await promo.use(
      userId,
      certResult.certificate._id,
      req.ip,
      req.get('User-Agent')
    );
    
    // Send email with certificate
    try {
      await EmailService.sendCertificateEmail({
        to: req.user.email,
        certificateType: certificateType,
        serialNumber: certResult.serialNumber,
        certificatePem: certResult.certificatePem,
        privateKeyPem: certResult.privateKeyPem,
        publicKeyPem: certResult.publicKeyPem,
        validFrom: certResult.validFrom,
        validTo: certResult.validTo,
        subject: subject
      });
      
      // Update delivery status
      certResult.certificate.deliveryStatus = 'sent';
      certResult.certificate.deliveredAt = new Date();
      certResult.certificate.deliveryEmail = req.user.email;
      await certResult.certificate.save();
      
    } catch (emailError) {
      console.error('Failed to send certificate email:', emailError);
      certResult.certificate.deliveryStatus = 'failed';
      await certResult.certificate.save();
    }
    
    res.status(201).json({
      success: true,
      message: 'Certificate generated successfully',
      certificate: {
        id: certResult.certificate._id,
        type: certResult.certificate.certificateType,
        serialNumber: certResult.serialNumber,
        validFrom: certResult.validFrom,
        validTo: certResult.validTo,
        subject: certResult.certificate.subject,
        status: certResult.certificate.status,
        environment: certResult.certificate.environment
      },
      downloadLinks: {
        certificate: `/api/certificates/${certResult.certificate._id}/download/certificate`,
        privateKey: `/api/certificates/${certResult.certificate._id}/download/private-key`,
        publicKey: `/api/certificates/${certResult.certificate._id}/download/public-key`
      }
    });
    
  } catch (error) {
    console.error('Certificate generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate certificate',
      error: error.message
    });
  }
});

/**
 * GET /api/certificates
 * Get user's certificates
 */
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { status, type } = req.query;
    
    const query = { user: userId };
    if (status) query.status = status;
    if (type) query.certificateType = type;
    
    const certificates = await Certificate.find(query)
      .sort({ createdAt: -1 })
      .select('-certificatePem -privateKeyPem -publicKeyPem');
    
    res.json({
      success: true,
      count: certificates.length,
      certificates
    });
    
  } catch (error) {
    console.error('Get certificates error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch certificates',
      error: error.message
    });
  }
});

/**
 * GET /api/certificates/:id
 * Get certificate details
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const certificate = await Certificate.findOne({
      _id: req.params.id,
      user: req.user.userId
    }).select('-privateKeyPem');
    
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }
    
    res.json({
      success: true,
      certificate
    });
    
  } catch (error) {
    console.error('Get certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch certificate',
      error: error.message
    });
  }
});

/**
 * GET /api/certificates/:id/download/:type
 * Download certificate files
 */
router.get('/:id/download/:type', auth, async (req, res) => {
  try {
    const { id, type } = req.params;
    
    const certificate = await Certificate.findOne({
      _id: id,
      user: req.user.userId
    });
    
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }
    
    let content, filename;
    
    switch (type) {
      case 'certificate':
        content = certificate.certificatePem;
        filename = `certificate_${certificate.serialNumber}.pem`;
        break;
      case 'private-key':
        content = certificate.privateKeyPem;
        filename = `private_key_${certificate.serialNumber}.pem`;
        break;
      case 'public-key':
        content = certificate.publicKeyPem;
        filename = `public_key_${certificate.serialNumber}.pem`;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid download type'
        });
    }
    
    // Increment download count
    await CertificateService.incrementDownload(id);
    
    res.setHeader('Content-Type', 'application/x-pem-file');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(content);
    
  } catch (error) {
    console.error('Download certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to download certificate',
      error: error.message
    });
  }
});

/**
 * POST /api/certificates/:id/revoke
 * Revoke a certificate
 */
router.post('/:id/revoke', auth, async (req, res) => {
  try {
    const { reason } = req.body;
    
    const certificate = await Certificate.findOne({
      _id: req.params.id,
      user: req.user.userId
    });
    
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }
    
    const revokedCert = await CertificateService.revokeCertificate(req.params.id, reason);
    
    res.json({
      success: true,
      message: 'Certificate revoked successfully',
      certificate: revokedCert
    });
    
  } catch (error) {
    console.error('Revoke certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to revoke certificate',
      error: error.message
    });
  }
});

/**
 * POST /api/certificates/validate-code
 * Validate promo code
 */
router.post('/validate-code', auth, async (req, res) => {
  try {
    const { code } = req.body;
    
    const promo = await PromoCode.findOne({ code: code.toUpperCase() });
    
    if (!promo) {
      return res.status(404).json({
        success: false,
        message: 'Invalid promo code'
      });
    }
    
    const isValid = promo.isValid();
    const canUse = promo.canBeUsedBy(req.user.userId);
    
    res.json({
      success: true,
      valid: isValid && canUse,
      code: promo.code,
      description: promo.description,
      certificateTypes: promo.certificateTypes,
      environment: promo.environment,
      expiresAt: promo.validTo,
      message: isValid && canUse ? 'Code is valid' : 'Code is expired or already used'
    });
    
  } catch (error) {
    console.error('Validate code error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to validate code',
      error: error.message
    });
  }
});

module.exports = router;
