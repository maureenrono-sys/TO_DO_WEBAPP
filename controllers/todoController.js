const Todo = require('../models/todo');

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const { name, description, dueDate, priority } = req.body;
    
    const todo = new Todo({
      name,
      description,
      dueDate,
      priority
    });

    const savedTodo = await todo.save();
    res.status(201).json({
      success: true,
      data: savedTodo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all todos with search and filter capabilities
exports.getTodos = async (req, res) => {
  try {
    const { search, filterDate, completed, sortBy } = req.query;
    
    // Build query object
    let query = {};
    
    // Search by name
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by date
    if (filterDate) {
      const startDate = new Date(filterDate);
      const endDate = new Date(filterDate);
      endDate.setDate(endDate.getDate() + 1);
      
      query.dueDate = {
        $gte: startDate,
        $lt: endDate
      };
    }
    
    // Filter by completion status
    if (completed !== undefined) {
      query.completed = completed === 'true';
    }
    
    // Build sort object
    let sort = {};
    if (sortBy) {
      const sortFields = sortBy.split(':');
      sort[sortFields[0]] = sortFields[1] === 'desc' ? -1 : 1;
    } else {
      sort.createdAt = -1; // Default sort by newest first
    }
    
    const todos = await Todo.find(query).sort(sort);
    
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get single todo by ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const { name, description, completed, dueDate, priority } = req.body;
    
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { name, description, completed, dueDate, priority },
      { new: true, runValidators: true }
    );
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};