import React from 'react';
import Post from './Post';
import { Container, Row, Col, Button, ButtonGroup} from 'reactstrap';
import Radium from 'radium';



class TopPostList extends React.Component{


        constructor() {
                super();
        
                this.state = {
                    posts: [],
                    fetchterm: 'year'
                }

                this.styles = {
                    toptext : {
                        textAlign: "center"
                    },
                    buttonset : {
                        width: "60%",
                        height: "6.5vh",
                        fontFamily: "'Montserrat', sans-serif"
                    },
                    textset : {
                        textSize: "20em"
                    },
                    spacer: {
                        height: "4vh"
                    }
                }
        }

        componentDidMount = () => {
                this.fetchPosts();
            }


        fetchPosts = () => {

                const accessToken = localStorage.getItem('token');

                fetch(`http://localhost:3008/post/findtopposts${this.state.fetchterm}`,{
                method: 'GET',
                headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': accessToken
                        })
                })
                        .then(res => res.json())
                        .then(data => {
                                this.setState({
                                        posts : data
                })
            })
            .catch(err => console.log(err));
        }

        selectday = async () => {
            await this.setState({
                fetchterm : 'day'
            })
            this.fetchPosts();
        }

        selectweek = async () => {
            await this.setState({
                fetchterm : 'week'
            })
            this.fetchPosts();
        }

        selectmonth = async () => {
            await this.setState({
                fetchterm : 'month'
            })
            this.fetchPosts();
        }

        selectyear = async () => {
            await this.setState({
                fetchterm : 'year'
            })
            this.fetchPosts();
        }


    render(){
        let finishedPosts = this.state.posts.map(data => {
            return (
                <Post key={data.id} post={data}/>
            )
        })

        return(
                <Container>
 
                <div style={this.styles.toptext}>

                <Row>
                    <Col>
                    <ButtonGroup style={this.styles.buttonset}>
                        <Button onClick={this.selectday}>Day</Button>
                        <Button onClick={this.selectweek}>Week</Button>
                        <Button onClick={this.selectmonth}>Month</Button>
                        <Button onClick={this.selectyear}>Year</Button>   
                    </ButtonGroup>
                    </Col>
                </Row>
                </div>
                
                <Row><div style = {this.styles.spacer}></div></Row>
                
                <Row>
                <Col>{finishedPosts}</Col>
                </Row>

                </Container>
               
        )

    }
}
export default Radium(TopPostList);