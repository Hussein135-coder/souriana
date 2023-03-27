import React, { useEffect, useState } from 'react'
import syrEdu from '../../images/syrEdu.jpg'
import bac from '../../images/bac.jpg'
import syr from '../../images/syr.jpg'
import Card from './Card'
import BarChart from './BarChart'
import DataTable from './DataTable'
import Load from '../Loading/Load'

const Analytics = () => {
  const [latest, setlatest] = useState([])
  const [pagesData, setPagesData] = useState({})
  const [chart, setChart] = useState({})

  const images = [syrEdu,bac,syr]

// Fetch all data from API
  const fetchData = async ()=>{
    const res = await fetch('https://syr-scraper.onrender.com/now')
    const dataNow = await res.json()
    setlatest(dataNow)

    const res2 = await fetch('https://syr-scraper.onrender.com/syrEdu')
    const syrEduFetched = await res2.json()

    const res3 = await fetch('https://syr-scraper.onrender.com/bac')
    const bacFetched = await res3.json()

    const res4 = await fetch('https://syr-scraper.onrender.com/syr')
    const syrFetched = await res4.json()
    
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
          label: 'الفرق اليومي',
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
  {latest.map((data,i) =>  <Card key={data.id} data={data} img={images[i]} />)  }
</div> : <Load />;

// Fetch Data when page mounted
  useEffect(() => { 
    fetchData()
  }, [])
  
  return (
    <div className='dark:bg-gray-900 min-h-view py-10 max-w-full container'>
        {cards}
        
      {Object.keys(pagesData).length !== 0 && <DataTable data={pagesData} />  }
      {Object.keys(pagesData).length !== 0 && <BarChart chartData={chart} />  }
    </div>
  )
}

export default Analytics