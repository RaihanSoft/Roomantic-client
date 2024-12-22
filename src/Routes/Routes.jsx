import Home from '../Components/Pages/Home/Home';
import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../Components/MainLayout/MainLayout';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import ForgotPassword from '../Components/ForgotPassword/ForgotPassword';
import ErrorPage from '../Components/Error/ErrorPage';
import { Helmet } from 'react-helmet-async';
import MyBookings from '../Components/MyBookings/MyBookings';
import Rooms from '../Components/Rooms/Rooms';
import RoomDetails from '../Components/RoomDetails/RoomDetails';

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
                        </Helmet>
                        <Rooms />
                    </>
                )
            },
            {

                path: "/rooms/:id",
                element: (
                    <PrivateRoute>
                        <Helmet>
                        </Helmet>
                        <RoomDetails />
                    </PrivateRoute>
                ),

            },
            {
                path: '/myBookings',
                element: (
                    <PrivateRoute>
                        <Helmet>
                        </Helmet>
                        <MyBookings />
                    </PrivateRoute>
                )
            },
            {
                path: '/',
                element: (
                    <>
                        <PrivateRoute>
                            <Helmet>
                                <title> </title>
                                <meta name="description" content="View and manage visas you have added to the platform. Login required." />
                            </Helmet>
                            <MyBookings />
                        </PrivateRoute>
                    </>
                )
            },
            {
                path: '/',
                element: (
                    <PrivateRoute>
                        <Helmet>
                            <title> </title>
                            <meta name="description" content="Track your visa applications and stay updated on their status. Login required." />
                        </Helmet>
                        <MyBookings />
                    </PrivateRoute>
                )
            },
            {
                path: '/login',
                element: (
                    <>
                        <Helmet>
                            <title>Login </title>
                            <meta name="description" content="Login to your Sunflower VISA Navigator account to access exclusive features." />
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
                            <meta name="description" content="Reset your password securely to regain access to your Sunflower VISA Navigator account." />
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
                            <meta name="description" content="Create an account with Sunflower VISA Navigator to start your visa journey today!" />
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
