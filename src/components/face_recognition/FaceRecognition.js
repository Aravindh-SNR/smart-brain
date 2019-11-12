import React from 'react';
import './FaceRecognition.css';
import Modal from '../modal/Modal';

//Component to display image, face boxes and an error message if the image URL is invalid
const FaceRecognition = ({imageUrl, styles, urlMessage}) => {
    return (
        <div className='image-box'>
            <img id='input-image' alt='' src={imageUrl}/>
            {styles.length > 0 && styles.map((style, index) => <div className='face-box' style={style} key={index}/>)}
            {urlMessage && <Modal message={urlMessage}/>}
        </div>
    );
};

export default FaceRecognition;