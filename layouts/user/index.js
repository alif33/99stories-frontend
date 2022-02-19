import React, { useEffect } from 'react'
import Navbar from '../../components/dashboard/users/Navbar'
import Sidebar from '../../components/dashboard/users/Sidebar'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';

const Layout = ({ children }) => {
    const { users } = useSelector(state=>state)
    const router = useRouter()

    // useEffect(()=>{
    //     !users?.isUser && router.push('/')
    // },[])

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