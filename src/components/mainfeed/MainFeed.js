import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PostList from '../posts/PostList';
import Radium from 'radium';
import backgroundIMG from '../../assets/pictures/mainfeed.jpg'
    

const styles = {
    background: {
        backgroundImage: `url(${backgroundIMG})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        color: "Black"
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

const MainFeed = () => {

    return (
        <div style = {styles.background}>
        <div style = {styles.spacertop}></div>
        <Container>
            <Row>
                <Col><h1 style = {styles.titletext}>The Main Feed</h1></Col>
            </Row>

            <Row>
                <Col><hr style = {styles.line}></hr></Col>
            </Row>

            <Row>
                <Col><h3 style = {styles.subtitletext}>Scroll through the most recent tracks posted by your fellow users.</h3></Col>
            </Row>

            <Row>
                <div style = {styles.spacer}></div>
            </Row>

            <Row>
                <PostList fetchtype = 'findrecentposts' />
            </Row>
        </Container>
        </div>
    )
}
export default Radium(MainFeed);