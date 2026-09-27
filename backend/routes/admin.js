const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const User = require('../models/User');
const Certificate = require('../models/Certificate');
const PromoCode = require('../models/PromoCode');

// All admin routes require authentication and admin role
router.use(auth);
router.use(admin);

/**
 * GET /api/admin/stats
 * Get dashboard statistics
 */
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCertificates = await Certificate.countDocuments();
    const activeCertificates = await Certificate.countDocuments({ status: 'active' });
    const revokedCertificates = await Certificate.countDocuments({ status: 'revoked' });
    const expiredCertificates = await Certificate.countDocuments({ status: 'expired' });
    const totalPromoCodes = await PromoCode.countDocuments();
    const activePromoCodes = await PromoCode.countDocuments({ isActive: true });
    
    // Get certificates by type
    const certificatesByType = await Certificate.aggregate([
      { $group: { _id: '$certificateType', count: { $sum: 1 } } }
    ]);
    
    // Get recent users
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('-password');
    
    // Get recent certificates
    const recentCertificates = await Certificate.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'email firstName lastName')
      .select('-certificatePem -privateKeyPem -publicKeyPem');
    
    res.json({
      success: true,
      stats: {
        users: {
          total: totalUsers
        },
        certificates: {
          total: totalCertificates,
          active: activeCertificates,
          revoked: revokedCertificates,
          expired: expiredCertificates,
          byType: certificatesByType
        },
        promoCodes: {
          total: totalPromoCodes,
          active: activePromoCodes
        }
      },
      recent: {
        users: recentUsers,
        certificates: recentCertificates
      }
    });
    
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
});

/**
 * GET /api/admin/users
 * Get all users
 */
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 50, search } = req.query;
    
    const query = {};
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: 'i' } },
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } }
      ];
    }
    
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select('-password')
      .populate('certificates');
    
    const total = await User.countDocuments(query);
    
    res.json({
      success: true,
      users,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
});

/**
 * PUT /api/admin/users/:id/role
 * Update user role
 */
router.put('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User role updated',
      user
    });
    
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user role',
      error: error.message
    });
  }
});

/**
 * PUT /api/admin/users/:id/status
 * Activate/deactivate user
 */
router.put('/users/:id/status', async (req, res) => {
  try {
    const { isActive } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: `User ${isActive ? 'activated' : 'deactivated'}`,
      user
    });
    
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user status',
      error: error.message
    });
  }
});

/**
 * GET /api/admin/certificates
 * Get all certificates
 */
router.get('/certificates', async (req, res) => {
  try {
    const { page = 1, limit = 50, status, type } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (type) query.certificateType = type;
    
    const certificates = await Certificate.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('user', 'email firstName lastName companyName')
      .select('-certificatePem -privateKeyPem -publicKeyPem');
    
    const total = await Certificate.countDocuments(query);
    
    res.json({
      success: true,
      certificates,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
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
 * POST /api/admin/promo-codes
 * Create promo code
 */
router.post('/promo-codes', async (req, res) => {
  try {
    const promoCode = new PromoCode({
      ...req.body,
      createdBy: req.user.userId
    });
    
    await promoCode.save();
    
    res.status(201).json({
      success: true,
      message: 'Promo code created',
      promoCode
    });
    
  } catch (error) {
    console.error('Create promo code error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create promo code',
      error: error.message
    });
  }
});

/**
 * GET /api/admin/promo-codes
 * Get all promo codes
 */
router.get('/promo-codes', async (req, res) => {
  try {
    const promoCodes = await PromoCode.find()
      .sort({ createdAt: -1 })
      .populate('createdBy', 'email firstName lastName');
    
    res.json({
      success: true,
      count: promoCodes.length,
      promoCodes
    });
    
  } catch (error) {
    console.error('Get promo codes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch promo codes',
      error: error.message
    });
  }
});

/**
 * PUT /api/admin/promo-codes/:id
 * Update promo code
 */
router.put('/promo-codes/:id', async (req, res) => {
  try {
    const promoCode = await PromoCode.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: 'Promo code not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Promo code updated',
      promoCode
    });
    
  } catch (error) {
    console.error('Update promo code error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update promo code',
      error: error.message
    });
  }
});

/**
 * DELETE /api/admin/promo-codes/:id
 * Delete promo code
 */
router.delete('/promo-codes/:id', async (req, res) => {
  try {
    const promoCode = await PromoCode.findByIdAndDelete(req.params.id);
    
    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: 'Promo code not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Promo code deleted'
    });
    
  } catch (error) {
    console.error('Delete promo code error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete promo code',
      error: error.message
    });
  }
});

module.exports = router;
