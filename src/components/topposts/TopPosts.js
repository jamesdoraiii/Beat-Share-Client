import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import TopPostsList from '../posts/TopPostsList';
import Radium from 'radium';
import backgroundIMG from '../../assets/pictures/topposts.jpg'
    

//Probably going to have to make this a class in order for the user to toggle between what they want to see. create a state value for message that will be ('week, 'date', 'month') etc. This message will be displayed on the top of the page so users know which list they are looking at. There will be a button for each time period and when you select a button it will change the message and run the fetch again. The fetch will use the method as a parameter in the fetch you url to hit the right endpoint.

const styles = {
    background: {
        backgroundImage: `url(${backgroundIMG})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        color: "black"
    },
    spacer: {
        height: "4vh"
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
        boxShadow: ".1px .1px #595959",
    }



}

const TopPosts = () => {

    return (
        <div style={styles.background}>
        <div style = {styles.spacertop}></div>
        <Container>     
            <Row>
                <Col><h1 style = {styles.titletext}>The Top Tracks</h1></Col>
            </Row>

            <Row>
                <Col><hr style = {styles.line}></hr></Col>
            </Row>

            <Row>
                <Col><h3 style = {styles.subtitletext}>Select a date range and view the 10 top liked songs for that period of time.</h3></Col>
            </Row>

            <Row>
                <div style = {styles.spacer}></div>
            </Row>

            <Row>
            <TopPostsList />
            </Row>
        </Container> 
        </div>
    )
}
export default Radium(TopPosts);