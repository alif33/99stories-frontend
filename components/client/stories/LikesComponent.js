import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/dist/client/router'
import { useSelector } from 'react-redux'
import { authPost, getData } from '../../../helpers/HttpService'
import { sweetSuccess } from '../../../helpers/Validator'

const Likes = ({ story_id }) => {
   const [ likers, setLikers ] = useState()
   const { users } = useSelector(state => state)
   const router = useRouter()
    const getLikes = ( )=>{
        getData(`/stories/likes/${story_id}`)
            .then(likers=>{
                setLikers(likers)
            })
    }
    const hasliked = () => {
        if(users?.user)
        {
           return likers?.map(item=>item.id === users?.user.id)[0]
        }
    }
    const toggleLike = () =>{
        if (users?.isUser) {
            authPost(`/stories/${hasliked()?'unlike':'like'}/${story_id}`, {}, users.token)
                .then(like=>{
                    if (like?.success) {
                        sweetSuccess(like.message)
                        getLikes()
                    }
                })
        }else{
            router.push('/signin')
        }

    }
    useEffect(()=>{
        getLikes()
    }, [])

    return (
        <a  
            onClick={toggleLike}
            style={{ margin: '3px', cursor: 'pointer' }}
        >
            <i className={hasliked()? "fas fa-thumbs-up": "far fa-thumbs-up"} />
            <div className="top-badge">{likers?.length}</div>
        </a>
    )
}

export default Likes