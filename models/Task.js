import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minlength: [3, "Title must be at least 3 characters long"],
        maxlength: [100, "Title must not exceed 100 characters"]
      },
      description: {
        type: String,
        trim: true,
        maxlength: [500, "Description must not exceed 500 characters"]
      },
      completed: {
        type: Boolean,
        default: false
      }
    },
    { timestamps: true, versionKey: false }
  );
  
  const Task = mongoose.model('Task', taskSchema);
  export default Task;