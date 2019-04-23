import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Signup from './Signup';


    
const Auth = (props) => {
    return (
        <Signup setToken={props.setToken}/>
    )
}
export default Auth;