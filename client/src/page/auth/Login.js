import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NET from "vanta/dist/vanta.net.min"; // Import Vanta.js effect
import logo from "../../assets/employee.png"; // Import logo image
import { login } from "../../Redux/slices/authSlice"; // Import login action from Redux
import { useDispatch } from "react-redux"; // Import useDispatch hook from Redux
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons for password visibility

const Login = () => {
  const dispatch = useDispatch(); // Initialize Redux dispatch function
  const navigate = useNavigate(); // Initialize React Router navigation
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [vantaEffect, setVantaEffect] = useState(null); // State for Vanta.js effect
  const [loading, setLoading] = useState(false); // State for loading spinner

  const myRef = useRef(null); // Reference for the Vanta.js effect

  useEffect(() => {
    // Initialize Vanta.js effect if not already active
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: myRef.current, // Attach effect to the element
          color: 0x0, // Set effect color
          waveHeight: 20, // Set wave height
          shininess: 50, // Set shininess level
          waveSpeed: 1.5, // Set wave speed
          zoom: 0.75, // Set zoom level
          backgroundColor: 0xffffff, // Set background color
        })
      );
    }
    // Clean up the Vanta effect on component unmount
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Show loading spinner

    try {
      // Dispatch login action from Redux slice
      const actionResult = await dispatch(login({ email, password }));
      
      // Check if login was successful
      if (actionResult.payload && actionResult.payload.success) {
        navigate("/dashboard/home"); // Navigate to the dashboard on success
      } else {
        alert(
          actionResult.error.message ||
            "Login failed. Please check your credentials."
        ); // Show error message
      }
    } catch (error) {
      console.error("Error occurred during login:", error.message);
      // Handle different error scenarios
      if (error.response) {
        alert(error.response.data.message); // Server response error
      } else if (error.request) {
        console.error("No response received from the server"); // No response error
      } else {
        console.error("Error setting up the request:", error.message); // Request setup error
      }
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden">
      {/* Left side with Vanta.js effect */}
      <div className="col-span-12 md:col-span-5 p-4 flex items-center" ref={myRef}>
        <div className="mx-auto text-center">
          <img src={logo} alt="brand logo" className="" /> {/* Responsive logo */}
          <p className="text-slate-900 text-center font-bold text-lg mt-4">
            Automate your work with us
          </p>
        </div>
      </div>
      {/* Right side with login form */}
      <div className="col-span-12 md:col-span-7 flex items-center justify-center border-l-2 border-gray-300 bg-gradient-to-r from-gray-100 to-white">
        <form
          className="bg-white p-6 rounded shadow-lg w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-semibold mb-6 text-center">LOGIN</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm mb-2 text-left font-semibold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-gray-700 text-sm mb-2 text-left font-semibold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Toggle visibility icon */}
            <div
              className="absolute inset-y-0 pt-7 right-0 pr-3 flex items-center cursor-pointer "
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="text-xl" />
              ) : (
                <AiOutlineEye className="text-xl" />
              )}
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <button
              className="flex-1 bg-slate-950 text-white py-2 px-4 rounded-md hover:bg-slate-800 disabled:bg-gray-400 flex items-center justify-center"
              type="submit"
              disabled={loading} // Disable button when loading
            >
              <span className="flex items-center">
                {loading ? (
                  <div className="flex items-center">
                    {/* Loader Spinner */}
                    <svg
                      className="animate-spin h-5 w-5 text-white mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Loading...
                  </div>
                ) : (
                  "Sign In"
                )}
              </span>
            </button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="w-full text-end text-sm cursor-pointer">
              Forgot Password?
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
