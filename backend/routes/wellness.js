const express = require('express');
const router = express.Router();
const Wellness = require('../models/Wellness');
const { protect } = require('../middleware/auth');

// @route   GET /api/wellness
// @desc    Get wellness recommendations
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { month, category } = req.query;
    
    let query = {};
    
    if (month) query.month = parseInt(month);
    if (category) query.category = category;
    
    const wellness = await Wellness.find(query).sort({ month: 1 });
    
    res.status(200).json({
      success: true,
      count: wellness.length,
      data: wellness
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching wellness recommendations'
    });
  }
});

// @route   GET /api/wellness/:id
// @desc    Get single wellness recommendation
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const wellness = await Wellness.findById(req.params.id);
    
    if (!wellness) {
      return res.status(404).json({
        success: false,
        error: 'Wellness recommendation not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: wellness
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching wellness recommendation'
    });
  }
});

// @route   GET /api/wellness/month/:month
// @desc    Get all wellness recommendations for a specific month
// @access  Private
router.get('/month/:month', protect, async (req, res) => {
  try {
    const month = parseInt(req.params.month);
    
    const wellness = await Wellness.find({ month }).sort({ category: 1 });
    
    res.status(200).json({
      success: true,
      count: wellness.length,
      data: wellness
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching wellness recommendations'
    });
  }
});

module.exports = router;
