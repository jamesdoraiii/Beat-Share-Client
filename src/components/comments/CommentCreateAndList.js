import React, {Component} from 'react';
import { Form, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, ListGroup } from 'reactstrap';
import Comment from './Comment';
import Radium from 'radium';

class CommentCreateAndList extends React.Component{
        
        constructor(props) {
                super(props);
        
                this.state = {
                    comments: [],
                    commentcontent: '',
                    postidofparent: this.props.postIdentity
                };
                
                this.styles = {
                    spacer: {
                        height: "4vh"
                    },
                    button: {
                        width: "100%",
                        fontFamily: "'Montserrat', sans-serif",
                        backgroundColor: "black"
                    },
                    fontset: {
                        fontFamily: "'Montserrat', sans-serif"
                    }

                }
        }

        componentDidMount = () => {
                this.fetchComments();
            }

        handleChange = (event) => {
                this.setState({                   
                    [event.target.name]: event.target.value,
                }); 
            }
            
        commentCreation = async (event) => {

                const accessToken = localStorage.getItem('token');
                event.preventDefault();
                if (this.state.commentcontent !== "" ){
                        await fetch("http://localhost:3008/comment/create", {
                        method: 'POST', 
                        body: JSON.stringify({comment:this.state}), 
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Authorization': accessToken
                            })
                        
                    })
                    .then(
                        (response) => response.json() )
                        .then(
                        console.log("before the set State",this.state.commentcontent),
                        await this.setState({
                            commentcontent: ''
                        }))
                        .then(
                        console.log("after the set state", this.state.commentcontent),
                        this.fetchComments());
                        
                        //document.getElementById('commentinput').value='';
                        
                }
                this.fetchComments();
                event.preventDefault();
            }

            fetchComments = () => {
                console.log("inside fetch comments")
                const accessToken = localStorage.getItem('token');

                fetch(`http://localhost:3008/comment/findpostcomments/${this.props.postIdentity}`,{
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

        
            render (){

                let finishedComments = this.state.comments.map(data => {
                        return (
                            <Comment key={data.id} comment={data}/>
                        )
                    })
                return (
                    <div>
                            <Form onSubmit={this.commentCreation} >
                                <FormGroup>
                                    <InputGroup>
                                    <InputGroupAddon><Button type="submit" style = {this.styles.button}> Post Comment </Button></InputGroupAddon>
                                    <Input id="commentcontent" type="text" name="commentcontent" placeholder="Your Comment Here" onChange={this.handleChange} style = {this.styles.fontset} id="commentinput" value={this.state.commentcontent}/>
                                    </InputGroup>
                                </FormGroup>
                                
                            </Form>

                            <div>       
                                {this.state.comments.length > 0 ? <h4><b>Comments on this track:</b></h4> : <div><div style={this.styles.spacer}></div><h4>Be the first to leave a comment!</h4></div>}

                                <ListGroup>
                                {finishedComments}
                                </ListGroup>

                                </div>
                    </div>
                )};

}
export default Radium(CommentCreateAndList);