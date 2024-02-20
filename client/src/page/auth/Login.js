import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { server } from "../../App";
import { useNavigate } from "react-router-dom";
import NET from 'vanta/dist/vanta.net.min'
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [vantaEffect, setVantaEffect] = useState(null)
  const myRef = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(NET({
        el: myRef.current
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // if (!email || !password) {
      //   alert("Please enter both email and password.");
      //   return;
      // }
  
      // LOGIN
      const response = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );
  
      const { data } = response;
      const { success, message } = data;
  
      if (success) {
        alert(message);
        // Navigate to the dashboard
        navigate("../dashboard");
      } else {
        // Handle unsuccessful login
        alert(message);
      }
    } catch (error) {
  
      // Handle specific error cases if needed
      if (error.response) {
        // The request was made, but the server responded with a status code outside the 2xx range
        alert( error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error setting up the request:", error.message);
      }
    }
  };


  
  
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-4 bg-slate-200 p-4 flex items-center" ref={myRef}>
        <div className="mx-auto ">
          <span className=" text-8xl font-bold text-slate-100">
            Blurock <br />
          </span>
          <span className="text-slate-100">The Wealth Management</span>
        </div>
      </div>
      <div className="col-span-8 bg-slate-50 flex items-center justify-center" >
        {/* log in form  */}

        <form
          className="bg-white p-4 rounded shadow-lg w-84 mx-auto "
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
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm  mb-2 text-left"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-64 bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900    mx-auto font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
          <div className="flex items-center justify-between">
              <span className="w-full text-end mt-1 text-sm cursor-pointer">Forgot Password?</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
