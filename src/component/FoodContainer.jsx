import React, { useEffect, useState } from 'react'
import './FoodContainer.css'
import Buttuun from './Buttuun'

const BASE_URL = "http://localhost:8080"


const FoodContainer = ({ results }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)


  useEffect(() => {

    if (results && results.length > 0) {
      setData(results);

    } else {

      setLoading(true);
      fetch(`${BASE_URL}/food/get-food`)
        .then((response) => response.json())
        .then((responseData) => {
          setData(responseData)
          setLoading(false)
          console.log(responseData);
        })
        .catch((e) => {
          setError("unable to fetch data");
          setLoading(false);
        });

    }
  }, [results]);

  if (error) return <div>{error}</div>
  if (loading) return <div>Loading...</div>

  return (
    <>
      <div className='food_container'>
        <div className='food_cards'>
          {data.map(({ image, id, name, text, price }) => (
            <div className='food_card' key={id}>
              <div className='food_image'>
                <img src={image} alt={name} width="150px" height="150px" />
              </div>
              <div className="food_info">
                <div className="info">
                  <h3>{name}</h3>
                  <p>{text}</p>
                </div>
                <Buttuun className='ss' name={`$${price.toFixed(2)}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default FoodContainer