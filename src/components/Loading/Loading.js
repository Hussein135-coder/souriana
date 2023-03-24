import React, { useContext } from 'react'
import {ImSpinner2} from 'react-icons/im'
import { Navigate } from 'react-router-dom';
import { DataContext } from '../../context/DataContext'

const Loading = ({children}) => {
  const {loading, user} = useContext(DataContext)

  const  loadingComp = (<div className=' min-h-view dark:bg-gray-900 flex justify-center items-center'>
    <ImSpinner2 className='mx-auto text-xl text-gray-100 animate-spin' />      
</div>)

  const login = loading ? loadingComp : user?  <Navigate to="/money" /> : children

  return login
}

export default Loading