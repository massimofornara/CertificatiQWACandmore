/**
 * Local FIPS Provider - OpenSSL FIPS Provider Implementation
 * 
 * Uses OpenSSL 3.x FIPS provider for local cryptographic operations.
 * Note: This is software-based and NOT hardware-certified FIPS 140-2 Level 3.
 * For true Level 3 compliance, use cloud HSM or hardware HSM.
 */

const crypto = require('crypto');
const forge = require('node-forge');

class LocalFIPSProvider {
  constructor(config = {}) {
    this.config = config;
    this.keys = new Map(); // In-memory key store (for demo)
    this.fipsMode = config.fipsMode !== false;
    
    // Verify FIPS mode
    if (this.fipsMode) {
      this.verifyFIPSMode();
    }
    
    console.log('🔐 Local FIPS Provider initialized');
  }
  
  /**
   * Verify OpenSSL FIPS mode
   */
  verifyFIPSMode() {
    try {
      // Check if FIPS provider is available
      const providers = crypto.getFips();
      console.log(`✅ FIPS mode: ${providers ? 'ENABLED' : 'DISABLED'}`);
    } catch (error) {
      console.warn('⚠️  FIPS mode not available, using standard crypto');
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
      extractable = false
    } = options;
    
    let keyPair;
    
    if (algorithm === 'RSA') {
      const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: keySize,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem'
        }
      });
      
      keyPair = { publicKey, privateKey };
    } else if (algorithm === 'ECDSA') {
      const curveName = keySize === 256 ? 'prime256v1' : 
                        keySize === 384 ? 'secp384r1' : 'secp521r1';
      
      const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', {
        namedCurve: curveName,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem'
        }
      });
      
      keyPair = { publicKey, privateKey };
    } else {
      throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
    
    // Store key
    const keyId = this.generateKeyId();
    this.keys.set(keyId, {
      keyId,
      label,
      algorithm,
      keySize,
      publicKey: keyPair.publicKey,
      privateKey: keyPair.privateKey,
      extractable,
      createdAt: new Date()
    });
    
    return {
      keyId,
      publicKey: keyPair.publicKey,
      algorithm,
      keySize,
      label
    };
  }
  
  /**
   * Sign data with a key
   */
  async sign(keyId, data, algorithm = 'SHA256') {
    const key = this.keys.get(keyId);
    if (!key) {
      throw new Error(`Key not found: ${keyId}`);
    }
    
    const hashAlgorithm = algorithm.toLowerCase().replace('-', '');
    
    const sign = crypto.createSign(hashAlgorithm);
    sign.update(data);
    sign.end();
    
    const signature = sign.sign(key.privateKey);
    
    return signature;
  }
  
  /**
   * Verify a signature
   */
  async verify(keyId, data, signature, algorithm = 'SHA256') {
    const key = this.keys.get(keyId);
    if (!key) {
      throw new Error(`Key not found: ${keyId}`);
    }
    
    const hashAlgorithm = algorithm.toLowerCase().replace('-', '');
    
    const verify = crypto.createVerify(hashAlgorithm);
    verify.update(data);
    verify.end();
    
    return verify.verify(key.publicKey, signature);
  }
  
  /**
   * Encrypt data
   */
  async encrypt(keyId, data, algorithm = 'AES-256-GCM') {
    const key = this.keys.get(keyId);
    if (!key) {
      throw new Error(`Key not found: ${keyId}`);
    }
    
    const [cipherName, mode] = algorithm.split('-');
    const keySize = parseInt(cipherName.replace('AES-', ''));
    
    // Generate IV and auth tag
    const iv = crypto.randomBytes(12);
    
    const cipher = crypto.createCipheriv(algorithm, crypto.randomBytes(keySize / 8), iv);
    
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    
    const authTag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv,
      authTag,
      algorithm
    };
  }
  
  /**
   * Decrypt data
   */
  async decrypt(keyId, encryptedData, algorithm = 'AES-256-GCM') {
    const key = this.keys.get(keyId);
    if (!key) {
      throw new Error(`Key not found: ${keyId}`);
    }
    
    const decipher = crypto.createDecipheriv(
      algorithm,
      crypto.randomBytes(32), // In real implementation, use stored key
      encryptedData.iv
    );
    
    decipher.setAuthTag(encryptedData.authTag);
    
    let decrypted = decipher.update(encryptedData.encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    
    return decrypted;
  }
  
  /**
   * Get key information
   */
  async getKeyInfo(keyId) {
    const key = this.keys.get(keyId);
    if (!key) {
      throw new Error(`Key not found: ${keyId}`);
    }
    
    return {
      keyId: key.keyId,
      label: key.label,
      algorithm: key.algorithm,
      keySize: key.keySize,
      publicKey: key.publicKey,
      createdAt: key.createdAt,
      extractable: key.extractable
    };
  }
  
  /**
   * Delete a key
   */
  async deleteKey(keyId) {
    const key = this.keys.get(keyId);
    if (!key) {
      throw new Error(`Key not found: ${keyId}`);
    }
    
    // Zeroize key material (FIPS requirement)
    key.privateKey = null;
    this.keys.delete(keyId);
    
    return true;
  }
  
  /**
   * List all keys
   */
  async listKeys(filter = {}) {
    let keys = Array.from(this.keys.values());
    
    if (filter.algorithm) {
      keys = keys.filter(k => k.algorithm === filter.algorithm);
    }
    
    if (filter.label) {
      keys = keys.filter(k => k.label && k.label.includes(filter.label));
    }
    
    return keys.map(k => ({
      keyId: k.keyId,
      label: k.label,
      algorithm: k.algorithm,
      keySize: k.keySize,
      createdAt: k.createdAt
    }));
  }
  
  /**
   * Backup keys (encrypted)
   */
  async backupKeys(keyIds, backupPassword) {
    const keysToBackup = keyIds.map(id => this.keys.get(id)).filter(k => k);
    
    // Encrypt backup with password
    const backupData = JSON.stringify(keysToBackup);
    const salt = crypto.randomBytes(16);
    const key = crypto.pbkdf2Sync(backupPassword, salt, 100000, 32, 'sha256');
    const iv = crypto.randomBytes(12);
    
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    let encrypted = cipher.update(backupData, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
      encrypted,
      salt: salt.toString('hex'),
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex'),
      keyCount: keysToBackup.length
    };
  }
  
  /**
   * Restore keys from backup
   */
  async restoreKeys(backupData, backupPassword) {
    const salt = Buffer.from(backupData.salt, 'hex');
    const iv = Buffer.from(backupData.iv, 'hex');
    const authTag = Buffer.from(backupData.authTag, 'hex');
    const key = crypto.pbkdf2Sync(backupPassword, salt, 100000, 32, 'sha256');
    
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(backupData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    const keys = JSON.parse(decrypted);
    
    // Restore keys
    keys.forEach(k => {
      this.keys.set(k.keyId, k);
    });
    
    return keys.map(k => k.keyId);
  }
  
  /**
   * Get metrics
   */
  async getMetrics() {
    return {
      keyCount: this.keys.size,
      provider: 'local-fips',
      fipsMode: this.fipsMode,
      uptime: process.uptime()
    };
  }
  
  /**
   * Generate key ID
   */
  generateKeyId() {
    return 'key-' + crypto.randomBytes(16).toString('hex');
  }
  
  /**
   * Close provider
   */
  async close() {
    // Zeroize all keys
    for (const key of this.keys.values()) {
      key.privateKey = null;
    }
    this.keys.clear();
    
    console.log('🔒 Local FIPS Provider closed');
  }
}

module.exports = LocalFIPSProvider;
