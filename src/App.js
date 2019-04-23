import React, { Component } from 'react';
import Auth from './components/auth/Auth';
import SiteBar from './components/sitebar/Sitebar';
import MainFeed from './components/mainfeed/MainFeed';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'


class App extends Component {

  constructor() {
    super();
    this.state = {
      sessionToken: '' 
    }
  }

  componentWillMount() {
      const token = localStorage.getItem('token'); 
      if (token && !this.state.sessionToken) {   
        this.setState({ sessionToken: token });
      }
  }
                
  setSessionState = (token) => {
      localStorage.setItem('token', token); 
      this.setState({ sessionToken: token });
  }

  
  viewConductor = () => {
    return this.state.sessionToken !== ''  ? 
    <Router><SiteBar logoutFunc = {this.logout}/></Router> : <Auth setToken={this.setSessionState}/>
  }

  logout = () => {
    this.setState({ 
      sessionToken: '', 
    });
    localStorage.clear();
    console.log("You have been logged out")
  }


  render() {
    return (
      <div id="app">
        {this.viewConductor() }
      </div>
    );
  }
}

export default App;
