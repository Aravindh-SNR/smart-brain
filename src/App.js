import React, {useState, Fragment} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/image_link_form/ImageLinkForm';
import Score from './components/score/Score';
import FaceRecognition from './components/face_recognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignIn from './components/sign_in_up/SignIn';
import SignUp from './components/sign_in_up/SignUp';

//Clarifai face detection API
const app = new Clarifai.App({
  apiKey: 'cd4860e13055414f86801071d4050504'
 });

//options for the particles provided by particles.js library
const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 700
      }
    },
    move: {
      speed: 6
    }
  },
  interactivity: {
    detect_on: 'window',
    events: {
      onhover: {
        enable: true,
        mode: ['repulse']
      }
    }
  }
};

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [data, setData] = useState({});
  const [styles, setStyles] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [urlMessage, setUrlMessage] = useState('');

  //Function to calculate face locations based on the data received from the API
  const calculateFaceLocation = (regions) => {
    const newStyles = [];

    //Number of faces would be equal to the number of objects in the regions array
    regions.forEach(region => {
      const coordinates = region.region_info.bounding_box;
      const image = document.getElementById('input-image');

      newStyles.push({
        width: `${(coordinates.right_col - coordinates.left_col) * image.width}px`,
        height: `${(coordinates.bottom_row - coordinates.top_row) * image.height}px`,
        top: `${coordinates.top_row * image.height}px`,
        left: `${coordinates.left_col * image.width}px`
      });
    });

    setStyles(newStyles);
  };

  //Function to request the server to increment the entries of the user by the number of faces detected
  const updateScore = (numberOfFaces) => {
    fetch('http://localhost:8080/image', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: user.id,
        score: numberOfFaces
      })
    })
    .then(response => response.json())
    .then(entries => {
      setUser({
        ...user,
        entries
      });
      localStorage.setItem('user', JSON.stringify({
        ...user,
        entries
      }));
    });
  };

  //Listener to capture the input entered for the image URL
  const handleInputChange = (event) => {
    setInput(event.target.value.trim());
  };

  //Function to make a request to the API and then invoke calculateFaceLocation function
  //with the data received from the API
  const handleSubmit = () => {
    setImageUrl(input);
    setStyles([]);

    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(response => {
      const {regions} = response.outputs[0].data;
      if(regions) {
        setData(regions);
        calculateFaceLocation(regions);
        updateScore(regions.length);
      }
      urlMessage && setUrlMessage('');
    })
    .catch(error => {
      //displaying an error message if the image URL entered is invalid
      setUrlMessage('Please enter a valid image URL.');
      const modal = document.getElementById('modal');
        if(modal) {
            modal.style.display = 'block';
        }
    });
  };

  //Updating face locations when the window is resized
  window.onresize = () => {
    document.getElementsByClassName('face-box').length && calculateFaceLocation(data);
  };

  //Emptying the user object and removing it from the browser memory when the user signs out
  const handleSignOut = () => {
    setUser({});
    localStorage.removeItem('user');
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Route render={props => <Navigation {...props} handleSignOut={handleSignOut}/>}/>
        <Route exact path='/' render={
          props => user.id ? <Redirect to='/home'/> : <SignIn {...props} setUser={setUser}/>
          }/>
        <Route exact path='/signup' render={
          props => user.id ? <Redirect to='/home'/> : <SignUp {...props} setUser={setUser}/>
          }/>
        <Route exact path='/home' render={
          () => user.id ?
          <Fragment>
            <Logo/>
            <Score user={user}/>
            <ImageLinkForm input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
            <FaceRecognition imageUrl={imageUrl} styles={styles} urlMessage={urlMessage}/>
          </Fragment>
          :
          <Redirect to='/'/>}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
