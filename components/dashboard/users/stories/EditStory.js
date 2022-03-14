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
import { setTag } from './../../../../redux/tag/actions';
import AddTag from '../../../client/common/Tag/AddTag'
import { modalToggle } from '../../../../redux/settings/actions'



const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,

})


const EditStory = ({ setStoryEdit, storyEdit }) => {
    // const {title, summary, updateDetail: details, stories_status, category_id, contest_id} = storyEdit

    const [details, setDetails] = useState()
    const [disable, setDisable] = useState()
    const [con, setCon] = useState()
    const [cat, setCat] = useState()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { settings, users, categories, contests, tags } = useSelector(state => state)
    const dispatch = useDispatch()
    const [addTag, setAddTag] = useState(false)
    const [selectTag, setSelectTag] = useState([])

    useEffect(() => {
        dispatch(setCategory())
        dispatch(setContest())
        dispatch(setTag())
    }, [])


    const onSubmit = async data => {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('summary', data.summary)
        formData.append('details', details)
        formData.append('adult', data.adult === false ? 0 : 1)
        formData.append('contest_id', data.contest_id)
        formData.append('category_id', data.category_id)
        formData.append('image', data.image[0])
        for (let i = 0; i < selectTag?.length; i++) {
            formData.append('tags[]', selectTag[i].value || tags)
        }
        await addStory(formData)
    }

    const addStory = async data => {
        setDisable(true)
        authPost('/story', data, users.token)
            .then(story => {
                if (story?.success) {
                    dispatch(setUserStory(users?.token))
                    toast.success(story.message)
                    setDisable(false)
                    reset()
                } else {
                    setDisable(false)
                }
            })
    }
    const { tagList } = tags
    const tagOption = tagList?.map(tag => ({
        label: tag.tag_name,
        value: tag.id
    }));
    return (
        <>
            {addTag && <AddTag setTrigger={setAddTag} />}
            <ToastContainer />
            <section className="edit-story">
                <div className="container">
                    <div className="edit-wrapper">
                        <div className="row">
                            <div className="col-lg-12 col-sm-12 col-md-12">
                                <div className="title">
                                    <h4>Update Story</h4>
                                </div>
                            </div>
                        </div>
                        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-lg-8 col-sm-12 col-md-12">
                                    <div className="left-side">
                                        <input
                                        defaultValue={storyEdit.story.title}
                                            {...register("title",
                                                {
                                                    required: 'Title is required',
                                                }
                                            )}
                                            type="text"
                                            placeholder="Story Title"
                                        />
                                        
                                        <input
                                        defaultValue={storyEdit.story.summary}
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
                                                e => setDetails(e)
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
                                            <div className='d-flex justify-content-between gap-2'>
                                                <Select options={tagOption}
                                                    onChange={(e) => setSelectTag(e)}
                                                    isMulti
                                                    name="colors"
                                                    className="basic-multi-select w-100"
                                                    classNamePrefix="select"
                                                />
                                                <span onClick={() => {
                                                    dispatch(modalToggle(settings.modal))
                                                    setAddTag(true)
                                                }} className='btn btn-primary'>Add</span>
                                            </div>
                                        </div>
                                        <select
                                            className="form-select"
                                            name="contest_id"
                                            onChange={e => setCon(e.target.value)}
                                        >
                                            <option>Select Contest </option>
                                            {
                                                contests?.contestList?.map((item, index) => <option key={index} value={item.id}>{item.contest_title}</option>)
                                            }
                                        </select>
                                        <select
                                            className="form-select"
                                            name="category_id"
                                            onChange={e => setCat(e.target.value)}
                                        >
                                            <option>Pick Categories </option>
                                            {
                                                categories?.categoryList?.map((item, index) => <option key={index} value={item.id}>{item.category_name}</option>)
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
                                        <button onClick={() => setStoryEdit({isUpdate: false, story: null})}>Close</button>
                                        <button type="submit">Update</button>
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

export default EditStory
