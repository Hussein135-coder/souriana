import React, { useContext, useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom';
import { DataContext } from '../../../context/DataContext';
import PopAdd from './PopAdd';

const AddMoney = () => {
    const { user } = useContext(DataContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isClose, setIsClose] = useState(false);

    const addedMoney = {
        id: '',
        name: '',
        money: '',
        company: 'الهرم',
        date: '',
        status: 0,
        user: user.name.toLowerCase()
    }

    return (
        <>
        <div className='flex  justify-between'>

            <button onClick={() => {setIsClose(false);setIsOpen(true);}} type="button" className="btn">إضافة حوالة</button>
            <NavLink className=" btn"  to="/resetpass">تغيير كلمة السر</NavLink>
        </div>

            {isOpen ? <PopAdd type='add' defaultData={addedMoney} setIsOpen={setIsOpen} toggle={[isClose, setIsClose]} /> : null}
        </>
    )
}

export default AddMoney