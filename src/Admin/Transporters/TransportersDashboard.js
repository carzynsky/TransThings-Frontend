import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import './TransportersDashboard.css';

class TransportersDashboard extends Component{
    render(){
        return(
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col>
                        <div className='Transporter-Tile'>
                        </div>
                    </Col>
                    <Col>
                      
                    </Col>
                </Row>
                <Row style={{marginTop: '15px'}}>
                    <Col>
                        <div className='Transporter-Tile'>
                        </div>
                    </Col>
                    <Col>
                        <div className='Transporter-Tile'>
                        </div>
                    </Col>
                    <Col>
                        <div className='Transporter-Tile'>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default TransportersDashboard;