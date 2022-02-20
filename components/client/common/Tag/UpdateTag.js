import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form'
import { modalToggle } from '../../../../redux/settings/actions';
import { authPost } from '../../../../helpers/HttpService';
import AuthModal from '../../../dashboard/Modal';
import { useRouter } from 'next/dist/client/router';
const UpdateTag = ({update, setUpdate}) => {
    const [disable, setDisable] = useState(false)
    const dispatch = useDispatch()
    const { settings, users, tags, admins } = useSelector(state => state)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const router = useRouter()
    const {pathname} = router
    // console.log(router.pathname)
    const onSubmit = async data => {
        setDisable(true)
        authPost('/tag', data, pathname == "/dashboard/tags" && users.token || pathname === "/admin/dashboard/tags" && admins.token)
            .then(res => {
                if (res.success) {
                    toast.success(res.message)
                    setDisable(false)
                    reset()
                } else {
                    setDisable(false)
                }
            })
    }
    return (
        <>
            <AuthModal
                    size="md"
                >
                    <div className="container">
                        <div className="row my-3">
                            <div className="col-md-11">
                                <h5 className="text-center">Update Tag</h5>
                            </div>
                            <div className="col-md-1">
                                <i onClick={() => {
                                    dispatch(modalToggle(settings.modal))
                                    setUpdate({isUpdate: false, tag: null})
                                }} style={{ cursor: 'pointer' }} className="fas fa-times"></i>
                            </div>
                        </div>
                        <div className="row">
                            <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <input
                                    defaultValue={update.tag?.tag_name}
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
                                >Update</button>
                            </form>
                        </div>
                    </div>
                </AuthModal>
        </>
    );
};

export default UpdateTag;