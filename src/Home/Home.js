import React, {Component} from 'react';
import NavigationBar from './NavigationBar';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import {Button, Col, Row, Form, Container} from 'react-bootstrap';
import truckImage from './images/truck.png';
import axios from 'axios';

class Home extends Component {
    constructor(){
        super();
        this.state = {
            login: '',
            password: '',
            role: '',
            errorResponse: ' '
        }
    }

    // POST axios method to authenticate user
    auth = () => {
        const options = {
            url: 'https://localhost:44394/auth',
            method: 'POST',
            timeout: 5000,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
              login: this.state.login,
              password: this.state.password
            }
          };

          axios(options)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                this.setState({
                    errorResponse: error.response.data
                })
            })
    }

    // Set login from field 
    loginFieldChange = (event) => {
        this.setState({
            login: event.target.value
        })
    }

    passwordFieldChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    render(){
        return (
            <div>
                <NavigationBar />
                <Container style={{marginTop: '100px'}}>
                  <Row>
                      <Col xs='5'>
                          <Row>
                              <label className="Title-Label">Trans Things.</label>
                          </Row>
                          <Row>
                              <label className="Message-Label">Zadbamy o Twój bezpieczny transport.</label>
                          </Row>
                          <Row style={{marginTop: '50px'}}>
                              <Form>
                                  <Form.Group controlId="formGroupLogin">
                                      <Form.Label>Login</Form.Label>
                                      <Form.Control className="My-Form" placeholder="Podaj login" onChange={this.loginFieldChange}/>
                                  </Form.Group>
                                  <Form.Group controlId="formGroupPassword">
                                      <Form.Label>Hasło</Form.Label>
                                      <Form.Control className="My-Form" type="password" placeholder="Password" onChange={this.passwordFieldChange}/>
                                      <Form.Text className="text-muted">{this.state.errorResponse}</Form.Text>
                                  </Form.Group>
                              </Form>
                          </Row>
                          <Row>
                              <Button className="My-Login-Button" variant="dark" onClick={this.auth}>Zaloguj</Button>
                          </Row>
                      </Col>
                      <Col xs='7'>
                          <img className="Truck-Image" src={truckImage} alt=""></img>
                      </Col>
                  </Row>
              </Container>
            </div>
        );
    }
}
export default Home;