// Import necessary modules and types
import express, { Router } from 'express';
import { getTasks, getTaskById, createTask, deleteTask, updateTask } from './controllers/index.controllers';

// Create an Express application
const app = express();

// Create a Router instance for handling task-related routes
const taskRouter = Router();

// Configure middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define routes for task operations using the taskRouter
taskRouter.get('/tasks', getTasks);
taskRouter.get('/tasks/:id', getTaskById);
taskRouter.post('/tasks', createTask);
taskRouter.put('/tasks/:id', deleteTask);
taskRouter.delete('/tasks/:id', updateTask);
taskRouter.get('/ping', async (req, res) => res.json({pong: true}));


// Use the taskRouter for paths starting with '/api'
app.use(taskRouter);

// Set up the Express application to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
