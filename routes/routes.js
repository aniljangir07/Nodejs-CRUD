import { Router } from "express";
import { createTask, deleteTask, readTask, readTasks, updateTask } from "../controllers/task_controllers.js";
const router = Router();

// Route is for add task
router.post('/add/task',createTask);

// Reading tasks
router.get('/view/tasks',readTasks);

// Route is for read a task
router.get('/read/tasks/:id',readTask);

// Route is for update task
router.put('/update/tasks/:id',updateTask);

// Route is for delete task
router.delete('/delete/tasks/:id',deleteTask);

export default router;