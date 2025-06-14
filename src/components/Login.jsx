import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { Toast } from '../utils/Toast';
import { apiEndpoints, ROUTES } from '../constants';

function Login() {
    const navigate = useNavigate()
    const [userdt, setUserdt] = useState({
        uemail: '',
        upassword: ''
    })
    const [error, setError] = useState('')

    const handleInputChange = (e) =>{
        const {name, value} = e.target

        setUserdt({
            ...userdt,
            [name]: value
        })
    }

    const handleFormSubmit = async (e) =>{
        e.preventDefault()
        try {
            const res = await axios.post(`${apiEndpoints.loginUser}`, userdt)
            console.log('res:', res)
            if(res.data.loginStatus === '0'){
                Toast(res.data.msg, "success")
                localStorage.setItem('authToken', res.data?.authToken)
                navigate(`${ROUTES.DASHBOARD}`)
            }else{
                Toast(res.data.msg, "error")
                setError(res.data.msg)
            }
            
        } catch (error) {
            Toast(error, "error")
            console.log('Loggin error:', error)
        }
    }

  return (
    <div className='flex justify-center items-center h-screen bg-amber-200'>
        <div className="bg-blue-100 shadow-md p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

            <input type="email" name='uemail' placeholder='Enter email' required 
            className='w-full p-2 border rounded mb-3' onChange={handleInputChange} />
            <input type="password" name='upassword' placeholder='Enter password' required 
            className='w-full p-2 border rounded mb-3'onChange={handleInputChange} />

            <button onClick={handleFormSubmit} className='w-full bg-cyan-400 p-2 border rounded text-white font-bold  hover:bg-green-700'>Login</button>

            <p className='mt-3 text-center'>Doesn't have account?{" "}
                <Link to={"/register"} className="text-blue-500 hover:underline">Register</Link>
            </p>
            <p className='mt-3 text-center'>Forgot Password?{" "}
                <Link to={`${ROUTES.FORGOT_PASSWORD}`} className="text-blue-500 hover:underline">Click Here</Link>
            </p>
        </div>
    </div>
  )
}

export default Login