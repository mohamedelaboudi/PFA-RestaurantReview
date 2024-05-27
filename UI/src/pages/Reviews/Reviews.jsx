import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import hero_image_2 from '../../assets/hero_image_2.png';
import hero_image_3 from '../../assets/hero_image_3.png';
import search from '../../assets/search.png';

const Reviews = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const searchFieldRef = useRef(null);
  const restaurantBoxRef = useRef(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('https://localhost:7003/api/Restaurants/allReastaurants');
        const data = response.data.$values || [];
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        restaurantBoxRef.current &&
        !restaurantBoxRef.current.contains(event.target) &&
        !searchFieldRef.current.contains(event.target)
      ) {
        setShowRestaurants(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputClick = () => {
    setShowRestaurants(true);
  };

  const handleRestaurantSelection = (restaurant) => {
    setShowRestaurants(false);
    console.log(`Selected restaurant: ${restaurant.name}`);
  };

  if (!Array.isArray(restaurants)) {
    return null;
  }

  return (
    <div className='w-full bg-[#FAF1ED] py-20  pt-8'>
      <div className='w-full flex flex-col items-center'>
        <h1 className='mt-44 text-5xl font-semibold text-center'>Write a review, help travelers plan ahead</h1>
        <h2 className='mt-4 text-center'>Stories like yours allow everyone to have more beautiful trips! Share your experience and help others.</h2>
      </div>
      <div className='w-full flex justify-center mt-14 relative'>
        <div className='relative w-3/4 lg:w-1/2'>
          <input
            ref={searchFieldRef}
            className='border rounded-full w-full py-4 pl-14 pr-6 text-xl'
            placeholder='What would you like to write a review about?'
            onClick={handleInputClick}
          />
          <img src={search} alt="Search Icon" className='absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6'/>
          {showRestaurants && (
            <div ref={restaurantBoxRef} className='absolute left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 mt-2 w-full rounded-lg p-4 z-10'>
              <ul>
                {restaurants.map((restaurant) => (
                  <li key={restaurant.restaurantId} className='flex items-center space-x-4 py-2 border-b'>
                    <Link to={`/addReview/${restaurant.restaurantId}`} onClick={() => handleRestaurantSelection(restaurant)}>
                      <img className='w-12 h-12 rounded-full' src={restaurant.imageUrl} alt={`Restaurant ${restaurant.name}`} />
                    </Link>
                    <span className='text-xl font-semibold'>{restaurant.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className='w-full flex justify-center mt-10'>
        <div className='flex flex-row items-center space-x-4'>
          <img src={hero_image_2} alt="Hero Image 2" />
          <img src={hero_image_3} alt="Hero Image 3" />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
