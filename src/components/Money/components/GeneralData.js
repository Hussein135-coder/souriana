import React, { useContext } from 'react'
import '../../../App.css'
import { DataContext } from '../../../context/DataContext'

const GeneralData = ({ money , id , formatter}) => {
    const data = useContext(DataContext)
    
    let allMoney = 0;

    data?.money?.map(d => {
        allMoney += Number(d['المبلغ'])
    })

    const personMoney = Math.floor(allMoney / 3) ;
    const personMoneyFormatted = formatter.format(personMoney); ;

    const done = money?.filter((m) => {
        return m["الحالة"] == 1
    })

    const pending = money?.filter((m) => {
        return m["الحالة"] == 0
    })
    
    const count = {
        total: money?.length,
        done: done?.length,
        pending: pending?.length
    }
    
    const generalMoney = {
        total: 0,
        done: 0,
        pending: 0
    }

    money?.map(d => {
        generalMoney.total +=  Number(d['المبلغ'])
    })
    
    done?.map(d => {
        generalMoney.done +=  Number(d['المبلغ'])
    })
    
    pending?.map(d => {
        generalMoney.pending +=  Number(d['المبلغ'])
    })

    const countTotal = formatter.format(count.total);
    const countDone = formatter.format(count.done);
    const countPending = formatter.format(count.pending);
    
    const generalTotal = formatter.format(generalMoney.total);
    const generalDone = formatter.format(generalMoney.done);
    const generalPending = formatter.format(generalMoney.pending);

    return (
        <>
        <div className=' mt-8 '>
            <div className=" text-center">
                <div className="text-xl dark:text-gray-100  sm:text-2xl">
                    المعلومات العامة
                </div>
                <div className="relative overflow-hidden  shadow-card max-w-[500px] rounded-lg dark:bg-gray-800 dark:text-gray-100  mx-auto my-4 py-10 px-2 w-5/6 ">
                    <table className="w-full">
                        <thead>
                            <tr className='border-b border-gray-200 dark:border-gray-400'>
                                <th>#</th>
                                <th>العدد</th>
                                <th>المبلغ</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr className='border-b border-gray-200 dark:border-gray-400'>
                                <th>الإجمالي</th>
                                <td>{countTotal}</td>
                                <td>{generalTotal}</td>

                            </tr>
                            <tr className='border-b border-gray-200 dark:border-gray-400'>
                                <th>المستلم</th>
                                <td>{countDone}</td>
                                <td>{generalDone}</td>

                            </tr>
                            <tr className='border-b border-gray-200 dark:border-gray-400'>
                                <th>الباقي</th>
                                <td>{countPending}</td>
                                <td>{generalPending}</td>

                            </tr>
                        </tbody>
                    </table>
                    {id !== "all" &&   <div className=' absolute bottom-0 left-0 min-w-full'>
                              
                                <span className="dark:bg-gray-100 dark:text-gray-800 w-1/2 inline-block  text-lg font-normal">{generalMoney.total > personMoney ? 'يجب أن يدفع' : 'يجب أن يأخذ'}</span>
                                <span className="dark:bg-gray-100 inline-block w-1/2 dark:text-gray-800 text-lg">{formatter.format(Math.abs(generalMoney.total - personMoney)) }</span>

                            </div>}  
                    {id === "all" && <div className=' absolute bottom-0 left-0 min-w-full'>
                                <span  className="dark:bg-gray-100 dark:text-gray-800 w-1/2 inline-block  text-lg font-normal">حصة الشخص</span>
                                
                                <span  className="dark:bg-gray-100 inline-block w-1/2 dark:text-gray-800 text-lg">{personMoneyFormatted}</span>
                            </div> }
                </div>
            </div>
        </div>
    </>
    )
}

export default GeneralData
