import React, {Component} from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Radium from 'radium';
import { Container, Row, Col } from 'reactstrap';
import backgroundIMG from '../../assets/pictures/postcreation.jpg';

    
class PostCreation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trackname: '',  
            artistname: '',
            link: '',
            numberoflikes: 0
        }
        this.styles = {
            fullpage:{
                backgroundImage: `url(${backgroundIMG})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                webkitFilter: "grayscale(100%)",
                filter: "grayscale(100%)",
                height: "100vh",
                width: "100vw"
            },
            form:{
                background: 'rgba(255,255,255,0.95)',
                position: 'relative',
                margin: 'auto',
                padding: '4vh',
                top: '8vh',
                fontSize: '3vh',
                textAlign: 'center',
                borderRadius: ".5em",
                boxShadow: ".5em .5em 1em #000000"
            },
            spacertop: {
                height: "12vh"
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
                boxShadow: ".15px .15px #595959",
            },
            button: {
                width: "40%",
                height: '6vh',
                fontFamily: "'Montserrat', sans-serif",
                backgroundColor: "black"
                },
            fontset: {
                fontFamily: "'Montserrat', sans-serif",
            }
            
        }
    }

    handleChange = (event) => {
                
        this.setState({                   
            [event.target.name]: event.target.value,
        });
        
    }

    postCreation = (event) => {

        const accessToken = localStorage.getItem('token');

        this.state.trackname === '' || this.state.artistname === '' || this.state.link === '' ? this.setState({message : 'Valid entry required for all fields'}): this.setState ({ message : ''})

        if (this.state.trackname !== "" && this.state.artistname !== "" && this.state.link !== ""){
                    
            if((this.state.link).slice(0,23) == "https://www.youtube.com"){
                fetch("http://localhost:3008/post/create", {
                    method: 'POST', 
                    body: JSON.stringify({post:this.state}), 
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': accessToken
                        })
                    
                }).then(
                    (response) => response.json() )

                    event.preventDefault();
                    this.setState({message : 'Your post was submitted. Head to the main feed to view it!'})
        }
        else{
            this.setState({message : "The link that you submitted does not appear to be a valid youtube link. Please use the standard youtube url with no link shorteners."})
        }
    
        }
        

        event.preventDefault()
    }
    
    render (){
    return (
        <div style = {this.styles.fullpage}>
        <div style = {this.styles.spacertop}></div>
        <Container>
            <Row>
                <Col><h1 style = {this.styles.titletext}>Post a New Track</h1></Col>
            </Row>

            <Row>
                <Col><hr style = {this.styles.line}></hr></Col>
            </Row>

            <Row>
                <Col><h3 style = {this.styles.subtitletext}>Submit a song you like to the main feed! See if it gains enough likes to make it to the Top Posts Page.</h3></Col>
            </Row>
            

            <Row>
            <Col>
                <Form onSubmit={this.postCreation} style={this.styles.form}>
                    <FormGroup>
                        <Label for="trackname" style = {this.styles.fontset}>Track Name: </Label>
                        <Input id="trackname" type="text" name="trackname" placeholder="Enter Track Name:" onChange={this.handleChange} style = {this.styles.fontset}/>
                    </FormGroup>
                    <FormGroup style = {this.styles.fontset}>
                        <Label for="artistname" >Artist Name: </Label>
                        <Input id="artistname" type="text" name="artistname" placeholder="Enter Artist Name:" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup style = {this.styles.fontset}>
                        <Label for="link">Link to Track: (Note: Must be a standard Youtube Link)</Label>
                        <Input id="link" type="text" name="link" placeholder="Enter Link:" onChange={this.handleChange} />
                    </FormGroup>
                    <h5>{this.state.message}</h5>
                    {this.state.message === 'Your post was submitted. Head to the main feed to view it!' ? <div></div> : <Button size="lg" type="submit" style = {this.styles.button}> Submit Post </Button>}
                </Form>
            </Col>
            </Row>
        </Container>
        </div>
    )};
}
export default PostCreation;