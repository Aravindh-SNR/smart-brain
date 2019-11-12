import React from 'react';
import './Modal.css';

//Component for displaying a popup modal with error messages
const Modal = ({message}) => {
    //Close the modal when the (x) icon is clicked
    const closeModal = () => {
        document.getElementById('modal').style.display = 'none';
    };

    //Close the modal when a click is made anywhere in the window outside the modal-content
    window.onclick = (event) => {
        const modal = document.getElementById('modal');
        if(event.target === modal) {
            modal.style.display = 'none';
        }
    }

    return (
        <div id='modal'>
            <div id='modal-content'>
                <p className='failure-message'>{message}</p>
                <span id='close' onClick={closeModal}>&times;</span>
            </div>
        </div>
    );
};

export default Modal;