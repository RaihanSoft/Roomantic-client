/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

export const Context = createContext();

export const Provider = ({ children }) => {
    const Googleprovider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const [visa, setVisa] = useState({});


    // Register
    const handleRegister = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login
    const handleLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Signout
    const handleLogOut = () => {
        signOut(auth);
    };

    // Google LogIn
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, Googleprovider);
            const userData = result.user;
            setUser({
                ...userData,
                displayName: userData.displayName,
                email: userData.email,
                photoURL: userData.photoURL,
            });
        } catch (error) {
            console.error("Error during Google login:", error);
        }
    };

    // Update Profile
    const manageProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image,
        }).then(() => {

            setUser({
                ...auth.currentUser,
                displayName: name,
                photoURL: image,
            });
        });
    };

    // Observer
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser({
                    ...currentUser,
                    photoURL: currentUser.photoURL,
                });
            } else {
                setUser(null);
            }
            console.log("captured user", currentUser?.email);
            if (currentUser?.email) {
                const user = { email: currentUser.email };

                axios.post('https://mordern-hotel-booking-platform-server.vercel.app/jwt', user, {withCredentials:true})
                .then(res=> {
                    console.log("login",res.data)
                    setLoading(false);
                })
            }
            else{
                axios.post('https://mordern-hotel-booking-platform-server.vercel.app/logout', {}, {withCredentials:true})
                .then(res=> {
                    console.log("logout",res.data)
                    setLoading(false);
                })
            }



        

            return () => {
                unSubscribe();
            };
        });
    }, []);

    const authInfo = {
        handleRegister,
        handleLogin,
        handleLogOut,
        handleGoogleLogin,
        manageProfile,
        user,
        setUser,
        loading,
        visa,
        setVisa
    };

    return (
        <Context.Provider value={authInfo}>
            {children}
        </Context.Provider>
    );
};
