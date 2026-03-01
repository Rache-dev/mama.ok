const express = require('express');
const router = express.Router();
const { Chat, Message } = require('../models/Chat');
const { protect } = require('../middleware/auth');

// @route   GET /api/chat
// @desc    Get all chats for a user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const chats = await Chat.find({
      'participants.userId': req.user.id
    })
    .populate('participants.userId', 'profile email')
    .populate('consultantId')
    .sort({ updatedAt: -1 });
    
    res.status(200).json({
      success: true,
      count: chats.length,
      data: chats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching chats'
    });
  }
});

// @route   POST /api/chat
// @desc    Create a new chat
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { consultantId } = req.body; // This is actually the consultant's userId
    
    // Find the consultant document by userId
    const Consultant = require('../models/Consultant');
    const consultant = await Consultant.findOne({ userId: consultantId });
    
    if (!consultant) {
      return res.status(404).json({
        success: false,
        error: 'Consultant not found'
      });
    }
    
    // Check if chat already exists
    const existingChat = await Chat.findOne({
      'participants.userId': { $all: [req.user.id, consultantId] }
    });
    
    if (existingChat) {
      return res.status(200).json({
        success: true,
        data: existingChat
      });
    }
    
    const chat = await Chat.create({
      participants: [
        { userId: req.user.id, role: 'user' },
        { userId: consultantId, role: 'consultant' }
      ],
      consultantId: consultant._id // Use the Consultant document ID
    });
    
    res.status(201).json({
      success: true,
      data: chat
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error creating chat'
    });
  }
});

// @route   GET /api/chat/:id/messages
// @desc    Get all messages for a chat
// @access  Private
router.get('/:id/messages', protect, async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const messages = await Message.find({ chatId: req.params.id })
      .populate('sender', 'profile email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Message.countDocuments({ chatId: req.params.id });
    
    res.status(200).json({
      success: true,
      count: messages.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: messages.reverse() // Return in chronological order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching messages'
    });
  }
});

// @route   POST /api/chat/:id/messages
// @desc    Send a message
// @access  Private
router.post('/:id/messages', protect, async (req, res) => {
  try {
    const { content, type = 'text', fileUrl } = req.body;
    
    const message = await Message.create({
      chatId: req.params.id,
      sender: req.user.id,
      content,
      type,
      fileUrl
    });
    
    // Update chat's last message
    await Chat.findByIdAndUpdate(req.params.id, {
      lastMessage: {
        content,
        sender: req.user.id,
        timestamp: new Date()
      },
      updatedAt: new Date()
    });
    
    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'profile email');
    
    // Emit socket event
    const io = req.app.get('io');
    io.to(req.params.id).emit('new-message', populatedMessage);
    
    res.status(201).json({
      success: true,
      data: populatedMessage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error sending message'
    });
  }
});

// @route   PUT /api/chat/:id/read
// @desc    Mark messages as read
// @access  Private
router.put('/:id/read', protect, async (req, res) => {
  try {
    await Message.updateMany(
      {
        chatId: req.params.id,
        sender: { $ne: req.user.id },
        isRead: false
      },
      {
        $set: {
          isRead: true,
          readAt: new Date()
        }
      }
    );
    
    res.status(200).json({
      success: true,
      message: 'Messages marked as read'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error marking messages as read'
    });
  }
});

module.exports = router;
