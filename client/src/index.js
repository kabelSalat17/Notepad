import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux-store/index'
import {Provider} from 'react-redux'
import axios from 'axios'
import cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

//fecth user before Render
const jwt_secret = 'Hmcgryk9TGWuCRtTZWqOBgZ5HZYXrAOllNa2DNPStQ1D678VuPNm7lelLcAhuh5l'
let token = cookie.get('token')
// verify a token symmetric
if (token){
  jwt.verify(token, jwt_secret, function(err, decoded) {
    if(err){
      //replace token with another one
      cookie.remove("token") 
      token=null;
    } else {
      //when token dont come from login
      if (decoded.iss !== 'http://127.0.0.1:8000/api/auth/login'){
          //replace token with another one
          cookie.remove("token") 
          token=null;
      }
    }
  });
}


//render function //avoid repeating code
const render = () => {
  ReactDOM.render(
    <Provider store = {store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

//if token exists //avoid login flash
if(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  //if you refresh and token still exists redirect to /profile
  axios.post("http://127.0.0.1:8000/api/auth/me")
    .then(res => {
      store.dispatch({type:"SET_LOGIN", payload:res.data})
      render()
      
    })
} else {
  render()
}



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
