import React, { useEffect } from 'react'
import Navbar from '../../components/dashboard/admins/Navbar'
import Sidebar from '../../components/dashboard/admins/Sidebar'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'



const Layout = ({ children }) => {

	return (
		<>
            <Navbar />
            <ToastContainer />
            <section id="sec_1">
                <Sidebar />
                {children}
            </section>
		</>
	);
};

export default Layout;