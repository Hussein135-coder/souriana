import React, { useEffect, useState } from 'react'
import syrEdu from '../../images/syrEdu.jpg'
import bac from '../../images/bac.jpg'
import syr from '../../images/syr.jpg'
import Card from './Card'
import { ImSpinner2 } from 'react-icons/im'
import BarChart from './BarChart'

const Analytics = () => {
  const [latest, setlatest] = useState([])
  const [syrEduData, setSyrEduData] = useState([])
  const [syrData, setSyrData] = useState([])
  const [bacData, setBacData] = useState([])
  const [pagesData, setPagesData] = useState({})
  const [chart, setChart] = useState({})

  const images = [syrEdu,bac,syr]

  // Loading Component
  const  loadingComp = (<div className=' min-h-view dark:bg-gray-900 flex justify-center items-center'>
  <ImSpinner2 className='mx-auto text-xl text-gray-100 animate-spin' />      
</div>)

// Fetch all data from API
  const fetchData = async ()=>{
    const res = await fetch('https://syr-scraper.onrender.com/now')
    const dataNow = await res.json()
    setlatest(dataNow)

    const res2 = await fetch('https://syr-scraper.onrender.com/syrEdu')
    const syrEduFetched = await res2.json()
    // setSyrEduData(syrEduFetched)

    const res3 = await fetch('https://syr-scraper.onrender.com/bac')
    const bacFetched = await res3.json()
    // setBacData(bacFetched)

    const res4 = await fetch('https://syr-scraper.onrender.com/syr')
    const syrFetched = await res4.json()
    // setSyrData(syrFetched)
    setPagesData({
      syrEdu: syrEduFetched,
      bac : bacFetched,
      syr  : syrFetched
    })

    const lastIndex = syrEduFetched.length - 1;
    const beforeLastIndex = lastIndex - 1;
    
    const likesDiffrence = [syrEduFetched[lastIndex].likes - syrEduFetched[beforeLastIndex].likes , bacFetched[lastIndex].likes - bacFetched[beforeLastIndex].likes ,syrFetched[lastIndex].likes - syrFetched[beforeLastIndex].likes   ]
    const chartData = {
      labels: dataNow.map(page => page.name),
      datasets: [{
          label: 'الزيادة اليومية',
          data: likesDiffrence,
          borderWidth: 1,
          backgroundColor : ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)','rgba(153, 102, 255, 0.2)'],
          borderColor : ['rgb(54, 162, 235)','rgb(255, 99, 132)','rgb(153, 102, 255)'],
          categoryPercentage:0.5,
          barPercentage: 0.5
        }]
      }
      setChart(chartData);
  }

  // Cards components
  const cards =  Object.keys(pagesData).length !== 0  ? <div className='container grid gap-4  justify-items-center grid-cols-1 sm:grid-cols-[repeat(2,minmax(300px,_1fr))] lg:sm:grid-cols-[repeat(3,minmax(300px,_1fr))]'>
  {latest.map((data,i) =>  <Card data={data} img={images[i]} />)  }
</div> : loadingComp;

// Fetch Data when page mounted
  useEffect(() => { 
    fetchData()
  }, [])
  
  return (
    <div className='dark:bg-gray-900 min-h-view py-10 max-w-full container'>
        {cards}
      {Object.keys(pagesData).length !== 0 &&  <BarChart chartData={chart} /> }
    </div>
  )
}

export default Analytics