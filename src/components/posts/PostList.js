import React from 'react';
import Post from './Post';
import { Container, Row, Col } from 'reactstrap';
import Radium from 'radium';




class PostList extends React.Component{

        constructor(props) {
                super(props);
        
                this.state = {
                    posts: []
                }
        }

        componentDidMount = () => {
                this.fetchPosts();
                
            }


        fetchPosts = () => {

                const accessToken = localStorage.getItem('token');

                fetch(`http://localhost:3008/post/${this.props.fetchtype}`,{
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

    render(){
        let finishedPosts = this.state.posts.map(data => {
            return (
                
                <Post key={data.id} post={data}/>
               
            )
        })

        return(

        <Container>
                <Row>   
                <Col>{finishedPosts}</Col>
                </Row>   
        </Container>
        )

    }
}
export default PostList;