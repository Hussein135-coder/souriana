import React from 'react'
import {useState,useContext} from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';
import axios from 'axios';

export default function ResetPass() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("https://souriana.ml/api/forgot-password.php", { email });
        setMessage(res.data);
      } catch (err) {
        setMessage(err.response.data);
      }
    };

  const onChangeInput = (e) => {
    setEmail(e.target.value)
}

  return (
    <div className=' min-h-view py-24 flex justify-center items-center dark:bg-gray-900'>
    <div className="container">
        <form className='m-auto max-w-[500px] w-5/6 rounded-xl px-8 py-10 dark:bg-gray-800 shadow-card' onChange={onChangeInput} onSubmit={handleSubmit}>
            <div className="w-full">
                <div className="mb-6">
                    <label className="block mb-2 dark:text-gray-100">البريد الإلكتروني</label>
                    <input type="email" name='newPass' className="p-2 rounded w-full focus:outline-0 " placeholder="البريد الإلكتروني"  />
                </div>
                <button type="submit" className="btn">إرسال</button>
                {/* {wait? <button type="submit" disabled={wait} className="btn min-w-[57px]"><ImSpinner2 className='mx-auto text-xl animate-spin' /></button>:<button type="submit" className="btn">تغيير كلمة السر</button> } */}
                {message && <span className='text-gray-100 mt-4 block'>{message}</span>}
            </div>
        </form>
    </div>
</div>
  )
}



