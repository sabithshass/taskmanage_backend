import { handleError } from '../Middleware/errorMiddleware.js';
import Task from '../models/Task.js';


export const createTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    
    if (!title) {
      return { message: "Title is required",code:400 };
    }
    
    const newTask = new Task({ 
      title, 
      description, 
      completed: completed || false 
    });
    
    await newTask.save();
    return{data:newTask,message:"Task created successfully"}
  } catch (error) {
    return handleError(error)
  }
};


export const getTasks = async (req, res) => {
    try {

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
 
      const skip = (page - 1) * limit;

      const totalTasks = await Task.countDocuments();

      const tasks = await Task.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const totalPages = Math.ceil(totalTasks / limit);

    return {data:{tasks,pagination: {
        totalTasks,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
        }}
    } catch (error) {
        return handleError(error)
    }
  };


export const updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    
    const task = await Task.findById(req.params.id);
    
    if (!task) {
        return { message: "Title is required",code:400 };
    }
    task.title = title || task.title;
    task.description = description !== undefined ? description : task.description;
    task.completed = completed !== undefined ? completed : task.completed;
    
    const updatedTask = await task.save();
    return{data:updatedTask,message:"Task updated successfully"}
  } catch (error) {
    return handleError(error)
  }
};


export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
        return { message: "task not found",code:404 };
    }
    
    await task.deleteOne();
    return{ message: "Task deleted successfully" };
  } catch (error) {
    return handleError(error)
  }
};