const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// @route   POST /api/todos
// @desc    Create a new todo
// @access  Public
router.post('/', todoController.createTodo);

// @route   GET /api/todos
// @desc    Get all todos with search and filter capabilities
// @access  Public
router.get('/', todoController.getTodos);

// @route   GET /api/todos/:id
// @desc    Get single todo by ID
// @access  Public
router.get('/:id', todoController.getTodoById);

// @route   PUT /api/todos/:id
// @desc    Update a todo
// @access  Public
router.put('/:id', todoController.updateTodo);

// @route   DELETE /api/todos/:id
// @desc    Delete a todo
// @access  Public
router.delete('/:id', todoController.deleteTodo);

module.exports = router;