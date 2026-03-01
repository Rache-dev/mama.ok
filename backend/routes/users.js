const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('selectedHospital');
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching profile'
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error updating profile'
    });
  }
});

// @route   PUT /api/users/pregnancy-info
// @desc    Update pregnancy information
// @access  Private
router.put('/pregnancy-info', protect, async (req, res) => {
  try {
    const { pregnancyInfo } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { pregnancyInfo } },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error updating pregnancy information'
    });
  }
});

// @route   PUT /api/users/location
// @desc    Update user location
// @access  Private
router.put('/location', protect, async (req, res) => {
  try {
    const { location } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { location } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error updating location'
    });
  }
});

// @route   PUT /api/users/hospital
// @desc    Select hospital
// @access  Private
router.put('/hospital', protect, async (req, res) => {
  try {
    const { hospitalId } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { selectedHospital: hospitalId } },
      { new: true }
    ).populate('selectedHospital');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error selecting hospital'
    });
  }
});

module.exports = router;
