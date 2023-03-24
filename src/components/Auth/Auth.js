import React, { useContext } from 'react'
import { ImSpinner2 } from 'react-icons/im'
import { Navigate, useLocation } from 'react-router-dom'
import { DataContext } from '../../context/DataContext'

const Auth = ({children}) => {
    const {user ,loading} = useContext(DataContext)
    const location = useLocation();
    
    const  loadingComp = (<div className=' min-h-view dark:bg-gray-900 flex justify-center items-center'>
    <ImSpinner2 className='mx-auto text-xl text-gray-100 animate-spin' />      
</div>) 
      const money = loading ? loadingComp : user?  children : <Navigate to="/login" replace  state={{ from: location }} /> 

  return money
}

export default Auth