/**
 * Certificate Signer - Sign X.509 Certificates using HSM
 * 
 * This module uses the HSM to sign certificates, ensuring that
 * private keys never leave the secure hardware boundary.
 */

const forge = require('node-forge');
const HSMManager = require('./HSMManager');
const AuditLogger = require('./AuditLogger');

class CertificateSigner {
  constructor(hsmManager) {
    this.hsm = hsmManager;
  }
  
  /**
   * Sign a certificate using HSM
   */
  async signCertificate(options) {
    const {
      subject,
      issuer,
      keyId,
      validityDays = 365,
      serialNumber,
      extensions = {},
      certificateType = 'STANDARD'
    } = options;
    
    AuditLogger.info('Signing certificate', {
      subject: subject.commonName,
      certificateType,
      keyId
    });
    
    try {
      // Create certificate
      const cert = forge.pki.createCertificate();
      
      // Set serial number
      cert.serialNumber = serialNumber || this.generateSerialNumber();
      
      // Set validity
      const now = new Date();
      const validTo = new Date(now);
      validTo.setDate(validTo.getDate() + validityDays);
      
      cert.validity.notBefore = now;
      cert.validity.notAfter = validTo;
      
      // Set subject
      const subjectAttrs = this.buildSubjectAttributes(subject);
      cert.setSubject(subjectAttrs);
      
      // Set issuer
      const issuerAttrs = issuer ? this.buildSubjectAttributes(issuer) : subjectAttrs;
      cert.setIssuer(issuerAttrs);
      
      // Get public key from HSM
      const keyInfo = await this.hsm.getKeyInfo(keyId);
      cert.publicKey = this.convertToForgePublicKey(keyInfo.publicKey);
      
      // Set extensions
      const certExtensions = this.buildExtensions(extensions, certificateType, subject);
      cert.setExtensions(certExtensions);
      
      // Sign with HSM
      const tbsCertificate = this.getTBSCertificate(cert);
      const signature = await this.hsm.sign(keyId, tbsCertificate, 'SHA256');
      
      // Apply signature to certificate
      cert.signature = signature;
      cert.md = forge.md.sha256.create();
      
      // Convert to PEM
      const certificatePem = forge.pki.certificateToPem(cert);
      
      AuditLogger.success('Certificate signed', {
        serialNumber: cert.serialNumber,
        subject: subject.commonName,
        validFrom: now.toISOString(),
        validTo: validTo.toISOString()
      });
      
      return {
        certificate: cert,
        certificatePem,
        serialNumber: cert.serialNumber,
        validFrom: now,
        validTo: validTo,
        subject: subjectAttrs,
        issuer: issuerAttrs,
        keyId
      };
      
    } catch (error) {
      AuditLogger.error('Failed to sign certificate', {
        error: error.message,
        subject: subject.commonName
      });
      throw error;
    }
  }
  
  /**
   * Sign a Certificate Signing Request (CSR)
   */
  async signCSR(csrPem, keyId, validityDays = 365, extensions = {}) {
    AuditLogger.info('Signing CSR', { keyId });
    
    try {
      // Parse CSR
      const csr = forge.pki.certificationRequestFromPem(csrPem);
      
      // Verify CSR signature
      if (!csr.verify()) {
        throw new Error('CSR signature verification failed');
      }
      
      // Create certificate from CSR
      const cert = forge.pki.createCertificate();
      cert.serialNumber = this.generateSerialNumber();
      
      const now = new Date();
      const validTo = new Date(now);
      validTo.setDate(validTo.getDate() + validityDays);
      
      cert.validity.notBefore = now;
      cert.validity.notAfter = validTo;
      
      cert.setSubject(csr.subject.attributes);
      cert.setIssuer(csr.subject.attributes); // Self-signed for demo
      cert.publicKey = csr.publicKey;
      
      // Set extensions
      const certExtensions = this.buildExtensions(extensions, 'STANDARD', {
        commonName: csr.subject.getField('CN').value
      });
      cert.setExtensions(certExtensions);
      
      // Sign with HSM
      const tbsCertificate = this.getTBSCertificate(cert);
      const signature = await this.hsm.sign(keyId, tbsCertificate, 'SHA256');
      
      cert.signature = signature;
      cert.md = forge.md.sha256.create();
      
      const certificatePem = forge.pki.certificateToPem(cert);
      
      AuditLogger.success('CSR signed', {
        serialNumber: cert.serialNumber,
        subject: csr.subject.getField('CN').value
      });
      
      return {
        certificate: cert,
        certificatePem,
        serialNumber: cert.serialNumber
      };
      
    } catch (error) {
      AuditLogger.error('Failed to sign CSR', {
        error: error.message
      });
      throw error;
    }
  }
  
  /**
   * Build subject attributes
   */
  buildSubjectAttributes(subject) {
    const attrs = [];
    
    if (subject.commonName) {
      attrs.push({ name: 'commonName', value: subject.commonName });
    }
    if (subject.organization) {
      attrs.push({ name: 'organizationName', value: subject.organization });
    }
    if (subject.organizationalUnit) {
      attrs.push({ name: 'organizationalUnitName', value: subject.organizationalUnit });
    }
    if (subject.country) {
      attrs.push({ name: 'countryName', value: subject.country });
    }
    if (subject.state) {
      attrs.push({ shortName: 'ST', value: subject.state });
    }
    if (subject.locality) {
      attrs.push({ name: 'localityName', value: subject.locality });
    }
    if (subject.email) {
      attrs.push({ name: 'emailAddress', value: subject.email });
    }
    
    return attrs;
  }
  
  /**
   * Build certificate extensions
   */
  buildExtensions(extensions, certificateType, subject) {
    const certExtensions = [
      { name: 'basicConstraints', cA: extensions.isCA || false },
      {
        name: 'keyUsage',
        digitalSignature: true,
        keyEncipherment: true,
        keyCertSign: extensions.isCA || false,
        cRLSign: extensions.isCA || false
      },
      {
        name: 'extKeyUsage',
        serverAuth: true,
        clientAuth: true
      }
    ];
    
    // Add Subject Alternative Name for web certificates
    if (certificateType === 'QWAC' || certificateType === 'QWAC_SAN') {
      const altNames = [{
        type: 2, // DNS
        value: subject.commonName
      }];
      
      if (extensions.subjectAltNames) {
        extensions.subjectAltNames.forEach(san => {
          altNames.push({
            type: san.type === 'DNS' ? 2 : san.type === 'IP' ? 7 : 1,
            value: san.value
          });
        });
      }
      
      certExtensions.push({
        name: 'subjectAltName',
        altNames
      });
    }
    
    // Add PSD2 roles for TPP certificates
    if (certificateType === 'PSD2' || certificateType === 'QWAC_TPP' || certificateType === 'QSealC_TPP') {
      if (extensions.psd2Roles && extensions.psd2Roles.length > 0) {
        certExtensions.push({
          id: '0.4.0.19495.1', // PSD2 roles OID
          value: extensions.psd2Roles.join(',')
        });
      }
    }
    
    return certExtensions;
  }
  
  /**
   * Generate serial number
   */
  generateSerialNumber() {
    const bytes = forge.random.getBytesSync(16);
    return forge.util.bytesToHex(bytes).toUpperCase();
  }
  
  /**
   * Get TBS (To Be Signed) certificate data
   */
  getTBSCertificate(cert) {
    // Serialize certificate without signature
    const certAsn1 = forge.pki.certificateToAsn1(cert);
    const tbsAsn1 = certAsn1.value[0];
    return forge.asn1.toDer(tbsAsn1).getBytes();
  }
  
  /**
   * Convert HSM public key to forge format
   */
  convertToForgePublicKey(publicKeyPem) {
    return forge.pki.publicKeyFromPem(publicKeyPem);
  }
  
  /**
   * Create a Certificate Signing Request (CSR)
   */
  async createCSR(subject, keyId) {
    AuditLogger.info('Creating CSR', {
      subject: subject.commonName,
      keyId
    });
    
    try {
      const csr = forge.pki.createCertificationRequest();
      
      // Set subject
      const subjectAttrs = this.buildSubjectAttributes(subject);
      csr.setSubject(subjectAttrs);
      
      // Get public key from HSM
      const keyInfo = await this.hsm.getKeyInfo(keyId);
      csr.publicKey = this.convertToForgePublicKey(keyInfo.publicKey);
      
      // Sign CSR with HSM
      const tbsCsr = this.getTBSCSR(csr);
      const signature = await this.hsm.sign(keyId, tbsCsr, 'SHA256');
      
      csr.signature = signature;
      csr.md = forge.md.sha256.create();
      
      const csrPem = forge.pki.certificationRequestToPem(csr);
      
      AuditLogger.success('CSR created', {
        subject: subject.commonName
      });
      
      return {
        csr,
        csrPem,
        subject: subjectAttrs
      };
      
    } catch (error) {
      AuditLogger.error('Failed to create CSR', {
        error: error.message
      });
      throw error;
    }
  }
  
  /**
   * Get TBS CSR data
   */
  getTBSCSR(csr) {
    const csrAsn1 = forge.pki.certificationRequestToAsn1(csr);
    const tbsAsn1 = csrAsn1.value[0];
    return forge.asn1.toDer(tbsAsn1).getBytes();
  }
}

module.exports = CertificateSigner;
