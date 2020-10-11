import React, {Component} from 'react';
import {Container, Col, Row } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import Loader  from 'react-loader-spinner';
import './NotFound.css';

class LoadingPage extends Component{
    constructor(props){
        super(props)
        this.state={
            redirect: false,
        }
    }

    handleClick = () => {
        this.setState({
            redirect: true
        })
    }
    
    render(){
        if(this.state.redirect){
            return <Redirect push to='/' />
        }

        return (
            <div>
                <Container style={{marginTop: '320px'}}>
                    <Row>
                        <Col xs='12' style={{marginLeft: '200px', textAlign: 'center'}}>
                        <Loader
                                type="Bars"
                                color="#05386B"
                                height='60px'
                                width='60px'/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default LoadingPage;