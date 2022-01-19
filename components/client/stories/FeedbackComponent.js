import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { showErr } from '../../../helpers/ErrHandler'
import { authPost, getData } from '../../../helpers/HttpService'
import { capitalize, dateFormat } from '../../../helpers/Validator'

const Feedback = ({ story_id }) => {
    const [ comments, setComments ] = useState()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const dispatch = useDispatch()
    const { users } = useSelector(state=>state)
    const router = useRouter()

    const getComments = ( )=>{
        getData(`/story/comments/${story_id}`)
            .then(comments=>{
                setComments(comments)
            })
    }

    useEffect(()=>{
        getComments()
    }, [])

    const onError = err => showErr(err)
    const onSubmit = async data => {
      if (users?.isUser) {
        console.log(users.token);
        authPost(`/story/comment/${story_id}`, data, users.token)
            .then(comment=>{
                if(comment?.success){
                    toast.success(comment.message)
                    getComments()
                }
            })
        reset()
      }else{
       router.push('/signin')
      }
    }

    return (
        <div className="feedback">
            <h2>Feedback</h2>
            <div className="form-body">
                <form onSubmit={ handleSubmit(onSubmit, onError) }>
                    <textarea 
                        {...register("comment",
                            {
                                required: 'Feedback must be Required.',
                                minLength: {
                                    value: 10,
                                    message: 'Feedback upto 10 characters.',
                                }
                            }
                        )} 
                        placeholder="Leave a Feedback for the story OR suggest next chapter. (between 10-1000 characters)"
                    />
                    <button 
                        type="submit"
                    >Submit feedback
                    </button>
                </form>
            </div>
            <h2 className="comment">Comments({comments?.length})</h2>
            {
               comments?.map(item=>{
                   return(
                    <div key={ item.id } className="comments-body">
                        <div className="img">
                            <img 
                                src="images/comment-img.png" 
                                alt={ capitalize(item.name) } 
                            />
                        </div>
                        <div className="details">
                            <h4>{ capitalize(item.name) }</h4>
                            <p>{ item.comment }</p>
                            <span>{ dateFormat(item.created_at) }</span>
                        </div>
                    </div>
                   )
               }) 
            }
        </div>
    )
}

export default Feedback