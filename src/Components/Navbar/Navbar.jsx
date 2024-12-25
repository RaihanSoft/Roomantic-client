import logo from "../assets/logo.webp";
import { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Context } from "../Provider/Provider";

const Navbar = () => {
    const { user, handleLogOut } = useContext(Context);
    const [showWelcome, setShowWelcome] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    console.log(showWelcome)
    useEffect(() => {
        if (user && user.email) {
            setShowWelcome(true);
        }
    }, [user]);

    const links = (
        <div className="text-lg flex-col xl:flex-row flex items-center justify-center ml-14 font-medium space-y-2 lg:space-x-8 lg:space-y-0">
            <NavLink
                className={({ isActive }) =>
                    isActive ? "bg-black text-white p-2 rounded-md" : "hover:underline"
                }
                to="/"
                onClick={() => setIsMenuOpen(false)}
            >
                Home
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive ? "bg-black text-white p-2 rounded-md" : "hover:underline"
                }
                to="/Rooms"
                onClick={() => setIsMenuOpen(false)}
            >
                Rooms
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive ? "bg-black text-white p-2 rounded-md" : "hover:underline"
                }
                to="/myBookings"
                onClick={() => setIsMenuOpen(false)}
            >
                My Bookings
            </NavLink>

            {
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "bg-black text-white p-2 rounded-md" : "hover:underline"
                    }
                    to="/about-us"
                    onClick={() => setIsMenuOpen(false)}
                >
                    About Us
                </NavLink>


            }
            <NavLink
                className={({ isActive }) =>
                    isActive ? "bg-black text-white p-2 rounded-md" : "hover:underline"
                }
                to="/contact-us"
                onClick={() => setIsMenuOpen(false)}
            >
                Contact Us
            </NavLink>
        </div>


    );

    return (
        <header className="sticky top-0 z-[2000] backdrop-blur-xl bg-white bg-opacity-45 shadow-lg">

            {/* Navbar */}
            <div className="w-11/12 mx-auto flex justify-between py-2 ">
                {/* Logo */}
                <Link to={'/'}>
                    <div className="flex items-center animate__bounceInDown">
                        <img className="w-full  h-12 " src={logo} alt="Logo" />
                    </div>
                </Link>
                        <div className="text-center flex items-center justify-center text-xl font-bold" >  <h2>Hotel Haven</h2></div>

                {/* Links for larger screens */}
                <div className="hidden xl:flex flex-1 justify-start">{links}</div>




                <div className="flex items-center justify-center gap-4">


                    {/* User Section */}

                    <div className="flex items-center space-x-4">
                        {user && user.email ? (
                            <div className="relative group flex items-center space-x-3">
                                {/* User Photo */}
                                <img
                                    className="h-10 w-10 rounded-full cursor-pointer border-2 border-gray-300"
                                    src={user.photoURL}
                                    alt="User"
                                />

                                {/* Display Name and Logout Button - both visible on hover */}
                                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-28 bg-white border border-gray-300 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-2">
                                    <span className="block text-gray-700 font-medium">{user.displayName}</span>
                                    <button
                                        onClick={handleLogOut}
                                        className="mt-2 px-2 py-1 bg-black text-white rounded-md"
                                    >
                                        Log-Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <NavLink to="/login">
                                <button className="px-2 sm:px-4 ml-2 py-2 bg-black text-white rounded-md">
                                    Login
                                </button>
                            </NavLink>
                        )}
                    </div>

                    {!user && (
                        <div>
                            <NavLink to="/register">
                                <button className="px-2 sm:px-4 py-2 bg-black text-white rounded-md">
                                    Register
                                </button>
                            </NavLink>
                        </div>
                    )}

                    {/* Hamburger Menu */}
                    <div className="xl:hidden relative">
                        <button
                            className="text-black focus:outline-none  "
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </button>

                        {/* Dropdown Menu for small screens */}
                        {isMenuOpen && (
                            <div className="absolute right-0  mt-2 bg-white border rounded-lg shadow-lg z-10 p-4">
                                {links}

                            </div>
                        )}
                    </div>
                </div>





            </div>
        </header>



    );
};

export default Navbar;
