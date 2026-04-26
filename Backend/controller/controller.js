import { userModel, todoModel } from "../model/model.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export const registerController = async (req, res) => {

    try {
        const { name, email, password } = req.body
        const isExist = await userModel.findOne({ email })
        if (isExist) {
            res.json({
                success: false,
                code: 400,
                message: "user already exist",
                data: isExist,
                error: true
            })
        }
        else {
            const hashPassword = await bcrypt.hash(password, 10)
            const data = new userModel({ name, email, password: hashPassword })
            const result = await data.save()
            res.json({
                success: true,
                code: 200,
                message: "user registered successfully",
                data: result,
                error: false
            })
        }

    } catch (err) {
        res.json({
            success: false,
            code: 500,
            message: "internal server error",
            data: [],
            error: true
        })

    }
}
export const registerLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const data = await userModel.findOne({ email: email })
        if (data) {
            const isMatch = await bcrypt.compare(password, data.password)
            if (isMatch) {
                const payload = { email: data.email }
                const token = jwt.sign(payload, "jwt_secret", { expiresIn: "1h" })
                res.json({
                    success: true,
                    code: 200,
                    message: "login succesfully",
                    error: false,
                    data: data,
                    token,

                })
            }
            else {
                res.json({
                    success: false,
                    code: 400,
                    message: "invalid credentials",
                    error: true,
                    data: []

                })

            }

        }
        else {
            res.json({
                success: false,
                code: 404,
                message: "user not found",
                error: true,
                data: []

            })

        }
    }
    catch (error) {
        res.json({
            success: false,
            code: 500,
            message: "Internal server error",
            error: true,
            data: []

        })
    }
}

// export const createTodo = async(req, res) => {
//     try {
//         const {name,status}=req.body
//         let {document}=req.files
//     document.mv("./uploads/" +document?.name,(err)=>{
//         if(err){
//             return res.send("something went wrong")
//         }
//     })
//        const isExist=await todoModel.findOne({name})
//        if(isExist){
//         res.json({
//             success: false,
//             code: 400,
//             message: "name already existed",
//             error: true,
//             data: isExist
//         })
//        }
//        else{
//          const data= new todoModel({name,status,document:file.filename})
//          const result=await data.save()
//          res.json({
//             success: true,
//             code: 200,
//             message: "ADDED",
//             error: false,
//             data: result
//          })
//        }

//     }
//     catch (error) {
//         res.json({
//             success: false,
//             code: 400,
//             message: "invalid credentials",
//             error: true,
//             data: []

//         })
//     }

// }
export const createTodo = async (req, res) => {
  try {

    const { name, status } = req.body;

    const file = req.files?.document;

    if (!file) {
      return res.json({
        success: false,
        message: "File is required"
      });
    }

    const isExist = await todoModel.findOne({ name });

    if (isExist) {
      return res.json({
        success: false,
        message: "Name already existed"
      });
    }

    const uploadPath = "./uploads/" + file.name;

    file.mv(uploadPath, async (err) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: "File upload failed"
        });
      }

      const data = new todoModel({
        name,
        status,
        document: file.name
      });

      const result = await data.save();

      res.json({
        success: true,
        message: "ADDED",
        data: result
      });

    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
export const getTodo=async(req,res)=>{
    try{
         const result=await todoModel.find()
         res.json({
            success: true,
            code: 200,
            message: "Todo -get",
            error: false,
            data: result

        })
    }catch(error){
         res.json({
            success: false,
            code: 400,
            message: "internal server error",
            error: true,
            data: []

        })

    }
}

export const updateTodo = async (req, res) => {
  try {

    const { id } = req.params;
    const { name, status } = req.body;

    let updateData = { name, status };

    // 👇 agar file aayi ho to hi update karo
    if (req.files && req.files.document) {

      const file = req.files.document;

      const uploadPath = "./uploads/" + file.name;

      await file.mv(uploadPath);

      updateData.document = file.name;
    }

    const result = await todoModel.updateOne(
      { _id: id },
      { $set: updateData }
    );

    res.json({
      success: true,
      message: "Updated successfully",
      data: result
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};



export const deleteTodo=async(req,res)=>{
   try{
 const {id}=req.params
   const result=await todoModel.deleteOne({_id:id})
   res.json({
    success:true,
    error:false,
    code:200,
    message:"DELETED",
    data:" "
   })
   }catch(error){
    res.json({
            success: false,
            code: 400,
            message: "internal server error",
            error: true,
            data: []

        })

   }

}
