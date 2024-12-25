import Home from '../Components/Pages/Home/Home';
import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../Components/MainLayout/MainLayout';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import ForgotPassword from '../Components/ForgotPassword/ForgotPassword';
import ErrorPage from '../Components/Error/ErrorPage';
import MyBookings from '../Components/MyBookings/MyBookings';
import Rooms from '../Components/Rooms/Rooms';
import RoomDetails from '../Components/RoomDetails/RoomDetails';
import AboutUs from '../Components/AboutUs/AboutUs';
import ContactUs from '../Components/ContactUs/ContactUs';
import { Helmet } from 'react-helmet-async';

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <MainLayout />
        ),
        children: [
            {
                path: "/",
                element: (
                    <>
                        <Helmet>
                            <title>Hotel Haven - Your Perfect Stay Awaits</title>
                            <meta
                                name="description"
                                content="Welcome to HotelHaven. Discover luxury and comfort with exclusive offers on your next booking."
                            />
                        </Helmet>
                        <Home />
                    </>
                )
            },
            {
                path: '/Rooms',
                element: (
                    <>
                        <Helmet>
                        <title>Explore Rooms - Hotel Haven</title>
            
                        </Helmet>
                        <Rooms />
                    </>
                )
            },
            {

                path: "/rooms/:id",
                element: (
                    <>

                        <Helmet>
                        <title>Room Details - Hotel Haven</title>
                        </Helmet>
                        <RoomDetails />
                    </>

                ),

            },


            {
                path: '/myBookings',
                element: (
                    <PrivateRoute>
                        <Helmet>
                        <title>My Bookings - Hotel Haven</title>
                        </Helmet>
                        <MyBookings />
                    </PrivateRoute>
                )
            },
            {
                path: '/about-us',
                element: (
                    <>

                        <Helmet>
                            <title>About Us - Hotel Haven </title>
                            <meta name="description" content="View and manage visas you have added to the platform. Login required." />
                        </Helmet>
                        <AboutUs />

                    </>
                )
            },
            {
                path: '/contact-us',
                element: (
                    <>
                        <Helmet>
                        <title>Contact Us - Hotel Haven </title>
                            <meta name="description" content="Track your visa applications and stay updated on their status. Login required." />
                        </Helmet>
                        <ContactUs />
                    </>
                )
            },
            {
                path: '/login',
                element: (
                    <>
                        <Helmet>
                            <title>Login </title>
                        </Helmet>
                        <Login />
                    </>
                )
            },
            {
                path: "/forgot-password",
                element: (
                    <>
                        <Helmet>
                            <title>Forgot Password r</title>
                        </Helmet>
                        <ForgotPassword />
                    </>
                )
            },
            {
                path: '/register',
                element: (
                    <>
                        <Helmet>
                            <title>Register </title>
                        </Helmet>
                        <Register />
                    </>
                )
            },

        ]
    },
    {
        path: "*",
        element: (
            <>
                <ErrorPage />
                <Helmet>
                    <title>404 Not Found </title>
                    <meta name="description" content="The page you are looking for does not exist. Return to the homepage." />
                </Helmet>
            </>
        )
    },
]);


