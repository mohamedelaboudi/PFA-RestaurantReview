import React from 'react';
import './BreadCrums.css';
import PropTypes from 'prop-types';

const BreadCrums = ({ restaurant }) => {
  return (
    <div className='breadCrums'>
      Home <p>/</p> {restaurant.city} <p>/</p> {restaurant.name}
    </div>
  );
};

BreadCrums.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

export default BreadCrums;
