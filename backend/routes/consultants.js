const express = require('express');
const router = express.Router();
const Consultant = require('../models/Consultant');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @route   GET /api/consultants
// @desc    Get all verified consultants
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { specialization, minRating, search, page = 1, limit = 10 } = req.query;
    
    let query = { verificationStatus: 'verified' };
    
    if (specialization) {
      query.specialization = specialization;
    }
    
    if (minRating) {
      query['rating.average'] = { $gte: parseFloat(minRating) };
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const consultants = await Consultant.find(query)
      .populate('userId', 'email profile')
      .sort({ 'rating.average': -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Consultant.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: consultants.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: consultants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching consultants'
    });
  }
});

// @route   GET /api/consultants/:id
// @desc    Get single consultant
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const consultant = await Consultant.findById(req.params.id)
      .populate('userId', 'email profile');
    
    if (!consultant) {
      return res.status(404).json({
        success: false,
        error: 'Consultant not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: consultant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching consultant'
    });
  }
});

// @route   POST /api/consultants/register
// @desc    Register as a consultant
// @access  Private
router.post('/register', protect, async (req, res) => {
  try {
    const {
      specialization,
      qualifications,
      certifications,
      experience,
      bio,
      languages,
      consultationRate
    } = req.body;
    
    // Check if user is already a consultant
    const existingConsultant = await Consultant.findOne({ userId: req.user.id });
    if (existingConsultant) {
      return res.status(400).json({
        success: false,
        error: 'You are already registered as a consultant'
      });
    }
    
    const consultant = await Consultant.create({
      userId: req.user.id,
      specialization,
      qualifications,
      certifications,
      experience,
      bio,
      languages,
      consultationRate
    });
    
    // Update user role
    await User.findByIdAndUpdate(req.user.id, { role: 'consultant' });
    
    res.status(201).json({
      success: true,
      data: consultant
    });
  } catch (error) {
    console.error('Consultant registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Error registering as consultant'
    });
  }
});

// @route   PUT /api/consultants/:id
// @desc    Update consultant profile
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let consultant = await Consultant.findById(req.params.id);
    
    if (!consultant) {
      return res.status(404).json({
        success: false,
        error: 'Consultant not found'
      });
    }
    
    // Make sure user owns consultant profile
    if (consultant.userId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this profile'
      });
    }
    
    consultant = await Consultant.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('userId', 'email profile');
    
    res.status(200).json({
      success: true,
      data: consultant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error updating consultant profile'
    });
  }
});

module.exports = router;
