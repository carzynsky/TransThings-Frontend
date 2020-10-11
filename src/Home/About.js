import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './About.css';

function About() {
  return (
    <div>
    <NavigationBar />
    <Container style={{marginTop: '100px'}}>
      <Row>
          <Col xs='12'>
              <Row>
                  <label className="Title-Label">404</label>
              </Row>
              <Row>
                  <label className="Message-Label">Informacje niezaimplementowane.</label>
              </Row>
          </Col>
      </Row>
  </Container>
</div>
  );
}
export default About;