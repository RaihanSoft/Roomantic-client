import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const Achievements = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="extra-section mx-auto mt-10 w-11/12">
      <h1 className="text-4xl font-bold text-center mb-2">Our Achievements</h1>
      <p className="text-center lg:w-2/3 mx-auto">
        We’re proud of the journey we’ve traveled and the trust we’ve built with our users and partners. Here’s a glimpse of what we’ve achieved together.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center mt-6">
        <div className="stat-card bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-4xl font-bold text-blue-600 mb-2">
            {inView && <CountUp end={500} duration={2} />}+
          </h2>
          <p className="text-gray-600">Rooms Available</p>
        </div>
        <div className="stat-card bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-4xl font-bold text-blue-600 mb-2">
            {inView && <CountUp end={1000} duration={2} />}+
          </h2>
          <p className="text-gray-600">Happy Customers</p>
        </div>
        <div className="stat-card bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-4xl font-bold text-blue-600 mb-2">
            {inView && <CountUp end={50} duration={2} />}+
          </h2>
          <p className="text-gray-600">Awards Won</p>
        </div>
        <div className="stat-card bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-4xl font-bold text-blue-600 mb-2">
            {inView && <CountUp end={24} duration={2} />} / 7
          </h2>
          <p className="text-gray-600">Customer Support</p>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
