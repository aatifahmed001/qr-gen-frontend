import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './components/Dashboard'
import LinkQr from './components/LinkQr'
import AllLinkQR from './components/AllLinkQR'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import { ToastContainer} from 'react-toastify';
import {ROUTES} from './constants'

function App() {
  return (
    <>
      <Routes>
        <Route path={`${ROUTES.ROOT}`} element={<Login />}></Route>
        <Route path={`${ROUTES.REGISTER}`} element={<Register />}></Route>
        <Route path={`${ROUTES.LOGIN}`} element={<Login />}></Route>
        <Route path={`${ROUTES.FORGOT_PASSWORD}`} element={<ForgotPassword />}></Route>
        <Route path={`${ROUTES.RESET_PASSWORD}`} element={<ResetPassword />}></Route>

        <Route element={<ProtectedRoute />}>
          <Route path={`${ROUTES.DASHBOARD}`} element={<Dashboard />}></Route>
          <Route path={`${ROUTES.LINK_QR}`} element={<LinkQr />}></Route>
          <Route path={`${ROUTES.SHOW_QR}`} element={<AllLinkQR />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
      </>
  )
}

export default App