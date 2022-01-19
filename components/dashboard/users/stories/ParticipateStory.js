import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import { authPost, getData, getFormData } from '../../../../helpers/HttpService'
import { showErr } from '../../../../helpers/ErrHandler'
import { useSelector, useDispatch } from 'react-redux'
import { setCategory } from '../../../../redux/categories/actions'
import { setUserStory } from '../../../../redux/stories/actions'
import { toast, ToastContainer } from 'react-toastify'
import dynamic from 'next/dynamic'
import { firstNWord } from '../../../../helpers/Validator'


const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
  })


const ParticipateStory = ({ setCreate, id }) => {
    const [ contest, setContest ] = useState()
    const [ formdata, setFormdata ] = useState({
        details: '',
        category_id: ''
    })
    const [ disable, setDisable ] = useState()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { settings, users, categories, contests } = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect(()=>{
        getData(`/contest/id/${id}`)
        .then(contest=>{
            if(contest){
                setContest(contest)
            }
        })
        dispatch(setCategory())
    }, [])

    const addStory = async data => {
        setDisable(true)
        authPost('/story', data, users.token)
        .then(story=>{
            if(story?.success){
                dispatch(setUserStory(users?.token))
                toast.success(story.message)
                setDisable(false)
            }else{
                setDisable(false)
            }
        })
    }

    const onError = err => showErr(err)

    const onSubmit = async data => {
        if(data?.image.length > 0){
            const formData = await  getFormData(['image', 'title', 'details', 'summary', 'adult', 'tags', 'contest_id', 'category_id'
            ],[
                data.image[0],
                data.title,
                formdata.details,
                data.summary,
                data.adult? 1: 0,
                data.tags,
                id,
                formdata.category_id,
            ])
            await addStory(formData)
        }else{
            const { title, summary, adult, tags } = data
            await addStory({
                title,
                summary,
                details: formdata.details,
                adult: adult? 1: 0,
                tags,
                contest_id: id,
                category_id: formdata.category_id
            })
        }
        reset()
    }

    return (
        <>  
            <ToastContainer />
            <section className="edit-story">
                <div className="container">
                    <div className="edit-wrapper">
                        <div className="row">
                            <div className="col-lg-12 col-sm-12 col-md-12">
                                <div className="title">
                                    {
                                        contest?.contest_title && <h4 className="text-center py-4">{  firstNWord(contest?.contest_title, 10)  }</h4>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                        <form encType="multipart/form-data" onSubmit={ handleSubmit(onSubmit, onError) }>
                            <div className="row">
                                <div className="col-lg-8 col-sm-12 col-md-12">
                                    <div className="left-side">
                                        <input 
                                            {...register("title",
                                                {
                                                    required: 'Title is required',
                                                }
                                            )}
                                            type="text" 
                                            placeholder="Story Title" 
                                        />
                                        <input 
                                            {...register("summary",
                                                {
                                                    required: 'Summary is required',
                                                }
                                            )}
                                            type="text" 
                                            placeholder="Story Summary" 
                                        />
                                        <SunEditor
                                            onChange={
                                                e=> setFormdata({
                                                    ...formdata,
                                                    details: e
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-4 col-sm-12 col-md-12">
                                    <div className="right-side">
                                        <h3>Story details</h3>
                                        <div className="check-box">
                                            <input 
                                                {...register("adult")}
                                                className="form-check-input" 
                                                type="checkbox" 
                                                id="flexCheckDefault" 
                                            />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">Is adult story?
                                            </label>
                                            <input 
                                                {...register("tags",
                                                    {
                                                        required: 'Tags is required',
                                                    }
                                                )}
                                                type="text" 
                                                className="tag" 
                                                placeholder="# tags (max 5 allowed separate using )" 
                                            />
                                        </div>
                                        <select 
                                            className="form-select"
                                            name="category_id"
                                            onChange={e=>setFormdata({
                                                ...formdata,
                                                category_id: e.target.value

                                            })}
                                        >
                                            <option>Pick Categories </option>
                                            {
                                                categories?.categoryList?.map((item, index)=><option key={index} value={item.id}>{item.category_name}</option>)
                                            }
                                        </select>
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label">Story Image</label>
                                            <input 
                                                {...register("image")}
                                                className="form-control" 
                                                type="file" 
                                                id="formFile" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-sm-12 col-md-12">
                                <div className="edit-btn">
                                    <button 
                                        type="button"
                                        onClick={ ()=>Router.back() }
                                    >Back</button>
                                    <button type="submit">Save</button>
                                </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ParticipateStory
