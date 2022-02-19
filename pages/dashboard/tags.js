import React, { useState, useEffect } from 'react'
import Layout from '../../layouts/user'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { setUserContest } from '../../redux/contests/actions'
import { userAuth } from '../../helpers/requireAuthentication'
import AuthModal from '../../components/dashboard/Modal'
import { authPost } from '../../helpers/HttpService'
import { toast } from 'react-toastify';
import { modalToggle } from '../../redux/settings/actions'
import { setTag } from './../../redux/tag/actions';



export default function Tags() {

    const [trigger, setTrigger] = useState()
    const [disable, setDisable] = useState(false)
    const { settings, users, tags } = useSelector(state => state)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTag())
    }, [])
    console.log(tags)

    const onSubmit = async data => {
        setDisable(true)
        authPost('/tag', data, users.token)
        .then(res => {
            if (res.success) {
                toast.success(res.message)
                setDisable(false)
                reset()
            }else{
                setDisable(false)
            }
        })
    }

    return (
        <>
            {trigger &&
                <AuthModal
                    size="md"
                >
                    <div className="container">
                        <div className="row my-3">
                            <div className="col-md-11">
                                <h5 className="text-center">Add Tag</h5>
                            </div>
                            <div className="col-md-1">
                                <i onClick={() => {
                                    dispatch(modalToggle(settings.modal))
                                    setTrigger(true)
                                }} style={{ cursor: 'pointer' }} className="fas fa-times"></i>
                            </div>
                        </div>
                        <div className="row">
                            <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <input
                                        {...register("tag_name",
                                            {
                                                required: 'Tag name required',
                                            }
                                        )}
                                        type="text"
                                        className="form-control"
                                        placeholder="Tag name"
                                    />
                                </div>
                                <button
                                    disabled={disable}
                                    type="submit"
                                    className="btn btn-primary"
                                >Submit</button>
                            </form>
                        </div>
                    </div>
                </AuthModal>
            }
            <Layout>
                <div className={settings.sidebar ? "unboarding unboarding_active" : "unboarding"}>
                    <div className="t_header py-3">
                        <div className="row heading_button">
                            <div className="col-md-9 t_heading">
                                <h5>Story</h5>
                            </div>
                            <div className="col-md-3 t_button">
                                <button
                                    type="button"
                                    onClick={() => {
                                        dispatch(modalToggle(settings.modal))
                                        setTrigger(true)
                                    }}
                                    className="btn btn-primary" >
                                    <i className="fas fa-plus-circle"></i> Add Tag
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="t_table_content-wrapper">
                        <div className="container table-responsive">
                            <table className="table">
                                <thead className="thead bg-light">
                                    <tr>

                                        <th style={{ width: "20%", }}>End Date</th>
                                        <th style={{ width: "15%", }}>Status</th>
                                        <th style={{ width: "5%", }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {
                                        contests.userContestList?.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row" className="row-scope-line">
                                                <Link href={`${ROOT_URL}contest/${item.slug}`}>
                                                    <a target="_blank"><i className="fas fa-link" style={{ color: '#5d6268'}}></i></a>
                                                </Link>
                                            </th>
                                                    <td >{item.contest_title}</td>
                                                    <td >{item.contest_title}</td>
                                                    <td >{item.contest_title}</td>

                                                </tr>
                                            )
                                        })
                                    } */}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Layout>

        </>
    )
}

export const getServerSideProps = userAuth(context => {
    return {
        props: {}
    }
})