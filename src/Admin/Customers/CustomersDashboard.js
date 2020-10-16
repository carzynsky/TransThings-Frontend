import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import './CustomersDashboard.css';

class CustomersDashboard extends Component{
    render(){
        return(
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col>
                        <div className='Customer-Tile'>
                        </div>
                    </Col>
                    <Col>
                        <div className='Customer-Tile'>
                        </div>
                    </Col>
                    <Col>
                        <div className='Customer-Tile'>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default CustomersDashboard;