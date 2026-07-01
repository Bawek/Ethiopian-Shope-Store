/**
 * Database Seed Script
 * Creates the default admin account
 * Run with: node prisma/seed.js
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...\n');

  // ── Admin Account ──────────────────────────────────────────────────────────
  const adminEmail    = 'admin@ethiopianshop.com';
  const adminPassword = 'Admin@1234';

  const existing = await prisma.account.findFirst({ where: { email: adminEmail } });

  if (existing) {
    console.log(`⚠️  Admin already exists: ${adminEmail}`);
    console.log('   To reset the password, delete the account and re-run this script.\n');
  } else {
    const hashed = await bcrypt.hash(adminPassword, 10);

    const admin = await prisma.account.create({
      data: {
        firstName:    'Super',
        lastName:     'Admin',
        email:        adminEmail,
        password:     hashed,
        role:         'ADMIN',
      },
    });

    console.log('✅ Admin account created');
    console.log('   Email   :', adminEmail);
    console.log('   Password:', adminPassword);
    console.log('   ID      :', admin.id);
    console.log('\n⚠️  Change this password immediately after first login!\n');
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
