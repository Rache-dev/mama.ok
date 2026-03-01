const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  department: String,
  location: String,
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Remote'],
    default: 'Full-time'
  },
  description: String,
  requirements: [String],
  isActive: {
    type: Boolean,
    default: false // Set to false as per requirement "no vacancies"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Career', careerSchema);
