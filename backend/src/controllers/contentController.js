const mongoose = require('mongoose');
const Page = require('../models/Page');

let memoryPages = [
  {
    _id: 'p-home-1',
    title: 'RenewCred - Next Generation Smart Credit Renewal',
    slug: 'home',
    description: 'Main landing page for RenewCred smart credit card renewal platform.',
    isPublished: true,
    blocks: [
      {
        id: 'b-1',
        type: 'header',
        order: 1,
        data: { text: 'Empowering Smart Card Renewals & Financial Flexibility', level: 'h1' }
      },
      {
        id: 'b-2',
        type: 'paragraph',
        order: 2,
        data: { text: 'RenewCred provides an automated, AI-driven infrastructure that handles credit card renewals, interest optimizations, and reward credit point calculations in real-time. Designed for modern banking customers seeking maximum yield and zero payment gaps.' }
      },
      {
        id: 'b-3',
        type: 'quote',
        order: 3,
        data: { text: 'Security and instant renewal are the cornerstones of modern personal finance management.', author: 'RenewCred Financial Tech Paper 2026' }
      },
      {
        id: 'b-4',
        type: 'header',
        order: 4,
        data: { text: 'Core Platform Features', level: 'h2' }
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
        data: { text: 'Card Plan Tier Comparison', level: 'h2' }
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
  },
  {
    _id: 'p-tech-2',
    title: 'Technical Math & Financial Documentation',
    slug: 'tech-docs',
    description: 'System mathematical models for compound interest and risk score calculations.',
    isPublished: true,
    blocks: [
      {
        id: 't-1',
        type: 'header',
        order: 1,
        data: { text: 'RenewCred Mathematical & Risk Analysis Models', level: 'h1' }
      },
      {
        id: 't-2',
        type: 'paragraph',
        order: 2,
        data: { text: 'Our proprietary credit score engine computes dynamic interest rates using continuous compounding and localized consumer risk variance equations.' }
      },
      {
        id: 't-3',
        type: 'header',
        order: 3,
        data: { text: '1. Continuous Compounding Formula', level: 'h2' }
      },
      {
        id: 't-4',
        type: 'equation',
        order: 4,
        data: { equation: 'A = P e^{rt}', displayMode: true, caption: 'Where A is final balance, P is principal, r is rate, and t is years.' }
      },
      {
        id: 't-5',
        type: 'header',
        order: 5,
        data: { text: '2. Dynamic APR Variance Matrix', level: 'h2' }
      },
      {
        id: 't-6',
        type: 'equation',
        order: 6,
        data: { equation: '\\sigma_{credit} = \\sqrt{ \\frac{1}{N} \\sum_{i=1}^{N} (x_i - \\mu)^2 }', displayMode: true, caption: 'Standard deviation formula used in real-time credit risk modeling.' }
      }
    ]
  }
];

const getPages = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const pages = await Page.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: pages.length, data: pages });
    }
    return res.json({ success: true, count: memoryPages.length, data: memoryPages });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getPageBySlug = async (req, res) => {
  try {
    const slugParam = req.params.slug.toLowerCase();
    if (mongoose.connection.readyState === 1) {
      const page = await Page.findOne({ slug: slugParam });
      if (!page) {
        return res.status(404).json({ success: false, message: 'Page not found' });
      }
      return res.json({ success: true, data: page });
    }

    const page = memoryPages.find((p) => p.slug.toLowerCase() === slugParam);
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }
    return res.json({ success: true, data: page });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getPageById = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const page = await Page.findById(req.params.id);
      if (!page) {
        return res.status(404).json({ success: false, message: 'Page not found' });
      }
      return res.json({ success: true, data: page });
    }

    const page = memoryPages.find((p) => p._id === req.params.id);
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }
    return res.json({ success: true, data: page });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createPage = async (req, res) => {
  try {
    const { title, slug, description, isPublished, blocks } = req.body;
    if (!title || !slug) {
      return res.status(400).json({ success: false, message: 'Title and slug are required' });
    }
    const cleanSlug = slug.toLowerCase();

    if (mongoose.connection.readyState === 1) {
      const existingPage = await Page.findOne({ slug: cleanSlug });
      if (existingPage) {
        return res.status(400).json({ success: false, message: 'Page with this slug already exists' });
      }
      const page = await Page.create({
        title,
        slug: cleanSlug,
        description: description || '',
        isPublished: isPublished !== undefined ? isPublished : true,
        blocks: blocks || []
      });
      return res.status(201).json({ success: true, data: page });
    }

    const existingMem = memoryPages.find((p) => p.slug.toLowerCase() === cleanSlug);
    if (existingMem) {
      return res.status(400).json({ success: false, message: 'Page with this slug already exists' });
    }

    const newPage = {
      _id: `mem-p-${Date.now()}`,
      title,
      slug: cleanSlug,
      description: description || '',
      isPublished: isPublished !== undefined ? isPublished : true,
      blocks: blocks || []
    };
    memoryPages.unshift(newPage);
    return res.status(201).json({ success: true, data: newPage });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updatePage = async (req, res) => {
  try {
    const { title, slug, description, isPublished, blocks } = req.body;

    if (mongoose.connection.readyState === 1) {
      let page = await Page.findById(req.params.id);
      if (!page) {
        return res.status(404).json({ success: false, message: 'Page not found' });
      }
      if (slug && slug.toLowerCase() !== page.slug) {
        const existingSlug = await Page.findOne({ slug: slug.toLowerCase() });
        if (existingSlug) {
          return res.status(400).json({ success: false, message: 'Page with this slug already exists' });
        }
      }
      page.title = title !== undefined ? title : page.title;
      page.slug = slug !== undefined ? slug.toLowerCase() : page.slug;
      page.description = description !== undefined ? description : page.description;
      page.isPublished = isPublished !== undefined ? isPublished : page.isPublished;
      page.blocks = blocks !== undefined ? blocks : page.blocks;
      await page.save();
      return res.json({ success: true, data: page });
    }

    const index = memoryPages.findIndex((p) => p._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }
    if (slug && slug.toLowerCase() !== memoryPages[index].slug) {
      const existingSlug = memoryPages.find((p) => p.slug === slug.toLowerCase() && p._id !== req.params.id);
      if (existingSlug) {
        return res.status(400).json({ success: false, message: 'Page with this slug already exists' });
      }
    }
    memoryPages[index] = {
      ...memoryPages[index],
      title: title !== undefined ? title : memoryPages[index].title,
      slug: slug !== undefined ? slug.toLowerCase() : memoryPages[index].slug,
      description: description !== undefined ? description : memoryPages[index].description,
      isPublished: isPublished !== undefined ? isPublished : memoryPages[index].isPublished,
      blocks: blocks !== undefined ? blocks : memoryPages[index].blocks
    };
    return res.json({ success: true, data: memoryPages[index] });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deletePage = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const page = await Page.findById(req.params.id);
      if (!page) {
        return res.status(404).json({ success: false, message: 'Page not found' });
      }
      await page.deleteOne();
      return res.json({ success: true, message: 'Page deleted successfully' });
    }

    const index = memoryPages.findIndex((p) => p._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }
    memoryPages.splice(index, 1);
    return res.json({ success: true, message: 'Page deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPages,
  getPageBySlug,
  getPageById,
  createPage,
  updatePage,
  deletePage
};
