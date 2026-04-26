import React, { useState } from 'react'
import * as yup from  "yup"
import {useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import swal from "sweetalert2"
const Login = () => {
  const [loading,setLoading]=useState(false)
  const nav=useNavigate()
  const registerValidation=yup
  .object()
  .shape({
   
    email:yup.string().required().min(6),
    password:yup.string().required().min(4).max(27)


  })
  const {register,setValue,formState:{errors},handleSubmit,reset} =useForm({
    resolver:yupResolver(registerValidation)
  })
  const handleLogin=async(data)=>{
    setLoading(true)
  const res=await axios.post("http://localhost:8000/api/login",data)
  // console.log(res)
  if(res?.data?.success==true){
  swal.fire({
    title:"Login",
    text:res?.data?.message,
    icon:"success"
  })
  nav("/create")
  localStorage.setItem("token",JSON.stringify(res?.data?.token))
  
  }else{
 swal.fire({
    title:"Login",
    text:res?.data?.message,
    icon:"error"
  })
  }
  setLoading(false)
  }
  return (
    <>
    <>
  {loading && <p className="text-center mt-3">...loading</p>}

  <div className="container py-5">
    <div className="row shadow-lg rounded-4 overflow-hidden">

      {/* Left Side Image */}
      <div className="col-md-6 d-none d-md-block p-0">
        <img
          src="/login.avif"
          alt="login"
          className="img-fluid h-100 w-100"
          style={{ objectFit: "cover", minHeight: "500px" }}
        />
      </div>

      {/* Right Side Form */}
      <div className="col-md-6 bg-white p-5">
        <h2 className="text-center mb-4 fw-bold text-success">
          Login Form
        </h2>

        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="card p-4 border-0 shadow-sm rounded-4">

            <input
              type="text"
              placeholder="Email"
              className="form-control mb-3 rounded-3"
              {...register("email")}
            />
            {errors?.email && (
              <p className="text-danger">{errors?.email?.message}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              className="form-control mb-3 rounded-3"
              {...register("password")}
            />
            {errors?.password && (
              <p className="text-danger">{errors?.password?.message}</p>
            )}

            <input
              type="submit"
              value="Login"
              className="form-control btn btn-success rounded-3 mt-2"
            />
          </div>
        </form>

        <p className="text-center mt-4">
          Not have an account?{" "}
          <Link to="/register" className="text-decoration-none fw-semibold">
            Register here
          </Link>
        </p>
      </div>

    </div>
  </div>
</>
    </>
  )
}

export default Login;