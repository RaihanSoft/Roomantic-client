import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Rating from '@mui/material/Rating';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

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
        <div ref={ref} className="reviews-section w-11/12 mx-auto mt-10">
            <div className='space-y-2' >
                <h2 className="text-4xl font-bold text-center text-gold">What Our Users Say</h2>
                <p className='text-center lg:w-2/3 mx-auto  ' >We value the feedback of our users and strive to provide exceptional service. Read through some of the reviews from our satisfied clients to see why we’re trusted for excellence.</p>
            </div>
            {inView && (
                <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay interval={2000} stopOnHover={false} >
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="review-card mt-6 bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border border-gray-200 relative"
                        >
                            {/* Circular Image with Border */}
                            <div className="w-24 h-24 mb-4 relative">
                                <img
                                    src={review?.profilePic || 'https://via.placeholder.com/100'}
                                    alt={review.username}
                                    className="rounded-full object-cover border-4 border-gold"
                                />
                            </div>
                            {/* Username */}
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{review.username}</h3>
                            {/* Star Rating */}
                            <Rating name="half-rating-read" defaultValue={review.rating} precision={0.5} readOnly />
                            {/* Review Text */}
                            <p className="text-gray-600 italic text-center mt-4 mb-6 px-4">
                                <span className="text-4xl text-gold font-bold">“</span>
                                {review.comment}
                                <span className="text-4xl text-gold font-bold">”</span>
                            </p>
                            {/* Timestamp */}
                            <p className="text-sm text-gray-500">{new Date(review.timestamp).toLocaleString()}</p>

                            {/* Background Decorative Border */}
                            <div className="absolute inset-0 w-full h-full border-2 border-gold rounded-lg -z-10" />
                        </div>
                    ))}
                </Carousel>
            )}
        </div>
    );
};

export default Reviews;


