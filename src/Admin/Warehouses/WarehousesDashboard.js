import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import './WarehousesDashboard.css';

class WarehousesDashboard extends Component{
    render(){
        return(
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col>
                        <div className='Warehouse-Tile'>
                        </div>
                    </Col>
                    <Col>
                        <div className='Warehouse-Tile'>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default WarehousesDashboard;