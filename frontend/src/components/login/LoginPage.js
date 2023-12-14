import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const changehandleLogin = async () => {
    const response = await axios.post(
      "http://localhost:4000/api/v1/users/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const {success, user} = response.data
<<<<<<< HEAD
    console.log(success)
    console.log(user)
      
=======
    console.log(success);
    console.log(user);
>>>>>>> 6f4f080f29800f5424f3156c3c15d71392fc7b4e
    if(success){
      navigate("../dashboard")
    }

<<<<<<< HEAD
=======
    //redirect to dashboard
    
>>>>>>> 6f4f080f29800f5424f3156c3c15d71392fc7b4e
    
  };

  return (
    <form>
      <div className="flex">
        <div className="bg-slate-900 h-screen flex items-center w-[35rem]">
          <div className="mx-auto">
            <h1 className=" text-white text-9xl font-bold">LOGO</h1>
            <h3 className="text-white"> BLUROCK</h3>
          </div>
        </div>
        <div class="flex items-center w-full">
          <div class="h-auto w-96 bg-slate-100 mx-auto rounded-md shadow-md p-6">
            <h1 class="py-5 text-center text-xl font-bold">PERSON IMG</h1>
            <div class="mb-4">
              <label class="block text-left mb-1">
                Email<sup>*</sup>
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                class="w-full px-3 py-2 border rounded-md"
                type="email"
                placeholder="Email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="mb-4">
              <label class="block text-left mb-1">
                Password <sup>*</sup>{" "}
              </label>
              <input
                class="w-full px-3 py-2 border rounded-md"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={changehandleLogin}
              class="w-full bg-slate-900 text-white py-2 rounded-lg"
              type="button"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
