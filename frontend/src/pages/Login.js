import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import { handleerror } from '../toastmessage'
import { ToastContainer } from 'react-toastify'
import axios from 'axios'
const Login = () => {
    const navigate=useNavigate()
 
    const[logininfo,setlogininfo]=useState({
        email:'',password:''
    })
    
    const handlechange=(e)=>{
        const{name,value}=e.target
        setlogininfo((logininfo)=>({...logininfo,[name]:value}))
    }

    const handlesubmit= async (e)=>{
        e.preventDefault();

        const{email,password}=logininfo;
        if(!email||!password)
        {
            handleerror("All feilds are required")
        }
        else
        {
           try {
            const response= await axios.post('http://localhost:3000/login',{
                email,password});
                if(response.data.token)
                {
                    const token=response.data.token
                    localStorage.setItem('token',token)
                    localStorage.setItem('message',response.data.message)
                    setTimeout(() => {
                          navigate('/Home')
                    }, 1000);
                    
                }
                else
                {
                    handleerror(response.data.message)
                    setTimeout(() => {
                        navigate('/signup')
                    }, 1000);
                }
           } catch (error) {
            if(error.response)
            {
                if(error.response.data.errors)
                {
                    const message=error.response.data.errors.map(err=>err.msg).join(', ')
                    handleerror(message)
                }
                else
                {
                    handleerror(error.response.data.message||'login failed')
                }
            }
            else
            {
                handleerror("unexpected error occured")
            }
           } 
        }
    }

    return (
        <div className='mainbox'>
          <form onSubmit={handlesubmit}>
          <h1>Login</h1>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder='Enter your Email' name='email' onChange={handlechange} value={logininfo.email} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="text" placeholder='Enter your Password' name='password' onChange={handlechange} value={logininfo.password}/>
            </div>
            <button type='submit'>Login</button>
            <p>Do not have a account <Link to={'/signup'} >Login</Link></p>
          </form>
          <ToastContainer/>
          </div>
      )
}

export default Login
