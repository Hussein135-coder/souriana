import React, { useContext, useState } from 'react'
import {useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';
import './Login.css'

const Login = () => {   
    const {loginUser, wait, loggedInCheck } = useContext(DataContext);

    const [redirect, setRedirect] = useState(false);
    const [msg, setMsg] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    });
    const navigate = useNavigate();
    const location = useLocation();

    const onChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();
        setMsg(false)

        if (!Object.values(formData).every(val => val.trim() !== '')) {
            setMsg('جميع الحقول مطلوبة');
            return;
        }

        setRedirect('يتم تسجيل الدخول...');
        const data = await loginUser(formData);
        if (data.success) {
            e.target.reset();
            await loggedInCheck();
            const origin = location.state?.from?.pathname || '/';
            navigate(origin);
            return;
        }
        setRedirect(false);
        setMsg(data.message);
    }

    return (
        <div className=' min-h-view py-24 flex justify-center items-center dark:bg-gray-900'>
            <div className="container">
                <form className='m-auto max-w-[500px] w-5/6 rounded-xl px-8 py-10 dark:bg-gray-800 shadow-card' onChange={onChangeInput} onSubmit={submitForm}>
                    <div className="w-full">
                        <div className="mb-4">
                            <label className="block mb-2 transition-all  pb-2 w-max dark:text-gray-100">اسم المستخدم</label>
                            <input type="text" name='name' className="p-2 rounded w-full focus:outline-0" placeholder="اسم المستخدم" aria-label="اسم المستخدم" />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 dark:text-gray-100">كلمة المرور</label>
                            <input type="password" name='password' className="p-2 rounded w-full focus:outline-0 " placeholder="كلمة المرور" aria-label="كلمة المرور" />
                        </div>
                        {wait || redirect ? <span className='dark:text-gray-100 text-gray-900'>{redirect}</span> : <button type="submit"  className='btn  p-2 me-2 login-btn'>تسجيل الدخول</button>}
                        {msg && <span className='text-red-600 mt-4 block'>{msg}</span>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login