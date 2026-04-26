import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from '../components/Navbar'
import Login from '../components/Login'
import Register from '../components/Register'
import CreateTodo from '../components/CreateTodo'
import View from '../components/View'
import EditTodo from '../components/EditTodo'
const App = () => {

  return (
  <BrowserRouter>
  
 <Navbar/>
  <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/create" element={<CreateTodo/>}/>
    <Route path="/view" element={<View/>}/>
    <Route path="/edit" element={<EditTodo/>}/>
    <Route path="*" element={<>404 not found</>}/>

  </Routes>
  </BrowserRouter>
  )
}

export default App