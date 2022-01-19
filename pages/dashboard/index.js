import React, { useState, useEffect } from 'react'
import parse from 'html-react-parser'
import Layout from '../../layouts/user'
import { useForm } from 'react-hook-form'
import Modal from '../../components/dashboard/Modal'
import { authPost, API_URL, getUserData, IMAGE_URL } from '../../helpers/HttpService'
import { showErr } from '../../helpers/ErrHandler'
import { useSelector, useDispatch } from 'react-redux'
import { modalToggle } from '../../redux/settings/actions'
import { setUserContest } from '../../redux/contests/actions'
import { setUserStory } from '../../redux/stories/actions'
import { toast } from 'react-toastify'
import AddContest from '../../components/dashboard/users/contests/AddContest'
import { userAuth } from '../../helpers/requireAuthentication'
import { firstNWord } from '../../helpers/Validator'



export default function Contests(){

    const [ trigger, setTrigger ] = useState()
    const [ bookmarks, setBookmarks ] = useState()
    const { settings, users, contests, stories } = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect( ()=>{
        dispatch(setUserStory(users.token)) 
        dispatch(setUserContest(users.token))
        getUserData('/stories/bookmarks', users.token)
            .then(bookmarks=>{
                if(bookmarks){
                    setBookmarks(bookmarks)
                }
            })
            .catch(err=>console.log(err)) 
    }, [])

    return (
        <>
        {
            trigger? <AddContest 
                setTrigger={setTrigger}
            /> : <Layout>  
            <div className={settings.sidebar ? "unboarding unboarding_active" : "unboarding"}>
                <div className="row">
                    <div className="col-lg-12">
                    <div className="dashboard-heading">
                        <div className="left-side">
                        <h3>Dashboard</h3>
                        <p>Welcome back, { users.user.name }</p>
                        </div>
                        <div className="right-side">
                        <div className="img">
                            <img 
                                src={ IMAGE_URL+users?.user.user_image }
                                height="50px"
                                width="50px"
                                style={{borderRadius: "25px"}} 
                                alt={ users?.user.name } 
                            />
                        </div>
                        <p>{ users.user.name }</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-12 mt-5">
                    <div className="all-balance">
                        <div className="items">
                        <h5>stories</h5>
                            <h3>{ stories.userStoryList?.length }</h3>
                        </div>
                        <div className="items">
                        <h5>contests</h5>
                            <h3>{ contests.userContestList?.length }</h3>
                        </div>
                        <div className="items">
                        <h5>Bookmarks</h5>
                        <h3>{ bookmarks?.length }</h3>
                        </div>
                        {/* <div className="items">
                        <h5>membership</h5>
                            <div className="icon">
                                <h5><span class="badge bg-secondary">FREE</span></h5>
                                <button type="button" class="btn btn-success mt-3">Premium</button>
                            </div>
                        </div> */}
                    </div>
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