import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../../context/DataContext'
import Confirm from './Confirm'
import PopAdd from './PopAdd'
import '../../../App.css'

const DisplayData = ({ money , formatter }) => {
    const { loggedInCheck, delMoney,delAllMoney,addAndUpdateMoney, setStatus, setMsg ,user } = useContext(DataContext)

    const [isClose, setIsClose] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isDelOpen, setIsDelOpen] = useState(false);
    const [isDelAllOpen, setIsDelAllOpen] = useState(false);
    const [addedMoney, setAddedMoney] = useState({});
    const [id, setId] = useState({});
    const [check, setCheck] = useState();
    const [moneyDisplay, setMoneyDisplay] = useState(money);



    // Del
    const openDel = (id) => {
        setIsClose(false)
        setIsDelOpen(true)
        setId(id)
    }

    const openDelAll = (id) => {
        setIsClose(false)
        setIsDelAllOpen(true)
        setId(id)
    }

    const del = async (e, id) => {
        e.preventDefault();
        const data = await delMoney({ id });
        if (data.success) {
            setStatus(true)
            setMsg('تم الحذف بنجاح')
            setTimeout(() => setStatus(false), 1000)
            setIsDelOpen(false)
            await loggedInCheck();
        }
        else if (!data.success && data.message) {
            setStatus(false)
            setMsg(data.message)
        }
    }

    const delAll = async (e, id) => {
        e.preventDefault();

        const data = await delAllMoney({user : id });
        if (data.success) {
            setStatus(true)
            setMsg('تم الحذف بنجاح')
            setTimeout(() => setStatus(false), 1000)
            setIsDelAllOpen(false)
            await loggedInCheck();
        }
        else if (!data.success && data.message) {
            setStatus(true)
            setMsg(data.message)
            setTimeout(() => setStatus(false), 1000)
        }
    }

    // Update
    const updateMoney = (e,id,checkbox) => {
        const moneyArr = [...moneyDisplay];
        moneyDisplay.map((item) => {
            if (item.id === id) {
                const itemIndex = moneyDisplay.indexOf(item)
                const status = checkbox ?  e.target.checked : item['الحالة']
                const moneyId = {
                    id: id,
                    name: item['الاسم'],
                    money: item['المبلغ'],
                    company: item['الشركة'],
                    date: item['التاريخ'],
                    status: status,
                    user: item['المستلم']
                };
                moneyArr[itemIndex] = {...item , "الحالة" : Number(status)};
                setAddedMoney(moneyId)
                setMoneyDisplay(moneyArr)
                setCheck(!check)
                return;
            }
        })
    }

    const open = (id) => {
        updateMoney('',id,false)
        setIsClose(false)
        setIsOpen(true)
    }

    const updateStatus = async ()=>{
        const data = await addAndUpdateMoney(addedMoney, 'edit');
        if (data.success) {
            setStatus(true)
            const message = 'تم التعديل بنجاح'
            setMsg(message)
            setTimeout(() => setStatus(false), 1000)
            await loggedInCheck();
        }
        else if (!data.success && data.message) {
            setStatus(true)
            setMsg(data.message);
            setTimeout(() => setStatus(false), 1000)
        }
    }

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      if(!mounted) return setMounted(true)
      updateStatus()
    },[check])

    useEffect(() => {
        setMoneyDisplay(money)
      },[money])
  

    // Display Data
    const trs = moneyDisplay.map((item, i) => {
        return (
            
                <tr className='border-b border-gray-200 dark:border-gray-400' key={item.id}>
                    <td>{i + 1}</td>
                    <td>{item["الاسم"]}</td>
                    <td>{formatter.format(item["المبلغ"])}</td>
                    <td>{item["الشركة"]}</td>
                    <td>{item["التاريخ"]}</td>
                    <td className='h-[60.5px] flex justify-center items-center'><input type="checkbox" className='w-5 h-5 rounded'  checked={Number(item['الحالة'])} onChange={(e)=> {updateMoney(e,item.id,true);}}/></td>
                    <td><button onClick={() => openDel(item.id)} className='btn'>❌</button></td>
                    <td><button onClick={() => open(item.id)} className='btn'>🖋</button></td>
                </tr>
            
        )
    })

    return (
        <>
            <div id='dataTable' className='shadow-card rounded-lg dark:bg-gray-800 dark:text-gray-100 mx-auto my-4 pt-10 pb-5 px-2 overflow-x-auto w-[95%] max-w-[650px]'>
                <table className="w-full">
                    <thead>
                        <tr className='border-b border-b- border-gray-200 dark:border-gray-400'>
                            <th>#</th>
                            <th>الاسم</th>
                            <th>المبلغ</th>
                            <th>الشركة</th>
                            <th>التاريخ</th>
                            <th>الحالة</th>
                            <td>حذف</td>
                            <td>تعديل</td>
                        </tr>
                    </thead>
                    <tbody>
                        {trs}
                    </tbody>
                </table>
                {isOpen ? <PopAdd type='edit' defaultData={addedMoney} toggle={[isClose, setIsClose]} setIsOpen={setIsOpen} /> : null}
                {isDelOpen ? <Confirm del={del} id={id} toggle={[isClose, setIsClose]} setIsDelOpen={setIsDelOpen} /> : null}
                {isDelAllOpen ? <Confirm del={delAll} id={id} toggle={[isClose, setIsClose]} setIsDelOpen={setIsDelAllOpen} /> : null}
                <div className='flex  justify-between items-center  mt-3 mr-2 ml-6'>
                    <button onClick={() => openDelAll(user.name.toLowerCase())} className='btn'>حذف الكل</button>
                </div>
            </div>
        </>
    )
}

export default DisplayData