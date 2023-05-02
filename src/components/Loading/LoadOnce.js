import React, { useContext } from 'react'
import syr from '../../images/سوريانا.png'
import { DataContext } from '../../context/DataContext';
const LoadOnce = () => {
    const { setLoadingOnce , loaded } = useContext(DataContext);
    console.log('loading...');
  return (
    <div className=' fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center'><span onTransitionEnd={() => setLoadingOnce(false) } className={!loaded ? 'w-[200px] animate-pulse scale-100 transition-all' : 'w-[200px] animate-pulse scale-0 transition-all'}></span></div>
  )
}

export default LoadOnce