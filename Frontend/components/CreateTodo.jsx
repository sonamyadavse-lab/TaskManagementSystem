import React, { useState } from 'react'
import * as yup from  "yup"
import {useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import swal from "sweetalert2"
const CreateTodo = () => {
  const [loading,setLoading]=useState(false)
  const nav=useNavigate()
  const registerValidation=yup
  .object()
  .shape({
   
    name:yup.string().required().min(6),
    status:yup.string().required().min(4).max(27),
    document:yup.mixed().required()


  })
  const {register,setValue,formState:{errors},handleSubmit,reset} =useForm({
    resolver:yupResolver(registerValidation)
  })
  const handleRegister = async (data) => {

  if (!data.document || data.document.length === 0) {
    swal.fire({
      title: "File Required",
      text: "Please choose a file before submitting.",
      icon: "warning"
    });
    return;
  }

  setLoading(true);

  const token = JSON.parse(localStorage.getItem("token"));

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("status", data.status);
  formData.append("document", data.document[0]);

  const res = await axios.post(
    "http://localhost:8000/api/create-todo",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`
        // ❌ Content-Type manually mat lagao
      }
    }
  );

  if (res?.data?.success === true) {
    swal.fire({
      title: "Create Todo",
      text: res?.data?.message,
      icon: "success"
    });
    nav("/view");
  } else {
    swal.fire({
      title: "Create Todo",
      text: res?.data?.message,
      icon: "error"
    });
  }

  setLoading(false);
};return (
   <>
  {loading && <p className="text-center mt-3">...loading</p>}

  <div className="container py-5">
    <div className="row shadow-lg rounded-4 overflow-hidden">

      {/* Left Side Image */}
      <div className="col-md-6 d-none d-md-block p-0">
        <img
          src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b"
          alt="todo"
          className="img-fluid h-100 w-100"
          style={{ objectFit: "cover", minHeight: "500px" }}
        />
      </div>

      {/* Right Side Form */}
      <div className="col-md-6 bg-white p-5">
        <h2 className="text-center mb-4 fw-bold text-primary">
          Create New Task
        </h2>

        <form onSubmit={handleSubmit(handleRegister)}>
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
              value="Create Task"
              className="form-control btn btn-primary rounded-3 mt-2"
            />
          </div>
        </form>

        <p className="text-center mt-4">
          Want to go back?{" "}
          <Link to="/" className="text-decoration-none fw-semibold">
            Dashboard
          </Link>
        </p>
      </div>

    </div>
  </div>
</>
  )
}

export default CreateTodo;