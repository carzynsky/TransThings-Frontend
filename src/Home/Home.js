import React, {Component} from 'react';
import NavigationBar from './NavigationBar';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import {Button, Col, Row, Form, Container} from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import truckImage from './images/truck.png';
import axios from 'axios';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: '',
            password: '',
            role: '',
            errorResponse: ' ',
            isLogging: false,
            extraMessageLogin: '',
            extraMessagePassword: '',
            isLoginValid: true,
            isPasswordValid: true
        }
    }

    // POST axios method to authenticate user
    async auth() {
        let isValid = true
        if(this.state.login === '' || this.state.login.trim() ===''){
            isValid = false
            this.setState({
                extraMessageLogin: 'Wprowadź login.'
            })
        }
        else{
            this.setState({
                extraMessageLogin: ''
            })
        }
        if(this.state.password === '' || this.state.login.trim() === ''){
            isValid = false
            this.setState({
                extraMessagePassword: 'Wprowadź hasło.',
            })
        }
        else{
            this.setState({
                extraMessagePassword: ''
            })
        }

        if(!isValid){
            this.setState({
                errorResponse: ''
            })
            return
        }

        this.setState({
            errorResponse: '',
            isLogging: true,
        })

        const options = {
            url: 'https://localhost:44394/auth',
            method: 'POST',
            timeout: 4000,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
              login: this.state.login,
              password: this.state.password
            }
          };

          await axios(options)
            .then(response => {
                alert(response.data.message)
            })
            .catch(error => {
                if(error.response != null){
                    this.setState({
                        errorResponse: error.response.data,
                        isLogging: false,
                        password: ''
                    })
                    return
                }
                this.setState({
                    errorResponse: 'Server is offline. Try later.',
                    isLogging: false,
                    password: ''
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
        const isLogging = this.state.isLogging
        let buttonOrSpinnerComponent

        if(!isLogging){
            buttonOrSpinnerComponent = <Button 
                                            className="My-Login-Button" 
                                            variant="dark"
                                            disable={this.state.isLogging}
                                            onClick={this.auth.bind(this)}>{this.state.isLogging ? 'Logowanie' : 'Zaloguj'}
                                        </Button>
        }
        else{
            buttonOrSpinnerComponent = 
            <div style={{marginLeft: '30px', marginTop: '8px'}}>
                <Loader
                type="TailSpin"
                color="coral"
                height='40px'
                width='40px'/>
            </div>

        }

        const enterKeydown = (event)=> {
            if (event.keyCode === 13) {
                this.auth()
            }
        }

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
                                      {/* <Form.Label>Login</Form.Label> */}
                                      <Form.Control className="My-Form" placeholder="Login" onChange={this.loginFieldChange}/>
                                      <Form.Text className="text-muted">{this.state.extraMessageLogin}</Form.Text>
                                  </Form.Group>
                                  <Form.Group controlId="formGroupPassword">
                                      {/* <Form.Label>Hasło</Form.Label> */}
                                      <Form.Control className="My-Form" type="password" placeholder="Hasło" onChange={this.passwordFieldChange} 
                                      value={this.state.password} onKeyDown={enterKeydown}/>
                                      <Form.Text className="text-muted">{this.state.extraMessagePassword}</Form.Text>
                                  </Form.Group>
                              </Form>
                          </Row>
                          <Row>
                              {buttonOrSpinnerComponent}
                          </Row>
                          <Row>
                              <div style={{marginTop: '10px'}}>
                                <Form.Text className="text-muted">{this.state.errorResponse}</Form.Text>
                              </div>
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