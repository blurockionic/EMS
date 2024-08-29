import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NET from "vanta/dist/vanta.net.min";
import logo from "../../assets/employee.png";
import { login } from "../../Redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const dispatch = useDispatch(); // Redux dispatch function for dispatching actions
  const navigate = useNavigate(); // React Router hook for navigation
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [vantaEffect, setVantaEffect] = useState(null); // State for Vanta.js effect
  const [loading, setLoading] = useState(false); // State for loading spinner

  const myRef = useRef(null); // Ref for Vanta.js effect
  useEffect(() => {
    // Initialize Vanta.js effect
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: myRef.current,
          color: 0x0, // Color of the Vanta effect
          waveHeight: 20,
          shininess: 50,
          waveSpeed: 1.5,
          zoom: 0.75,
          backgroundColor: 0xffffff,
        })
      );
    }
    // Clean up Vanta.js effect on component unmount
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Show loading spinner

    try {
      // Dispatch login action from authSlice
      const actionResult = await dispatch(login({ email, password }));
      // Check if login was successful based on action result
      if (actionResult.payload && actionResult.payload.success) {
        // alert(actionResult.payload.message); // Show success message
        navigate("/dashboard"); // Navigate to dashboard on successful login
      } else {
        alert(
          actionResult.error.message ||
            "Login failed. Please check your credentials."
        ); // Show error message
      }
    } catch (error) {
      console.error("Error occurred during login:", error.message);
      // Handle specific error cases if needed
      if (error.response) {
        alert(error.response.data.message); // Handle server response error
      } else if (error.request) {
        console.error("No response received from the server"); // Handle no response error
      } else {
        console.error("Error setting up the request:", error.message); // Handle request setup error
      }
    } finally {
      setLoading(false); // Hide loading spinner after attempt
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-4 p-4 flex items-center" ref={myRef}>
        <div className="mx-auto">
          <img src={logo} alt="brand logo" />
          <p className="text-slate-900 text-center font-bold">
            Automate your work with us
          </p>
        </div>
      </div>
      <div className="col-span-8 flex items-center justify-center border-l-2 border-gray-300 bg-gradient-to-r from-gray-100 to-white">
        {/* Login form */}
        <form
          className="bg-white p-4 rounded shadow-lg w-2/5 h-2/3 mx-auto"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-semibold mb-4 text-center">LOGIN</h2>
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
            <div
              className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="text-xl" />
              ) : (
                <AiOutlineEye className="text-xl" />
              )}
            </div>
          </div>
          <div className="mt-24 flex items-center justify-between">
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

          <div className="flex items-center justify-between">
            <span className="w-full text-end mt-1 text-sm cursor-pointer">
              Forgot Password?
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
