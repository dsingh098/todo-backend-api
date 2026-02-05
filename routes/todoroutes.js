import { Router } from "express";
import { createTodo, deleteTodo, getTodo, updateTodo } from "../controllers/todocontrollers.js";
import { protect } from "../middleware/authmiddleware.js";



const todoRouter = Router()

todoRouter.post("/",protect,createTodo)
todoRouter.get("/",protect, getTodo)
todoRouter.patch("/:id",protect, updateTodo)
todoRouter.delete("/:id", protect,deleteTodo)

export default todoRouter