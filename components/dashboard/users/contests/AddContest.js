import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { authPost } from '../../../../helpers/HttpService'
import { showErr } from '../../../../helpers/ErrHandler'
import { useSelector, useDispatch } from 'react-redux'
import { setUserContest } from '../../../../redux/contests/actions'
import { toast, ToastContainer } from 'react-toastify'
import DatePicker from 'react-datepicker'
import dynamic from 'next/dynamic'



const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
  })


const AddStory = ({ setTrigger  }) => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [ description, setDescription ] = useState()
    const [ disable, setDisable ] = useState()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { settings, users, categories } = useSelector(state=>state)
    const dispatch = useDispatch()


    const addContest = async data => {
        setDisable(true)
        authPost('/contest', data, users.token)
        .then(contest=>{
            if(contest?.success){
                dispatch(setUserContest(users.token))
                toast.success(contest.message)
                setDisable(false)
            }else{
                console.log(contest.response)
                // toast.error(category.response.data[0]?.category_name[0])
                setDisable(false)
            }
        })
    }
    
    const onError = err => showErr(err)

    const onSubmit = async data => {
        if(data?.image.length > 0){
            const formData = new FormData()
            formData.append('image', data.image[0])
            formData.append('contest_title', data.contest_title)
            formData.append('contest_description', description)
            formData.append('contest_prize', data.contest_prize)
            formData.append('start_date', startDate)
            formData.append('end_date', endDate)
            await addContest(formData)
        }else{
            const { contest_title, contest_prize } = data
            await addContest({
                contest_title,
                contest_description: description,
                contest_prize,
                start_date: startDate,
                end_date: endDate
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
                                <h4>Add Contest</h4>
                                </div>
                            </div>
                        </div>
                        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit, onError)}>
                            <div className="row">
                                <div className="col-lg-8 col-sm-12 col-md-12">
                                <div className="left-side">
                                    <input 
                                        {...register("contest_title",
                                            {
                                                required: 'Title is required',
                                            }
                                        )}
                                        type="text" 
                                        placeholder="Contest Title" 
                                    />
                                    <input 
                                        {...register("contest_prize",
                                            {
                                                required: 'Prize is required',
                                            }
                                        )}
                                        type="number" 
                                        placeholder="Contest Prize" 
                                    />
                                    <SunEditor
                                        onChange={
                                            e=> setDescription(e)
                                        }
                                    />
                                </div>
                                </div>
                                <div className="col-lg-4 col-sm-12 col-md-12">
                                <div className="right-side">
                                    <h3>Contest details</h3>
                                    <div className="check-box">
                                        <label htmlFor="startDateId">Start Date</label>
                                        <DatePicker 
                                            id="startDateId"
                                            className="form-control"
                                            selected={startDate} 
                                            onChange={(date) => setStartDate(date)} 
                                        />
                                        <label htmlFor="endDateId">End Date</label>
                                        <DatePicker 
                                            id="endDateId"
                                            className="form-control"
                                            selected={endDate} 
                                            onChange={(date) => setEndDate(date)} 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label 
                                            htmlFor="contestImageId" 
                                            className="form-label"
                                        >Contest Image</label>
                                        <input 
                                            {...register("image")}
                                            className="form-control" 
                                            type="file" 
                                            id="contestImageId" 
                                        />
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-sm-12 col-md-12">
                                <div className="edit-btn">
                                    <button onClick={()=>setTrigger(false)}>Close</button>
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
