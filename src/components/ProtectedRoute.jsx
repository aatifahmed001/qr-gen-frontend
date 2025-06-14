import { Navigate, Outlet } from "react-router-dom"

import {jwtDecode} from 'jwt-decode'
import Navbar from "./Navbar"

const ProtectedRoute = () =>{
    const authToken = localStorage.getItem('authToken')
    if(!authToken) return <Navigate to='/login' />
    
    try {
        const decodeToken = jwtDecode(authToken)
        const currentTime = Math.floor(Date.now()/1000)

        if(decodeToken.exp < currentTime){
            localStorage.removeItem(authToken)
            return <Navigate to='/login' />
        }else{
            return (
                <>
                <Navbar />
                <Outlet />
                </>
            )
        }
    } catch (error) {
        localStorage.removeItem('authToken')
        return <Navigate to='/login' />
    }
}

export default ProtectedRoute