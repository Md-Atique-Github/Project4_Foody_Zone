import React from 'react'
import './Buttuun.css'

const Buttuun = (props) => {
    return (
        <div className='filter_container'>
            <button >{props.name}</button>
        </div>
    )
}

export default Buttuun