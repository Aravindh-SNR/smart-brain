import React, {useState, Fragment} from 'react';
import {Link} from 'react-router-dom';
import './SignInUp.css';
import Modal from '../modal/Modal';
import Loading from '../loading_animation/Loading';

//Component for displaying and performing sign-in/sign-up
const SignInUp = props => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [failureMessage, setFailureMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

    const handleSubmit = (event) => {
        //Prevent the form from getting submitted
        event.preventDefault();

        //Condition to validate email format and password length
        let condition = /^.+@.+\..+$/.test(email) && password.trim().length;

        //Object that needs to be sent to the server to sign in or sign up user
        let requestObject = {email, password};
        
        //Adding name field to condition and request object if the view is sign up
        if (props.view === 'signup') {
            condition = name.trim().length && condition;
            requestObject = {name, ...requestObject};
        }

        if(condition) {
            //displaying the loading animation since we are about to make an asynchronous request
            setIsLoading(true);
            //Making a request to the server to create the user
            fetch(`https://damp-basin-62791.herokuapp.com/${props.view}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(requestObject)
            })
            .then(response => response.json())
            .then(data => {
                setIsLoading(false);
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
        <Fragment>
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure" onSubmit={handleSubmit}>
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">{props.view === 'signup' ? 'Sign Up' : 'Sign In'}</legend>
                            {props.view === 'signup' && 
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input autoComplete="off" autoFocus onChange={handleNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" type="text" name="name"  id="name" placeholder='Name required'/>
                            </div>
                            }
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input autoComplete="off" autoFocus={props.view === 'signin'} onChange={handleEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" type="text" name="email-address"  id="email-address" placeholder='anything@anything.anything'/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={handlePasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white" type="password" name="password"  id="password" placeholder='Password required'/>
                            </div>
                        </fieldset>
                        <div>
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value={props.view === 'signup' ? 'Sign Up' : 'Sign In'}/>
                        </div>
                        <div className="lh-copy mt3">
                            <Link to={props.view === 'signup' ? '/' : '/signup'} className="f6 link dim black db">{props.view === 'signup' ? 'Sign In' : 'Sign Up'}</Link>
                        </div>
                        {failureMessage && <Modal message={failureMessage}/>}
                    </form>
                </main>
            </article>
            {isLoading && <Loading/>}
        </Fragment>
    );
};

export default SignInUp;