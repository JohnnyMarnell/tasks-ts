import { Router } from 'express';
import { getTasks, getTaskById, createTask, deleteTask, updateTask } from '../controllers/index.controllers';

const router = Router();

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', createTask);
router.put('/tasks/:id', deleteTask);
router.delete('/tasks/:id', updateTask);

export default router;