import React, { useContext, useState } from 'react'
import { ImSpinner2 } from 'react-icons/im'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';
import Done from '../Money/components/Done';

const Form = ({type,title,data}) => {
    const {setMsg, setStatus, status, msg } = useContext(DataContext);

    const sendData = type === "password" ?  {email : data.emailLink , reset_token : data.token,password:'',confirm_password:''} : {email : ''};
    const [formData, setFormData] = useState(sendData);
    const [wait, setWait] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('')
        const link = type === "email"  ? "forgot-password" : "reset-password"
        if(type === "password"){
        if(formData.password !== formData.confirm_password){
            setMessage('الكلمتان غير متطابقتان')
            return
        }
    }
        setWait(true)
        try {
            const { data } = await axios.post(`https://tech-inj.tech/api/${link}.php`, formData);
            if(data.success){
                setWait(false)
                setMsg(data.message);
                setStatus(true)
                setTimeout(() => setStatus(false),2000)
                setTimeout(() => navigate('/login'),2000)
                return
            }
            setMsg(data);
            setStatus(true)
            setTimeout(() => setStatus(false),2000)
            setWait(false)
            
            } catch (err) {
            setMessage(err.response.data);
            setWait(false)
            }
};


    const onChangeInput = (e) => {
      console.log(e.target.name);
      console.log(e.target.value);
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
  }
    return (
  <>
  <h1 className='dark:text-gray-100 text-3xl text-center mb-12'>تغيير كلمة السر</h1>
    <form className='m-auto max-w-[500px] w-5/6 rounded-xl px-8 py-10 dark:bg-gray-800 shadow-card' onChange={onChangeInput} onSubmit={handleSubmit}>
    <div className="w-full">
        <div className="mb-6">
            <label className="block mb-2 dark:text-gray-100">{title}</label>
            <input type={type} name={type} className="p-2 rounded w-full focus:outline-0 " placeholder={title}  />
        </div>
        {type === "password" && <div className="mb-6">
            <label className="block mb-2 dark:text-gray-100">تأكيد كلمة المرور</label>
            <input type="password" name='confirm_password' className="p-2 rounded w-full focus:outline-0 " placeholder={title}  />
            <input type="hidden" name='email' value={data.emailLink} className="p-2 rounded w-full focus:outline-0 "   />
            <input type="hidden" name='reset_token' value={data.token} className="p-2 rounded w-full focus:outline-0 "  />
        </div>}
        {wait? <button type="submit" disabled={wait} className="btn min-w-[57px]"><ImSpinner2 className='mx-auto text-xl animate-spin' /></button>:<button type="submit" className="btn">إرسال</button> }
        {message && <span className='text-gray-100 mt-4 block'>{message}</span>}
    </div>
    </form>
    <Done status={status} msg={msg} />
        </>
  )
}

export default Form
