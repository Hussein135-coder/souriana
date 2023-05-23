import React, { useContext, useEffect, useState } from 'react'
import syrEdu from '../../images/syrEdu.jpg'
import bac from '../../images/bac.jpg'
import syr from '../../images/syr.jpg'
import BarChart from './BarChart'
import DataTable from './DataTable'
import { DataContext } from '../../context/DataContext'
import MonthTable from './MonthTable'
import AddAnalytics from './AddAnalytics'
import Cards from './Cards'

const Analytics = () => {
  const {fetchData,chart , pagesData , latest} = useContext(DataContext)
  const images = [syrEdu,bac,syr]
  const [isOpen, setIsOpen] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const defaultData = {
    page: 'syredu',
    likes: 0,
    members: 0,
    date: '',
}


useEffect(()=>{
  fetchData();
},[])
  return (
    <>
    <div  className='dark:bg-gray-900'>
      <div className='container px-10 pt-10'>
        <button onClick={() => {setIsClose(false);setIsOpen(true);}} type="button" className="btn">إضافة</button>
      </div>
    </div>

        {isOpen ? <AddAnalytics type='add' defaultData={defaultData} setIsOpen={setIsOpen} toggle={[isClose, setIsClose]} /> : null}
    <div className='dark:bg-gray-900 min-h-view py-10 max-w-full container'>
        <Cards images={images} latest={latest} />
      {Object.keys(pagesData).length !== 0 &&
      <>
       <DataTable data={pagesData} type='likes' />
       <DataTable data={pagesData} type='members' />
       <MonthTable  data={pagesData}  type='likes'  />
       <MonthTable  data={pagesData}  type='members'  />
       <BarChart chartData={chart} />
        </>
         }
    </div>
         </>
  )
}

export default Analytics