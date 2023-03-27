import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { DataContext } from '../../context/DataContext'
import Load from '../Loading/Load'

const Auth = ({children}) => {
    const {user ,loading} = useContext(DataContext)
    const location = useLocation();
    
      const money = loading ? <Load /> : user?  children : <Navigate to="/login" replace  state={{ from: location }} /> 

  return money
}

export default Auth