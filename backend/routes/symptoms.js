const express = require('express');
const router = express.Router();
const Symptom = require('../models/Symptom');
const { protect } = require('../middleware/auth');

// @route   GET /api/symptoms
// @desc    Get all symptoms or filter by month/week
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { month, week, category, search } = req.query;
    
    let query = {};
    
    if (month) query.month = parseInt(month);
    if (week) query.week = parseInt(week);
    if (category) query.category = category;
    
    if (search) {
      query.$text = { $search: search };
    }
    
    const symptoms = await Symptom.find(query).sort({ month: 1, week: 1 });
    
    res.status(200).json({
      success: true,
      count: symptoms.length,
      data: symptoms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching symptoms'
    });
  }
});

// @route   GET /api/symptoms/:id
// @desc    Get single symptom
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const symptom = await Symptom.findById(req.params.id);
    
    if (!symptom) {
      return res.status(404).json({
        success: false,
        error: 'Symptom not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: symptom
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching symptom'
    });
  }
});

// @route   POST /api/symptoms/check
// @desc    Check if a symptom is normal
// @access  Private
router.post('/check', protect, async (req, res) => {
  try {
    const { symptomName, month, week } = req.body;
    
    const symptoms = await Symptom.find({
      $or: [
        { symptomName: new RegExp(symptomName, 'i') },
        { searchTags: new RegExp(symptomName, 'i') }
      ],
      month: month || { $exists: true }
    });
    
    res.status(200).json({
      success: true,
      count: symptoms.length,
      data: symptoms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error checking symptom'
    });
  }
});

module.exports = router;
