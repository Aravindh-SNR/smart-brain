import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './SignInUp.css';
import Modal from '../modal/Modal';

//Component for displaying the sign up form and performing sign up
const SignUp = props => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [failureMessage, setFailureMessage] = useState('');

    //Listener to capture the input entered for name
    const handleNameChange = event => {
        setName(event.target.value);
    };

    //Listener to capture the input entered for email
    const handleEmailChange = event => {
        setEmail(event.target.value);
    };

    //Listener to capture the input entered for password
    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        //Checking the name length, email format and password length
        if(name.trim().length && /^.+@.+\..+$/.test(email) && password.trim().length) {
            //Making a request to the server to create the user
            fetch('https://damp-basin-62791.herokuapp.com/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.id) {
                    //If the response has a user object, we store it in React as well as the browser memory
                    //and take the user to home (profile) screen
                    props.setUser(data);
                    localStorage.setItem('user', JSON.stringify(data));
                    props.history.push('/home');
                } else {
                    //displaying the error message received from the server in the absence of a user object
                    setFailureMessage(data);
                    const modal = document.getElementById('modal');
                    if(modal) {
                        modal.style.display = 'block';
                    }
                }
            });
        } else {
            //displaying an error message if the inputs entered are not valid
            setFailureMessage('Please enter valid details in all the fields.');
            const modal = document.getElementById('modal');
            if(modal) {
                modal.style.display = 'block';
            }
        }
    };

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Sign Up</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input onChange={handleNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" type="email" name="name"  id="name" placeholder='Name required'/>
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
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign up"/>
                    </div>
                    <div className="lh-copy mt3">
                        <Link to='/' className="f6 link dim black db">Sign in</Link>
                    </div>
                    {failureMessage && <Modal message={failureMessage}/>}
                </div>
            </main>
        </article>
    );
};

export default SignUp;