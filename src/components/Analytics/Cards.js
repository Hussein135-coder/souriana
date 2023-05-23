import React from 'react'
import Card from './Card'
import Load from '../Loading/Load'

function Cards({images,latest}) {
  return (
    latest.length !== 0  ? <div className='container grid gap-4  justify-items-center grid-cols-1 sm:grid-cols-[repeat(2,minmax(300px,_1fr))] lg:sm:grid-cols-[repeat(3,minmax(300px,_1fr))]'>
    {latest.map((data,i) =>  <Card key={data.id} data={data} img={images[i]} />)  }
  </div> : <Load />
  )
}

export default Cards