const mongoose = require('mongoose');

const consultantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialization: {
    type: [String],
    required: true,
    enum: [
      'Obstetrician',
      'Gynecologist',
      'Midwife',
      'Nutritionist',
      'Mental Health Specialist',
      'Lactation Consultant',
      'Pediatrician',
      'Fitness Coach',
      'Doula'
    ]
  },
  qualifications: [{
    degree: String,
    institution: String,
    year: Number
  }],
  certifications: [String],
  experience: {
    years: {
      type: Number,
      required: true
    },
    description: String
  },
  bio: {
    type: String,
    required: true,
    maxlength: 1000
  },
  languages: {
    type: [String],
    default: ['English']
  },
  availability: {
    schedule: [{
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      slots: [{
        startTime: String,
        endTime: String
      }]
    }],
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  consultationRate: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  totalConsultations: {
    type: Number,
    default: 0
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  documentsUploaded: {
    type: Boolean,
    default: false
  },
  bankDetails: {
    accountHolder: String,
    accountNumber: String,
    bankName: String,
    routingNumber: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for search
consultantSchema.index({ specialization: 1, 'rating.average': -1 });
consultantSchema.index({ verificationStatus: 1 });

consultantSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Consultant', consultantSchema);
