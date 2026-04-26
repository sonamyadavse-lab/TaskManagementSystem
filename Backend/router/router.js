import express from "express"
import { registerController, registerLogin,createTodo ,getTodo,updateTodo,deleteTodo} from "../controller/controller.js"
import jwt, { decode } from "jsonwebtoken"
import { userModel } from "../model/model.js"
const router=express.Router()
   

const AuthMiddleware=(req,res,next)=>{
  if(!req.headers.authorization){
     return res.json({
      success:false,
      error:true,
      code:400,
      message:"token is required",
      data:" "
    })
  }
  // const {token}=req.body
  // res.send(token)
  const token=req.headers.authorization.split(" ")[1]
  jwt.verify(token,"jwt_secret",(error,decode)=>{
   if(error){
   return res.json({
      success:false,
      error:true,
      code:400,
      message:"invalid or expired token",
      data:" "
    })
   }
   else{
    req.user=decode
    next()
   }
  })
}

router.post("/register",registerController)
router.post("/login",registerLogin)


router.post("/create-todo",AuthMiddleware,createTodo)
router.get("/get-todo",AuthMiddleware,getTodo)
router.put("/update-todo/:id",AuthMiddleware,updateTodo)
router.delete("/del-todo/:id",AuthMiddleware,deleteTodo)

export default router