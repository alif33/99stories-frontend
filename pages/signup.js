import React, { useState } from 'react'
import { showErr } from '../helpers/ErrHandler'
import { postData } from '../helpers/HttpService'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/dist/client/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Layout from '../layouts/client'

const Signup = () => {
    const [ disable, setDisable ] = useState()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const router = useRouter()

    const { settings } = useSelector(state=>state)
    const dispatch = useDispatch()

    const onError = err => showErr(err)

    const onSubmit = data => {
       setDisable(true)
       postData('/user/register', data, setDisable)
        .then(user=>{
            if(user)
                {   
                    toast.success(user?.message)
                    setTimeout(()=>{
                        router.push("/signin")
                    }, 1000)
                }
        })
    }

    return (
        <Layout>
            <section id="log-in">
                <div className="wrapper">
                    <h2 className="py-3">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit, onError)}> 
                        <input 
                            {...register("name",
                                {
                                    required: 'Name is required'
                                }
                            )}
                            type="text" 
                            placeholder="Name" 
                        />
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
                        <input 
                            {...register("password_confirmation",
                                {
                                    required: 'Confirm Password is required'
                                }
                            )}
                            type="password" 
                            placeholder="Confirm Password" 
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

export default Signup
