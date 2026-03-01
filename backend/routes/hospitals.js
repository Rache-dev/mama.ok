const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital');
const { protect } = require('../middleware/auth');

// @route   GET /api/hospitals
// @desc    Get all hospitals or filter by location
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { city, state, latitude, longitude, radius = 50, search } = req.query;
    
    let query = { isActive: true };
    
    if (city) query['address.city'] = new RegExp(city, 'i');
    if (state) query['address.state'] = new RegExp(state, 'i');
    
    // Geospatial query if coordinates provided
    if (latitude && longitude) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(radius) * 1000 // Convert km to meters
        }
      };
    }
    
    if (search) {
      query.name = new RegExp(search, 'i');
    }
    
    const hospitals = await Hospital.find(query).limit(50);
    
    res.status(200).json({
      success: true,
      count: hospitals.length,
      data: hospitals
    });
  } catch (error) {
    console.error('Hospital fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching hospitals'
    });
  }
});

// @route   GET /api/hospitals/:id
// @desc    Get single hospital
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    
    if (!hospital) {
      return res.status(404).json({
        success: false,
        error: 'Hospital not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: hospital
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching hospital'
    });
  }
});

// @route   GET /api/hospitals/nearby
// @desc    Get nearby hospitals based on user location
// @access  Private
router.post('/nearby', protect, async (req, res) => {
  try {
    const { latitude, longitude, radius = 50 } = req.body;
    
    const hospitals = await Hospital.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(radius) * 1000
        }
      },
      isActive: true
    }).limit(20);
    
    res.status(200).json({
      success: true,
      count: hospitals.length,
      data: hospitals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching nearby hospitals'
    });
  }
});

module.exports = router;
