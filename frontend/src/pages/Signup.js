import React, { useState } from 'react'
import {  Link } from 'react-router-dom'
import axios from 'axios';
import '../App.css'
import { ToastContainer } from 'react-toastify'
import { handleerror, handlesuccess } from '../toastmessage'
const Signup = () => {

  const[signinfo,setsigninfo]=useState({
    name:'',
    email:'',
    password:''
  })

  const handlechange=(e)=>{
    const{name,value}=e.target;
    setsigninfo((signinfo)=>({...signinfo,[name]:value}))
  }

  const handlesubmit=async (e)=>{
    e.preventDefault();
    const{name,email,password}=signinfo
    if(!name||!email||!password)
    {
      handleerror("All the feilds are required")
    }
    else{
      try {
        const response= await axios.post('http://localhost:3000',{
          name,email,password
        });
        if(response)
        {
          handlesuccess(response.data.message)
        }
      } catch (error) {
        if(error.response)
        {
          if(error.response.data.errors)
          {
            const message=error.response.data.errors.map(err=>err.msg).join(', ')
            handleerror(message)
          }
          else{
            handleerror(error.response.data.message || "Registration failed");
          }
        }
        else{
          handleerror("An unexpected error occurred");
        }
      }
    }
  }

  return (
    <div className='mainbox'>
      <form onSubmit={handlesubmit} >
      <h1>Register</h1>
        <div>
            <label htmlFor="name">Name</label>
            <input onChange={handlechange} type="text" placeholder='Enter your name' name='name'  value={signinfo.name} />
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input onChange={handlechange} type="email" placeholder='Enter your Email' name='email' value={signinfo.email} />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input onChange={handlechange} type="text" placeholder='Enter your Password' name='password' value={signinfo.password} />
        </div>
        <button type='submit'>Register</button>
        <p>Already have a account <Link to={'/login'} >Login</Link></p>
      </form>
      <ToastContainer />
      </div>
  )
}

export default Signup
