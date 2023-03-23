import React from 'react'
import '../../../App.css'

const GeneralData = ({ money }) => {
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
                            <tr>
                                <th>الباقي</th>
                                <td>{count.pending}</td>
                                <td>{generalMoney.pending}</td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default GeneralData