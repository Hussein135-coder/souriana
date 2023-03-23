import React, { useContext } from 'react'
import {ImSpinner2} from 'react-icons/im'
import { DataContext } from '../../context/DataContext'
const Load = () => {
  const {user , loading} = useContext(DataContext)

  if(user){

  }
   const  loadingComp = (<div className=' min-h-view dark:bg-gray-900 flex justify-center items-center'>
    <ImSpinner2 className='mx-auto text-xl text-gray-100 animate-spin' />      
</div>)

  return loadingComp
}

export default Load