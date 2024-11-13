const mongoose = require('mongoose');

const careerPathSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  modules: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
    },
  ],
});

const CareerPath = mongoose.model('CareerPath', careerPathSchema);

module.exports = CareerPath;
