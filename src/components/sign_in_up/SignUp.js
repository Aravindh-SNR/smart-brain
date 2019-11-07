import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './SignInUp.css';

const SignUp = ({setUser}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        name && /^.+@.+\..+$/.test(email) && password && fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
        .then(response => response.json())
        .then(user => {
            setUser(user);
        });
    };

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Sign Up</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input onChange={handleNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" type="email" name="name"  id="name" placeholder='Username required'/>
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={handleEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" type="email" name="email-address"  id="email-address" placeholder='anything@anything.anything'/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={handlePasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white" type="password" name="password"  id="password" placeholder='Password required'/>
                    </div>
                    </fieldset>
                    <div className="" onClick={handleSubmit}>
                        <Link to={name && /^.+@.+\..+$/.test(email) && password ? '/home' : '#'}>
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign up"/>
                        </Link>
                    </div>
                    <div className="lh-copy mt3">
                    <Link to='/' className="f6 link dim black db">Sign in</Link>
                    </div>
                </div>
            </main>
        </article>
    );
};

export default SignUp;