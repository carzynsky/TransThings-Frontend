import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import truckImage from './images/truck.png';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './About.css';

function Contact() {
  return (
    <div>
    <NavigationBar />
    <Container style={{marginTop: '100px'}}>
      <Row>
          <Col xs='5'>
              <Row>
                  <label class="Title-Label">404</label>
              </Row>
              <Row>
                  <label class="Message-Label">Kontakt niezaimplementowany.</label>
              </Row>
          </Col>
          <Col xs='7'>
              <img class="Truck-Image" src={truckImage} alt=""></img>
          </Col>
      </Row>
  </Container>
</div>
  );
}
export default Contact;