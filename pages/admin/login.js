import React, { useState } from 'react'
import { showErr } from '../../helpers/ErrHandler'
import { postData } from '../../helpers/HttpService'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/dist/client/router'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import { adminLogin } from '../../redux/admins/actions'
import Layout from '../../layouts/client'
import Cookies from 'universal-cookie'


const Login = () => {
    const [ disable, setDisable ] = useState()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const router = useRouter()
    const cookies = new Cookies()

    const dispatch = useDispatch()
    const { admins } = useSelector(state=>state)

    const onError = err => showErr(err)


    // const loginHandler = async(res)=>{
    //     await 
    // }


    const onSubmit = data => {
       setDisable(true)
       postData('/admin/login', data, setDisable)
        .then(res=>{
            if(res?.success)
            {  
                cookies.set("_token", res.token, { path: '/' })
                dispatch(adminLogin({
                    token: res.token,
                    user: res.user
                }))
                router.push("/admin/dashboard")
            }
        })
    }
    return (
        <>
            <ToastContainer/>
            <section style={{ marginTop: '120px'}} id="log-in">
                <div className="wrapper">
                    <h2 className="py-3">👨</h2>
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
                            <a href="#">Log In</a>
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login
