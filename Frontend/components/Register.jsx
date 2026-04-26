import React, { useState } from 'react'
import * as yup from  "yup"
import {useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import Swal from 'sweetalert2'

const Register = () => {
  const [loading,setLoading]=useState(false)
  const nav=useNavigate()
  const registerValidation=yup
  .object()
  .shape({
    name:yup.string().required().min(2),
    email:yup.string().required().min(6),
    password:yup.string().required().min(4).max(27)


  })
  const {register,setValue,formState:{errors},handleSubmit,reset} =useForm({
    resolver:yupResolver(registerValidation)
  })
  const handleRegister=async(data)=>{
    setLoading(true)
    const res=await axios.post("http://localhost:8000/api/register",data)
    // console.log(res)
    if(res?.data?.success==true){
           Swal.fire({
            title:"register",
            text:res?.data?.message,
            icon:"success"
           })
           reset()
           nav("/")
    }else{
           Swal.fire({
            title:"register",
            text:res?.data?.message,
            icon:"error"
           })
    }
    setLoading(false)
  }
  return (
    <>
  {loading && <p className="text-center mt-3">...loading</p>}

  <div className="container py-5">
    <div className="row shadow-lg rounded-4 overflow-hidden">

      {/* Left Side Image */}
      <div className="col-md-6 d-none d-md-block p-0">
        <img 
          src="/reg.avif"
          alt="register"
          className="img-fluid h-100 w-100"
          style={{ objectFit: "cover", minHeight: "500px" }}
        />
      </div>

      {/* Right Side Form */}
      <div className="col-md-6 bg-white p-5">
        <h2 className="text-center mb-4 fw-bold text-primary">
          Registration Form
        </h2>

        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="card p-4 border-0 shadow-sm rounded-4">

            <input
              type="text"
              placeholder="Name"
              className="form-control mb-3 rounded-3"
              {...register("name")}
            />
            {errors?.name && (
              <p className="text-danger">{errors?.name?.message}</p>
            )}

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
              value="Register"
              className="form-control btn btn-primary rounded-3 mt-2"
            />
          </div>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-decoration-none fw-semibold">
            Login here
          </Link>
        </p>
      </div>

    </div>
  </div>
</>
  )
}

export default Register;