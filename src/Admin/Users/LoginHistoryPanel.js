import React, { Component } from 'react';
import { Row, Col, Container, Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { getSessionCookie } from '../../sessions';
import { MdDone } from 'react-icons/md';
import { BsCheck, BsX } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ImCross } from 'react-icons/im';
import Circle from 'react-circle';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import './LoginHistoryPanel.css';

class LoginHistoryPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: getSessionCookie(),
            loginHistory: [],
            loginHistoryCount: 0,
            loginHistorySuccessfulCount: 0,
            userId: '',
            userFirstName: '',
            userLastName: '',
            userLogin:'',
            serverResponse: '',
            isServerResponseModalOpen: false,
            isModalOpen: false,
        }
    }

    // GET call to api for user 
    async getUserById(userId){
        try
        {
            const response = await axios.get('https://localhost:44394/users/' + userId, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
            this.setState({
                userId: data.id,
                userFirstName: data.firstName,
                userLastName: data.lastName,
                userLogin: data.login
            })
        }
        catch(error){
            console.log(error);
        }
    }

    // GET call to api for user's login history
    async getLoginHistory(userId){
        try
        {
            const response = await axios.get('https://localhost:44394/login-histories/users/' + userId, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
            console.log(data)
            let successfulPercent = 0;
            if(data.length > 0){
                successfulPercent = ((data.filter(x => x.isSuccessful).length / data.length) * 100).toFixed(0);
                this.setState({
                    loginHistory: data,
                    loginHistoryCount: data.length,
                    loginHistorySuccessfulCount: successfulPercent
                })
                return;
            }

            this.setState({
                loginHistory: [],
                loginHistoryCount: 0,
                loginHistorySuccessfulCount: 0
            })
        }
        catch(error){
            console.log(error);
        }
    }

    // DELETE call to api for removing all login history of user
    async deleteLoginHistory(){
        try
        {
            const response = await axios.delete('https://localhost:44394/login-histories/users/' + this.state.userId, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            this.setState({
                serverResponse: response.data.message,
                isServerResponseModalOpen: true
            })

            await this.getLoginHistory(this.props.match.params.id);
        }
        catch(error){
            if(error.response){
                this.setState({
                    serverResponse: error.response.data.message,
                    isServerResponseModalOpen: false
                })
            }
            console.log(error);
        }
    }

    // handle modal open/close
    handleOpenModal = () => {
        this.setState({
            isModalOpen: true
        })
    }

    handleCloseModal = () => {
        this.setState({
            isModalOpen: false
        })
    }

    handleCloseServerResponseModal = () =>{
        this.setState({
            isServerResponseModalOpen: false
        })
    }

    async componentDidMount(){
        await this.getUserById(this.props.match.params.id);
        await this.getLoginHistory(this.props.match.params.id);

    }

    render(){
        return(
            <Container>
                <Row>
                    <Col>
                        <div className='Login-History-Tile' >
                            <Container>
                                <Row>
                                    <Col>
                                        <div className="Login-History-Info-Header">
                                            <AiOutlineUser size='1.3em'/><span>&nbsp;&nbsp;</span><span>Użytkownik</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label className="Login-History-Info-Header" style={{color: 'whitesmoke'}}>{this.state.userFirstName} {this.state.userLastName}</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label className="Login-History-Info-Header" style={{color: '#dcdada', fontSize: '14px'}}>{this.state.userLogin}</label>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col>
                        <div className='Login-History-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <label className="Login-History-Info-Header">Poprawnych logowań</label>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'center'}}>
                                    <Col>
                                        <Circle
                                            size={100}
                                            animate={true}
                                            progress={this.state.loginHistorySuccessfulCount}
                                            animationDuration="1.5s"
                                            textColor="whitesmoke"
                                            bgColor="#4a2e56"
                                            lineWidth={40}
                                            progressColor="#ca57ff"
                                            showPercentageSymbol={true}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col>
                        <div className='Login-History-Tile'>
                        <Container>
                                <Row>
                                    <Col>
                                        <label className="Login-History-Info-Header">Wszystkich prób</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label className="Login-History-Info-Header" style={{color: 'white', fontSize: '36px'}}>{this.state.loginHistoryCount}</label>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className='Login-History-Data-Table-Container'>
                            <Container>
                                <Row>
                                    <Col xs='8'>
                                        <label className="Login-History-Info-Header">Lista logowań</label>
                                    </Col>
                                    <Col>
                                        <NavLink className="Add-User-Nav-Link" to= '/admin/uzytkownicy'>
                                            <Button 
                                                className="Login-History-Redirect-Button" 
                                                variant="light"
                                                style={{width: '100px'}}>
                                                <BiArrowBack /><span>&nbsp;</span><span>Wróć</span>
                                            </Button>
                                        </NavLink>
                                    </Col>
                                    <Col>
                                        <Button 
                                            className="Login-History-Redirect-Button" 
                                            variant="light"
                                            onClick={this.handleOpenModal.bind(this)}
                                            style={{width: '160px'}}>
                                            <RiDeleteBin6Line /><span>&nbsp;</span><span>Usuń całą historie</span>
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                <MDBDataTable
                                    className='Customers-Data-Table'
                                    style={{color: '#bdbbbb'}}
                                    maxHeight="30vh"
                                    scrollY
                                    small
                                    data={{
                                        columns: [
                                            {
                                                label: 'Data',
                                                field: 'attemptDate',
                                                sort: 'asc',
                                                width: 800
                                            },
                                            {
                                                label: 'Rezultat',
                                                field: 'result',
                                                sort: 'asc',
                                                width: 400
                                            }
                                        ],
                                        rows: this.state.loginHistory.map((lh) => (
                                                {
                                                    attemptDate: lh.attemptDate,
                                                    result: lh.isSuccessful ? <BsCheck size='1.8em' style={{color: '#67f05a'}}/> 
                                                        : <BsX size='1.8em' style={{color: '#ff4a4a'}} />
                                                }
                                            ))
                                    }}
                                />
                                </Row>
                                <Popup 
                                    modal
                                    open={this.state.isModalOpen}
                                    onClose={this.handleCloseModal.bind(this)}
                                    contentStyle={{
                                        width: '35vw',
                                        height: '30vh',
                                        backgroundColor: '#202125',
                                        borderColor: '#202125',
                                        borderRadius: '15px',
                                    }}>
                                    { close => (<div>
                                            <Container>
                                                <Row style={{textAlign: 'center'}}>
                                                    <Col>
                                                        <label className='Delete-Login-History-Modal-Header'>Czy na pewno chcesz usunąć historię logowań użytkownika {this.state.userLogin}?</label>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop: '25px', textAlign: 'center'}}>
                                                    <Col>
                                                        <Button 
                                                            className="Confirm-Delete-Login-History-Button" 
                                                            variant="light"
                                                            onClick={() => {
                                                                close();
                                                            }}>
                                                            <div>
                                                                <ImCross size='1.0em'/><span>&nbsp;</span><span>Nie</span>
                                                            </div>
                                                        </Button>
                                                    </Col>
                                                    <Col>
                                                        <Button 
                                                            className="Confirm-Delete-Login-History-Button" 
                                                            variant="light"
                                                            onClick={() => {
                                                                this.deleteLoginHistory();
                                                                close();
                                                            }}>
                                                            <div>
                                                                <MdDone size='1.5em'/><span>&nbsp;</span><span>Tak</span>
                                                            </div>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </div>
                                    )}
                                </Popup>
                                <Popup 
                                    modal
                                    open={this.state.isServerResponseModalOpen}
                                    contentStyle={{
                                    width: '30vw',
                                    height: '25vh',
                                    backgroundColor: '#202125',
                                    borderColor: '#202125',
                                    borderRadius: '15px',}}>
                                    {
                                        close => (
                                            <Container>
                                                <Row style={{textAlign: 'center'}}>
                                                    <Col>
                                                        <label className='Delete-Login-History-Modal-Header'>{this.state.serverResponse}</label>
                                                    </Col>
                                                </Row>
                                                <Row style={{textAlign: 'center', marginTop: '30px'}}>
                                                    <Col>
                                                        <Button 
                                                            className="Confirm-Delete-Login-History-Button" 
                                                            variant="light"
                                                            onClick={() => {
                                                                this.handleCloseServerResponseModal();
                                                                close();
                                                            }}>
                                                            Zamknij
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        )
                                    }
                                </Popup>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default LoginHistoryPanel;