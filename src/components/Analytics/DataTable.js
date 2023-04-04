import React from 'react'

const DataTable = ({data ,type}) => {
    const {syrEdu } = data
    const lastIndex = syrEdu.length - 1;
    const beforeLastIndex = lastIndex - 1;

    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      })
      

    const trs =  Object.keys(data).map((pageName)=>{
        const page = data[pageName];
        const diffrence = page[lastIndex][type] - page[beforeLastIndex][type];
        return(
        <tr className='border-b border-gray-200 dark:border-gray-400'>
            <th>{page[lastIndex].name}</th>
            <td>{formatter.format(page[beforeLastIndex][type])}</td>
            <td>{formatter.format(page[lastIndex][type])}</td>
            <td className={diffrence > 0 ? "text-green-500": "text-red-500"}>{diffrence}</td>
        </tr>
    )})
  return (
    <div id={type == "likes" ? 'facebook' : 'telegram'} className="relative  overflow-hidden  shadow-card max-w-[500px] rounded-lg dark:bg-gray-800 dark:text-gray-100  mx-auto my-20 py-10 px-2 w-5/6 ">
                          <div className=' absolute top-0 left-0 min-w-full'>
                                <span  className="dark:bg-gray-100  dark:text-gray-800 w-full text-center inline-block  text-lg font-bold">{type == 'likes' ? 'Facebook' : 'Telegram'}</span>
                            </div>
                            <div className='overflow-x-auto'>
                    <table className="w-full">
                        <thead>
                            <tr className='border-b border-gray-200 dark:border-gray-400'>
                                <th>#</th>
                                <th>البارحة</th>
                                <th>اليوم</th>
                                <th>الفرق</th>

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

export default DataTable