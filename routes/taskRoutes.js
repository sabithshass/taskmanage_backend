import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controller/taskController.js";
import sendResponse from "../Middleware/response.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  const data = await createTask(req, res);
  sendResponse(res, data);
});

router.get("/", async (req, res, next) => {
  const data = await getTasks(req, res);
  sendResponse(res, data);
});

router.put("/:id", async (req, res, next) => {
  const data = await updateTask(req, res);
  sendResponse(res, data);
});

router.delete("/:id", async (req, res, next) => {
  const data = await deleteTask(req, res);
  sendResponse(res, data);
});

export default router;
