import {Router} from "express"
import { signup, login, logout, deleteUser } from "../controllers/usercontrollers.js";
import { protect } from "../middleware/authmiddleware.js";


const authRouter = Router()

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.post("/logout",logout)
authRouter.delete("/delete", protect, deleteUser)

export default authRouter