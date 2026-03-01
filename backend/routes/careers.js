const express = require('express');
const router = express.Router();
const Career = require('../models/Career');

// @route   GET /api/careers
// @desc    Get all career opportunities
// @access  Public
router.get('/', async (req, res) => {
  try {
    const careers = await Career.find({ isActive: true }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: careers.length,
      data: careers,
      message: careers.length === 0 ? 'No vacancies available at this time. Please check back later!' : null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching career opportunities'
    });
  }
});

// @route   GET /api/careers/:id
// @desc    Get single career opportunity
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    
    if (!career) {
      return res.status(404).json({
        success: false,
        error: 'Career opportunity not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: career
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching career opportunity'
    });
  }
});

module.exports = router;
