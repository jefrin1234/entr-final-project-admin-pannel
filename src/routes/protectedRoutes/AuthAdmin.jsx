import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { setAdminDetails } from "../../slices/adminSlice";



export const AuthAdmin = ({ children }) => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoggedin,setIsLoggedIn] = useState(false)

    const checkAdmin = async()=>{
   
        try {
    
          const response = await axiosInstance({
            method:'POST',
            url:'/admin/check-admin'
          })
    
         
          setIsLoggedIn(true)
          dispatch(setAdminDetails({loggedIn:true,admin:response.data.data}))
        
        } catch (error) {
          
          navigate('/login')
        }
      } 
    
      useEffect(()=>{
        checkAdmin()
      },[])




    return isLoggedin ? children : null;
};
