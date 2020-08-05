import React from "react";
import {
  BrowserRouter as Router, Route
} from "react-router-dom";
import './App.css';
import Login from './components/Login'
import Welcome from './components/Welcome'
import Profile from "./components/Profile";
import Register from "./components/Register";
import GuestRoute from "./components/Guest";
import AuthRoute from "./components/Auth";
import Edit from "./components/Edit";
import Create from "./components/Create";

function App() {
  return (
    <Router>
      <div className="bg">
        <Route path="/" exact component={Welcome}></Route>
        <GuestRoute path="/login" component={Login}/>
        <GuestRoute path="/register" component={Register}/>
        <AuthRoute path="/profile" exact component={Profile}/>
        <AuthRoute path="/create/"  component={Create}/>
        <AuthRoute path="/note/:id"  component={Edit}/>
      </div>
    </Router>
  );
}

export default App;
