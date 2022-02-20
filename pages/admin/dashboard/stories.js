import React, { useState, useEffect } from 'react'
import Layout from '../../../layouts/admin'
import parse from 'html-react-parser'
import { API_URL, IMAGE_URL } from "../../../helpers/HttpService"
import { showErr } from "../../../helpers/ErrHandler"
import { useSelector, useDispatch } from "react-redux"
import { modalToggle } from "../../../redux/settings/actions"
import { setAdminStory } from "../../../redux/stories/actions"
import { toast } from "react-toastify"
import AddStory from '../../../components/dashboard/admins/stories/AddStory'
import axios from 'axios' 
import { adminAuth } from '../../../helpers/requireAuthentication'


export default function Stories(){

    const [ disable, setDisable ] = useState()
    const [ create, setCreate ] = useState()
    const { settings, admins, stories } = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setAdminStory(admins.token))
    }, [])

    const statusHandler = (status, id) => {
        axios.put(`${API_URL}admin/story/${status? 'deactive': 'active'}/${id}`,{}, {
            headers: {
                'Authorization': `Bearer ${admins.token}`, 
                'Content-Type': 'application/json'
            }
        })
        .then(contest=>{
            if(contest)
                dispatch(setAdminStory(admins.token))
                toast.success(contest.data?.message)
        })
        .catch(err=>console.log(err.response))
    }

    return (
        <>
        {
            create? <AddStory 
                setCreate={setCreate}
            /> : <Layout>  
            <div className={settings.sidebar ? "unboarding unboarding_active" : "unboarding"}>
                <div className="t_header py-3">
                    <div className="row heading_button">
                        <div className="col-md-9 t_heading">
                            <h5>Stories</h5>
                        </div>
                        <div className="col-md-3 t_button">
                            <button 
                                type="button" 
                                onClick={()=>{
                                    dispatch(modalToggle(settings.modal))
                                    setCreate(true)
                                }} 
                                className="btn btn-primary" >
                                    <i className="fas fa-plus-circle"></i> Story
                            </button>
                        </div>
                    </div>
                </div>
                <div className="t_table_content-wrapper">
                    <div className="container table-responsive">
                        <table className="table">
                        <thead className="thead bg-light">
                            <tr>
                                <th style={{ width: "5%", textAlign: "center" }}>ID</th>
                                <th style={{ width: "10%", textAlign: "center" }}>Image</th>
                                <th style={{ width: "10%", textAlign: "center" }}>Title</th>
                                <th style={{ width: "35%", textAlign: "center" }}>Description</th>
                                <th style={{ width: "20%", textAlign: "center" }}>Tags</th>
                                <th style={{ width: "15%", textAlign: "center" }}>Status</th>
                                <th style={{ width: "5%", textAlign: "center" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                stories.adminStoryList?.map((item, index)=>{
                                    return(
                                        <tr key={index}>
                                            <th scope="row" className="row-scope-line">{item.id}</th>
                                            <td><img src={IMAGE_URL+item.story_image}/></td>
                                            <td className="text-center">{ item.title }</td>
                                            <td className="text-center">{ parse(item?.details) }</td>
                                            <td className="text-center">{ item?.tags }</td>
                                            <td className="text-center">{ item.status? "Active":"Inactive" }</td>
                                            <td className="text-center">
                                                {
                                                    !item.status ? <i onClick={()=>statusHandler(item.status, item.id)} style={{ cursor: 'pointer', color: 'green', fontSize: '20px' }} className="fas fa-check-circle"></i> :
                                                    <i onClick={()=>statusHandler(item.status, item.id)} style={{ cursor: 'pointer', color: 'red', fontSize: '20px' }} className="fas fa-times"></i>
                                                }
                                            </td>
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
        }
    </>
    )
}

export const getServerSideProps = adminAuth( context => {
    return {
      props: {}
    }
})