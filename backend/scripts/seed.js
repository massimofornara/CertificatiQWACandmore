/**
 * Seed script to create initial promo codes and admin user
 * Run: node scripts/seed.js
 */

const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const PromoCode = require('../models/PromoCode');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();
  
  try {
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await PromoCode.deleteMany({});
    
    // Create admin user
    console.log('👤 Creating admin user...');
    const admin = new User({
      email: process.env.ADMIN_EMAIL || 'admin@certtrust.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      companyName: 'CertTrust',
      role: 'admin',
      emailVerified: true,
      isActive: true
    });
    await admin.save();
    console.log(`✅ Admin created: ${admin.email}`);
    
    // Create demo user
    console.log('👤 Creating demo user...');
    const demoUser = new User({
      email: 'demo@certtrust.com',
      password: 'demo123',
      firstName: 'Demo',
      lastName: 'User',
      companyName: 'Demo Company',
      role: 'user',
      emailVerified: true,
      isActive: true
    });
    await demoUser.save();
    console.log(`✅ Demo user created: ${demoUser.email}`);
    
    // Create promo codes
    console.log('🎫 Creating promo codes...');
    
    const promoCodes = [
      {
        code: 'CERTTRUST2024',
        description: 'All certificates - Full access',
        certificateTypes: ['ALL'],
        maxUses: 0, // Unlimited
        maxUsesPerUser: 7, // One of each type
        validTo: new Date('2025-12-31'),
        environment: 'test',
        isActive: true,
        createdBy: admin._id
      },
      {
        code: 'QWAC-FREE',
        description: 'Free QWAC certificate',
        certificateTypes: ['QWAC'],
        maxUses: 0,
        maxUsesPerUser: 1,
        validTo: new Date('2025-12-31'),
        environment: 'test',
        isActive: true,
        createdBy: admin._id
      },
      {
        code: 'PSD2-TRIAL',
        description: 'PSD2 certificate trial',
        certificateTypes: ['PSD2', 'QWAC_TPP', 'QSealC_TPP'],
        maxUses: 0,
        maxUsesPerUser: 3,
        validTo: new Date('2025-12-31'),
        environment: 'test',
        isActive: true,
        createdBy: admin._id
      },
      {
        code: 'EIDAS-DEMO',
        description: 'eIDAS certificate demo',
        certificateTypes: ['eIDAS'],
        maxUses: 0,
        maxUsesPerUser: 1,
        validTo: new Date('2025-12-31'),
        environment: 'test',
        isActive: true,
        createdBy: admin._id
      },
      {
        code: 'QSEAL-FREE',
        description: 'Free QSealC certificate',
        certificateTypes: ['QSealC'],
        maxUses: 0,
        maxUsesPerUser: 1,
        validTo: new Date('2025-12-31'),
        environment: 'test',
        isActive: true,
        createdBy: admin._id
      },
      {
        code: 'SAN-MULTI',
        description: 'QWAC SAN multi-domain certificate',
        certificateTypes: ['QWAC_SAN'],
        maxUses: 0,
        maxUsesPerUser: 2,
        validTo: new Date('2025-12-31'),
        environment: 'test',
        isActive: true,
        createdBy: admin._id
      },
      {
        code: 'ALL-CERTS',
        description: 'All certificate types - Premium',
        certificateTypes: ['ALL'],
        maxUses: 0,
        maxUsesPerUser: 10,
        validTo: new Date('2025-12-31'),
        environment: 'test',
        isActive: true,
        createdBy: admin._id
      }
    ];
    
    for (const code of promoCodes) {
      const promo = new PromoCode(code);
      await promo.save();
      console.log(`✅ Promo code created: ${code.code} (${code.description})`);
    }
    
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║                                                            ║');
    console.log('║     🎉 Database seeded successfully!                       ║');
    console.log('║                                                            ║');
    console.log('║     📧 Admin Login:                                        ║');
    console.log(`║        Email: ${process.env.ADMIN_EMAIL || 'admin@certtrust.com'}${' '.repeat(30)}║`);
    console.log(`║        Password: ${process.env.ADMIN_PASSWORD || 'admin123'}${' '.repeat(29)}║`);
    console.log('║                                                            ║');
    console.log('║     📧 Demo User:                                          ║');
    console.log('║        Email: demo@certtrust.com                           ║');
    console.log('║        Password: demo123                                   ║');
    console.log('║                                                            ║');
    console.log('║     🎫 Promo Codes:                                        ║');
    console.log('║        CERTTRUST2024 - All certificates (unlimited)        ║');
    console.log('║        QWAC-FREE - QWAC only                               ║');
    console.log('║        PSD2-TRIAL - PSD2 certificates                      ║');
    console.log('║        EIDAS-DEMO - eIDAS only                             ║');
    console.log('║        QSEAL-FREE - QSealC only                            ║');
    console.log('║        SAN-MULTI - QWAC SAN multi-domain                   ║');
    console.log('║        ALL-CERTS - All types (premium)                     ║');
    console.log('║                                                            ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    
  } catch (error) {
    console.error('❌ Seed error:', error);
  } finally {
    process.exit(0);
  }
};

seedData();
