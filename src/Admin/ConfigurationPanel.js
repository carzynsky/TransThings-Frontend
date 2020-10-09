import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

function ConfigurationPanel() {
    return (
        <Container>
            <Row>
                <Col style={{textAlign: 'center', marginTop: '200px'}}>
                    <h1>404</h1>
                </Col>
            </Row>
            <Row>
                <Col style={{textAlign: 'center', marginTop: '20px'}}>
                    <label>Upss...</label>
                </Col>
            </Row>
        </Container>
    );
}
export default ConfigurationPanel;