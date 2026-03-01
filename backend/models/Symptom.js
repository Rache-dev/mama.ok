const mongoose = require('mongoose');

const symptomSchema = new mongoose.Schema({
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 9
  },
  week: {
    type: Number,
    required: true,
    min: 1,
    max: 42
  },
  symptomName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Physical',
      'Emotional',
      'Digestive',
      'Sleep',
      'Pain',
      'Skin',
      'Cardiovascular',
      'Other'
    ]
  },
  description: {
    type: String,
    required: true
  },
  isNormal: {
    type: Boolean,
    required: true
  },
  severity: {
    type: String,
    enum: ['mild', 'moderate', 'severe'],
    default: 'mild'
  },
  whenToWorry: {
    type: String,
    required: true
  },
  recommendations: [String],
  relatedSymptoms: [String],
  searchTags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for search and filtering
symptomSchema.index({ month: 1, week: 1 });
symptomSchema.index({ symptomName: 'text', description: 'text', searchTags: 'text' });
symptomSchema.index({ category: 1 });

module.exports = mongoose.model('Symptom', symptomSchema);
