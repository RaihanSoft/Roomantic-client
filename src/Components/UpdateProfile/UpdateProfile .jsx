import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Provider/Provider";
import Swal from "sweetalert2";

const UpdateProfile = () => {
    const { user, manageProfile, setUser } = useContext(Context);
    const [name, setName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await manageProfile(name, photoURL);

            setUser((prevUser) => ({
                ...prevUser,
                displayName: name,
                photoURL,
            }));

            Swal.fire({
                icon: "success",
                title: "Profile Updated",
                text: "Your profile has been updated successfully!",
                timer: 1200,
                showConfirmButton: false,
            });

            navigate("/myProfile");
        } catch (error) {
            const errorMessage =
                error.message.includes("auth/invalid-profile-attribute")
                    ? "Photo URL is invalid or too long."
                    : "Failed to update profile. Please try again.";
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: errorMessage,
                timer: 2000,
                showConfirmButton: false,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-bl from-gray-800 via-indigo-900 to-black text-white">
            <form
                onSubmit={handleUpdate}
                className="w-full max-w-md bg-gradient-to-r from-indigo-700 via-purple-800 to-blue-900 p-8 rounded-2xl shadow-lg"
            >
                <h2 className="text-3xl font-bold mb-6 text-center">Update Profile</h2>

                {/* Name Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-400 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                {/* Photo URL Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Photo URL</label>
                    <input
                        type="url"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-400 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter photo URL"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full px-6 py-2 mt-4 text-lg font-semibold text-white rounded-lg transition-colors ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                        }`}
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Information"}
                </button>
            </form>
        </div>
    );
};

export default UpdateProfile;
