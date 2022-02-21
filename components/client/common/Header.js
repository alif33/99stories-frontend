import React, { useState } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../../../redux/users/actions'
import { useRouter } from 'next/dist/client/router';


import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
const Header = () => {
    const cookie = require('cookie')
    const { users } = useSelector(state => state)
    const dispatch = useDispatch()
    const router = useRouter()
    const cookies = new Cookies();


    const handleLogOut = () => {
        cookies.remove('user_token', { path: '/' });
        if (!cookies.get('user_token')) {
          toast.success('Logout success')
          dispatch(userLogout())
          router.push('/signin')
        }
      }

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
                <Link href="/">
                    <a className="navbar-brand logo">99 stories</a>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars bar" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link href="/">
                                <a className={router.pathname == "/" ? "nav-link active" : "nav-link"} aria-current="page">Home</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/stories">
                                <a
                                    className={router.pathname == "/stories" ? "nav-link active" : "nav-link"}
                                    aria-current="page"
                                >Read</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/dashboard/stories">
                                <a
                                    className="nav-link"
                                >Write</a>
                            </Link>

                        </li>
                    </ul>
                    {
                        cookies.get('user_token') ? <div className="nav-button">
                            <Link href="/dashboard">
                                <a className="sign-in">
                                    Dashboard
                                </a>
                            </Link>

                            <a onClick={handleLogOut}>Sign out</a>
                        </div> : <div className="nav-button">
                            <Link href="/signin">
                                <a className="sign-in">
                                    Sign in
                                    <i className="fas fa-sign-in-alt" />
                                </a>
                            </Link>
                            <Link href="/signup">
                                <a>Sign Up</a>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Header;
