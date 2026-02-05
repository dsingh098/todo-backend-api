import Todo from "../models/todomodels.js";

// for create todo
export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }
    const todo = await Todo.create({
      title: title.trim(),
      description,
      user: req.user._id,
    });

    return res.status(201).json({
      message: "Todo is added",
      todo,
    });
  } catch (error) {
  console.error("Create Todo Error:", error);

  return res.status(500).json({
    message: "Server error"
  });
}

};

// for get todo

export const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      count: todos.length,
      todos,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

//  for delete todo

export const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findOneAndDelete({
      _id: id,
      user: req.user._id
    });
    if (!todo) {
      return res.status(404).json({
        message: "Todo Not Found",
      });
    }

    return res.status(200).json({
      message: "Todo Deleted",
      todo,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Toggle Todo (done / not done)

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({
      _id: id,
      user: req.user._id
    });

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found"
      });
    }

    // Flip true <-> false
    todo.completed = !todo.completed;

    await todo.save();

    return res.status(200).json({
      message: "Todo status updated",
      todo
    });

  } catch (err) {
    console.error("Update Todo Error:", err);

    return res.status(500).json({
      message: "Server error"
    });
  }
};
