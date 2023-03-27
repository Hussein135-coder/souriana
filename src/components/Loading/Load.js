import React from 'react'
import {ImSpinner2} from 'react-icons/im'

const Load = () => {
   const  loadingComp = (<div className=' min-h-view dark:bg-gray-900 flex justify-center items-center'>
                            <ImSpinner2 className='mx-auto text-xl text-gray-100 animate-spin' />      
                        </div>)

  return loadingComp
}

export default Load