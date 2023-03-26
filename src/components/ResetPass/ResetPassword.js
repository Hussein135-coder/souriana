import React, { useEffect } from 'react'
import {useState,useContext} from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';
import axios from 'axios';
import Form from './Form';

export default function ResetPass() {
  

    // const [email, setEmail] = useState("");
 


    const [content, setContent] = useState(<ImSpinner2 className='mx-auto text-xl dark:text-gray-100 animate-spin' />);
    const [searchParams, setSearchParams] = useSearchParams();

    const emailLink = searchParams.get("email") ;
    const token = searchParams.get("reset_token")  ;

    const checkEmailToken = async ()=>{
      try {
        console.log(emailLink , token);
        const res = await axios.post("https://souriana.ml/api/check-email-token.php", {email : emailLink ,reset_token : token });
        if(res.data !== 1){
          setContent(<div className='dark:text-gray-100 text-center text-2xl'>{res.data}</div>);
        }else{
          setContent(<Form type="password" data={{emailLink,token}} title="كلمة المرور"  />)
        }
      } catch (err) {
        setContent(err.response.data);
      }
    }

    


useEffect(() => {
  if(emailLink && token  ){
    checkEmailToken()
  }else{
    setContent(<Form type="email" title="البريد الإلكتروني" data={{emailLink,token}}  />);
  }
}, [])


  return (
    <div className=' min-h-view py-24 flex justify-center items-center dark:bg-gray-900'>
    <div className="container">
        {content}
    </div>
</div>
  )
}



