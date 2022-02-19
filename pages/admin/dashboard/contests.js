import React, { useState, useEffect } from 'react'
import parse from 'html-react-parser'
import Layout from '../../../layouts/admin'
import { showErr } from '../../../helpers/ErrHandler'
import { API_URL, IMAGE_URL } from '../../../helpers/HttpService'
import { useSelector, useDispatch } from 'react-redux'
import { setAdminContest } from '../../../redux/contests/actions'
import { toast } from 'react-toastify'
import axios from 'axios'
import { adminAuth } from '../../../helpers/requireAuthentication'
import { firstNWord } from '../../../helpers/Validator'



export default function Contests(){

    const [ trigger, setTrigger ] = useState()
    const [ loading, setLoading ] = useState(true)
    const { settings, admins, contests } = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect( ()=>{
        setLoading(true)
            dispatch(setAdminContest(admins.token)) 
        setLoading(false)
    }, [])


    const statusHandler = (sta, id) => {
        axios.put(`${API_URL}admin/contest/${sta? 'deactive': 'active'}/${id}`,{}, {
            headers: {
                'Authorization': `Bearer ${admins.token}`, 
                'Content-Type': 'application/json'
            }
        })
        .then(contest=>{
            if(contest)
                dispatch(setAdminContest(admins.token))
                toast.success(contest.data?.message)
        })
        .catch(err=>console.log(err.response))
    }


    return (
         <Layout>  
            <div className={settings.sidebar ? "unboarding unboarding_active" : "unboarding"}>
                <div className="t_header py-3">
                    <div className="row heading_button">
                        <div className="col-md-9 t_heading">
                            <h5>Contests</h5>
                        </div>
                    </div>
                </div>
                {
                    loading? <div className="loader"></div>
                    :  <div className="t_table_content-wrapper">
                    <div className="container table-responsive">
                        <table className="table">
                        <thead className="thead bg-light">
                            <tr>
                                <th style={{ width: "5%", textAlign: "center" }}>ID</th>
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
                                contests.adminContestList?.map((item, index)=>{
                                    return(
                                        <tr key={index}>
                                            <th scope="row" className="row-scope-line">{item.id}</th>
                                            <td><img src={IMAGE_URL+item.contest_image}/></td>
                                            <td className="text-center">{ item.contest_title }</td>
                                            <td className="text-center">{ parse(firstNWord(item.contest_description, 100)) }</td>
                                            <td className="text-center">{ item.start_date.split(' ').slice(1,4).join(' ') }</td>
                                            <td className="text-center">{ item.end_date.split(' ').slice(1,4).join(' ') }</td>
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
                }
            </div>
        </Layout>
    )
}

export const getServerSideProps = adminAuth( context => {
    return {
      props: {}
    }
})