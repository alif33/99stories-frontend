import React, { useState, useEffect } from 'react'
import parse from 'html-react-parser'
import Link from 'next/link'
import Layout from '../../layouts/user'
import { authPost, getUserData, IMAGE_URL, APP_URL, ROOT_URL } from '../../helpers/HttpService'
import { useSelector } from 'react-redux'
import { userAuth } from '../../helpers/requireAuthentication'
import { firstNWord, sweetSuccess } from '../../helpers/Validator'
import { useRouter } from 'next/dist/client/router'



export default function Bookmarks(){

    const [ bookmarks, setBookmarks ] = useState()
    const [ notfound, setNotFound ] = useState(false)
    const { settings, users } = useSelector(state=>state)
    const router = useRouter()

    const getBookmarks = ()=>{
        getUserData('/stories/bookmarks', users.token)
            .then(bookmarks=>{
                if(bookmarks?.length > 0){
                    setBookmarks(bookmarks)
                }else{
                    setNotFound(true)
                }
            })
            .catch(err=>console.log(err))
    }
    useEffect( ()=>{
        getBookmarks()
    }, [])

    const removeBookmark = story_id =>{
        if (users?.isUser) {
            authPost(`/stories/unbookmark/${story_id}`, {}, users.token)
                .then(bmarks=>{
                    if (bmarks?.success) {
                        getBookmarks()
                        sweetSuccess(bmarks.message)
                    }
                })
        }else{
            router.push('/signin')
        }

    }

    return (
        <Layout>  
            <div className={settings.sidebar ? "unboarding unboarding_active" : "unboarding"}>
                <div className="t_header py-3">
                    <div className="row heading_button">
                        <div className="col-md-9 t_heading">
                            <h5>Bookmarks</h5>
                        </div>
                    </div>
                </div>
                {
                  bookmarks && <div className="t_table_content-wrapper">
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
                                    bookmarks?.map((item, index)=>{
                                        return(
                                            <tr key={index}>
                                                <th scope="row" className="row-scope-line">
                                                    <Link href={`${ROOT_URL}story/${item.slug}`}>
                                                        <a target="_blank"><i className="fas fa-link"></i></a>
                                                    </Link>
                                                </th>
                                                <td><img src={IMAGE_URL+item.story_image}/></td>
                                                <td className="text-center">{ item.title }</td>
                                                <td className="text-center">{ parse(firstNWord(item?.details, 30)) }</td>
                                                <td className="text-center">{ item?.tags }</td>
                                                <td className="text-center">{ item.status? "Active":"Inactive" }</td>
                                                <td className="text-center">
                                                    {
                                                        <i 
                                                            onClick={()=>removeBookmark(item.id)} 
                                                            style={{ cursor: 'pointer', fontSize: '17px' }} 
                                                            className="fas fa-trash-alt"
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
                </div>}
                {
                    notfound && <div className="container">
                    <h5 className="text-secondary text-center mt-5">You have no bookmarks.</h5>
                </div>
                }
            </div>
        </Layout>
    )
}

export const getServerSideProps = userAuth( context => {
    return {
      props: {}
    }
})
