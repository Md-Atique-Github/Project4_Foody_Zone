import React from 'react'
import './Buttuun.css'

const Buttuun = ({ name, onClick }) => {

    return (
        <>
            <div className='filter_container'>
                <button onClick={onClick}>
                    {name}
                </button>
            </div>
        </>
    );
}

export default Buttuun