const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
const Admin = require('./models/Admin');
const Page = require('./models/Page');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/content', contentRoutes);

app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'RenewCred CMS API',
    timestamp: new Date().toISOString()
  });
});

const autoSeedIfEmpty = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@renewcred.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      await Admin.create({
        username: 'Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      console.log('Default admin auto-created: admin@renewcred.com');
    }

    const pageCount = await Page.countDocuments();
    if (pageCount === 0) {
      await Page.create({
        title: 'RenewCred - Next Generation Smart Credit Renewal',
        slug: 'home',
        description: 'Main landing page for RenewCred smart credit card renewal platform.',
        isPublished: true,
        blocks: [
          {
            id: 'b-1',
            type: 'header',
            order: 1,
            data: {
              text: 'Empowering Smart Card Renewals & Financial Flexibility',
              level: 'h1'
            }
          },
          {
            id: 'b-2',
            type: 'paragraph',
            order: 2,
            data: {
              text: 'RenewCred provides an automated, AI-driven infrastructure that handles credit card renewals, interest optimizations, and reward credit point calculations in real-time. Designed for modern banking customers seeking maximum yield and zero payment gaps.'
            }
          },
          {
            id: 'b-3',
            type: 'quote',
            order: 3,
            data: {
              text: 'Security and instant renewal are the cornerstones of modern personal finance management.',
              author: 'RenewCred Financial Tech Paper 2026'
            }
          },
          {
            id: 'b-4',
            type: 'header',
            order: 4,
            data: {
              text: 'Core Platform Features',
              level: 'h2'
            }
          },
          {
            id: 'b-5',
            type: 'list',
            order: 5,
            data: {
              style: 'bullet',
              items: [
                'Zero-friction automated credit limit rollover',
                'Real-time cash back credit calculations across 40+ partner banks',
                'End-to-end multi-factor encryption compliance',
                'Instant dispute resolution and automated fraud alerts'
              ]
            }
          },
          {
            id: 'b-6',
            type: 'header',
            order: 6,
            data: {
              text: 'Card Plan Tier Comparison',
              level: 'h2'
            }
          },
          {
            id: 'b-7',
            type: 'table',
            order: 7,
            data: {
              headers: ['Plan Name', 'Annual Fee', 'Cashback Rate', 'APR Range', 'Renewal Bonus'],
              rows: [
                ['RenewCred Starter', '$0', '1.5%', '14.99% - 18.99%', '$50 Credit'],
                ['RenewCred Platinum', '$95', '3.5%', '12.49% - 15.99%', '$250 Credit'],
                ['RenewCred Signature', '$295', '5.0%', '9.99% - 12.99%', '$600 Credit']
              ]
            }
          }
        ]
      });

      await Page.create({
        title: 'Technical Math & Financial Documentation',
        slug: 'tech-docs',
        description: 'System mathematical models for compound interest and risk score calculations.',
        isPublished: true,
        blocks: [
          {
            id: 't-1',
            type: 'header',
            order: 1,
            data: {
              text: 'RenewCred Mathematical & Risk Analysis Models',
              level: 'h1'
            }
          },
          {
            id: 't-2',
            type: 'paragraph',
            order: 2,
            data: {
              text: 'Our proprietary credit score engine computes dynamic interest rates using continuous compounding and localized consumer risk variance equations.'
            }
          },
          {
            id: 't-3',
            type: 'header',
            order: 3,
            data: {
              text: '1. Continuous Compounding Formula',
              level: 'h2'
            }
          },
          {
            id: 't-4',
            type: 'equation',
            order: 4,
            data: {
              equation: 'A = P e^{rt}',
              displayMode: true,
              caption: 'Where A is final balance, P is principal, r is rate, and t is years.'
            }
          },
          {
            id: 't-5',
            type: 'header',
            order: 5,
            data: {
              text: '2. Dynamic APR Variance Matrix',
              level: 'h2'
            }
          },
          {
            id: 't-6',
            type: 'equation',
            order: 6,
            data: {
              equation: '\\sigma_{credit} = \\sqrt{ \\frac{1}{N} \\sum_{i=1}^{N} (x_i - \\mu)^2 }',
              displayMode: true,
              caption: 'Standard deviation formula used in real-time credit risk modeling.'
            }
          }
        ]
      });

      console.log('Default pages auto-created!');
    }
  } catch (error) {
    console.error('Error auto-seeding data:', error.message);
  }
};

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  autoSeedIfEmpty();
  app.listen(PORT, () => {
    console.log(`RenewCred Backend Server running on port ${PORT}`);
  });
});
