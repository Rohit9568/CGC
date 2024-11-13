const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  uniqueCode: {
    type: String,
    unique: true,
  },
});

function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

moduleSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('title') || this.isModified('category')) {
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
