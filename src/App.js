import React, {useState, Fragment} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/image_link_form/ImageLinkForm';
import Rank from './components/rank/Rank';
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
        value_area: 600
      }
    }
  }
};

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [data, setData] = useState({});
  const [styles, setStyles] = useState([]);

  const calculateFaceLocation = (data) => {
    const newStyles = [];

    data.outputs[0].data.regions.forEach(region => {
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

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    setImageUrl(input);
    setStyles([]);

    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(response => {
      setData(response);
      calculateFaceLocation(response);
    })
    .catch(error => {
      console.log(error);
    });
  };

  window.onresize = () => {
    document.getElementsByClassName('face-box').length && calculateFaceLocation(data);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Route component={Navigation}/>
        <Route exact path='/' component={SignIn}/>
        <Route exact path='/signup' component={SignUp}/>
        <Route exact path='/home' render={() =>
          <Fragment>
            <Logo/>
            <Rank/>
            <ImageLinkForm handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
            <FaceRecognition imageUrl={imageUrl} styles={styles}/>
          </Fragment>
        }/>
      </div>
    </BrowserRouter>
  );
}

export default App;
