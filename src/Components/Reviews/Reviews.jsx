import {  useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Rating } from 'react-simple-star-rating';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
   

    useEffect(() => {
        // Fetch user reviews from the backend (replace with actual API call)
        const fetchReviews = async () => {
            try {
                const response = await fetch('https://mordern-hotel-booking-platform-server.vercel.app/reviews'); // Replace with your backend URL
                if (!response.ok) throw new Error('Failed to fetch reviews');
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="reviews-section container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-gold">User Reviews</h2>
            <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
                {reviews.map((review, index) => (
                    <div key={index} className="review-card bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                        <div className="w-20 h-20">
                            <img
                                src={review?.profilePic || 'https://via.placeholder.com/100'}
                                alt={review.username}
                                className=" rounded-full  mb-4 object-cover border-4 border-gold"
                            />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gold">{review.username}</h3>
                        <Rating ratingValue={review.rating * 20} readonly size={20} />
                        <p className="text-gray-600 mb-4 text-center">{review.comment}</p>
                        <p className="text-sm text-gray-500">{new Date(review.timestamp).toLocaleString()}</p>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Reviews;
