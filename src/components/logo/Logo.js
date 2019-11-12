import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

//Component for displaying the logo in the user page
const Logo = () => {
    return (
        <div>
            <Tilt className="Tilt" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner">
                    <img src={brain} alt='logo' className='logo'/>
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;