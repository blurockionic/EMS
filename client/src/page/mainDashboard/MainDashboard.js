// src/components/MainDashboard.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminDashboard from '../admin/dashboard/AdminDashboard';
import ManagerDashboard from '../manager/dashboard/ManagerDashboard';
import HrDashboard from '../HR/new/HrDashaboard'; // Ensure correct import path
import EmployeeDashboard from '../employee/EmployeeDashboard';
import { fetchProfile } from '../../Redux/slices/profileSlice';

const MainDashboard = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <div>
      {profile?.role === 'admin' && <AdminDashboard />}
      {profile?.role === 'manager' && <ManagerDashboard />}
      {profile?.role === 'human resources' && <HrDashboard />}
      {profile?.designationType === 'employee' && <EmployeeDashboard />}
    </div>
  );
};

export default MainDashboard;
