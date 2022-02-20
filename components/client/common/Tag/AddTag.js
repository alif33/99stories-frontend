import React, { useState } from 'react';
import AuthModal from '../../../dashboard/Modal';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { setTag } from '../../../../redux/tag/actions';
import { authPost } from '../../../../helpers/HttpService';
import { modalToggle } from '../../../../redux/settings/actions';

const AddTag = ({setTrigger}) => {
    const dispatch = useDispatch()
    const [disable, setDisable] = useState(false)
    const { settings, users, tags } = useSelector(state => state)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const onSubmit = async data => {
        setDisable(true)
        authPost('/tag', data, users.token)
            .then(res => {
                if (res.success) {
                    toast.success(res.message)
                    setDisable(false)
                    dispatch(setTag())
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
        </>
    );
};

export default AddTag;