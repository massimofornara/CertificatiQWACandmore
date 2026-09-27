const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  // Certificate identification
  serialNumber: {
    type: String,
    required: true,
    unique: true
  },
  certificateType: {
    type: String,
    required: true,
    enum: ['QWAC', 'PSD2', 'eIDAS', 'QSealC', 'QWAC_TPP', 'QSealC_TPP', 'QWAC_SAN']
  },
  
  // Subject information
  subject: {
    commonName: { type: String, required: true },
    organization: String,
    organizationalUnit: String,
    country: String,
    state: String,
    locality: String,
    email: String
  },
  
  // Certificate details
  issuer: {
    commonName: String,
    organization: String,
    country: String
  },
  validFrom: {
    type: Date,
    required: true
  },
  validTo: {
    type: Date,
    required: true
  },
  keySize: {
    type: Number,
    default: 2048,
    enum: [2048, 4096]
  },
  signatureAlgorithm: {
    type: String,
    default: 'SHA256withRSA'
  },
  
  // Certificate files (stored as paths or base64)
  certificatePem: {
    type: String,
    required: true
  },
  privateKeyPem: {
    type: String,
    required: true
  },
  publicKeyPem: String,
  chainPem: String,
  
  // PSD2 specific fields
  psd2Roles: [{
    type: String,
    enum: ['PSP_AS', 'PSP_IC', 'PSP_PI']
  }],
  competentAuthority: String,
  ncaId: String,
  
  // SAN (Subject Alternative Names) for QWAC_SAN
  subjectAltNames: [{
    type: {
      type: String,
      enum: ['DNS', 'IP', 'EMAIL']
    },
    value: String
  }],
  
  // Status and metadata
  status: {
    type: String,
    enum: ['active', 'revoked', 'expired', 'pending'],
    default: 'active'
  },
  revokedAt: Date,
  revocationReason: String,
  
  // User association
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Promo code used
  promoCodeUsed: String,
  
  // Environment (for demo purposes)
  environment: {
    type: String,
    enum: ['test', 'production'],
    default: 'test'
  },
  
  // Delivery status
  deliveryStatus: {
    type: String,
    enum: ['pending', 'sent', 'failed'],
    default: 'pending'
  },
  deliveredAt: Date,
  deliveryEmail: String,
  
  // Download tracking
  downloadCount: {
    type: Number,
    default: 0
  },
  lastDownloadedAt: Date,
  
  // Notes
  notes: String
  
}, {
  timestamps: true
});

// Index for faster queries
certificateSchema.index({ user: 1, status: 1 });
certificateSchema.index({ certificateType: 1, status: 1 });
certificateSchema.index({ validTo: 1 });
certificateSchema.index({ serialNumber: 1 });

// Virtual for certificate validity
certificateSchema.virtual('isValid').get(function() {
  const now = new Date();
  return this.status === 'active' && now >= this.validFrom && now <= this.validTo;
});

// Virtual for days until expiration
certificateSchema.virtual('daysUntilExpiration').get(function() {
  const now = new Date();
  const diff = this.validTo - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

module.exports = mongoose.model('Certificate', certificateSchema);
