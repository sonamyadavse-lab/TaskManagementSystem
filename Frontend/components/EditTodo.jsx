import React, { useEffect, useState } from 'react'
import * as yup from  "yup"
import {useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import {Link, useLocation, useNavigate} from "react-router-dom"
import axios from "axios"
import swal from "sweetalert2"
const EditTodo = () => {
   const [loading,setLoading]=useState(false)
  const nav=useNavigate()
 
const location = useLocation()

const { name, status, document, _id } = location.state || {}
useEffect(()=>{
    setValue("name",name)
    setValue("status",status)
},[])
  console.log(name,status)
  const registerValidation=yup
  .object() 
  .shape({
   
    name:yup.string().required().min(6),
    status:yup.string().required().min(4).max(27),
   document: yup.mixed().notRequired()
    

  })
  const {register,setValue,formState:{errors},handleSubmit,reset} =useForm({
    resolver:yupResolver(registerValidation)
  })
//   const handleEdit=async(data)=>{
//     // setLoading(true)
//     const token=JSON.parse(localStorage.getItem("token"))
//       const res=await axios.put(`http://localhost:8000/api/update-todo/${_id}`,data,{
//             headers:{
//            'Authorization':`Bearer ${token}`
//         }
//       })
//       console.log(res,"ooooooooooooo")
//       if(res?.data?.success==true){
//         swal.fire({
//             title:"update todo",
//             text:res?.data?.message,
//             icon:'success'
//         })
//         nav("/view")
//       }
//       else{
//          swal.fire({
//             title:"create todo",
//             text:res?.data?.message,
//             icon:'error'
//         })
//       }
// //   setLoading(false)
//   }
//  const handleEdit = async (data) => {

//   if (!data.document || data.document.length === 0) {
//     swal.fire({
//       title: "File Required",
//       text: "Please choose a file before submitting.",
//       icon: "warning"
//     });
//     return;
//   }

//   setLoading(true);

//   const token = JSON.parse(localStorage.getItem("token"));

//   const formData = new FormData();
//   formData.append("name", data.name);
//   formData.append("status", data.status);
//   formData.append("document", data.document[0]);

//   const res=await axios.put(`http://localhost:8000/api/update-todo/${_id}`,formData,{
    
//       headers: {
//         Authorization: `Bearer ${token}`
//         // ❌ Content-Type manually mat lagao
//       }
//     }
//   );

//   if (res?.data?.success === true) {
//     swal.fire({
//       title: "Create Todo",
//       text: res?.data?.message,
//       icon: "success"
//     });
//     nav("/view");
//   } else {
//     swal.fire({
//       title: "Create Todo",
//       text: res?.data?.message,
//       icon: "error"
//     });
//   }

//   setLoading(false);
// };

const handleEdit = async (data) => {

  setLoading(true);

  const token = JSON.parse(localStorage.getItem("token"));

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("status", data.status);

  // 👇 file sirf tab append karo jab user new file select kare
  if (data.document && data.document.length > 0) {
    formData.append("document", data.document[0]);
  }

  const res = await axios.put(
    `http://localhost:8000/api/update-todo/${_id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (res?.data?.success === true) {
    swal.fire({
      title: "Updated",
      text: res?.data?.message,
      icon: "success"
    });
    nav("/view");
  } else {
    swal.fire({
      title: "Update Failed",
      text: res?.data?.message,
      icon: "error"
    });
  }

  setLoading(false);
};
  return (
   <>
  <div className="container py-5">
    <div className="row shadow-lg rounded-4 overflow-hidden">

      {/* Left Side Image */}
      <div className="col-md-6 d-none d-md-block p-0">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
          alt="edit-task"
          className="img-fluid h-100 w-100"
          style={{ objectFit: "cover", minHeight: "500px" }}
        />
      </div>

      {/* Right Side Form */}
      <div className="col-md-6 bg-white p-5">
        <h2 className="text-center mb-4 fw-bold text-primary">
          Edit Task
        </h2>

        <form onSubmit={handleSubmit(handleEdit)}>
          <div className="card p-4 border-0 shadow-sm rounded-4">

            <input
              type="text"
              placeholder="Task Name"
              className="form-control mb-3 rounded-3"
              {...register("name")}
            />
            {errors?.name && (
              <p className="text-danger">{errors?.name?.message}</p>
            )}

            <input
              type="text"
              placeholder="Task Status"
              className="form-control mb-3 rounded-3"
              {...register("status")}
            />
            {errors?.status && (
              <p className="text-danger">{errors?.status?.message}</p>
            )}

            <input
              type="file"
              className="form-control mb-3 rounded-3"
              {...register("document")}
            />

            <input
              type="submit"
              value="Update Task"
              className="form-control btn btn-primary rounded-3 mt-2"
            />
          </div>
        </form>

        <p className="text-center mt-4">
          Back to Dashboard?{" "}
          <Link to="/" className="text-decoration-none fw-semibold">
            Go Back
          </Link>
        </p>
      </div>

    </div>
  </div>
</>
  )
}

export default EditTodo;