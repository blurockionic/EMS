import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../../../App'

const Header = () => {
  const [profile, setProfile] = useState({})
  //get profile 
  useEffect(()=>{
      const myProfile =async()=>{
          const response = await axios.get(`${server}/users/me`,{withCredentials: true})

          setProfile(response.data.user)
        }
        
        //invoke 
        myProfile()
      },[])
      
  return (
    <div><header className="bg-slate-800 text-white p-4 flex justify-between items-center">
    <div>
      <h1 className="text-2xl font-semibold">Blurock</h1>
    </div>
    <div >
      <div
        className=" text-white px-4 py-2 rounded-md uppercase"
      >
       {profile.name}
      </div>
    </div>
  </header></div>
  )
}

export default Header