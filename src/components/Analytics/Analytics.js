import React, { useEffect, useState } from 'react'
import syrEdu from '../../images/syrEdu.jpg'
import bac from '../../images/bac.jpg'
import syr from '../../images/syr.jpg'
import Card from './Card'
import { ImSpinner2 } from 'react-icons/im'

const Analytics = () => {
  const [latest, setlatest] = useState([])
  const images = [syrEdu,bac,syr]

  const  loadingComp = (<div className=' min-h-view dark:bg-gray-900 flex justify-center items-center'>
  <ImSpinner2 className='mx-auto text-xl text-gray-100 animate-spin' />      
</div>)

  const fetchData = async ()=>{
    const res = await fetch('https://syr-scraper.onrender.com/now')
    const data = await res.json()
    setlatest(data)
    console.log(data);
  }
  const cards =  latest.length > 0 ? <div className='container grid gap-4  justify-items-center grid-cols-1 sm:grid-cols-[repeat(2,minmax(300px,_1fr))] lg:sm:grid-cols-[repeat(3,minmax(300px,_1fr))]'>
  {latest.map((data,i) =>  <Card data={data} img={images[i]} />)  }
</div> : loadingComp
  useEffect(() => { 
    fetchData()
  }, [])
  
  return (
    <div className='dark:bg-gray-900 min-h-view py-10 max-w-full'>
        {cards}
    </div>
  )
}

export default Analytics