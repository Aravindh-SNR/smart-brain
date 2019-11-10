import React from 'react';
import './Score.css';

const Score = ({user}) => {
    return user.id ? 
        <div className='score'>
            <div className='score-message'>
                {`Hi ${user.name}, we have detected
                ${user.entries === 1 ? '1 face' : user.entries + ' faces'}
                for you so far.`}
            </div>
        </div>
        :
        null;
};

export default Score;