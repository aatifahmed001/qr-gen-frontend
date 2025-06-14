import React, { useState, useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { apiEndpoints } from '../constants'

const LinkQr = () => {
    const qRef = useRef()
    const location = useLocation()
    const qrData = location.state?.qrData || null
    console.log('qrData:', qrData)

    const [qrLink, setQRLink] = useState(qrData ? qrData.qrLink : null)
    const [qrColor, setQRColor] = useState(qrData ? qrData.qrColor : "#000000")


    const downloadQR = () => {
        console.log('qRef:', qRef)

        const canvas = qRef.current.querySelector("canvas")
        console.log('canvas:', canvas)
        const url = canvas?.toDataURL("image/png")
        const a = document.createElement("a")
        a.href = url
        a.download = "qrcode.png"
        a.click()
    }

    const saveQR = async () => {
        const utoken = localStorage.getItem('authToken')
        try {
            let response
            if (qrData) {
                response = await axios.post(`${apiEndpoints.editQRById}${qrData._id}`, {
                    qrLink: qrLink,
                    qrColor: qrColor
                },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${utoken}`
                        }
                    }
                )
            } else {
                response = await axios.post('http://localhost:5000/userapi/addLinkQR', {
                    qrLink: qrLink,
                    qrColor: qrColor
                },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${utoken}`
                        }
                    }
                )
            }
            console.log('res:', response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
            <h1 className='text-2xl font-bold mb-4'>Generate URL QR</h1>

            <input type='text' value={qrLink || ''} placeholder='Enter your URL here'
                className='mb-2 p-2 border rounded w-80'
                onChange={(e) => setQRLink(e.target.value)} />

            <label className='mb-1 text-gray-700 font-medium'>Select QR Color:</label>
            <input
                type='color'
                value={qrColor}
                className='mb-4 hover:cursor-pointer'
                onChange={(e) => setQRColor(e.target.value)}
            />

            <div ref={qRef} className='bg-white p-2 rounded-lg shadow-lg'>
                <QRCodeCanvas
                    value={qrLink}
                    size={300}
                    fgColor={qrColor}
                    includeMargin={true}
                />
            </div>
            <div className='mt-4 flex gap-4'>
                <button className='px-4 py-2 w-36 bg-green-600 text-white hover:bg-green-900 transition hover:cursor-pointer border rounded'
                    onClick={saveQR}>Save QR</button>
                <button className='px-4 py-2 w-36 bg-blue-600 text-white hover:bg-blue-900 transition hover:cursor-pointer border rounded'
                    onClick={downloadQR}>Download</button>
            </div>
        </div>
    )
}

export default LinkQr