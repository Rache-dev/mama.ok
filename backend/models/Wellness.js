const mongoose = require('mongoose');

const wellnessSchema = new mongoose.Schema({
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 9
  },
  category: {
    type: String,
    required: true,
    enum: ['food', 'exercise', 'sleep', 'books', 'movies', 'podcasts', 'general']
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  recommendations: {
    type: mongoose.Schema.Types.Mixed
  },
  foods: [{
    name: String,
    benefits: String,
    servingSize: String,
    nutrients: [String],
    imageUrl: String
  }],
  exercises: [{
    name: String,
    description: String,
    duration: String,
    intensity: String,
    benefits: String,
    precautions: String,
    videoUrl: String,
    imageUrl: String
  }],
  sleepTips: [{
    tip: String,
    description: String,
    benefit: String
  }],
  books: [{
    title: String,
    author: String,
    description: String,
    coverUrl: String,
    amazonLink: String
  }],
  movies: [{
    title: String,
    year: Number,
    description: String,
    genre: String,
    posterUrl: String,
    streamingPlatform: String
  }],
  podcasts: [{
    name: String,
    host: String,
    description: String,
    episodeRecommendation: String,
    platform: String,
    imageUrl: String
  }],
  tips: [String],
  precautions: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes
wellnessSchema.index({ month: 1, category: 1 });

wellnessSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Wellness', wellnessSchema);
