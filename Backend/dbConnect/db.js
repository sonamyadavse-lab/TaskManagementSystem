import mongoose from "mongoose"

const dbConnect=async()=>{
 const conn=  await mongoose.connect("mongodb://localhost:27017/todo-list")
 if(conn){
    console.log("db connected !!!");
 }
}
export default dbConnect