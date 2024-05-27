import React from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FoodItem = ({ data  }) => {


    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
            <Link to={`/Restaurant/${data.restaurantId}`}>
                <img className='food-item-image' src={data.imageUrl} alt="" />
            </Link>
    
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{data.name}</p> <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-desc">{data.description}</p>
                <p className="food-item-price">{data.city}</p>
            </div>
        </div>
    )
}
FoodItem.propTypes = {
    data: PropTypes.func.isRequired,

  };
  
export default FoodItem
