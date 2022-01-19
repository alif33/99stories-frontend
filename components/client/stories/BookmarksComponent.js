import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/dist/client/router'
import { useSelector } from 'react-redux'
import { authPost } from '../../../helpers/HttpService'
import { sweetSuccess } from '../../../helpers/Validator'

const Bookmark = ({ story_id }) => {
   const [ bookmark, setBookmark ] = useState(false)
   const { users } = useSelector(state => state)
   const router = useRouter()
    const checkBookmark = ( )=>{
        authPost(`/stories/hasbookmarked/${story_id}`, {}, users.token)
            .then(bookmark=>{
                if(bookmark?.success)
                {
                    setBookmark(true)
                }
            })
    }

    const toggleBookmark = () =>{
        if (users?.isUser) {
            authPost(`/stories/${bookmark?'unbookmark':'bookmark'}/${story_id}`, {}, users.token)
                .then(bmarks=>{
                    if (bmarks?.success) {
                        sweetSuccess(bmarks.message)
                        setBookmark(!bookmark)
                    }
                })
        }else{
            router.push('/signin')
        }

    }
    useEffect(()=>{
        if (users?.isUser) {
            checkBookmark()
        }
    }, [])

    return (
        <a  
            onClick={toggleBookmark}
            style={{ margin: '3px', cursor: 'pointer' }}
        >
            <i className={bookmark? "fas fa-bookmark": "far fa-bookmark"} />
        </a>
    )
}

export default Bookmark
