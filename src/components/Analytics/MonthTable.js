import React from 'react'

const Diffrence = ({diff})=>{
    const diffrenceStyle = 'block text-xs'
    return(
<span className={(diff > 0 ? "text-green-500 ": "text-red-500 ") + diffrenceStyle}>{diff !== 0 && (diff > 0 ?diff + "+":-diff + "-")}</span>
    )
}

const MonthTable = ({data,type}) => {
    const {syrEdu , bac , syr } = data

    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      })
      
      const returnLastDay = (pageMonth,lastMonthIndex)=>{
        const day = pageMonth.length >20 ? pageMonth[lastMonthIndex][type]: '-'
        return day 
    }

    const returnFirstDay = (pageMonth)=>{
        const day = pageMonth.length >20 ? pageMonth[0][type]: '-'
        return day 
    }
    const lastDayVal = (lastDay,firstDay)=>{
        let diff,day
        if(lastDay > 0){
            diff =  lastDay - firstDay;
            day = formatter.format(lastDay)
        }else{
            diff = ''
            day = lastDay
        }
        return [diff,day]
    }

      const trs = Array(12).fill(0).map((_, i) => {
        const monthNum = i +1

        const syrEduMonth = syrEdu.filter((_,i) =>  {
           return syrEdu[i].date.includes(`2023-0${monthNum}`)
        })
        const bacMonth = bac.filter((_,i) =>  {
            return bac[i].date.includes(`2023-0${monthNum}`)
         })
         const syrMonth = syr.filter((_,i) =>  {
            return syr[i].date.includes(`2023-0${monthNum}`)
         })

        const lastSyrEduMonthIndex = syrEduMonth.length - 1;
        const lastBacMonthIndex = bacMonth.length - 1;
        const lastSyrMonthIndex = syrMonth.length - 1;

    
        const syrEduLastDay = returnLastDay(syrEduMonth,lastSyrEduMonthIndex)
        const bacLastDay = returnLastDay(bacMonth,lastBacMonthIndex)
        const syrLastDay = returnLastDay(syrMonth,lastSyrMonthIndex)

        const syrEduFirstDay = returnFirstDay(syrEduMonth)
        const bacFirstDay = returnFirstDay(bacMonth)
        const syrFirstDay = returnFirstDay(syrMonth)
        
        const [syrEduDiff,syrEdulastDayVal] = lastDayVal(syrEduLastDay,syrEduFirstDay)
        const [bacDiff,baclastDayVal] = lastDayVal(bacLastDay,bacFirstDay)
        const [syrDiff,syrlastDayVal] =lastDayVal(syrLastDay,syrFirstDay)
        
        if(syrEduMonth.length <= 20){
            return
        }

       
        return(
                <tr key={i} className='border-b border-gray-200 dark:border-gray-400'>
                    <th>{monthNum}</th>
                    <td>{syrEdulastDayVal}<Diffrence diff={syrEduDiff}/></td>
                    <td>{baclastDayVal}<Diffrence diff={bacDiff}/></td>
                    <td>{syrlastDayVal}<Diffrence diff={syrDiff}/></td>
                </tr>
            )
      });

  return (
    <div id={type === "likes" ? 'facebookMonth' : 'telegramMonth'} className="relative  overflow-hidden  shadow-card max-w-[500px] rounded-lg dark:bg-gray-800 dark:text-gray-100  mx-auto my-20 py-10 px-2 w-5/6 ">
    <div className=' absolute top-0 left-0 min-w-full'>
          <span  className="dark:bg-gray-100  dark:text-gray-800 w-full text-center inline-block  text-lg font-bold">الاحصائيات الشهرية [{type === 'likes' ? 'Facebook' : 'Telegram'}]</span>
      </div>
      <div className='overflow-x-auto'>
<table className="w-full">
  <thead>
      <tr className='border-b border-gray-200 dark:border-gray-400'>
          <th>الشهر</th>
          <th>سوريانا</th>
          <th>بكالوريا</th>
          <th>سوريا</th>
      </tr>
  </thead>
  <tbody>
   {trs}
  </tbody>
</table>
</div>
</div>
  )
}

export default MonthTable
