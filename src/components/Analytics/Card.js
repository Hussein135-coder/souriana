import React, { useState } from 'react'
import { ImSpinner2 } from 'react-icons/im';


const Card = ({data, img}) => {
const {name , likes , date} = data;
const [loading, setLoading] = useState(true); 

const handleLoad = () => {
  setLoading(false); 
};

const handleError = () => {
  setLoading(false); 
};
const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
})

const formattedLikes = formatter.format(likes);

  return (
    <>
    <div className='card flex flex-col items-center relative overflow-hidden'>
        <h1 className='py-3 text-xl'>{name}</h1>
        {loading && (
         <ImSpinner2 className='mx-auto text-xl text-gray-100 animate-spin' />      
      )}
        <img src={img} className='w-36' onLoad={handleLoad} onError={handleError} alt={name} />
        <h1 className='py-5 pb-6 text-lg'>/ {formattedLikes} إعجاب /</h1>
        <h2 className='dark:bg-gray-100 dark:text-gray-800 w-full font-bold absolute bottom-0 '>{date.slice(0,10)}</h2>
    </div>
    </>
  )
}

export default Card