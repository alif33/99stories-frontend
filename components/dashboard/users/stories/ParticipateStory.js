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
import Select from 'react-select'
import { setTag } from './../../../../redux/tag/actions';

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,

})


const ParticipateStory = ({ setCreate, id }) => {
    const [selectTag, setSelectTag] = useState([])

    const [contest, setContest] = useState()
    const [formdata, setFormdata] = useState({
        details: '',
        category_id: ''
    })
    const [disable, setDisable] = useState()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { settings, users, categories, contests, tags } = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        getData(`/contest/id/${id}`)
            .then(contest => {
                if (contest) {
                    setContest(contest)
                }
            })
        dispatch(setCategory())
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
                console.log(story)
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
            <ToastContainer />
            <section className="edit-story">
                <div className="container">
                    <div className="edit-wrapper">
                        <div className="row">
                            <div className="col-lg-12 col-sm-12 col-md-12">
                                <div className="title">
                                    {
                                        contest?.contest_title && <h4 className="text-center py-4">{firstNWord(contest?.contest_title, 10)}</h4>
                                    }

                                </div>
                            </div>
                        </div>
                        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
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
                                        <div>
                                            {errors?.title && <span className='text-danger'>Title is required</span>}
                                        </div>
                                        <input
                                            {...register("summary",
                                                {
                                                    required: 'Summary is required',
                                                }
                                            )}
                                            type="text"
                                            placeholder="Story Summary"
                                        />
                                        <div>
                                            {errors?.summary && <span className='text-danger'>Summary is required</span>}
                                        </div>
                                        <SunEditor
                                            onChange={
                                                e => setFormdata({
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
                                            <Select options={tagOption}
                                                onChange={(e) => setSelectTag(e)}
                                                isMulti
                                                name="colors"
                                                className="basic-multi-select w-100"
                                                classNamePrefix="select"
                                            />
                                        </div>
                                        <select
                                            className="form-select"
                                            name="category_id"
                                            onChange={e => setFormdata({
                                                ...formdata,
                                                category_id: e.target.value

                                            })}
                                        >
                                            <option>Pick Categories </option>
                                            {
                                                categories?.categoryList?.map((item, index) => <option key={index} value={item.id}>{item.category_name}</option>)
                                            }
                                        </select>
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label">Story Image</label>
                                            <input
                                                {...register("image",
                                                    {
                                                        required: 'Image is required',
                                                    }
                                                )}

                                                className="form-control"
                                                type="file"
                                                id="formFile"
                                            />
                                            <div>
                                                {errors?.image && <span className='text-danger'>Image is required</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-sm-12 col-md-12">
                                    <div className="edit-btn">
                                        <button
                                            type="button"
                                            onClick={() => Router.back()}
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
