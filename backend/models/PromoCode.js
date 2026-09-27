const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  
  // Certificate types this code grants access to
  certificateTypes: [{
    type: String,
    enum: ['QWAC', 'PSD2', 'eIDAS', 'QSealC', 'QWAC_TPP', 'QSealC_TPP', 'QWAC_SAN', 'ALL']
  }],
  
  // Usage limits
  maxUses: {
    type: Number,
    default: 1 // 1 = single use, 0 = unlimited
  },
  currentUses: {
    type: Number,
    default: 0
  },
  maxUsesPerUser: {
    type: Number,
    default: 1
  },
  
  // Validity period
  validFrom: {
    type: Date,
    default: Date.now
  },
  validTo: {
    type: Date,
    required: true
  },
  
  // Environment
  environment: {
    type: String,
    enum: ['test', 'production'],
    default: 'test'
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Tracking
  usedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    usedAt: {
      type: Date,
      default: Date.now
    },
    certificateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Certificate'
    },
    ipAddress: String,
    userAgent: String
  }],
  
  // Metadata
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: String,
  tags: [String]
  
}, {
  timestamps: true
});

// Indexes
promoCodeSchema.index({ code: 1 });
promoCodeSchema.index({ isActive: 1, validTo: 1 });

// Check if code is valid
promoCodeSchema.methods.isValid = function() {
  const now = new Date();
  return this.isActive && 
         now >= this.validFrom && 
         now <= this.validTo &&
         (this.maxUses === 0 || this.currentUses < this.maxUses);
};

// Check if user can use this code
promoCodeSchema.methods.canBeUsedBy = function(userId) {
  const userUses = this.usedBy.filter(u => u.user.toString() === userId.toString()).length;
  return userUses < this.maxUsesPerUser;
};

// Use the code
promoCodeSchema.methods.use = function(userId, certificateId, ipAddress, userAgent) {
  this.currentUses += 1;
  this.usedBy.push({
    user: userId,
    certificateId: certificateId,
    ipAddress: ipAddress,
    userAgent: userAgent
  });
  return this.save();
};

module.exports = mongoose.model('PromoCode', promoCodeSchema);
