import React, { useState, useEffect } from 'react'
import Layout from '../../../layouts/admin'
import { useForm } from "react-hook-form"
import Modal from "../../../components/dashboard/Modal"
import { authPost } from "../../../helpers/HttpService"
import { showErr } from "../../../helpers/ErrHandler"
import { useSelector, useDispatch } from "react-redux"
import { modalToggle } from "../../../redux/settings/actions"
import { setCategory } from "../../../redux/categories/actions"
import { toast } from "react-toastify"
import { adminAuth } from '../../../helpers/requireAuthentication'
 



export default function Category(){

    const [ disable, setDisable ] = useState()
    const [ trigger, setTrigger ] = useState()
    const [ image, setImage ] = useState()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { settings, admins, categories } = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setCategory())
    }, [])


    const insertCategory = async (data) =>{
        setDisable(true)
        authPost('/category', data, admins.token)
        .then(category=>{
            if(category?.success){
                dispatch(setCategory())
                toast.success(category.message)
                setDisable(false)
            }else{

                console.log(category?.response)
                if(category.response?.data[0]?.category_name)
                    toast.error(category.response?.data[0]?.category_name[0])
                if(category.response?.data[0]?.image)
                    toast.error(category.response?.data[0]?.image[0])
                setDisable(false)
            }
        })
    }

    const onError = err => showErr(err)
    const onSubmit = async data => {
        if(data?.image.length > 0){
            const formData = new FormData()
            formData.append('image', data.image[0])
            formData.append('category_name', data.category_name)
            await insertCategory(formData)
        }else{
            const { category_name} = data
            await insertCategory({
                category_name
            })
        }
        reset()
    }

    return (

        <Layout>  
            { trigger && 
                <Modal
                    size="md"
                >   
                    <div className="container">
                        <div className="row my-3">
                            <div className="col-md-11">
                                <h5 className="text-center">Add category</h5>
                            </div>
                            <div className="col-md-1">
                                <i onClick={()=>{
                                    dispatch(modalToggle(settings.modal))
                                    setTrigger(true)
                                }} style={{ cursor: 'pointer' }} className="fas fa-times"></i>
                            </div>
                        </div>
                        <div className="row">
                            <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit, onError)}>
                                <div className="mb-3">
                                    <input 
                                        {...register("category_name",
                                            {
                                                required: 'Category name required',
                                            }
                                        )}
                                        type="text" 
                                        className="form-control"
                                        placeholder="Category name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input 
                                        {...register("image")}
                                        type="file" 
                                        className="form-control" 
                                    />
                                </div>
                                <button 
                                    disabled={disable}
                                    type="submit" 
                                    className="btn btn-primary"
                                >Submit</button>
                            </form>
                        </div>
                    </div>
                </Modal>
            }

            <div className={settings.sidebar ? "unboarding unboarding_active" : "unboarding"}>
                <div className="t_header py-3">
                    <div className="row heading_button">
                        <div className="col-md-9 t_heading">
                            <h5>Category</h5>
                        </div>
                        <div className="col-md-3 t_button">
                            <button 
                                type="button" 
                                onClick={()=>{
                                    dispatch(modalToggle(settings.modal))
                                    setTrigger(true)
                                }} 
                                className="btn btn-primary" >
                                    <i className="fas fa-plus-circle"></i> Category
                            </button>
                        </div>
                    </div>
                </div>
                <div className="t_table_content-wrapper">
                    <div className="container table-responsive">
                        <table className="table">
                        <thead className="thead bg-light">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Category Name</th>
                                <th scope="col">Category Slug</th>
                                <th className="text-center">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.categoryList?.map((item, index)=>{
                                    return(
                                        <tr key={index}>
                                            <th scope="row" className="row-scope-line">{item.id}</th>
                                            <td>{item.category_name}</td>
                                            <td>{item.category_slug}</td>
                                            <td className="text-center"><i style={{ cursor: 'pointer' }} className="fas fa-edit"></i></td>
                                        </tr>
                                    )
                                })
                            }
                            
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps = adminAuth( context => {
    return {
      props: {}
    }
})
