import React from 'react'
import {useState,useContext} from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';

export default function ResetPass() {
  const {resetPass,user,wait, loggedInCheck,setStatus , setMsg} = useContext(DataContext);
  const [errMsg, setErrMsg] = useState(false);

  const navigate  = useNavigate()
  const [formData, setFormData] = useState({
      user :  user.name,
      newPass:''
  });

  const onChangeInput = (e) => {
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
}

const submitForm = async (e) => {
  e.preventDefault();

  if(!Object.values(formData).every(val => val.trim() !== '')){
      setErrMsg('يجب ملء جميع الحقول');
      return;
  }
  if(formData.newPass.length < 4 ){
    setErrMsg('يجب أن تكون الكلمة اكثر من 4 حروف');
    return;
  }
  const data = await resetPass(formData);
  if(data.success){   
    e.target.reset()
    setStatus(true)
    setMsg('تم تغيير الكلمة بنجاح')
    setTimeout(() => setStatus(false), 1000)
    setErrMsg(false);
    await loggedInCheck();
    navigate('/money')
}
else if(!data.success && data.message){
    setErrMsg(data.message);
}
}


  return (
    <div className=' min-h-view py-24 flex justify-center items-center dark:bg-gray-900'>
    <div className="container">
        <form className='m-auto max-w-[500px] w-5/6 rounded-xl px-8 py-10 dark:bg-gray-800 shadow-card' onChange={onChangeInput} onSubmit={submitForm}>
            <div className="w-full">
                <div className="mb-6">
                    <label className="block mb-2 dark:text-gray-100">كلمة المرور</label>
                    <input type="password" name='newPass' className="p-2 rounded w-full focus:outline-0 " placeholder="كلمة المرور" aria-label="كلمة المرور" />
                </div>
                {wait? <button type="submit" disabled={wait} className="btn min-w-[57px]"><ImSpinner2 className='mx-auto text-xl animate-spin' /></button>:<button type="submit" className="btn">تغيير كلمة السر</button> }
                {errMsg && <span className='text-red-600 mt-4 block'>{errMsg}</span>}
            </div>
        </form>
    </div>
</div>
  )
}



