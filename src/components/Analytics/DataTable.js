import React from 'react'

const DataTable = ({data}) => {
    const {syrEdu } = data
    const lastIndex = syrEdu.length - 1;
    const beforeLastIndex = lastIndex - 1;

    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      })
      

    const trs =  Object.keys(data).map((pageName)=>{
        const page = data[pageName];
        const diffrence = page[lastIndex].likes - page[beforeLastIndex].likes;
        return(
        <tr className='border-b border-gray-200 dark:border-gray-400'>
            <th>{page[lastIndex].name}</th>
            <td>{formatter.format(page[beforeLastIndex].likes)}</td>
            <td>{formatter.format(page[lastIndex].likes)}</td>
            <td className={diffrence > 0 ? "text-green-500": "text-red-500"}>{diffrence}</td>
        </tr>
    )})
  return (
    <div className="relative overflow-hidden shadow-card max-w-[500px] rounded-lg dark:bg-gray-800 dark:text-gray-100  mx-auto my-20 py-10 px-2 w-5/6 ">
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
  )
}

export default DataTable