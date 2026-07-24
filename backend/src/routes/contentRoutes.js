const express = require('express');
const router = express.Router();
const {
  getPages,
  getPageBySlug,
  getPageById,
  createPage,
  updatePage,
  deletePage
} = require('../controllers/contentController');
const { protect } = require('../middleware/auth');

router.get('/pages', getPages);
router.get('/pages/slug/:slug', getPageBySlug);
router.get('/pages/:id', getPageById);

router.post('/pages', protect, createPage);
router.put('/pages/:id', protect, updatePage);
router.delete('/pages/:id', protect, deletePage);

module.exports = router;
