import React from 'react'
import { 
    Modal, 
    ModalBody
} from 'reactstrap'
import { modalToggle } from "../../redux/settings/actions"
import { useSelector, useDispatch } from "react-redux"

const AuthModal = ({ children, size }) => {

  const { settings } = useSelector(state => state)
  const dispatch = useDispatch();

  return (
    <>
      <Modal 
        size={size}
        centered
        isOpen={settings.modal} 
        toggle={()=>dispatch(
            modalToggle(settings.modal)
        )}>
        <ModalBody>
            {children}
        </ModalBody>
      </Modal>
    </>
  );
};

export default AuthModal;