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
      type: String,
    required: true,
    },
  ],
});

const CareerPath = mongoose.model('CareerPath', careerPathSchema);

module.exports = CareerPath;
