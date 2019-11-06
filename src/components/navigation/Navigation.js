import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css'

const Navigation = (props) => {
    const {pathname} = props.location;
    
    return (
        <nav className='top-nav'>
            {pathname === '/home' ? 
            <Link to='/' className='sign-in-out pointer'>Sign out</Link>
            :
            <Fragment>
                <Link to='/' className='sign-in-out pointer'>Sign in</Link>
                <Link to='/signup' className='sign-in-out pointer'>Sign up</Link>
            </Fragment>}
        </nav>
    );
};

export default Navigation;