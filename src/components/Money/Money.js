import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../context/DataContext'
import Done from './components/Done'
import AddMoney from './components/AddMoney'
import DisplayData from './components/DisplayData'
import FilterBtns from './components/FilterBtns'
import GeneralData from './components/GeneralData'

const Money = () => {
    const { user, money, msg, status } = useContext(DataContext)

    const [id, setId] = useState('all');
    const [moneyG, setMoneyG] = useState(money);
    
    const filterData = (name) => {
        setId(name)
        if (name === 'all') {
            setMoneyG(money)
        } else {
            const filterdMoney = money.filter((m) => {
                return m["المستلم"] === name
            })
            setMoneyG(filterdMoney)
        }
    }

    useEffect(() => {
        filterData(id)
    }, [money])
    return (
        <div className='py-9 dark:bg-gray-900 min-h-view'>
            <div className='container'>
                <Done status={status} msg={msg} />
                <h4 className=' mb-5 dark:text-gray-100 text-xl sm:text-2xl '>أهلاً بك {user.nameAr}</h4>
                <AddMoney />
                <h3 className='mt-5 mb-5 dark:text-gray-100 text-xl sm:text-2xl text-center '>الحوالات المالية</h3>
                <FilterBtns filter={filterData} id={id} />
                <GeneralData money={moneyG } id={id}/>
                <DisplayData money={moneyG} />
            </div>
        </div>
    )
}

export default Money