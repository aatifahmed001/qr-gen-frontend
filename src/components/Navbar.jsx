import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaTimes, FaBars} from 'react-icons/fa'
import axios from 'axios'
import { apiEndpoints, ROUTES } from '../constants'

const Navbar = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const handleLogout = async() =>{
        const authToken = localStorage.getItem('authToken')

        try {
            const response = await axios.get(`${apiEndpoints.logoutUser}`,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            })
            console.log('res:logout=>', response)
            localStorage.removeItem('authToken')
            navigate(`${ROUTES.LOGIN}`)
        } catch (error) {
            
        }
        
    }
  return (
    <nav className='bg-gray-800 p-4 shadow-md'>
        <div className="container flex mx-auto justify-between items-center">
            {/* logo */}
            <Link to={`${ROUTES.DASHBOARD}`} className='text-white text-xl font-bold font-serif'>QR Generator</Link>

            {/* desktop menu */}
            <ul className="hidden md:flex space-x-6 text-white">
                <li>
                    <Link to={`${ROUTES.DASHBOARD}`} className='hover:text-gray-400' >Dashboard</Link>
                </li>
                <li>
                    <Link to={`${ROUTES.LINK_QR}`} className='hover:text-gray-400' >Add QR</Link>
                </li>
                <li>
                    <Link to={`${ROUTES.SHOW_QR}`} className='hover:text-gray-400' >QR list</Link>
                </li>
                <li>
                    <button className='hover:text-gray-400 hover:cursor-pointer' onClick={handleLogout}>Logout</button>
                </li>
            </ul>

            {/* Mobile Menu Button */}
            <button className='text-white text-2xl md:hidden' onClick={()=> setIsOpen(!isOpen)}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>
        </div>

        {isOpen &&(
                <ul className="md:hidden bg-gray-800 p-4 space-y-6 text-white absolute left-0 w-full shadow-md">
                    <li>
                        <Link to={`${ROUTES.DASHBOARD}`} className='block py-2' onClick={()=>setIsOpen(false)} >Dashboard</Link>
                    </li>
                    <li>
                        <Link to={`${ROUTES.LINK_QR}`} className='block py-2' onClick={()=>setIsOpen(false)} >Add QR</Link>
                    </li>
                    <li>
                        <Link to={`${ROUTES.SHOW_QR}`} className='block py-2' onClick={()=>setIsOpen(false)} >QR list</Link>
                    </li>
                    <li>
                        <button className='block py-2 hover:cursor-pointer' onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            )}
    </nav>
  )
}

export default Navbar