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

const app = new Clarifai.App({
  apiKey: 'cd4860e13055414f86801071d4050504'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [data, setData] = useState({});
  const [styles, setStyles] = useState([]);
  const [user, setUser] = useState({});

  const calculateFaceLocation = (regions) => {
    const newStyles = [];

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
  }

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
    });
  }

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

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
    })
    .catch(error => {});
  };

  window.onresize = () => {
    document.getElementsByClassName('face-box').length && calculateFaceLocation(data);
  };

  const handleSignOut = () => {
    setInput('');
    setImageUrl('');
    setData({});
    setStyles([]);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Route render={props => <Navigation {...props} handleSignOut={handleSignOut}/>}/>
        <Route exact path='/' render={(props) => <SignIn {...props} setUser={setUser}/>}/>
        <Route exact path='/signup' render={(props) => <SignUp {...props} setUser={setUser}/>}/>
        <Route exact path='/home' render={() =>
          user.id ?
          <Fragment>
            <Logo/>
            <Score user={user}/>
            <ImageLinkForm input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
            <FaceRecognition imageUrl={imageUrl} styles={styles}/>
          </Fragment>
          :
          <Redirect to='/'/>
        }/>
      </div>
    </BrowserRouter>
  );
}

export default App;
