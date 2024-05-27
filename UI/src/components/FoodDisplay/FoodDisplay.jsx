import './FoodDisplay.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import FoodItem from '../FoodItem/FoodItem';
import { useEffect, useState } from 'react';

const FoodDisplay = ({ city }) => {
  const [establishment, setEstablishment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7003/api/Restaurants/allReastaurants");
        const data = response.data.$values || []; // Extracting the actual data
        setEstablishment(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  // Ensure establishment is an array before calling map
  if (!Array.isArray(establishment)) {
    return null;
  }

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {establishment.map((item, index) => {
          if (city === "All" || city === item.city) {
            return <FoodItem key={index} data={item} />;
          }
          return null; // Add this to avoid undefined return
        })}
      </div>
    </div>
  );
};

FoodDisplay.propTypes = {
  city: PropTypes.string.isRequired,
};

export default FoodDisplay;
