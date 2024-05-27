import React, { useState, useEffect } from 'react';
import './Restaurant.css';
import RestaurantsDisplay from '../../components/RestaurantsDisplay/RestaurantsDisplay';
import BreadCrums from '../../components/BreadCrums/BreadCrums';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RestaurantReviews from '../../components/RestaurantsDisplay/RestaurantReviews';

const Restaurant = () => {
  const [restaurant, setRestaurant] = useState(null);
  const { restaurantId } = useParams();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`https://localhost:7003/api/Restaurants/singelReastaurants/${restaurantId}`);
        setRestaurant(response.data);
      } catch (error) {
        console.error('Error fetching restaurant:', error);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BreadCrums restaurant={restaurant} />
      <RestaurantsDisplay data={restaurant} />
      <RestaurantReviews restaurantId={parseInt(restaurantId)} />
    </div>
  );
};

export default Restaurant;
