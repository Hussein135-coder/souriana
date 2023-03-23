import React, { useContext } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { DataContext } from '../../context/DataContext'

const Auth = ({children}) => {
    const {user} = useContext(DataContext)
    const location = useLocation();
    
    console.log(location ,'loc');
    if(!user){
        return <Navigate to="/login" replace  state={{ from: location }}  />          
    }
  return children
}

export default Auth