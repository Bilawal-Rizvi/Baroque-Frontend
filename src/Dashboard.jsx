import React from 'react'
import { useAuth } from './Context/Authcontext'

function Dashboard() {
    const {user,token}= useAuth();
    if (!user || !token) {
        return <div>Loading...</div>;
    }
  return (
<>
    <div>Dashboard</div>
    <p>Name:{user.name}</p>
    <p>Email:{user.email}</p>
    <p>Token:{token}</p>
</>
  )
}

export default Dashboard;