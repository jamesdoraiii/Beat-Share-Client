import React from 'react'; 
import {
    Route,
    Link,
    Switch
  } from 'react-router-dom';

import MainFeed from '../mainfeed/MainFeed'
import PostCreation from '../postcreation/PostCreation'
import TopPosts from '../topposts/TopPosts'
import UserPage from '../userpage/UserPage'

import Radium from 'radium';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';

const styles = {
    navbar: {
      backgroundColor: 'rgba(255,255,255,.95)',
      color: "#FEFFFF",
      height: "5em",
      padding: ".5em"
    },
    text: {
      color: "#FEFFFF"
    },

    buttons: {
      backgroundColor : 'rgba(255,255,255,.95)',
      borderRadius : '50em',
      fontSize: "1em",
      width: '7.5em',
      height: '6vh',
      color: 'black',
      margin: '.2em',
      border: "none",
      paddingTop: ".5em",
      boxShadow: ".5em .5em 1em #000000"
      
    },

    textcolor:{
      color: "black"
    }
  
  }




class SiteBar extends React.Component {
    constructor(props) {
        super(props);
        
        if (typeof window !== 'undefined') {
          let prevScrollpos = window.pageYOffset;
          window.onscroll = function () {
            const maxScroll = document.body.clientHeight - window.innerHeight;
            let currentScrollPos = window.pageYOffset;
            if (
                (maxScroll > 0 && prevScrollpos > currentScrollPos && prevScrollpos <= maxScroll) 
              || (maxScroll <= 0 && prevScrollpos > currentScrollPos)
              || (prevScrollpos <= 0 && currentScrollPos <= 0)
              ) {
                //THIS NEEDS TO BE FIXED. IT CAUSES CRASHES ON LOGOUT BECAUSE THE SIDEBAR DISSAPEARS, USE SOME KIND OF TERNARY SO THAT IT DOESNT TRY TO SET STYLE IF THE GETELEMENTBYID IS NULL
              if(document.getElementById("navbar") != null){
                document.getElementById("navbar").style.top = "0";
            }} else {
              if(document.getElementById("navbar") != null){document.getElementById("navbar").style.top = "-7.0rem"; // adjustable based your need
            }}
            prevScrollpos = currentScrollPos;
          }
        }
      }


      

    render() {
    return (
    <div>
    
    <div>
        
        <Navbar light expand="md" fixed="top" id="navbar">
            
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                      <button style = {styles.buttons}><Link to="/" style = {styles.textcolor}><h6>Main Feed</h6></Link></button>
                    </NavItem>
                
                    <NavItem>
                      <button style = {styles.buttons}><Link to="/postcreation" style = {styles.textcolor}><h6>Post Creation</h6></Link></button>
                    </NavItem>

                    <NavItem>
                      <button style = {styles.buttons}><Link to="/topposts" style = {styles.textcolor}><h6>Top Posts</h6></Link></button>
                    </NavItem>

                    <NavItem>
                      <button style = {styles.buttons}><Link to="/userpage" style = {styles.textcolor}><h6>User Page</h6></Link></button>
                    </NavItem>

                    <NavItem>
                      <button onClick = {this.props.logoutFunc} style = {styles.buttons}><h6>Logout </h6></button>
                    </NavItem>
            </Nav>
            </Collapse>
        </Navbar>
        </div>


        <div className="sidebar-route">
            <Switch>
                <Route exact path="/"><MainFeed /></Route>
                <Route exact path="/postcreation"><PostCreation /></Route>
                <Route exact path="/topposts"><TopPosts /></Route>
                <Route exact path="/userpage"><UserPage /></Route>
            </Switch>
        </div>
    
    </div>
    
)}};


export default Radium(SiteBar);