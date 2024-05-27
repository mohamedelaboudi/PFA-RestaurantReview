import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import profile_icon from '../../assets/profile_icon.png'
const RestaurantReviews = ({ restaurantId }) => {
    const [reviews, setReviews] = useState(null); // Set initial state to null

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`https://localhost:7003/api/Reviews/restaurant/${restaurantId}`);
                const reviewsArray = response.data.$values; // Extract the reviews array
                setReviews(reviewsArray);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [restaurantId]);

    if (!reviews) {
        return <div>Loading reviews...</div>; // Render loading state
    }

    if (!Array.isArray(reviews)) {
        return <div>No reviews available for this restaurant.</div>; // Render if reviews data is not an array
    }
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    return (
        <div className="flex justify-end mx-auto ml-0 my-8 w-3/4">
            <div className="w-full border border-gray-300 rounded p-4">
                <h2 className="text-xl font-bold mt-4  mb-2 pb-2 border-b border-gray-400 ">Reviews :</h2>

                {reviews.length > 0 ? (
                    <ul>
                        {reviews.map(review => (
                            <li key={review.reviewId} className="mb-4">
                                <div className="flex items-center">
                                    <img src={profile_icon} alt="Review Image" className="w-16 h-16 rounded-full mr-4" />
                                    <div>
                                        <h3 className="text-lg font-semibold">Posted:{formatDate(review.datePosted)}</h3>
                                        <p><strong>Rating:</strong> {review.rating}</p>
                                        <p><strong>Review:</strong> {review.reviewText}</p>
                                    </div>
                                </div>
                                <hr className="my-4 border-t border-gray-400" />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews available</p>
                )}
            </div>
        </div>


    );
};

RestaurantReviews.propTypes = {
    restaurantId: PropTypes.string.isRequired,
};


export default RestaurantReviews;
