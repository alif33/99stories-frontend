import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { authPost, getFormData } from '../../../../helpers/HttpService'
import { showErr } from '../../../../helpers/ErrHandler'
import { useSelector, useDispatch } from 'react-redux'
import { setCategory } from '../../../../redux/categories/actions'
import { setContest } from '../../../../redux/contests/actions'
import { setUserStory } from '../../../../redux/stories/actions'
import { toast, ToastContainer } from 'react-toastify'
import dynamic from 'next/dynamic'
import Select from 'react-select'


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]


const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
  })


const AddStory = ({ setCreate  }) => {
    const [ details, setDetails ] = useState()
    const [ disable, setDisable ] = useState()
    const [ con, setCon ] = useState()
    const [ cat, setCat ] = useState()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { settings, users, categories, contests } = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setCategory())
        dispatch(setContest())
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
                details,
                data.summary,
                data.adult? 1: 0,
                data.tags,
                con,
                cat,
            ])
            await addStory(formData)
        }else{
            const { title, summary, adult, tags, category_id } = data
            await addStory({
                title,
                summary,
                details,
                adult: adult? 1: 0,
                tags,
                category_id: con,
                category_id: cat
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
                                <h4>Add Story</h4>
                                </div>
                            </div>
                        </div>
                        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit, onError)}>
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
                                                e=> setDetails(e)
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
                                            <Select options={options}
                                            isMulti
                                            name="colors"
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            />
                                        </div>
                                        <select 
                                            className="form-select"
                                            name="contest_id"
                                            onChange={e=>setCon(e.target.value)}
                                        >
                                            <option>Select Contest </option>
                                            {
                                                contests?.contestList?.map((item, index)=><option key={index} value={item.id}>{item.contest_title}</option>)
                                            }
                                        </select>
                                        <select 
                                            className="form-select"
                                            name="category_id"
                                            onChange={e=>setCat(e.target.value)}
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
                                    <button onClick={()=>setCreate(false)}>Close</button>
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

export default AddStory
