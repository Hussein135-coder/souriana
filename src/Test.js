import React, { useState } from 'react'

const Test = () => {
    const [test,setTest] = useState(0);
    console.log(test,'out');

    const handle = async ()=>{
        setTest(test + 1);
        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log('in');
    }
  return (
    <div>
        <button onClick={handle}>Test</button>
    </div>
  )
}

export default Test