import React from 'react'
import '../../../App.css'
const Done = ({ msg, status }) => {
    let className = status ? 'alert active bg-gray-100 px-4 py-3 rounded' : 'alert'

    return (
        <div className={className} >
            {msg}
        </div>
    )
}

export default Done