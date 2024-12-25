const Footer = () => {
  return (
    <footer className=" mt-10 bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          {/* Logo and Description */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Modern Hotel Booking</h2>
            <p className="text-gray-400">Experience luxury and comfort in the heart of the city. Book your stay with us today!</p>
          </div>
          {/* Quick Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
            <ul>
              <li><a href="/rooms" className="text-gray-400 hover:text-white">Rooms</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="/faq" className="text-gray-400 hover:text-white">FAQ</a></li>
            </ul>
          </div>
          {/* Contact Information */}
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <p className="text-gray-400">123 Main Street, City, Country</p>
            <p className="text-gray-400">Phone: (123) 456-7890</p>
            <p className="text-gray-400">Email: info@modernhotel.com</p>
          </div>
        </div>
        {/* Social Media Links */}
        <div className="flex justify-center mt-6">
          <a href="https://facebook.com" className="text-gray-400 hover:text-white mx-2">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" className="text-gray-400 hover:text-white mx-2">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" className="text-gray-400 hover:text-white mx-2">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" className="text-gray-400 hover:text-white mx-2">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        {/* Copyright */}
        <div className="text-center mt-6 text-gray-400">
          &copy; {new Date().getFullYear()} Modern Hotel Booking. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
