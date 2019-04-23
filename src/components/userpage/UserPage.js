import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import UserPagePostList from '../posts/UserPagePostList';
import UserCommentList from '../comments/UserCommentsList';
import Radium from 'radium';
import backgroundIMG from '../../assets/pictures/userpage.jpg'

const styles = {
    background: {
        backgroundImage: `url(${backgroundIMG})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        color: "Black",
        height: "100%",
    },
    spacertop: {
        height: "12vh"
    },

    spacer: {
        height: "7vh"
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
    }
}

class  UserPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            changed: false
        }}
    
    didChange = () => {
        this.setState({
            changed: true
        }, () => console.log(this.state.changed))
    }

    render(){
    return (
        <div style = {styles.background}>
        <div style = {styles.spacertop}></div>
        <Container syle={styles.overflow}>
            <Row>
                <Col><h1 style = {styles.titletext}>Your User Page</h1></Col>
            </Row>

            <Row>
                <Col><hr style = {styles.line}></hr></Col>
            </Row>

            <Row>
                <Col><h3 style = {styles.subtitletext}>View all of the Posts and Comments you have made on Beat Share.</h3></Col>
            </Row>

            <div style = {styles.spacer}></div>

            <Row>

            <Col xs="6">
            <h6 style = {styles.subtitletext}>Posts You Have Made:</h6>
            <hr style = {styles.line}></hr>
            <UserPagePostList fetchtype = 'finduserposts' deleteoption = 'true' didChange = {this.didChange}/>
            </Col>
            
            <Col xs="6">
            <h6 style = {styles.subtitletext}>Comments You Have Made: </h6>
            <hr style = {styles.line}></hr>
            <UserCommentList changedStatus = {this.state.changed}/>
            </Col>

            </Row>

        </Container>
    </div>
    )}
}
export default Radium(UserPage);