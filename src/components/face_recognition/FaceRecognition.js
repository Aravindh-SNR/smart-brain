import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, styles}) => {
    return (
        <div className='image-box'>
            <img id='input-image' alt='' src={imageUrl}/>
            {styles.length > 0 && styles.map((style, index) => <div className='face-box' style={style} key={index}/>)}
        </div>
    );
};

export default FaceRecognition;