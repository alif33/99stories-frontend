import { APP_URL, authPost, IMAGE_URL, postReq } from '../../helpers/HttpService'
import parse from 'html-react-parser'
import { useState } from 'react'
import { capitalize, dateFormat } from '../../helpers/Validator'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../components/dashboard/Modal'
import { modalToggle } from '../../redux/settings/actions'
import Layout from '../../layouts/client'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/dist/client/router'
import Feedback from '../../components/client/stories/FeedbackComponent'
import SocialShare from '../../components/client/common/SocialShare'
import { toast } from 'react-toastify'
import Bookmarks from '../../components/client/stories/BookmarksComponent'
import Likes from '../../components/client/stories/LikesComponent'




export const getStaticPaths = async () => {
    // const contests = await getData('/contests')
    // const paths = contests.map(contest=>{
    //     return {
    //         params: {
    //             slug: contest.slug
    //         }
    //     }
    // })
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}


export async function getStaticProps(ctx) {
  const { slug } = ctx.params
  const story = await postReq(`/story/${slug}`,{})

  return {
    props: {
        item: story
    }
  }
}


export default function Story ({ item }) {
 const [ trigger, setTrigger ] = useState()
 const [ disable, setDisable ] = useState(true)
 const [ report, setReport ] = useState(null)
 const { register, handleSubmit, formState: { errors }, reset } = useForm()
 const dispatch = useDispatch()
 const router = useRouter()
 const { settings, users } = useSelector(state=>state)

 const onError = err => showErr(err)
 const onSubmit = async data => {
   if (users?.isUser) {
      authPost(`/story/report/${item.id}`, data, users.token)
        .then(report=>{
           if(report?.success){
             toast.success(report.message)
             dispatch(modalToggle(settings.modal))
             setTrigger(false)
           }
        })
      reset()
   }else{
      router.push('/signin')
   }
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
                          <h5 className="text-center">Report 😉</h5>
                      </div>
                      <div className="col-md-1">
                          <i onClick={()=>{
                              dispatch(modalToggle(settings.modal))
                              setTrigger(false)
                          }} style={{ cursor: 'pointer' }} className="fas fa-times"></i>
                      </div>
                  </div>
                  <div className="row">
                      <form encType="multipart/form-data" onSubmit={ handleSubmit(onSubmit, onError) }>
                          <div className="form-group">
                            <label htmlFor="reportFormController">Why do you feel that this content is inappropriate?</label>
                            <textarea 
                              {...register("report",
                                {
                                    required: 'Report must be required.',
                                }
                              )}
                              className="form-control my-3"
                              onChange={e=>setReport(e.target.value)} 
                              id="reportFormController" 
                              value={report}
                              rows="3"
                            ></textarea>
                          </div>
                          <button 
                              disabled={!report}
                              type="submit" 
                              className="btn btn-primary"
                          >Submit</button>
                      </form>
                  </div>
              </div>
          </Modal>
      }

      {/* Story details */}


      <section id="stories-part">
        <div className="row">
          <div className="col-lg-12 col-sm-12 col-md-12">
            <div className="title">
              <h3><a href="#">Story details</a></h3>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12 col-md-12">
              <div className="wrapper">
                <h2>{ item.title }</h2>
                <div className="img">
                  <a href="#">
                    <img 
                      src={ IMAGE_URL+item.story_image } 
                      alt={ item.title } 
                    />
                  </a>
                </div>
                <div className="person">
                  <span><i className="far fa-user-circle" />{ 'ismail hosen alif' }</span>
                  <span><i className="far fa-calendar-alt" />{ dateFormat(item.created_at) }</span>
                </div>
                { parse(item.details) }
                <div className="story-icon mt-5">
                  <div className="left-icon">
                    <Likes 
                      story_id={ item.id }
                    />
                    <Bookmarks 
                      story_id={ item.id }
                    />
                    <a 
                      style={{ margin: '3px', cursor: 'pointer' }}
                      onClick={()=>{
                          dispatch(modalToggle(settings.modal))
                          setTrigger(true)
                      }}
                    >
                      <i className="fas fa-flag"></i>
                    </a>
                  </div>
                  <div className="right-icon">
                    <span>Share This Post </span>
                    <SocialShare
                      uri={`/contest/${item.slug}`}
                    />
                  </div>
                </div>
                <Feedback
                  story_id={ item.id }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
