import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../../App'

const ReportHistory = () => {
    // const [profile, setProfile] =  useState({})
    const [reportHistory, setReportHistory] = useState([])


    const id =  localStorage.getItem("id")

    console.log(id)

    // useEffect(() => {
    //     const myProfile = async () => {
    //       try {
    //         const response = await axios.get(`${server}/users/me`, {
    //           withCredentials: true,
    //         });
    
    //         setProfile(response.data.user);
    //       } catch (error) {
    //         console.error("Error fetching user profile:", error.message);
    //       }
    //     };
    
    //     myProfile();
    //   }, []);  

    console.log(`${server}/reportTask/${id}`)
    //load history 
    useEffect(()=>{
        const taskReportHistory = async()=>{
                const data = await axios.get(`${server}/reportTask/${id}`)

                console.log(data)
        }

        //invoke 
        taskReportHistory()
    }, [])
  return (
    <div>ReportHistory</div>
  )
}

export default ReportHistory