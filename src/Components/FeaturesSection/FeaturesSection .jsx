const FeaturesSection = () => {
  return (
    <section className="features-section w-11/12 mx-auto text-center">
      {/* Heading */}
      <div className="mb-10 space-y-2 mt-10 ">
        <h2 className="text-4xl md:text-4xl font-bold">
          Explore Our  Features
        </h2>
        <p className="">
          Discover how <span className="text-gold">Modern Hotel Booking</span> can make your stay unforgettable.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="border-2 p-6 rounded-lg shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-500">
          <div className="text-4xl mb-4 text-gold">🛏️</div>
          <h3 className="text-xl font-semibold mb-2">Luxurious Rooms</h3>
          <p className="text dark:text-gray-400">
            Experience the comfort and elegance of our well-appointed rooms.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="border-2 p-6 rounded-lg shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-500">
          <div className="text-4xl mb-4 text-gold">🍽️</div>
          <h3 className="text-xl font-semibold mb-2">Gourmet Dining</h3>
          <p className="text dark:text-gray-400">
            Savor exquisite dishes prepared by our renowned chefs.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="border-2 p-6 rounded-lg shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-500">
          <div className="text-4xl mb-4 text-gold">💆‍♀️</div>
          <h3 className="text-xl font-semibold mb-2">Spa and Wellness</h3>
          <p className="text dark:text-gray-400">
            Indulge in a variety of treatments at our luxurious spa.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="border-2 p-6 rounded-lg shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-500">
          <div className="text-4xl mb-4 text-gold">🏋️‍♂️</div>
          <h3 className="text-xl font-semibold mb-2">Fitness Center</h3>
          <p className="text dark:text-gray-400">
            Keep up with your fitness routine in our modern gym.
          </p>
        </div>

        {/* Feature 5 */}
        <div className="border-2 p-6 rounded-lg shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-500">
          <div className="text-4xl mb-4 text-gold">🎉</div>
          <h3 className="text-xl font-semibold mb-2">Event Spaces</h3>
          <p className="text dark:text-gray-400">
            Perfect venues for weddings, conferences, and celebrations.
          </p>
        </div>

        {/* Feature 6 */}
        <div className="border-2 p-6 rounded-lg shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-500">
          <div className="text-4xl mb-4 text-gold">🌐</div>
          <h3 className="text-xl font-semibold mb-2">High-Speed Wi-Fi</h3>
          <p className="text dark:text-gray-400">
            Stay connected with our complimentary high-speed internet.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
