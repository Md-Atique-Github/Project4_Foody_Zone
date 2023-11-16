import './Header.css'
import Buttuun from './Buttuun'
import FoodContainer from './FoodContainer'
import React, { useState, useEffect, useCallback } from 'react';


const Header = () => {

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [filteredData, setFilteredData] = useState(null)
    const [selectedBtn, setSelectedBtn] = useState('all');


    useEffect(() => {

        const encodedSearchText = encodeURIComponent(searchText);

        fetch(`http://localhost:8080/food/search-food?name=${encodedSearchText}`)
            .then((response) => response.json())
            .then((data) => {
                setSearchResults(data);
                setFilteredData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [searchText]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        console.log(searchText);

        if (searchText === "") {
            setFilteredData(null);
        }
        const filter = searchResults?.filter((food) => {
            return food.name.toLowerCase().includes(searchText.toLowerCase());
        });
        setFilteredData(filter);
    };

    const filterFood = (type) => {
        if (type === "all") {
            setFilteredData(searchResults);
            setSelectedBtn("all");
            return;
        }

        const filter = searchResults?.filter((food) => {
            return food.type.toLowerCase().includes(type.toLowerCase());
        })
        setFilteredData(filter);
        setSelectedBtn(type);
    }


    // BY USING USECALLBACK IT ALSO WORK SO IT IT IS SAVE TO UNDERSTAND USECALLBACK   ///////////////

    // {{ 
    // const handleSearchChange = useCallback((e) => {
    //     setSearchText(e.target.value);
    //     console.log(searchText);

    //     if (searchText === "") {
    //         setFilteredData(null);
    //     }
    //     const filter = searchResults?.filter((food) => {
    //         return food.name.toLowerCase().includes(searchText.toLowerCase());
    //     });
    //     setFilteredData(filter);
    // }, [searchResults, searchText]);


    // const filterFood = useCallback((type) => {
    //     if (type === "all") {
    //         setFilteredData(searchResults);
    //         setSelectedBtn("all");
    //         return;
    //     }

    //     const filter = searchResults?.filter((food) => {
    //         return food.type.toLowerCase().includes(type.toLowerCase());
    //     })
    //     setFilteredData(filter);
    //     setSelectedBtn(type);
    // }, [searchResults]);
    // }}


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
                    <Buttuun name='All' onClick={() => { filterFood("all") }} />
                    <Buttuun name='Breakfast' onClick={() => { filterFood("breakfast") }} />
                    <Buttuun name='Lunch' onClick={() => { filterFood("lunch") }} />
                    <Buttuun name='Dinner' onClick={() => { filterFood("dinner") }} />
                </div>
            </div>
            <FoodContainer results={filteredData} />
        </>
    )
}


export default Header