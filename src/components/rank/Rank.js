import React from 'react';
import './Rank.css';

const Rank = ({user}) => {
    return user.id ? 
        <div className='rank'>
            <div className='rank-message'>
                {`Hi ${user.name}, your current rank is ...`}
            </div>
            <div className='rank-number'>
                {`#${user.entries}`}
            </div>
        </div>
        :
        null;
};

export default Rank;