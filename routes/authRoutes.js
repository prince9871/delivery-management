import express from 'express';
import { registerUser, loginUser, getUsers, deleteUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);

export default router;