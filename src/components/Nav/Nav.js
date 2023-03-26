import React, { useContext,useState } from 'react'
import { NavLink } from 'react-router-dom'
import { DataContext } from '../../context/DataContext'
const Nav = () => {
    const { user, logout,loading } = useContext(DataContext)
    const [isOpen,setIsOpen] = useState(false)

    const ulBaseClass =  ' sm:static z-10 sm:translate-y-0 flex absolute  flex-col px-[4%] bg-gray-800  sm:bg-gray-900 sm:flex-row py-3 sm:flex-grow-[2] flex-1 w-full items-center h-auto justify-between sm:justify-end sm:gap-3 m-0 transition sm:flex'
    const ulClass = isOpen ? ulBaseClass + ' translate-y-[50px]' : ulBaseClass + ' -translate-y-36'
    return (
        <nav className="shadow dark:bg-gray-900" >
            <div className="sm:container flex sm:flex-row flex-col justify-between items-center relative">
                <div className='flex px-[4%] items-center justify-between w-full dark:bg-gray-900 flex-1 z-20'>
                <NavLink className="text-[20px] py-3 no-underline  transition duration-500 hover:text-gray-500 text-gray-900 dark:text-gray-100 dark:hover:text-gray-300" to="#">سوريانا التعليمية</NavLink>
                    <button onClick={()=> setIsOpen(!isOpen)} className="flex gap-1 sm:hidden flex-col justify-center w-[35px] h-[30px] rounded bg-gray-100" >
                        <span className="bg-gray-900 h-0.5 mx-auto w-3/5 rounded" ></span>
                        <span className="bg-gray-900 h-0.5 mx-auto w-3/5 rounded" ></span>
                        <span className="bg-gray-900 h-0.5 mx-auto w-3/5 rounded" ></span>
                    </button>
                </div>
                
                    <ul className={ulClass}>
                        <li className="w-full sm:w-max ">
                            <NavLink className="no-underline block w-max sm:py-0 pt-2  pb-4 transition duration-500 hover:text-gray-500 text-gray-900 dark:text-gray-100 dark:hover:text-gray-300"  to="/">الرئيسية</NavLink>
                        </li>
                        <li className="w-full sm:w-max">
                            <NavLink className="no-underline block w-max  sm:py-0 pb-4 transition duration-500 hover:text-gray-500 text-gray-900 dark:text-gray-100 dark:hover:text-gray-300 " to={loading ? '' : user? '/analytics' : '/login'}>الإحصائيات</NavLink>
                        </li>
                        <li className="w-full sm:w-max">
                            <NavLink className="no-underline block w-max  sm:py-0 pb-4 transition duration-500 hover:text-gray-500 text-gray-900 dark:text-gray-100 dark:hover:text-gray-300 " to={loading ? '' : user? '/money' : '/login'}>الحوالات المالية</NavLink>
                        </li>
                        <li className="w-full sm:w-max">
                            {loading ?<button className='btn h-[40px] dark:bg-gray-700 animate-pulse min-w-[113px]'></button>:!user ?  <NavLink className="btn sm:mr-4" to="/login">تسجيل الدخول</NavLink> :<button onClick={() => logout()} className="btn sm:mr-4">تسجيل الخروج</button> }
                            
                        </li>
                    </ul>
            </div>
        </nav>
    )
}



export default Nav