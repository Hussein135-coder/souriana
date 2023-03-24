import React, { useContext } from 'react'
import '../../../App.css'
import { DataContext } from '../../../context/DataContext'

const GeneralData = ({ money , id}) => {

    const data = useContext(DataContext)

    let allMoney = 0;

    data.money.map(d => {
        allMoney += d['المبلغ']
    })

    const personMoney = Math.floor(allMoney / 3);
    const done = money.filter((m) => {
        return m["الحالة"] === 1
    })

    const pending = money.filter((m) => {
        return m["الحالة"] === 0
    })

    const count = {
        total: money.length,
        done: done.length,
        pending: pending.length
    }

    const generalMoney = {
        total: 0,
        done: 0,
        pending: 0
    }

    money.map(d => {
        generalMoney.total += d['المبلغ']
    })

    done.map(d => {
        generalMoney.done += d['المبلغ']
    })

    pending.map(d => {
        generalMoney.pending += d['المبلغ']
    })

    return (
    <>
        <div className=' mt-8 '>
            <div className=" text-center">
                <div className="text-xl dark:text-gray-100  sm:text-2xl">
                    المعلومات العامة
                </div>
                <div className="shadow-card max-w-[500px] rounded-lg dark:bg-gray-800 dark:text-gray-100  mx-auto my-4 py-10 px-2 w-5/6 ">
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
                                <td>{count.total}</td>
                                <td>{generalMoney.total}</td>

                            </tr>
                            <tr className='border-b border-gray-200 dark:border-gray-400'>
                                <th>المستلم</th>
                                <td>{count.done}</td>
                                <td>{generalMoney.done}</td>

                            </tr>
                            <tr className='border-b border-gray-200 dark:border-gray-400'>
                                <th>الباقي</th>
                                <td>{count.pending}</td>
                                <td>{generalMoney.pending}</td>

                            </tr>

                            {id !== "all" &&  <tr>
                                <th>المستحقات</th>
                                <td>{generalMoney.total > personMoney ? 'يجب أن يدفع' : 'يجب أن يأخذ'}</td>
                                <td>{Math.abs(generalMoney.total - personMoney) }</td>

                            </tr>}
                            {id === "all" && <tr>
                                <th  className="dark:bg-gray-100 dark:text-gray-800  text-lg font-normal">حصة الشخص</th>
                                
                                <td colSpan={2} className="dark:bg-gray-100 dark:text-gray-800 text-lg">{personMoney}</td>
                            </tr> }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
    )
}

export default GeneralData