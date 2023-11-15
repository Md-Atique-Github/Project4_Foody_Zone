import './Header.css'
import Buttuun from './Buttuun'
import FoodContainer from './FoodContainer'
import React, { useState, useEffect } from 'react';


const Header = () => {

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };


    useEffect(() => {

        const encodedSearchText = encodeURIComponent(searchText);

        fetch(`http://localhost:8080/food/search-food?name=${encodedSearchText}`)
            .then((response) => response.json())
            .then((data) => {
                setSearchResults(data);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [searchText]);


    return (

        <>
            <div className='container'>
                <div className='top_container'>
                    <div className='logo'>
                        <img src='/images/Foody_Zone.svg' alt='logo' />
                    </div>
                    <div className='search'>
                        <input
                            placeholder='Search Food...'
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                <div className='filter_container'>
                    <Buttuun name='All' />
                    <Buttuun name='Breakfast' />
                    <Buttuun name='Lunch' />
                    <Buttuun name='Dinner' />
                </div>
            </div>
            <FoodContainer results={searchResults} />
        </>
    )
}


export default Header