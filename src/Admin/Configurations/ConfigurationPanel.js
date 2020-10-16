import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import './ConfigurationPanel.css';

class ConfigurationPanel extends Component{
    render(){
        return(
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col>
                        <div className='Configuration-Tile'>
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop: '15px'}}>
                    <Col>
                        <div className='Configuration-Tile'>
                        </div>
                    </Col>
                    <Col>
                        <div className='Configuration-Tile'>
                        </div>
                    </Col>
                    <Col>
                        
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default ConfigurationPanel;