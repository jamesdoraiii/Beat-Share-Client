import React from 'react';
import CommentCreateAndList from '../comments/CommentCreateAndList';
import ReactPlayer from 'react-player';
import Radium from 'radium';
import {Button} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();



const styles = {
    maincontainer:{
        padding: "2em",
        background: 'rgba(255,255,255,.95)',
        borderRadius: ".5em",
        height: "85vh",
        overflowY: "scroll",
        boxShadow: "1em 1em 2em #000000"
    },

    backgroundsetup:{
        backgroundColor: "black"
    },

    vidbox: {
    width: "55vw",

    },

    button: {
    width: "100%",
    fontFamily: "'Montserrat', sans-serif",
    backgroundColor: "black"
    },

    spacer: {
        height: "4vh"
    },
    spacerbottom: {
        height: "9vh"
    },
    numoflikes: {
        marginTop: ".35em"
    }
    
}

class Post extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            likeNumForUpdate: Number(props.post.numberoflikes),
            hasBeenLiked: false
        }
    }

    deletepost = () => {
        const accessToken = localStorage.getItem('token');

        fetch(`http://localhost:3008/post/deletepost/${this.props.post.id}`,{
                method: 'DELETE',
                headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': accessToken
                        })
                })
            .catch(err => console.log(err));
            alert(`Your post for ${this.props.post.trackname} by ${this.props.post.artistname} has been deleted. It will be deleted from the main feed as well as top posts. Next time you navigate to your user page you will no longer see it listed under your posts.`);
    }

    likePost = () => {
        const accessToken = localStorage.getItem('token');

        if(this.state.hasBeenLiked == false){

            fetch(`http://localhost:3008/post/like1up/${this.props.post.id}`,{
            method: 'PUT',
            headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': accessToken
                    })
            })
        .then(response => response.json())
        .catch(err => console.log(err));
        
        this.state.likeNumForUpdate += 1;
        this.forceUpdate();
        this.setState({
            hasBeenLiked: true
        })
        }

        else{

            fetch(`http://localhost:3008/post/like1down/${this.props.post.id}`,{
            method: 'PUT',
            headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': accessToken
                    })
            })
        .then(response => response.json())
        .catch(err => console.log(err));
        
        this.state.likeNumForUpdate -= 1;
        this.forceUpdate();
        this.setState({
            hasBeenLiked: false
        })
        } 
    }


    render(){
    return (
        
    <div>
        
    <Container style={styles.maincontainer} data-aos="flip-up" data-aos-delay="50" data-aos-duration="900">

        <Row>
            <Col><ReactPlayer url={this.props.post.link} style={styles.vidbox}/></Col>
        </Row>

        <Row>
            <Col><div style = {styles.spacer}></div></Col>
        </Row>

        <Row>
            <Col xs="7"><h2><b>Track Title: </b>{this.props.post.trackname}</h2></Col>
            <Col xs="3"><h5 style={styles.numoflikes}><b>Number of likes: </b>{this.state.likeNumForUpdate}</h5></Col>
            <Col xs="2"><Button onClick = {this.likePost} style={styles.button}>{this.state.hasBeenLiked == false ? "LIKE this Track": "UNLIKE this Track"}</Button></Col>
        </Row>

        <Row>
            <Col><h3><b>Atrist Name: </b>{this.props.post.artistname}</h3></Col>
        </Row>

        <Row>
            <Col><h4><b>Date Posted: </b>{(this.props.post.createdAt).slice(0,10)}</h4></Col>
        </Row>

        <Row>
            <Col><div style = {styles.spacer}></div></Col>
        </Row>
        
        
        <Row>
        <Col><CommentCreateAndList postIdentity = {this.props.post.id}/></Col>
        </Row>
        
        
    </Container> 
    <div style = {styles.spacerbottom}></div>

    </div>  
    )
}}

export default Radium(Post);