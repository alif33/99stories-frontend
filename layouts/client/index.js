import Head from 'next/head'

import { ToastContainer } from 'react-toastify'
import Header from '../../components/client/common/Header'
import Footer from '../../components/client/common/Footer'


const Layout = ({ children }) => {

	return (
		<div>
			<Head>
				<meta charSet="UTF-8" />
				<meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=0' />
				<meta name="keywords" content="MVPT, SASS, Digital ocean" />
				<title>VIN-MVP landing page...</title>
			</Head>
			<ToastContainer />
            <Header />
                {children}
            <Footer />
		</div>
	);
};

export default Layout;