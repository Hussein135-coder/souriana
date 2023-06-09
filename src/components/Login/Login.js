import React, { useContext, useRef, useState } from 'react'
import {NavLink, useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';
import './Login.css'

const Login = () => {   
    const {loginUser, wait, loggedInCheck } = useContext(DataContext);

    const [redirect, setRedirect] = useState(false);
    const [msg, setMsg] = useState(false);
    const name = useRef('');
    const password = useRef('');
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        
        const formData = {
            name: name.current.value,
            password: password.current.value
        }
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
            navigate('/analytics');
            return;
        }
        setRedirect(false);
        setMsg(data.message);
    }

    return (
        <div className=' min-h-view py-24 flex justify-center items-center dark:bg-gray-900'>
            <div className="container">
                <h1 className='dark:text-gray-100 text-3xl text-center mb-12'>تسجيل الدخول</h1>
                <form id="login-form" className='m-auto max-w-[500px] w-5/6 rounded-xl px-8 py-10 dark:bg-gray-800 shadow-card'  onSubmit={submitForm}>
                    <div className="w-full">
                        <div className="mb-4">
                            <label className="block mb-2 transition-all  pb-2 w-max dark:text-gray-100">اسم المستخدم</label>
                            <input id="name" ref={name} type="text" name='name' className="p-2 rounded w-full focus:outline-0" placeholder="اسم المستخدم" aria-label="اسم المستخدم" />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 dark:text-gray-100">كلمة المرور</label>
                            <input ref={password} id="password" type="password" name='password' className="p-2 rounded w-full focus:outline-0 " placeholder="كلمة المرور" aria-label="كلمة المرور" />
                        </div>
                        {wait || redirect ? <span className='dark:text-gray-100 text-gray-900'>{redirect}</span> : <button type="submit" id='login-btn'  className='btn  p-2 me-2 login-btn'>تسجيل الدخول</button>}
                        <NavLink to='/reset-password' className='dark:text-gray-100 mt-3 block '>هل نسيت كلمة المرور؟</NavLink>
                        {msg && <span className='text-red-500 mt-4 block'>{msg}</span>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login