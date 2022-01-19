import React, { useState, useEffect } from 'react'
import parse from 'html-react-parser'
import Layout from '../../layouts/user'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Modal from '../../components/dashboard/Modal'
import { authPost, API_URL, getUserData, ROOT_URL } from '../../helpers/HttpService'
import { showErr } from '../../helpers/ErrHandler'
import { useSelector, useDispatch } from 'react-redux'
import { modalToggle } from '../../redux/settings/actions'
import { setUserContest } from '../../redux/contests/actions'
import { toast } from 'react-toastify'
import AddContest from '../../components/dashboard/users/contests/AddContest'
import { userAuth } from '../../helpers/requireAuthentication'
import { firstNWord } from '../../helpers/Validator'



export default function Contests(){

    const [ trigger, setTrigger ] = useState()
    const { settings, users, contests } = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect( ()=>{
        dispatch(setUserContest(users.token)) 
    }, [])


    return (
        <>
        {
            trigger? <AddContest 
                setTrigger={setTrigger}
            /> : <Layout>  
            <div className={settings.sidebar ? "unboarding unboarding_active" : "unboarding"}>
                <div className="t_header py-3">
                    <div className="row heading_button">
                        <div className="col-md-9 t_heading">
                            <h5>Story</h5>
                        </div>
                        <div className="col-md-3 t_button">
                            <button 
                                type="button" 
                                onClick={()=>{
                                    dispatch(modalToggle(settings.modal))
                                    setTrigger(true)
                                }} 
                                className="btn btn-primary" >
                                    <i className="fas fa-plus-circle"></i> Contest
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
                                <th style={{ width: "25%", textAlign: "center" }}>Description</th>
                                <th style={{ width: "20%", textAlign: "center" }}>Start Date</th>
                                <th style={{ width: "20%", textAlign: "center" }}>End Date</th>
                                <th style={{ width: "15%", textAlign: "center" }}>Status</th>
                                <th style={{ width: "5%", textAlign: "center" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                contests.userContestList?.map((item, index)=>{
                                    return(
                                        <tr key={index}>
                                            <th scope="row" className="row-scope-line">
                                                <Link href={`${ROOT_URL}contest/${item.slug}`}>
                                                    <a target="_blank"><i className="fas fa-link" style={{ color: '#5d6268'}}></i></a>
                                                </Link>
                                            </th>
                                            <td><img src="https://www.wpbeginner.com/wp-content/uploads/2020/03/ultimate-small-business-resource-coronavirus.png"/></td>
                                            <td className="text-center">{item.contest_title}</td>
                                            <td className="text-center">{ parse(firstNWord(item.contest_description, 20)) }</td>
                                            <td className="text-center">{item.start_date.split(' ').slice(1,4).join(' ')}</td>
                                            <td className="text-center">{item.end_date.split(' ').slice(1,4).join(' ')}</td>
                                            <td className="text-center">{item.status? "Active":"Inactive"}</td>
                                            <td className="text-center">
                                                <i 
                                                    style={{ cursor: 'pointer', fontSize: '17px'}} 
                                                    className="fas fa-edit"
                                                >
                                                </i>
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

export const getServerSideProps = userAuth( context => {
    return {
      props: {}
    }
})