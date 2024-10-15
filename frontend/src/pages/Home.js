
import { useEffect } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { handlesuccess } from '../toastmessage'
import { ToastContainer } from 'react-toastify'

const Home = () => {

useEffect(()=>{
const message=localStorage.getItem('message')
if(message){
  handlesuccess(message)
  setTimeout(() => {
    localStorage.removeItem('message')
  }, 2000);
}
},[])

const navigate=useNavigate()

 const handlelogout=(e)=>{
  localStorage.removeItem('token')
  navigate('/login')
 }
 setTimeout(() => {   
  localStorage.removeItem('token')
  navigate('/login')
 }, 300000);

  return (
    <div className='mainbox'>
      <h1>Hello there</h1>
      <button  onClick={handlelogout}>Logout</button>
      <ToastContainer/>
    </div>
  )
}

export default Home
