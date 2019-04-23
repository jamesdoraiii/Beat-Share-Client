import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, FormText } from 'reactstrap';
import Radium from 'radium';
import { Container, Row, Col } from 'reactstrap';
import backgroundIMG from '../../assets/pictures/signup.jpg'

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',  
            password: '',
            message: '',
        };

        this.styles = {
            fullpage:{
                backgroundImage: `url(${backgroundIMG})`,
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                webkitFilter: "grayscale(100%)",
                filter: "grayscale(100%)",
                height: "110vh"
            },

            form:{
                background: 'rgba(255,255,255,0.95)',
                position: 'relative',
                margin: 'auto',
                padding: '4vh',
                top: '3vh',
                fontSize: '3vh',
                textAlign: 'center',
                borderRadius: ".5em",
                boxShadow: ".5em .5em 1em #000000"
            },

            forceSize:{
                height: '4vh',
                fontSize: '2vh',
                margin: '1vh'
            },

            spacertop: {
                height: "4vh"
            },
            spacer: {
                height: ".05vh"
            },
            titletext: {
                color: "white",
                textAlign: "center",
                fontSize: "4em",
                textShadow: "1px 1px #595959",
            },
            subtitletext: {
                color: "white",
                textAlign: "center",
                fontSize: "2em",
                textShadow: "1px 1px #595959",
            },
            line: {
                border: "0",
                height: ".3vh",
                backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0))",
                boxShadow: ".1px .1px #595959",
            },
            button: {
                width: "30%",
                height: '6vh',
                fontFamily: "'Montserrat', sans-serif",
                backgroundColor: "black"
                },
            fontset: {
                fontFamily: "'Montserrat', sans-serif",
            }


        }
    };


    handleChange = (event) => {
                
        this.setState({                   
            [event.target.name]: event.target.value,
        });
        
    }

    newUserSignup = (event) => {

        this.state.username === '' || this.state.password === '' ? this.setState({message : 'Valid entry required for both username and password before continuing'}): this.setState ({ message : ''})

        if (this.state.username !== "" && this.state.password !== ""){
                fetch("http://localhost:3008/user/createuser", {
                method: 'POST', //2
                body: JSON.stringify({user:this.state}), 
                headers: new Headers({
                    'Content-Type': 'application/json' 
                })
            }).then(
                (response) => response.json() )
                .then((data) => {
                this.props.setToken(data.sessionToken) 
            }) 
                event.preventDefault()
        }
    }

    userLogin = (event) => {

        this.state.username === '' || this.state.password === '' ? this.setState({message : 'Valid entry required for both username and password before continuing'}): this.setState ({ message : ''})

        
        if (this.state.username !== "" && this.state.password !== ""){
            fetch("http://localhost:3008/user/signin", {
                method: 'POST',
                body: JSON.stringify({user:this.state}),
                headers: new Headers({
                    'Content-Type': 'application/json'
                    })
            }).then(
                (response) => response.json()
            ).then((data) => {
                if(data.sessionToken !== undefined){
                this.props.setToken(data.sessionToken)
                }
            }) 
            event.preventDefault()
        }
    }

    

    render() {
        return (
            <div style={this.styles.fullpage}>
            <div style = {this.styles.spacertop}></div>
                <Container>
                <Row>
                <Col><h1 style = {this.styles.titletext}>Welcome to Beat Share</h1></Col>
                </Row>

                <Row>
                <Col><hr style = {this.styles.line}></hr></Col>
                </Row>

                <Row>
                <Col><h3 style = {this.styles.subtitletext}>The premier website for sharing and discussing the best house music</h3></Col>
                </Row>


                <Row>
                <Col>
                <Form onSubmit={this.handleSubmit} style = {this.styles.form}>
                    <h1>Log In/Sign Up</h1>
                    <FormGroup style={this.styles.fontset}>
                        <Label for="username">Username: </Label>
                        <Input id="username" type="text" name="username" placeholder="enter username" onChange={this.handleChange} style = {this.styles.forceSize} />
                    </FormGroup>
                    <FormGroup style={this.styles.fontset}>
                        <Label for="password">Password: </Label>
                        <Input id="su_password" type="password" name="password" placeholder="enter password" onChange={this.handleChange} style = {this.styles.forceSize} />
                    </FormGroup>

                    <h5>{this.state.message}</h5>

                    <div style = {this.styles.spacer}></div>

                    <Button onClick = {this.userLogin} style = {this.styles.button}> Login </Button>
                    
                    <div style = {this.styles.spacer}></div>
                    
                    <p style={this.styles.fontset}>New Here? Enter a username and password and press "Sign Up" to create a new account</p>
                    
                    <div style = {this.styles.spacer}></div>
                    
                    <Button onClick = {this.newUserSignup} style = {this.styles.button}> Sign Up </Button> 
                    
                </Form>
                </Col>
                </Row>
                </Container>
            </div>
        )
    }
}

export default Radium(Signup);