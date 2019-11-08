import React from 'react';
import './Score.css';

const Score = ({user}) => {
    return user.id ? 
        <div className='score'>
            <div className='score-message'>
                {`Hi ${user.name}, your current score is ...`}
            </div>
            <div className='score-number'>
                {`#${user.entries}`}
            </div>
        </div>
        :
        null;
};

export default Score;