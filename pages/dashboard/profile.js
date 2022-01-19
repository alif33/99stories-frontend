import React, { useState, useEffect } from 'react'
import Layout from '../../layouts/user'
import { useForm } from "react-hook-form"
import Modal from "../../components/dashboard/Modal"
import { authPost, getFormData, IMAGE_URL } from "../../helpers/HttpService"
import { showErr } from "../../helpers/ErrHandler"
import { useSelector, useDispatch } from "react-redux"
import { modalToggle } from "../../redux/settings/actions"
import { setCategory } from "../../redux/categories/actions"
import { toast } from "react-toastify"
import { updatedProfile } from '../../redux/users/actions'
 



const Profile = () => {

    const [ disable, setDisable ] = useState()
    const [ info, setInfo ] = useState()
    const { register, handleSubmit,watch, formState: { errors } } = useForm()
    const { settings, users, categories } = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect(()=>{
        setInfo(users.user)
    }, [])

    const updateProfile = async user => {
        authPost('/user/profile', user, users.token)
        .then(update=>{
           if (update?.success) {
               dispatch(updatedProfile(update.user))
               toast.success(update.message)
           } 
        })
    }

    const onError = err => showErr(err)

    const onSubmit = async data => {
        if(data?.image.length > 0){
            const formData = await  getFormData(['image', 'name', 'user_bio'],
            [ data.image[0],
              info.name,
              info.user_bio ])
            await updateProfile(formData)
        }else{
            const { name, user_bio } = info
            await updateProfile({
               name,
               user_bio
            })
        }
        
    }

 
    // console.log();

    return (

        <Layout>  
            <div className={settings.sidebar ? "unboarding unboarding_active" : "unboarding"}>
                <div className="information">
                    <div className="row">
                    <div className="col-lg-12">
                        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit, onError)}>
                            <div className="edit-profile">
                                <div className="edit-title">
                                <h3 className="text-center">Profile</h3>
                                </div>
                                <div className="edit-file">
                                <div className="img">
                                    <img 
                                        height="200px"
                                        width="200px"
                                        src={ IMAGE_URL+users?.user.user_image } 
                                        alt={ users?.user.name } 
                                    />
                                </div>
                                <div className="file">
                                    <label 
                                        htmlFor="formFile" 
                                        className="form-label"
                                    >Choose a file</label>
                                    <input 
                                        {...register("image")}
                                        className="form-control" 
                                        type="file" 
                                        id="formFile" 
                                    />
                                </div>
                                </div>
                            </div>
                            <div className="edit-account">
                                <div className="edit-title">
                                <h3>account information</h3>
                                </div>
                                <div className="edit-name">
                                    <div className="left-name">
                                        <label>name</label>
                                    </div>
                                    <div className="right-option">
                                        <input 
                                            name="name"
                                            value={ info?.name ? info.name: "" }
                                            onChange={ e=> setInfo({
                                                ...info,
                                                name: e.target.value
                                            }) }
                                            type="text" 
                                            className="form-control" 
                                        />
                                    </div>
                                </div>
                                <div className="edit-name">
                                    <div className="left-name">
                                        <label>Bio</label>
                                    </div>
                                    <div className="right-option">
                                        <textarea
                                            name="user_bio"
                                            value={ info?.user_bio ? info.user_bio: "" }
                                            onChange={ e=> setInfo({
                                                ...info,
                                                user_bio: e.target.value
                                            }) }
                                            className="form-control" 
                                            placeholder="Write your bio details."
                                            rows="3"
                                        >

                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="edit-submit">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary mb-3"
                                >Update</button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
