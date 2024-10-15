import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'

const ProtectedRoute = ({element})=>{
  const token=localStorage.getItem('token');
  return token ? element : <Navigate to='/login'/>;

}

const App = () => {
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate to='/login'/>} />
         <Route path='/login' element={<Login/>} />
         <Route path='/signup' element={<Signup/>} />
         <Route path='/home' element={<ProtectedRoute element={<Home/>}/>}/>
         <Route path='*' element={<Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
