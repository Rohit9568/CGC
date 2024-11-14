const mongoose = require('mongoose');

const faqDetailSchema = new mongoose.Schema({
  class_name: {
    type: String,
    default: '', // Optional field, default to an empty string
  },
  lock: {
    type: Boolean,
    required: [true, 'Lock status is required.'],
  },
  title: {
    type: String,
    required: [true, 'Title is required.'],
  },
  duration: {
    type: String,
    required: [true, 'Duration is required.'],
  },
});

// Main `faqSchema` for the FAQ module
const faqSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'ID is required.'],
    unique: true, // ID should be unique
  },
  title: {
    type: String,
    required: [true, 'Title is required.'],
    trim: true,
  },
  show: {
    type: String,
    default: null, // Optional field, can be null
  },
  collapsed: {
    type: String,
    default: null, // Optional field, can be null
  },
  count: {
    type: String,
    required: [true, 'Count is required.'],
  },
  faq_details: {
    type: [faqDetailSchema], // Array of FAQ details
    default: [], // Default to an empty array
  },
});

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content_type: { 
    type: String,
    enum: ['description', 'learning', 'list'],
    required: true
  }, // To categorize the type of content (description, learning outcomes, or list)
  description: { type: String, default: '' }, // To hold content like course descriptions and learning outcomes
  list: [{ type: String }], // List of things learned or other list items
});

// Navigation Item Schema
const navItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Navigation item title is required.'],
  },
  link: {
    type: String,
    required: [true, 'Navigation item link is required.'],
  },
});

// Main Module Schema with `faq` encapsulating all FAQ details
const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required.'],
    trim: true,
  },
  videoUrl: {
    type: String,
    required: [true, 'Video URL is required.'],
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)/.test(v); // Validate that videoUrl is a valid URL
      },
      message: 'Please provide a valid video URL.',
    },
  },
  faq: {
    type: [faqSchema], // Array of FAQ modules with details
    default: [], // Default to an empty array
  },
  nav: {
    type: [navItemSchema], // Array of navigation items
    default: [], // Default to an empty array
  },
  content: {
    type: [contentSchema], // Array of content items
    default: [], // Default to an empty array
  },
  uniqueCode: {
    type: String,
    unique: true,
    default: function () {
      return generateRandomCode(6); // Generate a unique random code
    },
  },
});

// Function to generate a random alphanumeric code
function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

// Middleware to generate or update uniqueCode before saving
moduleSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('title')) {
    let uniqueCode = generateRandomCode(6);
    while (await mongoose.model('Module').exists({ uniqueCode })) {
      uniqueCode = generateRandomCode(6);
    }
    this.uniqueCode = uniqueCode;
  }
  next();
});

const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;
