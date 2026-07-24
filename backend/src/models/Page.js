const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['header', 'paragraph', 'list', 'table', 'equation', 'quote', 'callout'],
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  order: {
    type: Number,
    required: true,
    default: 0
  }
});

const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    blocks: [blockSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Page', pageSchema);
