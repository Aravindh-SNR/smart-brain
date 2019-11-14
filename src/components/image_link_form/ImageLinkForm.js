import React from 'react';
import './ImageLinkForm.css';

//Component for inputting the image URL
const ImageLinkForm = ({input, handleInputChange, handleSubmit}) => {
    return (
        <div>
            <p>This magic brain will detect faces in your picture. Give it a try.</p>
            <div className='form'>
                <div className='form-content'>
                    <input type="text" onChange={handleInputChange} placeholder='Please enter an image URL'/>
                    <button className='pointer' onClick={() => {
                        //If the app is open in two different tabs/windows and the user has signed out
                        //in one of the tabs/windows, they will be signed out in the other tab/window as well
                        //when they click on the Detect button
                        localStorage.getItem('user') ? input.trim() && handleSubmit() : document.location.reload();
                    }}>Detect</button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;