import React from 'react';
import AuthModal from './../../Modal';
import parse from 'html-react-parser'
import { useDispatch } from 'react-redux';
import { modalToggle } from '../../../../redux/settings/actions';
import { useSelector } from 'react-redux';
const StoryDescription = ({setDescription, description}) => {
    const dispatch = useDispatch()
    const {settings} = useSelector(state => state)
    return (
            <AuthModal
                size="md"
            > <div className="container">
            <div className="row my-3">
                <div className="col-md-11">
                    <h5 className="text-center">Story Description</h5>
                </div>
                <div className="col-md-1">
                    <i onClick={() => {
                        dispatch(modalToggle(settings.modal))
                        setDescription({isDescription: false, data: null})
                    }} style={{ cursor: 'pointer' }} className="fas fa-times"></i>
                </div>
            </div>
            <div className="row">
                <p>{parse(description.data)}</p>
            </div>
        </div>
            </AuthModal>
       
    );
};

export default StoryDescription;