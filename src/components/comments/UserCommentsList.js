import React from 'react';
import Comment from './Comment';
import Radium from 'radium';
import { Container, Row, Col } from 'reactstrap';


const styles = {
        heightforce : {
            height: "100vh",
            color: "red",
            textAlign: "center",
            margin: "auto"
        }
    }

class CommentList extends React.Component{

        constructor() {
                super();
        
                this.state = {
                    comments: []
                }
        }

        componentDidMount = () => {
                this.fetchComments();
                console.log("comment list mounted")
            }

        componentWillReceiveProps = () => {
            this.fetchComments();
        }

        fetchComments = () => {

                const accessToken = localStorage.getItem('token');

                fetch(`http://localhost:3008/comment/findusercomments`,{
                method: 'GET',
                headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': accessToken
                        })
                })
                        .then(res => res.json())
                        .then(data => {
                                this.setState({
                                        comments : data
                })
            })
            .catch(err => console.log(err));
    }

    render(){
        let finishedComments = this.state.comments.map(data => {
            return (
                <Row>
                <Comment key={data.id} comment={data} deleteOption = 'true' fetchCommentsFunc ={this.fetchComments}/>
                </Row>
            )
        })

        return(

                <Container>
                <Row>    

                        {this.state.comments.length == 0  ? <div><h1 style={styles.heightforce}>No Comments to Display</h1></div> : <Col>{finishedComments}</Col>}   
                
                </Row>
                </Container>
               
        )

    }
}
export default Radium(CommentList);