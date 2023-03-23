import React, { useContext, useState } from 'react'
import { DataContext } from '../../../context/DataContext';
import '../../../App.css'
import {ImSpinner2} from 'react-icons/im'

const PopAdd = ({ toggle, defaultData, type , setIsOpen }) => {
    const { wait, addAndUpdateMoney, loggedInCheck, setMsg, setStatus } = useContext(DataContext);

    const [isClose, setIsClose] = toggle;

    const [formData, setFormData] = useState(defaultData);
    const [errorMsg, setErrorMsg] = useState(false);

    const onChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    let formBaseClass =  'dark:bg-gray-800 dark:text-gray-100 form';
    let formClass = !isClose ? formBaseClass : formBaseClass + ' bg-white dark:text-gray-100 close';

    const updateMoney = async (e) => {
        e.preventDefault();

        const data = await addAndUpdateMoney(formData, type);
        if (data.success) {
            setErrorMsg(false);
            setIsOpen(false)
            setStatus(true)
            const message = type === 'add' ? 'تمت الإضافة بنجاح' : 'تم التعديل بنجاح'
            setMsg(message)
            setTimeout(() => setStatus(false), 1000)
            await loggedInCheck();
        }
        else if (!data.success && data.message) {
            setErrorMsg(data.message);
        }
    }

    return (
        <>
            <div id='popup' className='m-auto'>
                <form className={formClass} onSubmit={updateMoney} onChange={onChangeInput}>
                    <div className="">
                        <div className="mb-3">
                            <label className="">الاسم</label>
                            <input type="text" value={formData.name} name='name' className="block w-full p-1 rounded mt-2 border dark:text-gray-900" required />
                        </div>
                        <div className="mb-3">
                            <label className="">المبلغ</label>
                            <input type="number" value={formData.money} name='money' className="block w-full p-1 rounded mt-2 border dark:text-gray-900" />
                        </div>
                        <div className="mb-3">
                            <label className="">الشركة</label>
                            <select value={formData.company} required className="block w-full p-1 rounded mt-2 border dark:text-gray-900" name='company'>
                                <option selected value='الهرم'>الهرم</option>
                                <option value='الفؤاد'>الفؤاد</option>
                                <option value='القدموس'>القدموس</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="">التاريخ</label>
                            <input value={formData.date} type="date" name='date' className="block border w-full p-1 rounded mt-2 dark:text-gray-900 " required />
                        </div>
                        <div className="mb-3">
                            <label className="">الحالة</label>
                            <select value={formData.status} required className="block border w-full p-1 rounded mt-2 dark:text-gray-900" name='status'>
                                <option selected value='0'>في الانتظار</option>
                                <option value='1'>تم الاستلام</option>
                            </select>
                        </div>
                        {errorMsg && <span className=' text-red-500'>{errorMsg}</span>}
                    </div>
                    <div className="flex gap-2 mt-3">
                        <button type="button" onClick={function (e) {
                            setIsClose(true)
                            setTimeout(()=>{
                                setIsOpen(false)
                            },300)
                        }
                        } className="btn"  >إغلاق</button>
                        {wait? <button type="submit" disabled={wait} className="btn min-w-[57px]"><ImSpinner2 className='mx-auto text-xl animate-spin' /></button>:<button type="submit" className="btn">موافق</button> }
                    </div>
                </form >
            </div >
        </>
    )
}

export default PopAdd