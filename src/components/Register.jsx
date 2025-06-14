import axios from 'axios'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { apiEndpoints, ROUTES } from '../constants'

function Register() {
    const [userData, setUserData] = useState({
        uname: '',
        uemail: '',
        upassword: ''
    })

    const handleInputChange = (e) =>{
        e.preventDefault()
        const {name, value} = e.target
        setUserData({
            ...userData,
            [name] : value
        })
    }

    const handleFormSubmit = async() =>{
        try {
            const res = await axios.post(`${apiEndpoints.registerUser}`, userData)
            console.log('res:', res)
        } catch (error) {
            console.log('Error signing in:', error)
        }
    }

  return (
    <div className='flex justify-center items-center h-screen bg-amber-200'>
        <div className="bg-blue-100 shadow-md p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">Registration</h2>

            <input type="text" name='uname' placeholder='Enter username' required 
            className='w-full p-2 border rounded mb-3' onChange={handleInputChange} />
            <input type="email" name='uemail' placeholder='Enter email' required 
            className='w-full p-2 border rounded mb-3' onChange={handleInputChange} />
            <input type="password" name='upassword' placeholder='Enter password' required 
            className='w-full p-2 border rounded mb-3' onChange={handleInputChange} />

            <button className='w-full bg-blue-400 p-2 border rounded text-white font-bold  hover:bg-green-700'
            onClick={handleFormSubmit}>Register</button>

            <p className='mt-3 text-center'>Do you have account?{" "}
                <Link to={`${ROUTES.LOGIN}`} className="text-blue-500 hover:underline">Login here</Link>
            </p>
        </div>
    </div>
  )
}

export default Register