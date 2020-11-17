import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import {Button, Col, Row, Form, Container} from 'react-bootstrap';
import history from '../history';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { setSessionCookie, getSessionCookie } from '../sessions';
import ParticlesBackground from '../ParticlesBackground';

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
            isLogged: false
        }
    }

    componentDidMount(){
        let sessionCookie = getSessionCookie();

        if(sessionCookie.login === undefined){
            this.setState({
                isLogged: false
            })
        }
        else{
            this.setState({
                isLogged: true,
                login: sessionCookie.login,
                role: sessionCookie.role
            })
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
            isLogging: true
        })

        const options = {
            method: 'POST',
            timeout: 5000,
            url: 'https://localhost:44394/auth',
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
                setTimeout(() => {
                    setSessionCookie(response.data);
                    switch(response.data.role){
                        case 'Admin':{
                            history.push('/admin/uzytkownicy');
                            break;
                        }
                        case 'Forwarder':{
                            history.push('/spedytor/zlecenia');
                            break;
                        }
                        case 'Orderer':{
                            history.push('/pracownik-zamowien/zamowienia');
                            break;
                        }
                        default:{
                            return;
                        }
                    }
                    window.location.reload(); // reload page after change url to get auth validation (workaround)
                }, 1000) // 1 second delay for spinner
            })
            .catch(error => {
                setTimeout(() => {
                    if(error.response != null){
                        this.setState({
                            errorResponse: error.response.data,
                            isLogging: false,
                            password: '',
                            redirect: false
                        })
                        return
                    }
    
                    this.setState({
                        errorResponse: 'Server is offline. Try later.',
                        isLogging: false,
                        password: '',
                        redirect: false
                    })
                }, 1000); // 1 second delay for loading spinner
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

    // handle continue to panel
    onClickContinue = () => {
        // NOTE: checking for cookie should be here
        switch(this.state.role){
            case 'Admin':{
                history.push('/admin/uzytkownicy');
                break;
            }
            case 'Forwarder':{
                history.push('/spedytor/zlecenia');
                break;
            }
            case 'Orderer':{
                history.push('/pracownik-zamowien/zamowienia');
                break;
            }
            default:{
                return;
            }
        }
    }

    // Hanndle enter click
    handleEnterKeyDown = (event) => {
        if (event.keyCode === 13) {
            this.auth()
        }
    }

    render(){
        const isLogging = this.state.isLogging
        let buttonOrSpinnerComponent

        if(!isLogging && !this.state.isLogged){
            buttonOrSpinnerComponent = 
            <Button 
                className="My-Login-Button" 
                variant="light"
                onClick={this.auth.bind(this)}>ZALOGUJ
            </Button>
        }
        else if(isLogging && !this.state.isLogged){
            buttonOrSpinnerComponent = 
            <div style={{marginLeft: '30px', marginTop: '8px'}}>
                <Loader
                type="TailSpin"
                color="#5CDB95"
                height='40px'
                width='40px'/>
            </div>
        }

        let loginComponent
        if(this.state.isLogged){
            loginComponent = 
            <div>
                <Row>
                    <h1 className="Greeting-User-Message">WITAJ {this.state.login}!</h1>
                </Row>
                <Row>
                    <Button 
                        className="My-Login-Button" 
                        variant="light"
                        onClick={this.onClickContinue.bind(this)}>DALEJ
                    </Button>
                </Row>
            </div>
        }
        else{
            loginComponent = 
            <Form>
                <Form.Group controlId="formGroupLogin">
                    <input className="My-Form" placeholder="Login" onChange={this.loginFieldChange} autoComplete="off"/>
                    <Form.Text className="text-muted" style={{color: 'white'}}>{this.state.extraMessageLogin}</Form.Text>
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <input className="My-Form" type="password" placeholder="Hasło" onChange={this.passwordFieldChange} 
                    value={this.state.password} onKeyDown={this.handleEnterKeyDown.bind(this)} autoComplete="off"/>
                    <Form.Text className="text-muted" style={{color: 'white'}}>{this.state.extraMessagePassword}</Form.Text>
                </Form.Group>
            </Form>
        }

        return (
            <div>
                <ParticlesBackground />
                <NavigationBar />
                <Container style={{marginTop: '150px'}}>
                  <Row>
                      <Col xs='8'>
                          <Row>
                              <label className="Title-Label">TRANS</label>
                          </Row>
                          <Row style={{marginLeft: '100px'}}>
                              <label className="Title-Label">THINGS</label>
                          </Row>
                          <Row>
                              <label className="Message-Label">ZADBAMY O TWÓJ BEZPIECZNY TRANSPORT.</label>
                          </Row>
                      </Col>
                      <Col xs='4'>
                        <Row style={{marginTop: '80px'}}>
                            {loginComponent}
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
                  </Row>
              </Container>
            </div>
        );
    }
}
export default Home;