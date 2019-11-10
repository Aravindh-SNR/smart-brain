import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './SignInUp.css';

const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [failureMessage, setFailureMessage] = useState('');

    const handleEmailInput = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordInput = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        /^.+@.+\..+$/.test(email) && password.trim().length ?
        fetch('http://localhost:8080/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.id) {
                props.setUser(data);
                failureMessage && setFailureMessage('');
                props.history.push('/home');
            } else {
                setFailureMessage(data);
            }
        })
        :
        setFailureMessage('Please enter valid details.');
    };

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={handleEmailInput} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" type="email" name="email-address"  id="email-address" placeholder='anything@anything.anything'/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={handlePasswordInput} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white" type="password" name="password"  id="password" placeholder='Password required'/>
                    </div>
                    </fieldset>
                    <div className="" onClick={handleSubmit}>
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                    </div>
                    <div className="lh-copy mt3">
                        <Link to='/signup' className="f6 link dim black db">Sign up</Link>
                    </div>
                    {failureMessage && <div>
                        <p className='failure-message'>{failureMessage}</p>
                    </div>}
                </div>
            </main>
        </article>
    );
};

export default SignIn;