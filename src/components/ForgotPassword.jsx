import axios from 'axios'
import React, { useState } from 'react'
import {Link} from "react-router-dom"
import { Toast } from '../utils/Toast'
import { apiEndpoints } from '../constants'

const ResetPassword = () => {
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")

    const handlePasswordForgotBtn = async()=>{
        try {
            const response = await axios.post(`${apiEndpoints.forgotPassword}`,{
                email
            })
            Toast(response.data.msg, "success")
            console.log("res:", response)
        } catch (error) {
            console.log('error:', error)
        }
    }

  return (
    <div className='flex justify-center items-center h-screen bg-amber-200'>
        <div className='bg-white shadow-md p-6 w-96 rounded-lg'>
            <h2 className="text-2xl font-bold text-center mb-4">Forgot Password!!</h2>

            <input type='email' name='uemail' placeholder='Enter email id' className='w-full border rounded mb-3 p-2' 
            onChange={(e)=> setEmail(e.target.value)}/>

            <button className='w-full bg-blue-800 font-bold text-white hover:bg-blue-600 p-2 rounded uppercase'
            onClick={handlePasswordForgotBtn}>Reset Now</button>

            <p className='mt-3 text-center'>Doesn't have account?{" "}
                            <Link to={"/register"} className="text-blue-500 hover:underline">Register</Link>
                        </p>
        </div>
    </div>
  )
}

export default ResetPassword