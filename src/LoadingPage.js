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

    render(){
        if(this.state.redirect){
            return <Redirect push to='/' />
        }

        return (
            <div>
                <Container style={{marginTop: '320px'}}>
                    <Row>
                        <Col xs='12' style={{marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>
                        <Loader
                                type="Bars"
                                color="#5CDB95"
                                height='60px'
                                width='60px'/>
                        </Col>
                    </Row>
                    <Row>
                        <h1 style={{marginLeft: 'auto', marginRight: 'auto', color: '#5CDB95'}}>WKRÓTCE</h1>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default LoadingPage;