import { Router } from "express";
import userController from '../controllers/user.controller.js'
import validation from '../middlewares/validation.js'

const router = Router()

router.post('/login', validation, userController.LOGIN)
router.post("/register", validation, userController.REGISTER);
router.get('/users', userController.GET)
router.get('/checktoken', validation, userController.TOKEN)



export default router