/**
 * HSM Manager - Hardware Security Module Abstraction Layer
 * 
 * Provides unified interface for different HSM providers:
 * - AWS CloudHSM (FIPS 140-2 Level 3)
 * - Azure Dedicated HSM (FIPS 140-2 Level 3)
 * - Google Cloud HSM (FIPS 140-2 Level 3)
 * - PKCS#11 (Thales Luna, Utimaco, etc.)
 * - Local FIPS (OpenSSL FIPS Provider)
 */

const crypto = require('crypto');
const AWSProvider = require('./providers/AWSProvider');
const AzureProvider = require('./providers/AzureProvider');
const GCPProvider = require('./providers/GCPProvider');
const PKCS11Provider = require('./providers/PKCS11Provider');
const LocalFIPSProvider = require('./providers/LocalFIPSProvider');
const AuditLogger = require('./AuditLogger');

class HSMManager {
  constructor(config) {
    this.config = config;
    this.provider = this.initializeProvider(config.provider);
    this.auditLogger = new AuditLogger(config.audit);
    
    AuditLogger.info('HSM Manager initialized', {
      provider: config.provider,
      timestamp: new Date().toISOString()
    });
  }
  
  /**
   * Initialize the appropriate HSM provider
   */
  initializeProvider(providerType) {
    switch (providerType) {
      case 'aws-cloudhsm':
        return new AWSProvider(this.config.aws);
      case 'azure-dedicated-hsm':
        return new AzureProvider(this.config.azure);
      case 'google-cloud-hsm':
        return new GCPProvider(this.config.gcp);
      case 'pkcs11':
        return new PKCS11Provider(this.config.pkcs11);
      case 'local-fips':
        return new LocalFIPSProvider(this.config.localFips);
      default:
        throw new Error(`Unknown HSM provider: ${providerType}`);
    }
  }
  
  /**
   * Generate a new key pair
   */
  async generateKeyPair(options) {
    const {
      algorithm = 'RSA',
      keySize = 2048,
      label,
      extractable = false,
      tokenLabel
    } = options;
    
    // Validate FIPS-approved algorithms
    this.validateFIPSAlgorithm(algorithm, keySize);
    
    AuditLogger.info('Generating key pair', {
      algorithm,
      keySize,
      label,
      extractable
    });
    
    try {
      const keyPair = await this.provider.generateKeyPair({
        algorithm,
        keySize,
        label,
        extractable,
        tokenLabel
      });
      
      AuditLogger.success('Key pair generated', {
        keyId: keyPair.keyId,
        algorithm,
        keySize
      });
      
      return keyPair;
    } catch (error) {
      AuditLogger.error('Failed to generate key pair', {
        error: error.message,
        algorithm,
        keySize
      });
      throw error;
    }
  }
  
  /**
   * Sign data with a key
   */
  async sign(keyId, data, algorithm = 'SHA256') {
    AuditLogger.info('Signing data', {
      keyId,
      algorithm,
      dataSize: data.length
    });
    
    try {
      const signature = await this.provider.sign(keyId, data, algorithm);
      
      AuditLogger.success('Data signed', {
        keyId,
        algorithm,
        signatureLength: signature.length
      });
      
      return signature;
    } catch (error) {
      AuditLogger.error('Failed to sign data', {
        keyId,
        error: error.message
      });
      throw error;
    }
  }
  
  /**
   * Verify a signature
   */
  async verify(keyId, data, signature, algorithm = 'SHA256') {
    AuditLogger.info('Verifying signature', {
      keyId,
      algorithm
    });
    
    try {
      const isValid = await this.provider.verify(keyId, data, signature, algorithm);
      
      AuditLogger.success('Signature verified', {
        keyId,
        isValid
      });
      
      return isValid;
    } catch (error) {
      AuditLogger.error('Failed to verify signature', {
        keyId,
        error: error.message
      });
      throw error;
    }
  }
  
  /**
   * Encrypt data
   */
  async encrypt(keyId, data, algorithm = 'AES-256-GCM') {
    AuditLogger.info('Encrypting data', {
      keyId,
      algorithm,
      dataSize: data.length
    });
    
    try {
      const encrypted = await this.provider.encrypt(keyId, data, algorithm);
      
      AuditLogger.success('Data encrypted', {
        keyId,
        algorithm
      });
      
      return encrypted;
    } catch (error) {
      AuditLogger.error('Failed to encrypt data', {
        keyId,
        error: error.message
      });
      throw error;
    }
  }
  
  /**
   * Decrypt data
   */
  async decrypt(keyId, encryptedData, algorithm = 'AES-256-GCM') {
    AuditLogger.info('Decrypting data', {
      keyId,
      algorithm
    });
    
    try {
      const decrypted = await this.provider.decrypt(keyId, encryptedData, algorithm);
      
      AuditLogger.success('Data decrypted', {
        keyId,
        algorithm
      });
      
      return decrypted;
    } catch (error) {
      AuditLogger.error('Failed to decrypt data', {
        keyId,
        error: error.message
      });
      throw error;
    }
  }
  
  /**
   * Get key information
   */
  async getKeyInfo(keyId) {
    AuditLogger.info('Getting key info', { keyId });
    
    try {
      const keyInfo = await this.provider.getKeyInfo(keyId);
      
      AuditLogger.success('Key info retrieved', { keyId });
      
      return keyInfo;
    } catch (error) {
      AuditLogger.error('Failed to get key info', {
        keyId,
        error: error.message
      });
      throw error;
    }
  }
  
  /**
   * Delete a key
   */
  async deleteKey(keyId) {
    AuditLogger.warn('Deleting key', { keyId });
    
    try {
      await this.provider.deleteKey(keyId);
      
      AuditLogger.success('Key deleted', { keyId });
      
      return true;
    } catch (error) {
      AuditLogger.error('Failed to delete key', {
        keyId,
        error: error.message
      });
      throw error;
    }
  }
  
  /**
   * List all keys
   */
  async listKeys(filter = {}) {
    AuditLogger.info('Listing keys', { filter });
    
    try {
      const keys = await this.provider.listKeys(filter);
      
      AuditLogger.success('Keys listed', {
        count: keys.length
      });
      
      return keys;
    } catch (error) {
      AuditLogger.error('Failed to list keys', {
        error: error.message
      });
      throw error;
    }
  }
  
  /**
   * Backup keys (encrypted)
   */
  async backupKeys(keyIds, backupPassword) {
    AuditLogger.warn('Backing up keys', {
      keyCount: keyIds.length
    });
    
    try {
      const backup = await this.provider.backupKeys(keyIds, backupPassword);
      
      AuditLogger.success('Keys backed up', {
        keyCount: keyIds.length,
        backupSize: backup.length
      });
      
      return backup;
    } catch (error) {
      AuditLogger.error('Failed to backup keys', {
        error: error.message
      });
      throw error;
    }
  }
  
  /**
   * Restore keys from backup
   */
  async restoreKeys(backupData, backupPassword) {
    AuditLogger.warn('Restoring keys from backup');
    
    try {
      const restored = await this.provider.restoreKeys(backupData, backupPassword);
      
      AuditLogger.success('Keys restored', {
        keyCount: restored.length
      });
      
      return restored;
    } catch (error) {
      AuditLogger.error('Failed to restore keys', {
        error: error.message
      });
      throw error;
    }
  }
  
  /**
   * Get HSM metrics
   */
  async getMetrics() {
    try {
      const metrics = await this.provider.getMetrics();
      return metrics;
    } catch (error) {
      AuditLogger.error('Failed to get metrics', {
        error: error.message
      });
      throw error;
    }
  }
  
  /**
   * Validate FIPS-approved algorithm
   */
  validateFIPSAlgorithm(algorithm, keySize) {
    const fipsApproved = {
      'RSA': [2048, 3072, 4096],
      'ECDSA': [256, 384, 521],
      'AES': [128, 192, 256]
    };
    
    if (!fipsApproved[algorithm]) {
      throw new Error(`Algorithm ${algorithm} is not FIPS-approved`);
    }
    
    if (!fipsApproved[algorithm].includes(keySize)) {
      throw new Error(`Key size ${keySize} is not FIPS-approved for ${algorithm}`);
    }
  }
  
  /**
   * Close HSM connection
   */
  async close() {
    AuditLogger.info('Closing HSM connection');
    
    try {
      await this.provider.close();
      AuditLogger.success('HSM connection closed');
    } catch (error) {
      AuditLogger.error('Failed to close HSM connection', {
        error: error.message
      });
      throw error;
    }
  }
}

module.exports = HSMManager;
