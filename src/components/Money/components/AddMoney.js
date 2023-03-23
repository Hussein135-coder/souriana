import React, { useContext, useState } from 'react'
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
            <button onClick={() => {setIsClose(false);setIsOpen(true);}} type="button" className="btn btn-primary">إضافة حوالة</button>

            {isOpen ? <PopAdd type='add' defaultData={addedMoney} setIsOpen={setIsOpen} toggle={[isClose, setIsClose]} /> : null}
        </>
    )
}

export default AddMoney