import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Toast } from '../utils/Toast'
import { useNavigate } from 'react-router-dom'
import { apiEndpoints } from '../constants'

const AllLinkQR = () => {
    const navigate = useNavigate()
    const [qrLinks, setQRLinks] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchQRLinks = async () => {
        try {
            const authToken = localStorage.getItem('authToken')
            const response = await axios.get(`${apiEndpoints.getQRLink}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    }
                }
            )
            console.log('resp:', response)
            setQRLinks(response.data)
            setLoading(false)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchQRLinks()
    }, [])

    if (loading) {
        <p>Loading QR Links</p>
    }

    const handleEditQR = (qr)=>{
        navigate('/linkqr', {state:{qrData: qr}})
    }

    const handleDeleteQR = async (qrId) => {
        try {
            const authToken = localStorage.getItem('authToken')
            const deleteQRResponse = await axios.get(`${apiEndpoints.deleteQRById}${qrId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            })

            if(deleteQRResponse.data.deleteStatus){
                Toast(deleteQRResponse.data.msg, "success")
                setQRLinks(qrLinks.filter(qr=> qr._id!== qrId))
            }else{
                Toast(deleteQRResponse.data.msg, "error")
            }
        } catch (error) {
            Toast(error, 'error')
        }
    }

    return (
        <div className='max-w-4xl mx-auto mt-10'>
            <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>My QR Links</h2>
            <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-200'>
                <thead className='bg-gray-800 text-white'>
                    <tr>
                        <th className='py-3 px-6 text-left'>QR Links</th>
                        <th className='py-3 px-6 text-left'>QR Color</th>
                        <th className='py-3 px-6 text-left'>QR Status</th>
                        <th className='py-3 px-6 text-center' colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {qrLinks.map((qr, idx) => (
                        <tr key={idx} className='border-b hover: bg-gray-100'>
                            <td className='py-3 px-6'>
                                <QRCodeCanvas
                                    value={qr.qrLink}
                                    size={90}
                                    fgColor={qr.qrColor}
                                    includeMargin={true}
                                />
                            </td>
                            <td className='py-3 px-6'>{qr.qrColor}</td>
                            <td className='py-3 px-6'>{qr.qr_status}</td>
                            <td className='py-3 px-6'>
                                <button className='bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-800 cursor-pointer'
                                    onClick={() => handleEditQR(qr)}>Edit</button>
                            </td>
                            <td className='py-3 px-6'>
                                <button className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 cursor-pointer'
                                    onClick={() => handleDeleteQR(qr._id)}>Delete</button>
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default AllLinkQR