import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Website Name and Copyright */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl font-bold">Modern Hotel Booking</h1>
                        <p className="mt-2 text-sm">© 2024 Modern Hotel Booking. All rights reserved.</p>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-xl font-semibold">Contact Us</h3>
                        <ul className="mt-4 space-y-2">
                            <li>Email: <a href="mailto:info@modernhotel.com" className="text-blue-400 hover:text-blue-500">info@modernhotel.com</a></li>
                            <li>Phone: <a href="tel:+1234567890" className="text-blue-400 hover:text-blue-500">+1 (234) 567-890</a></li>
                        </ul>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h3 className="text-xl font-semibold">Useful Links</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="/about" className="text-blue-400 hover:text-blue-500">About Us</a></li>
                            <li><a href="/privacy-policy" className="text-blue-400 hover:text-blue-500">Privacy Policy</a></li>
                            <li><a href="/terms-of-service" className="text-blue-400 hover:text-blue-500">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex flex-col">
                        <h3 className="text-xl font-semibold">Follow Us</h3>
                        <div className="mt-4 flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                                <FaFacebook size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
