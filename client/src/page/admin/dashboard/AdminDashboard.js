import React from 'react'
import Header from '../../../component/admin/admin-header/Header'
import SideNavbar from '../../../component/admin/admin-sidenavbar/SideNavbar'
import {Outlet} from "react-router-dom"

const AdminDashboard = () => {
  return (
    <>
        {/* header  */}
        <Header/>
        {/* header end  */}

        {/* main content  */}
        <div className='grid grid-cols-12'>
            {/* SideNavbar  */}
            <div className='col-span-2'>
                    <SideNavbar/>
            </div>
            {/* SideNavbar end */}

            {/* outlet  */}
            <div className='col-span-10 bg-slate-50 p-4'>
                <Outlet/>
            </div>
        </div>

    </>
  )
}

export default AdminDashboard