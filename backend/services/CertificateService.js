const forge = require('node-forge');
const { v4: uuidv4 } = require('uuid');
const Certificate = require('../models/Certificate');

/**
 * Certificate Service
 * Generates X.509 certificates for various types (QWAC, PSD2, eIDAS, QSealC, etc.)
 * 
 * IMPORTANT: These certificates are for TEST/DEMO purposes only.
 * For legally qualified certificates, you need to integrate with authorized QTSPs.
 */

class CertificateService {
  
  /**
   * Generate a new X.509 certificate
   */
  static async generateCertificate(options) {
    const {
      type,
      subject,
      userId,
      promoCode,
      environment = 'test',
      keySize = 2048,
      validityDays = 365,
      psd2Roles = [],
      subjectAltNames = []
    } = options;

    // Generate RSA key pair
    const keys = forge.pki.rsa.generateKeyPair(keySize);
    
    // Create certificate
    const cert = forge.pki.createCertificate();
    
    // Serial number (unique)
    cert.serialNumber = this.generateSerialNumber();
    
    // Validity period
    const now = new Date();
    const validTo = new Date(now);
    validTo.setDate(validTo.getDate() + validityDays);
    
    cert.validity.notBefore = now;
    cert.validity.notAfter = validTo;
    
    // Subject attributes
    const subjectAttrs = [
      { name: 'commonName', value: subject.commonName || 'CertTrust Certificate' },
      { name: 'countryName', value: subject.country || 'IT' },
      { shortName: 'ST', value: subject.state || 'Rome' },
      { name: 'localityName', value: subject.locality || 'Rome' },
      { name: 'organizationName', value: subject.organization || 'CertTrust' },
      { name: 'organizationalUnitName', value: subject.organizationalUnit || this.getOUForType(type) }
    ];
    
    cert.setSubject(subjectAttrs);
    
    // Issuer (self-signed for demo)
    const issuerAttrs = [
      { name: 'commonName', value: 'CertTrust Demo CA' },
      { name: 'countryName', value: 'IT' },
      { name: 'organizationName', value: 'CertTrust' },
      { name: 'organizationalUnitName', value: 'Certificate Authority' }
    ];
    
    cert.setIssuer(issuerAttrs);
    
    // Public key
    cert.publicKey = keys.publicKey;
    
    // Extensions based on certificate type
    const extensions = this.getExtensionsForType(type, subject, psd2Roles, subjectAltNames);
    cert.setExtensions(extensions);
    
    // Sign the certificate (self-signed)
    cert.sign(keys.privateKey, forge.md.sha256.create());
    
    // Convert to PEM format
    const certificatePem = forge.pki.certificateToPem(cert);
    const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);
    const publicKeyPem = forge.pki.publicKeyToPem(keys.publicKey);
    
    // Save to database
    const certificate = new Certificate({
      serialNumber: cert.serialNumber,
      certificateType: type,
      subject: {
        commonName: subject.commonName,
        organization: subject.organization,
        organizationalUnit: subject.organizationalUnit,
        country: subject.country,
        state: subject.state,
        locality: subject.locality,
        email: subject.email
      },
      issuer: {
        commonName: 'CertTrust Demo CA',
        organization: 'CertTrust',
        country: 'IT'
      },
      validFrom: now,
      validTo: validTo,
      keySize: keySize,
      signatureAlgorithm: 'SHA256withRSA',
      certificatePem: certificatePem,
      privateKeyPem: privateKeyPem,
      publicKeyPem: publicKeyPem,
      psd2Roles: psd2Roles,
      subjectAltNames: subjectAltNames,
      status: 'active',
      user: userId,
      promoCodeUsed: promoCode,
      environment: environment
    });
    
    await certificate.save();
    
    return {
      certificate,
      certificatePem,
      privateKeyPem,
      publicKeyPem,
      serialNumber: cert.serialNumber,
      validFrom: now,
      validTo: validTo,
      subject: subjectAttrs,
      type: type
    };
  }
  
  /**
   * Get extensions based on certificate type
   */
  static getExtensionsForType(type, subject, psd2Roles, subjectAltNames) {
    const extensions = [
      { name: 'basicConstraints', cA: false },
      {
        name: 'keyUsage',
        digitalSignature: true,
        keyEncipherment: true,
        nonRepudiation: true
      },
      {
        name: 'extKeyUsage',
        serverAuth: true,
        clientAuth: true
      }
    ];
    
    // Add type-specific extensions
    switch (type) {
      case 'QWAC':
        extensions.push({
          name: 'subjectAltName',
          altNames: [{
            type: 2, // DNS
            value: subject.commonName || 'example.com'
          }]
        });
        break;
        
      case 'QWAC_SAN':
        const altNames = subjectAltNames.map(san => ({
          type: san.type === 'DNS' ? 2 : san.type === 'IP' ? 7 : 1,
          value: san.value
        }));
        extensions.push({
          name: 'subjectAltName',
          altNames: altNames
        });
        break;
        
      case 'PSD2':
      case 'QWAC_TPP':
      case 'QSealC_TPP':
        // Add PSD2 roles extension (custom OID)
        if (psd2Roles.length > 0) {
          extensions.push({
            id: '0.4.0.19495.1', // PSD2 roles OID
            value: this.encodePsd2Roles(psd2Roles)
          });
        }
        break;
        
      case 'QSealC':
        extensions.push({
          name: 'keyUsage',
          digitalSignature: true,
          contentCommitment: true,
          keyEncipherment: false,
          dataEncipherment: false
        });
        break;
        
      case 'eIDAS':
        extensions.push({
          name: 'extKeyUsage',
          serverAuth: true,
          clientAuth: true,
          emailProtection: true,
          codeSigning: true
        });
        break;
    }
    
    return extensions;
  }
  
  /**
   * Get organizational unit based on certificate type
   */
  static getOUForType(type) {
    const ouMap = {
      'QWAC': 'Website Authentication',
      'PSD2': 'Payment Services',
      'eIDAS': 'Electronic Identification',
      'QSealC': 'Electronic Seal',
      'QWAC_TPP': 'Third Party Provider - Web Auth',
      'QSealC_TPP': 'Third Party Provider - Seal',
      'QWAC_SAN': 'Multi-Domain Web Auth'
    };
    return ouMap[type] || 'Digital Certificates';
  }
  
  /**
   * Encode PSD2 roles for certificate extension
   */
  static encodePsd2Roles(roles) {
    // Simplified encoding - in production, use proper ASN.1 encoding
    return roles.join(',');
  }
  
  /**
   * Generate unique serial number
   */
  static generateSerialNumber() {
    return uuidv4().replace(/-/g, '').toUpperCase();
  }
  
  /**
   * Revoke a certificate
   */
  static async revokeCertificate(certificateId, reason) {
    const certificate = await Certificate.findById(certificateId);
    if (!certificate) {
      throw new Error('Certificate not found');
    }
    
    certificate.status = 'revoked';
    certificate.revokedAt = new Date();
    certificate.revocationReason = reason;
    
    await certificate.save();
    return certificate;
  }
  
  /**
   * Get certificate by ID
   */
  static async getCertificate(certificateId) {
    return await Certificate.findById(certificateId);
  }
  
  /**
   * Get certificates by user
   */
  static async getUserCertificates(userId, status = 'active') {
    const query = { user: userId };
    if (status) {
      query.status = status;
    }
    return await Certificate.find(query).sort({ createdAt: -1 });
  }
  
  /**
   * Increment download count
   */
  static async incrementDownload(certificateId) {
    const certificate = await Certificate.findById(certificateId);
    if (certificate) {
      certificate.downloadCount += 1;
      certificate.lastDownloadedAt = new Date();
      await certificate.save();
    }
    return certificate;
  }
  
  /**
   * Check if certificate is expiring soon
   */
  static async getExpiringCertificates(daysThreshold = 30) {
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() + daysThreshold);
    
    return await Certificate.find({
      status: 'active',
      validTo: { $lte: thresholdDate, $gte: new Date() }
    });
  }
}

module.exports = CertificateService;
