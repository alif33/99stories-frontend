import React, { useState } from 'react'
import { showErr } from '../helpers/ErrHandler'
import { postData } from '../helpers/HttpService'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/dist/client/router'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import Cookies from 'universal-cookie'
import { userLogin } from '../redux/users/actions'
import Layout from '../layouts/client'

const Signin = () => {
    const [ disable, setDisable ] = useState()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const cookies = new Cookies()
    const router = useRouter()
    const dispatch = useDispatch()
    const { users } = useSelector(state=>state)

    const onError = err => showErr(err)

    const onSubmit = data => {
       setDisable(true)
       postData('/user/login', data, setDisable)
        .then(res=>{
            if(res?.success)
            {  
                cookies.set('user_token', res.token, { path: '/' })
                dispatch(userLogin({
                    token: res.token,
                    user: res.user
                }))
                router.push('/dashboard')
            }
        })
    }

    return (
        <Layout>
            <section id="log-in">
                <div className="wrapper">
                    <h2 className="py-3">Sign In</h2>
                    <form onSubmit={handleSubmit(onSubmit, onError)}> 
                        <input 
                            {...register("email",
                                {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Please enter a valid email',
                                    }
                                }
                            )}
                            type="email" 
                            placeholder="Email adress" 
                        />
                        <input 
                            {...register("password",
                                {
                                    required: 'Password is required'
                                }
                            )}
                            type="password" 
                            placeholder="Password" 
                        />
                        <button 
                            disabled={disable}
                            type="submit"
                        >
                            <a href="#">Sign In</a>
                        </button>
                    </form>
                    <p><a href="#">Forgot password?</a></p>
                </div>
            </section>
        </Layout>
    )
}

export default Signin
