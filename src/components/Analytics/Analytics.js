import React, { useContext, useEffect, useState } from 'react'
import syrEdu from '../../images/syrEdu.jpg'
import bac from '../../images/bac.jpg'
import syr from '../../images/syr.jpg'
import Card from './Card'
import BarChart from './BarChart'
import DataTable from './DataTable'
import Load from '../Loading/Load'
import { DataContext } from '../../context/DataContext'

const Analytics = () => {
  const {chart , pagesData , latest , fetchData} = useContext(DataContext)
  const images = [syrEdu,bac,syr]

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
        
      {Object.keys(pagesData).length !== 0 && <DataTable data={pagesData} type='likes' />  }
      {Object.keys(pagesData).length !== 0 && <DataTable data={pagesData} type='members' />  }
      {Object.keys(pagesData).length !== 0 && <BarChart chartData={chart} />  }
    </div>
  )
}

export default Analytics