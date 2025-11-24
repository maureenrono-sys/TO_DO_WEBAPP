const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, {
  timestamps: true
});

// Index for search functionality
todoSchema.index({ name: 'text', description: 'text' });
todoSchema.index({ dueDate: 1 });
todoSchema.index({ completed: 1 });

module.exports = mongoose.model('Todo', todoSchema);