import responseMessages from "../constants/message.js";
import statusCode from "../constants/status.js";

let tasks = [];

//Controller to create new tasks
export const createTask = (req,res,next)=>{
      try{
            const { title, description, submission_date } = req.body;

            if (!title || !submission_date || submission_date === "") {
                  return res.status(statusCode.BAD_REQUEST).json(responseMessages.TASK_FIELD_VALIDATION);
            };

            const newTask = { id: tasks.length + 1, title, description, submission_date };
            tasks.push(newTask);
            newTask['message'] = responseMessages.TASK_CREATED;
            res.status(statusCode.SUCCESS).json(newTask);
      }catch(err){
            console.log(err)
            res.status(statusCode.BAD_REQUEST).json({
                  success: false,
                  message: responseMessages.TASK_NOT_ADDED,
            });
      };
};

// Controller to read all tasks
export const readTasks = (req,res,next)=>{
      try{
            res.json(tasks);
      }catch(err){
            console.log(err)
            res.status(statusCode.BAD_REQUEST).json({
                  success: false,
                  message: responseMessages.FAILED_TO_READ,
            });
      };
};

// Controller to read a specific task by ID
export const readTask = (req,res,next)=>{
      try{
            const taskId = parseInt(req.params.id);
            const task = tasks.find(task => task.id === taskId);
            if (!task) return res.status(statusCode.NOT_FOUND).json({ message: responseMessages.TASK_NOT_FOUND });
            res.json(task);
      }catch(err){
            console.log(err)
            res.status(statusCode.BAD_REQUEST).json({
                  success: false,
                  message: responseMessages.FAILED_TO_READ,
            });
      };
};

// Controller to update a specific task by ID
export const updateTask = (req, res, next) => {
      try {
            const taskId = parseInt(req.params.id);
            const { title, description, submission_date } = req.body;
            const taskIndex = tasks.findIndex(task => task.id === taskId);
            if (taskIndex === -1) return res.status(statusCode.NOT_FOUND).json({ message: responseMessages.TASK_NOT_FOUND });
            tasks[taskIndex] = { id: taskId, title, description, submission_date };
            res.json(tasks[taskIndex]);
      } catch (err) {
            console.log(err)
            res.status(statusCode.BAD_REQUEST).json({
                  success: false,
                  message: responseMessages.FAILED_TO_READ,
            });
      };
};

// Controller to delete task
export const deleteTask = (req,res,next)=>{
      try {
            const taskId = parseInt(req.params.id);
            const taskIndex = tasks.findIndex(task => task.id === taskId);
            if (taskIndex === -1) return res.status(statusCode.NOT_FOUND).json({ message: responseMessages.TASK_NOT_FOUND });
            const deletedTask = tasks.splice(taskIndex, 1);
            res.json({ message: responseMessages.TASK_DELETED, deletedTask });
      } catch (err) {
            console.log(err)
            res.status(statusCode.BAD_REQUEST).json({
                  success: false,
                  message: responseMessages.FAILED_TO_READ,
            });
      };
};