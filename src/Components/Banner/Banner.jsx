import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import one from "../assets/banner-1.jpg";
import two from "../assets/banner-2.jpg";
import three from "../assets/banner-3.webp";

import { Fade, Slide } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";

const AnimatedSlider = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const sliders = [
    {
      img: one,
      title: "Welcome to Our Hotel",
      description: "Experience luxury and comfort in the heart of the city.",
    },
    {
      img: two,
      title: "Relax and Unwind",
      description: "Enjoy our world-class amenities and services.",
    },
    {
      img: three,
      title: "Book Your Stay",
      description: "Reserve your room today and enjoy exclusive offers.",
    },
  ];

  const [currentSlider, setCurrentSlider] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlider((prev) => (prev === sliders.length - 1 ? 0 : prev + 1));
    }, 5000); // Slide transition every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="relative w-full mx-auto h-[550px] md:h-[550px] overflow-hidden">
      <div className="w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white relative">
        {/* Background Image */}
        <div className="absolute inset-0 flex justify-center items-center">
          <img
            src={sliders[currentSlider].img}
            alt={`Slider ${currentSlider}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div> {/* Adds overlay */}
        </div>

        {/* Text Content */}
        <div className="absolute bottom-16 left-6 sm:left-12 z-10 max-w-2xl px-4 sm:px-6">
          <Slide direction="up" delay={500}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
              <Typewriter
                words={[sliders[currentSlider].title]}
                loop={false}
                cursor
                cursorStyle="|"
                typeSpeed={50}
                deleteSpeed={30}
                delaySpeed={3000}
              />
            </h1>
          </Slide>
          <Fade delay={800}>
            <p className="text-lg sm:text-xl md:text-2xl mb-4">
              {sliders[currentSlider].description}
            </p>
            <button
              onClick={() => navigate("/rooms")}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md text-lg"
            >
              Explore Rooms
            </button>
          </Fade>
        </div>

        {/* Thumbnail Indicators */}
        <div className="absolute top-1/2 -translate-y-1/2 right-6 hidden lg:flex flex-col gap-4 z-20">
          {sliders.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlider(index)}
              className={`w-4 h-4 rounded-full cursor-pointer transition-all ${
                currentSlider === index
                  ? "bg-yellow-500 transform scale-125"
                  : "bg-gray-600 hover:bg-gray-400"
              }`}
            ></div>
          ))}
        </div>

        {/* Mobile Thumbnail Indicators */}
        <div className="absolute bottom-6 flex justify-center items-center w-full lg:hidden gap-4 z-20">
          {sliders.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlider(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                currentSlider === index
                  ? "bg-yellow-500 transform scale-125"
                  : "bg-gray-600 hover:bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedSlider;



