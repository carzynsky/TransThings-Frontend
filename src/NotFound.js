import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import './NotFound.css';

function Contact() {
  return (
    <div>
        <Container style={{marginTop: '100px'}}>
            <Row>
                <Col xs='12' style={{marginLeft: '150px', marginTop: '50px'}}>
                    <Row>
                        <label class="Error-Code-Label">404</label>
                    </Row>
                    <Row>
                        <label class="Error-Message-Label">Nie znaleziono strony o podanym adresie.</label>
                    </Row>
                </Col>
            </Row>
        </Container>
    </div>
  );
}
export default Contact;