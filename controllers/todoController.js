const fs = require('fs');
const path = require('path');

const todoFilePath = "D:\\Downloads\\todo\\todos.json"; 



// Get all todos
exports.getTodos = (req, res) => {
  fs.readFile(todoFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    const todos = JSON.parse(data);
    res.json(todos);
  });
};

// Create a new todo
exports.createTodo = (req, res) => {
  fs.readFile(todoFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    const todos = JSON.parse(data);
    const newTodo = { id: Date.now(), title: req.body.title, completed: false };
    todos.push(newTodo);

    fs.writeFile(todoFilePath, JSON.stringify(todos), 'utf-8', (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(201).json(newTodo);
    });
  });
};

// Update a todo
exports.updateTodo = (req, res) => {
  fs.readFile(todoFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    let todos = JSON.parse(data);
    const todo = todos.find(t => t.id == req.params.id);

    if (todo) {
      todo.completed = req.body.completed;

      fs.writeFile(todoFilePath, JSON.stringify(todos), 'utf-8', (err) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        res.json(todo);
      });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  });
};

// Delete a todo
exports.deleteTodo = (req, res) => {
  fs.readFile(todoFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    let todos = JSON.parse(data);
    todos = todos.filter(t => t.id != req.params.id);

    fs.writeFile(todoFilePath, JSON.stringify(todos), 'utf-8', (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ message: "Todo deleted successfully" });
    });
  });
};
