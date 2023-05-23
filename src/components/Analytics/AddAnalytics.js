import React, { useContext, useState } from 'react'
import { DataContext } from '../../context/DataContext';
import '../../App.css'
import {ImSpinner2} from 'react-icons/im'

const AddAnalytics = ({ toggle, defaultData , setIsOpen }) => {
    const { wait, loggedInCheck, fetchData ,setMsg, setStatus ,addAnalytics} = useContext(DataContext);

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

    const handleAnalytics = async (e) => {
        e.preventDefault();
        
        const data = await addAnalytics(formData);
        if (data.success) {
            setErrorMsg(false);
            setIsOpen(false)
            setStatus(true)
            const message  = 'تمت الإضافة بنجاح'
            setMsg(message)
            setTimeout(() => setStatus(false), 1000)
            await loggedInCheck();
            await fetchData();
        }
        else if (!data.success && data.message) {
            setErrorMsg(data.message);
        }
    }

    return (
        <>
            <div id='popup' className='m-auto'>
                <form onAnimationEnd={(e)=> e.animationName === "fade-out-form" && setIsOpen(false) }  className={formClass} onSubmit={handleAnalytics} onChange={onChangeInput}>
                    <div className="">
                        <div className="mb-3">
                            <label className="">الصفحة</label>
                            <select value={formData.page} required className="block w-full p-1 rounded mt-2 border dark:text-gray-900" name='page'>
                                <option selected value='syredu'>سوريانا التعليمية</option>
                                <option value='bac'>بكالوريا سوريا</option>
                                <option value='syr'>سوريا التعليمية</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="">عدد الاعجابات</label>
                            <input type="number" value={formData.likes} name='likes' className="block w-full p-1 rounded mt-2 border dark:text-gray-900" />
                        
                        </div>
                        <div className="mb-3">
                        <label className="">عدد المشتركين</label>
                            <input type="number" value={formData.members} name='members' className="block w-full p-1 rounded mt-2 border dark:text-gray-900" />
                        
                        </div>
                        <div className="mb-3">
                            <label className="">التاريخ</label>
                            <input value={formData.date} type="date" name='date' className="block border w-full p-1 rounded mt-2 dark:text-gray-900 " required />
                        </div>
                        {errorMsg && <span className=' text-red-500'>{errorMsg}</span>}
                    </div>
                    <div className="flex gap-2 mt-3">
                        <button type="button" onClick={function (e) {
                            setIsClose(true)
                        }
                        } className="btn"  >إغلاق</button>
                        {wait? <button type="submit" disabled={wait} className="btn min-w-[57px]"><ImSpinner2 className='mx-auto text-xl animate-spin' /></button>:<button type="submit" className="btn">موافق</button> }
                    </div>
                </form >
            </div >
        </>
    )
}

export default AddAnalytics