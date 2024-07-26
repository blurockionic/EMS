import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { server } from "../../App";
import { useNavigate } from "react-router-dom";
import NET from "vanta/dist/vanta.net.min";
import logo from "../../assets/employee.png";
import { login } from "../../Redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: myRef.current,
          color: 0x0,
          waveHeight: 20,
          shininess: 50,
          waveSpeed: 1.5,
          zoom: 0.75,
          backgroundColor: 0xffffff,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dispatch login action from authSlice
      const actionResult = await dispatch(login({ email, password }));

      // Check if login was successful based on action result
      console.log(actionResult);
      if (actionResult.payload && actionResult.payload.success) {
        // Handle success
        alert(actionResult.payload.message);
        navigate("/dashboard"); // Navigate to dashboard on successful login
      } else {
        // Handle failure
        alert(
          actionResult.error.message ||
            "Login failed. Please check your credentials."
        );
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
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-4 p-4 flex items-center " ref={myRef}>
        <div className="mx-auto">
          <img src={logo} alt="brand logo" />
          {/* <span className=" text-8xl font-bold text-slate-100">
            Blurock <br />
          </span> */}
          <p className="text-slate-900 text-center font-bold">
            Automate your work with us
          </p>
        </div>
      </div>
      <div className="col-span-8  flex items-center justify-center border-l-2 border-gray-300 bg-gradient-to-r from-gray-100  to-white">
        {/* log in form  */}

        <form
          className="bg-white p-4 rounded shadow-lg w-2/5 h-2/3 mx-auto "
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-semibold mb-4 text-center">LOGIN</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm mb-2 text-left"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
              className="block text-gray-700 text-sm  mb-2 text-left"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
              {showPassword ? <AiOutlineEyeInvisible className="text-xl" /> : <AiOutlineEye  className="text-xl"/>}
            </div>
          </div>
          <div className=" mt-32 flex items-center justify-between">
            <button
              className="w-64 bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 hover:from-indigo-400 mx-auto font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
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
