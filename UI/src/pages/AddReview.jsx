import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddReview = () => {
    const { restaurantId } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [review, setReview] = useState({
        rating: '',
        reviewText: ''
    });

    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `https://localhost:7003/api/Reviews/${restaurantId}`,
                review,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status !== 201) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            alert('Review submitted successfully!');
            setReview({
                rating: '',
                reviewText: ''
            });
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('An error occurred while submitting the review. Please try again later.');
        }
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setReview((prevReview) => ({ ...prevReview, [name]: value }));
    };

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
        <div className="max-w-6xl mx-auto p-8 bg-white border border-gray-300 rounded-lg mb-8">
            <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
                <div className="md:w-1/3 w-full border border-gray-300 p-4 rounded flex flex-col">
                    <h1 className="text-2xl font-bold mb-4">{restaurant.name}</h1>
                    <div className="flex-1 relative" style={{ paddingTop: 'calc(100% - 4px)' }}>
                        <img
                            src={restaurant.imageUrl}
                            alt={restaurant.name}
                            className="absolute inset-0 w-full h-full rounded"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
                <div className="md:w-2/3 w-full border border-gray-300 p-4 rounded flex flex-col">
                    <h2 className="text-2xl font-semibold mb-4">Add a Review</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 flex-1">
                        <div>
                            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                                Rate the restaurant:
                            </label>
                            <select
                                id="rating"
                                name="rating"
                                value={review.rating}
                                onChange={onChangeHandler}
                                required
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select a rating</option>
                                <option value="1">1 - Poor</option>
                                <option value="2">2 - Fair</option>
                                <option value="3">3 - Good</option>
                                <option value="4">4 - Very Good</option>
                                <option value="5">5 - Excellent</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700">
                                Review:
                            </label>
                            <textarea
                                id="reviewText"
                                name="reviewText"
                                value={review.reviewText}
                                onChange={onChangeHandler}
                                required
                                className="mt-1 block w-full h-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Submit Review
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddReview;
