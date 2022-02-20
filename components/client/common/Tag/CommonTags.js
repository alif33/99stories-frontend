import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { modalToggle } from '../../../../redux/settings/actions';
import { setTag } from '../../../../redux/tag/actions';
import AuthModal from '../../../dashboard/Modal';
import AddTag from './AddTag';
import UpdateTag from './UpdateTag';



export default function CommonTag() {

    const [trigger, setTrigger] = useState()
   
    const { settings, users, tags } = useSelector(state => state)
    
    const dispatch = useDispatch()
    const [update, setUpdate] = useState({isUpdate: false, tag: null})

    useEffect(() => {
        dispatch(setTag())
    }, [])

    return (
        <>
            {trigger &&
             <AddTag setTrigger={setTrigger}/>   
            }
            {update.isUpdate &&
                <UpdateTag update={update} setUpdate={setUpdate}/>
            }
           
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
                                        <th style={{ width: "20%", }}>ID</th>
                                        <th style={{ width: "15%", }}>Name</th>
                                        <th style={{ width: "5%", }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {tags.tagList?.map((item, i) => <tr key={i}>

                                        <td>{item.id}</td>
                                        <td>{item.tag_name}</td>
                                        <td>
                                                <i onClick={() => {
                                                    dispatch(modalToggle(settings.modal))
                                                    setUpdate({isUpdate: true, tag: item})
                                                }} className="fa fa-edit" style={{cursor:'pointer'}}></i>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            

        </>
    )
}

