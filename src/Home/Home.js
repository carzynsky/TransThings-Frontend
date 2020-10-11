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
        let isLogged = getSessionCookie();
        console.log(isLogged.role)

        if(isLogged.role !== undefined){
            this.setState({
                isLogged: true,
                role: isLogged.role
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
                setTimeout(() => {
                    // this.setState({
                    //     role: response.data.role
                    // })
                    setSessionCookie(response.data);
                    history.push('/admin/konfiguracja');
                    window.location.reload();
                }, 1000) // 1 second delay
            })
            .catch(error => {
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

    onClickContinue = () => {
        console.log('siemaaa!');
        history.push('/admin/konfiguracja')
    }

    render(){
        const isLogging = this.state.isLogging
        const isLogged = this.state.isLogged

        let buttonOrSpinnerComponent

        if(!isLogging && !isLogged){
            buttonOrSpinnerComponent = <Button 
                                            className="My-Login-Button" 
                                            variant="light"
                                            onClick={this.auth.bind(this)}>{this.state.isLogging ? 'Logowanie' : 'Zaloguj'}
                                        </Button>
        }
        else if(isLogging && !isLogged){
            buttonOrSpinnerComponent = 
            <div style={{marginLeft: '30px', marginTop: '8px'}}>
                <Loader
                type="TailSpin"
                color="#05386B"
                height='40px'
                width='40px'/>
            </div>

        }

        const enterKeydown = (event)=> {
            if (event.keyCode === 13) {
                this.auth()
            }
        }


        let loginComponent
        if(isLogged){
            loginComponent = <div>
                <Row>
                    <h1>Witaj {this.state.role}!</h1>
                </Row>
                <Row>
                <Button className="My-Login-Button" 
                                    variant="light"
                                    onClick={this.onClickContinue.bind(this)}>Kontynuuj</Button>
                </Row>
                                
                            </div>

        }
        else{
            loginComponent = 
            <Form>
            <Form.Group controlId="formGroupLogin">
                {/* <Form.Label>Login</Form.Label> */}
                <input className="My-Form" placeholder="Login" onChange={this.loginFieldChange} autoComplete="off"/>
                <Form.Text className="text-muted">{this.state.extraMessageLogin}</Form.Text>
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                {/* <Form.Label>Hasło</Form.Label> */}
                <input className="My-Form" type="password" placeholder="Hasło" onChange={this.passwordFieldChange} 
                value={this.state.password} onKeyDown={enterKeydown} autoComplete="off"/>
                <Form.Text className="text-muted">{this.state.extraMessagePassword}</Form.Text>
            </Form.Group>
        </Form>
        }

        // const session = useContext(SessionContext);
        // if(session.userRole === 'Admin'){
        //     console.log("JESSEETESTT")
        // }

        return (
            <div>
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
                              <Form>
                                  {loginComponent}
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
                  </Row>
              </Container>
            </div>
        );
    }
}
export default Home;