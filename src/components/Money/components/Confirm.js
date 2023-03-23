import React, { useContext } from 'react'
import { DataContext } from '../../../context/DataContext';
import {AiFillQuestionCircle} from 'react-icons/ai'
import {ImSpinner2} from 'react-icons/im'

const Confirm = ({ toggle, del, id , setIsDelOpen }) => {
    const { wait } = useContext(DataContext);
    const [isClose, setIsClose] = toggle;

    let formBaseClass =  'dark:bg-gray-800 dark:text-gray-100 form';
    let formClass = !isClose ? formBaseClass : formBaseClass + ' bg-white dark:text-gray-100 close';

    return (
        <div id='popup' className=' m-auto'>
            <form className={formClass} onSubmit={(e) => del(e, id)}>
                <h3 className='py-5 text-center sm:text-2xl '>هل أنت متأكد من أنك تريد حذف الحوالة</h3>
                <AiFillQuestionCircle className=' text-7xl sm:text-8xl mx-auto mb-4' />
                <div className="flex gap-2">
                    <button type="button" onClick={function (e) {
                        setIsClose(true)
                        setTimeout(()=>{
                            setIsDelOpen(false)
                        },300)
                    }
                    } className="btn"  >إغلاق</button>
                {wait? <button type="submit" disabled={wait} className="btn min-w-[57px]"><ImSpinner2 className='mx-auto text-xl animate-spin' /></button>:<button type="submit" className="btn">موافق</button> }
                </div>
            </form >
        </div >
    )
}

export default Confirm