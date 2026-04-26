import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"

const View = () => {
    const [data,setData]=useState([])
    const nav=useNavigate()
    useEffect(()=>{
        fetchData()
    },[])
    const fetchData=async()=>{
        const token=JSON.parse(localStorage.getItem("token"))
        const res=await axios.get("http://localhost:8000/api/get-todo",{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        if(res?.data?.success==true){
          setData(res?.data?.data)
        }
        // console.log(res,"lll")
        
    }
    console.log(data,"&&&&&&&&&&&&&")


    const handleDelete=async(_id)=>{
         const token=JSON.parse(localStorage.getItem("token"))
       const res=await axios.delete(`http://localhost:8000/api/del-todo/${_id}`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
       if(res?.data?.success){
        Swal.fire({
         title:"delete todo",
         text:res?.data?.message,
         icon:"success"
        })
        fetchData()
       }
       else{
        Swal.fire({
         title:"delete todo",
         text:res?.data?.message,
         icon:"error"
        })
       }
  
    }

    const handleEdit=(item)=>{
          nav("/edit",{state:item})
    }
  return (
   <>
  <div className="container py-5">
    <div className="card shadow-lg border-0 rounded-4 p-4">

      <h3 className="mb-4 fw-bold text-primary">My Tasks</h3>

      <div className="table-responsive">
        <table className="table align-middle table-hover">

          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Task Name</th>
              <th>Status</th>
              <th>Document</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1}</td>

                <td className="fw-semibold">{item?.name}</td>

                <td>
                  <span className={`badge 
                    ${item?.status === "Completed" ? "bg-success" :
                      item?.status === "Pending" ? "bg-warning text-dark" :
                      "bg-secondary"}`}>
                    {item?.status}
                  </span>
                </td>

                <td>
                  {item?.document ? (
                    <img
                      src={`http://localhost:8000/uploads/${item?.document}`}
                      alt="document"
                      style={{
                        height: "60px",
                        width: "60px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        border: "2px solid #eee"
                      }}
                    />
                  ) : (
                    <span className="text-muted">No File</span>
                  )}
                </td>

                <td>
                  <button
                    className="btn btn-outline-warning btn-sm me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(item?._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {data?.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  No Records Found
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  </div>
</>
  )
}

export default View