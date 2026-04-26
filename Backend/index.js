import express from "express"
import dbConnect from "./dbConnect/db.js"
import router from "./router/router.js"
import cors from "cors"
import expressFileupload from 'express-fileupload'
const app=express()
const PORT=8000
app.use(cors())
app.use(express.json())
app.use(expressFileupload())
app.use("/uploads",express.static("uploads"))
dbConnect()
app.use("/api",router)

app.listen(PORT,()=>{
   console.log(`server is running on ${PORT}`);
})
