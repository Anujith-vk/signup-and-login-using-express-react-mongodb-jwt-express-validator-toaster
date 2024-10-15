import { toast } from "react-toastify";
import {FaExclamationTriangle} from 'react-icons/fa'

export const handlesuccess=(msg)=>{
    toast.success(msg,{
     style:{
        backgroundColor:"green",
        color:"white",
         textAlign:'center'
     }  ,
     position:'top-right',
     autoClose: 800,
    
    })
}

export const handleerror=(msg)=>{
    toast.error(msg,{
     style:{
        backgroundColor:"red",
        color:"white",
         textAlign:'center',
     }  ,
     position:'top-right',
     autoClose: 800,
     icon:<FaExclamationTriangle style={{color:'white'}}/>
    
    })
}