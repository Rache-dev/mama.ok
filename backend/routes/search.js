const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Symptom = require('../models/Symptom');
const Wellness = require('../models/Wellness');
const Consultant = require('../models/Consultant');
const Hospital = require('../models/Hospital');

// @route   GET /api/search
// @desc    Global search across all resources
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { q, type, limit = 10 } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }
    
    const searchRegex = new RegExp(q, 'i');
    const results = {};
    
    // Search symptoms
    if (!type || type === 'symptoms') {
      results.symptoms = await Symptom.find({
        $or: [
          { symptomName: searchRegex },
          { description: searchRegex },
          { searchTags: searchRegex }
        ]
      }).limit(parseInt(limit));
    }
    
    // Search wellness recommendations
    if (!type || type === 'wellness') {
      results.wellness = await Wellness.find({
        $or: [
          { title: searchRegex },
          { description: searchRegex },
          { 'foods.name': searchRegex },
          { 'exercises.name': searchRegex },
          { 'books.title': searchRegex },
          { 'movies.title': searchRegex },
          { 'podcasts.name': searchRegex }
        ]
      }).limit(parseInt(limit));
    }
    
    // Search consultants
    if (!type || type === 'consultants') {
      results.consultants = await Consultant.find({
        $and: [
          { verificationStatus: 'verified' },
          {
            $or: [
              { specialization: searchRegex },
              { bio: searchRegex },
              { languages: searchRegex }
            ]
          }
        ]
      })
      .populate('userId', 'profile')
      .limit(parseInt(limit));
    }
    
    // Search hospitals
    if (!type || type === 'hospitals') {
      results.hospitals = await Hospital.find({
        $and: [
          { isActive: true },
          {
            $or: [
              { name: searchRegex },
              { 'address.city': searchRegex },
              { 'address.state': searchRegex },
              { facilities: searchRegex },
              { specializations: searchRegex }
            ]
          }
        ]
      }).limit(parseInt(limit));
    }
    
    // Calculate total results
    const totalResults = Object.values(results).reduce((sum, arr) => sum + arr.length, 0);
    
    res.status(200).json({
      success: true,
      query: q,
      totalResults,
      data: results
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      error: 'Error performing search'
    });
  }
});

// @route   GET /api/search/suggestions
// @desc    Get search suggestions
// @access  Private
router.get('/suggestions', protect, async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.length < 2) {
      return res.status(200).json({
        success: true,
        data: []
      });
    }
    
    const searchRegex = new RegExp(`^${q}`, 'i');
    const suggestions = new Set();
    
    // Get symptom suggestions
    const symptoms = await Symptom.find({
      symptomName: searchRegex
    }).limit(5).select('symptomName');
    
    symptoms.forEach(s => suggestions.add(s.symptomName));
    
    // Get consultant specialization suggestions
    const consultants = await Consultant.find({
      specialization: searchRegex,
      verificationStatus: 'verified'
    }).limit(3).select('specialization');
    
    consultants.forEach(c => {
      c.specialization.forEach(spec => {
        if (spec.toLowerCase().startsWith(q.toLowerCase())) {
          suggestions.add(spec);
        }
      });
    });
    
    res.status(200).json({
      success: true,
      data: Array.from(suggestions).slice(0, 10)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching suggestions'
    });
  }
});

module.exports = router;
