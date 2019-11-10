import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({input, handleInputChange, handleSubmit}) => {
    return (
        <div>
            <p>This magic brain will detect faces in your picture. Give it a try.</p>
            <div className='form'>
                <div className='form-content'>
                    <input type="text" onChange={handleInputChange} placeholder='Please enter an image URL'/>
                    <button className='pointer' onClick={() => {input.trim() && handleSubmit()}}>Detect</button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;