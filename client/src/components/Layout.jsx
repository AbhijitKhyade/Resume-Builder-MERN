import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

export default function Layout() {
    const currentUser = useSelector(state => state.user.currentUser);
    return (
        currentUser ? <Outlet /> : <Navigate to={'/sign-in'} />
    )
}
