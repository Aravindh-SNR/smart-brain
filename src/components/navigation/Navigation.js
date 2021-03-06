import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css'

//Component for displaying Sign in, Sign up and Sign out links
const Navigation = props => {
    const {pathname} = props.location;
    const {handleSignOut} = props;
    
    return (
        <nav className='top-nav'>
            <h1 className='site-heading'>
                Smart Brain<br/>
                <span id='description'>Face Detection App</span>
            </h1>
            {pathname === '/home' ? 
            <Link to='/' className='sign-in-out pointer' onClick={handleSignOut}>Sign out</Link>
            :
            <Fragment>
                <Link to='/' className='sign-in-out pointer'>Sign in</Link>
                <Link to='/signup' className='sign-in-out pointer'>Sign up</Link>
            </Fragment>}
        </nav>
    );
};

export default Navigation;