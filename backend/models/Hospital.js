const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    street: String,
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    zipCode: String
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true // [longitude, latitude]
    }
  },
  contact: {
    phone: String,
    email: String,
    website: String,
    emergencyNumber: String
  },
  facilities: [{
    type: String,
    enum: [
      'NICU',
      'Maternity Ward',
      'Labor & Delivery',
      'Emergency Room',
      'Ultrasound',
      'Pediatric Care',
      'Postpartum Care',
      'Lactation Support',
      'Birthing Center',
      'Private Rooms',
      'Operating Theater'
    ]
  }],
  specializations: [String],
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
  insurance: {
    accepted: [String]
  },
  accreditation: [String],
  numberOfBeds: Number,
  imageUrl: String,
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Geospatial index for location-based queries
hospitalSchema.index({ location: '2dsphere' });
hospitalSchema.index({ 'address.city': 1, 'address.state': 1 });

module.exports = mongoose.model('Hospital', hospitalSchema);
