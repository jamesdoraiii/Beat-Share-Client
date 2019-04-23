import React from 'react';
import UserPagePost from './UserPagePost';
import { Container, Row, Col } from 'reactstrap';
import Radium from 'radium';

const styles = {
    heightforce : {
        height: "100vh",
        color: "red",
        textAlign: "center",
        margin: "auto"
    }
}



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
                            console.log('data => ',data)
                                this.setState({
                                        posts : data
                })
            })
            .catch(err => console.log(err));
        }

    render(){
        let finishedPosts = this.state.posts.map(data => {
            return (
                
                <UserPagePost key={data.id} post={data} fetchPostsFunc={this.fetchPosts} didChange = {this.props.didChange}/>
               
            )
        })

        return(

        <Container>
                <Row>   
                {this.state.posts.length == 0  ? <div><h1 style={styles.heightforce}>No Posts to Display</h1></div> : <Col>{finishedPosts}</Col>}
                </Row>   
        </Container>
        )

    }
}
export default Radium(PostList);