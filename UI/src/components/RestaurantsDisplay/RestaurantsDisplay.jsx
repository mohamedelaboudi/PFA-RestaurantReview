import React from 'react';
import PropTypes from 'prop-types';
import AddressMap from './AddressMap';
import { Link } from 'react-router-dom';

const RestaurantsDisplay = ({ data }) => {
  return (
    <div className="flex   flex-col md:flex-row items-start p-4 space-y-4 md:space-y-0 md:space-x-4">
      <div className="md:w-5/12   w-full border border-gray-300 p-0.5 rounded min-h-[300px]">
        <div className="relative" style={{ paddingTop: 'calc(100% - 4px)' }}>
          <img
            src={data.imageUrl}
            alt="Rabat"
            className="absolute inset-0 w-full h-full rounded"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
      <div className="md:w-5/12  h-[420px] w-full border border-gray-300 p-4 rounded min-h-[300px]">
        <h1 className="text-2xl font-bold mb-4">{data.name}</h1>
        <div className="space-y-2 mb-4">
          <p><strong>City:</strong> {data.city}</p>
          <p><strong>Description:</strong> {data.description}</p>
          <p><strong>Address:</strong> {data.address}</p>
        </div>
        <Link   to={`/AddReview/${data.restaurantId}`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Review</button>
        </Link>
        
      </div>
      <div className="md:w-5/12 w-full border border-gray-300 p-4 rounded min-h-[300px]">
        {/* Placeholder for another box */}
        <h1 className="text-xl font-bold mb-4">Map Box</h1>
        <AddressMap address={data.address}/>
      </div>
    </div>
  );
};

RestaurantsDisplay.propTypes = {
  data: PropTypes.object.isRequired,
};

export default RestaurantsDisplay;
