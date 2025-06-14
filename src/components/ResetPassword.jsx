import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Toast } from '../utils/Toast'
import { apiEndpoints } from '../constants'

const ResetPassword = () => {
    const {token} = useParams()
    const [error, setError] = useState("")
    const [password, setPassword] = useState("")

    const handleResetPassword = async() =>{
        try {
            const response = await axios.post(`${apiEndpoints.resetPasswordByToken}${token}`,{
                password
            })
            if(response.data.resetStatus){
                Toast(response.data.msg, "success")
            }else{
                Toast(response.data.msg, "error")
            }
            // console.log('response:', response)
        } catch (error) {
            Toast(error, "error")
            console.log('error:', error)
        }
    }

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
        {token}
        <div className='bg-white shadow-md p-6 w-96 rounded-lg'>
            <h2 className="text-2xl font-bold text-center mb-4">Set New Password!!</h2>

            <input type='password' name='password' placeholder='Enter new Password' className='w-full border rounded mb-3 p-2' 
            onChange={(e)=>setPassword(e.target.value)}/>

            <button className='bg-blue-800 font-bold text-white hover:bg-blue-600 p-2 w-full rounded uppercase'
            onClick={handleResetPassword}>Reset Now</button>
        </div>
    </div>
  )
}

export default ResetPassword