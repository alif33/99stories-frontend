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


const AddStory = ({ setCreate }) => {
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



    // for (let i = 0; i < selectTags?.length; i++) {
    //     formData.append('tags[]', selectTags[i].value || tags)
    // }
    // const onSubmit = async data => {
    //     console.log(data)
    //     if (data?.image.length > 0) {
    //         const formData = await getFormData(['image', 'title', 'details', 'summary', 'adult', 'tags[]', 'contest_id', 'category_id'
    //         ], [
    //             data.image[0],
    //             data.title,
    //             details,
    //             data.summary,
    //             data.adult ? 1 : 0,
    //             selectTag,
    //             con,
    //             cat,
    //         ])
    //         await addStory(formData)
    //     } else {
    //         const { title, summary, adult, category_id } = data
    //         await addStory({
    //             title,
    //             summary,
    //             details,
    //             adult: adult ? 1 : 0,
    //             tags: selectTag,
    //             contest_id: con,
    //             category_id: cat
    //         })
    //     }

    // }

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
                                    <h4>Add Story</h4>
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
                                            {errors?.title && <span className='text-danger'>Title Required</span>}
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
                                            {errors?.summary && <span className='text-danger'>Summary Required</span>}
                                        </div>
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
                                            {...register("contest_id",
                                                {
                                                    required: 'Contest is required',
                                                }
                                            )}
                                            className="form-select"
                                        >
                                            <option defaultValue>Select Contest </option>
                                            {
                                                contests?.contestList?.map((item, index) => <option key={index} value={item.id}>{item.contest_title}</option>)
                                            }
                                        </select>
                                        <div>
                                            {errors?.contest_id && <span className='text-danger'>Contest Required</span>}
                                        </div>
                                        <select
                                            {...register("category_id",
                                                {
                                                    required: 'contest is required',
                                                }
                                            )}
                                            className="form-select"

                                        >
                                            <option defaultValue>Pick Categories </option>
                                            {
                                                categories?.categoryList?.map((item, index) => <option key={index} value={item.id}>{item.category_name}</option>)
                                            }
                                        </select>
                                        <div>
                                            {errors?.category_id && <span className='text-danger'>Category Required</span>}
                                        </div>
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
                                                {errors?.image && <span className='text-danger'>Image Required</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-sm-12 col-md-12">
                                    <div className="edit-btn">
                                        <button onClick={() => setCreate(false)}>Close</button>
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
