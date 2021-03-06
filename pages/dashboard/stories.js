import React, { useState, useEffect } from 'react'
import Layout from '../../layouts/user'
import Link from 'next/link'
import parse from 'html-react-parser'
import { useForm } from 'react-hook-form'
import { authPost, API_URL, IMAGE_URL, ROOT_URL } from '../../helpers/HttpService'
import { showErr } from '../../helpers/ErrHandler'
import { useSelector, useDispatch } from 'react-redux'
import { modalToggle } from '../../redux/settings/actions'
import { setCategory } from '../../redux/categories/actions'
import { setUserStory } from '../../redux/stories/actions'
import { toast } from 'react-toastify'
import AddStory from '../../components/dashboard/users/stories/AddStory'

import axios from 'axios'
import { userAuth } from '../../helpers/requireAuthentication'
import EditStory from '../../components/dashboard/users/stories/EditStory'
import StoryDescription from '../../components/dashboard/users/stories/Description'

export default function Stories() {

    const [disable, setDisable] = useState()
    const [create, setCreate] = useState()
    const [storyEdit, setStoryEdit] = useState({ isUpdate: false, story: null })

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { settings, users, categories, stories } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(async () => {
        dispatch(setUserStory(users?.token))
    }, [users.token]);

    const [description, setDescription] = useState({ isDescription: false, data: null })


    // const statusHandler = (status, id) => {

    //     axios.put(`${API_URL}admin/contest/${status == 0 ? 'active' : 'deactive'}/${id}`, {}, {
    //         headers: {
    //             'Authorization': `Bearer ${admins.token}`,
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(contest => {
    //             if (contest)
    //                 dispatch(setAdminContest(admins.token))
    //             toast.success(contest.data?.message)
    //         })
    //         .catch(err => console.log(err.response))
    // }
    return (
        <>
            { description.isDescription && <StoryDescription setDescription={setDescription} description={description}/>}

            {
                create ? <AddStory
                    setCreate={setCreate}
                /> : storyEdit.isUpdate ? <EditStory setStoryEdit={setStoryEdit} storyEdit={storyEdit} /> : <Layout>
                    <div className={settings.sidebar ? "unboarding unboarding_active" : "unboarding"}>
                        <div className="t_header py-3">
                            <div className="row heading_button">
                                <div className="col-md-9 t_heading">
                                    <h5>Story</h5>
                                </div>
                                <div className="col-md-3 t_button">
                                    <button
                                        type="button"
                                        onClick={() => {
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
                                            <th style={{ width: "5%", textAlign: "center" }}>Link</th>
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
                                            stories.userStoryList?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row" className="row-scope-line">
                                                            <Link href={`${ROOT_URL}story/${item.slug}`}>
                                                                <a target="_blank"><i className="fas fa-link" style={{ color: '#5d6268' }}></i></a>
                                                            </Link>
                                                        </th>
                                                        <td><img src={IMAGE_URL + item.story_image} /></td>
                                                        <td className="text-center">{item.title}</td>
                                                        <td className="text-center">

                                                            <a onClick={() => {
                                                                dispatch(modalToggle(settings.modal))
                                                                setDescription({isDescription: true, data: item.details})
                                                            }}
                                                                style={{ cursor: 'pointer' }}
                                                                className=''>Read..</a>

                                                        </td>
                                                        <td className="text-center">{item?.tags}</td>
                                                        <td className="text-center">{item.status ? "Active" : "Inactive"}</td>
                                                        <td className="text-center">
                                                            {
                                                                <i
                                                                    onClick={() => {
                                                                        dispatch(modalToggle(settings.modal))
                                                                        setStoryEdit({ isUpdate: true, story: item })
                                                                    }}
                                                                    style={{ cursor: 'pointer', fontSize: '17px' }}
                                                                    className="fas fa-edit"
                                                                >
                                                                </i>

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

export const getServerSideProps = userAuth(context => {
    return {
        props: {}
    }
})