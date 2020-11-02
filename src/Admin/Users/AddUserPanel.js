import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { MdDone } from 'react-icons/md';
import { ImCross } from 'react-icons/im';
import { AiOutlineUser } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { TextField, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { getSessionCookie } from '../../sessions';
import Popup from 'reactjs-popup';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import 'reactjs-popup/dist/index.css';
import './EditUserPanel.css';

class AddUserPanel extends Component{
    constructor(props){
        super(props);

        this.state = {
            token: getSessionCookie(),
            userRoles: [],
            id: '',
            firstName: '',
            lastName: '',
            peselNumber: '',
            dateOfEmployment: null,
            birthDate: null,
            gender: 'M',
            phoneNumber: '',
            mail: '',
            login: '',
            userRoleId: '',
            serverResponse: '',
            isServerResponseModalOpen: false,
            isModalOpen: false
        }
    }

    // GET call to API fo user-roles
    async getUserRoles(){
        try{
            const response = await axios.get('https://localhost:44394/user-roles/', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
            this.setState({
                userRoles: data,
                userRoleId: data[0].id
            })
        }
        catch(error){
            console.log(error);
        }
    }

    // POST call to api for adding user
    async addUser(){
        try
        {
            const response = await axios.post('https://localhost:44394/users/',
            {
                'firstName': this.state.firstName === '' ? null : this.state.firstName,
                'lastName': this.state.lastName === '' ? null : this.state.lastName,
                'peselNumber': this.state.peselNumber === '' ? null : this.state.peselNumber,
                'birthDate': this.state.birthDate === '' ? null : this.state.birthDate,
                'login': this.state.login,
                'dateOfEmployment': this.state.dateOfEmployment === '' ? null : this.state.dateOfEmployment,
                'gender': this.state.gender === '' ? null : this.state.gender,
                'phoneNumber': this.state.phoneNumber === '' ? null : this.state.phoneNumber,
                'mail': this.state.mail === '' ? null : this.state.mail,
                'userRoleId': this.state.userRoleId
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                },
                
            });
            this.setState({
                serverResponse: response.data.message,
                isServerResponseModalOpen: true
            })
        }
        catch(error){
            if(error.response){
                this.setState({
                    serverResponse: error.response.data.message,
                    isServerResponseModalOpen: true
                })
            }
            console.log(error);
        }
    }

    // handle change of text fields
    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        });
      };

    handleBirthDateChange = (date) =>{
        this.setState({
            birthDate: date
        })
    }
    handleEmploymentDateChange = (date) =>{
        this.setState({
            dateOfEmployment: date
        })
    }
      
    // handle open/close modal
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

    // Server response pop up
    handleCloseServerResponseModal = () =>{
        this.setState({
            isServerResponseModalOpen: false
        })
    }

    async componentDidMount(){
        await this.getUserRoles();
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col>
                    <div className='Edit-User-Container'>
                        <Container>
                            <Row>
                                <Col>
                                    <div className='Edit-User-Header'>
                                        <AiOutlineUser size='2.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Dodawanie użytkownika</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '10px'}}>
                                <Col>
                                    <label className='Edit-Transporter-Sub-Header' style={{color: '#5CDB95', fontSize: '26px'}}>Dane personalne</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormControl  noValidate autoComplete="off">
                                        <TextField 
                                            id="userFirstName" 
                                            label="Imię" 
                                            color="primary"
                                            onChange={this.handleChange('firstName')}
                                            autoComplete="new-password"
                                            value={this.state.firstName}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#5CDB95'
                                                }
                                            }} />
                                    </FormControl>
                                </Col>
                                <Col>
                                    <FormControl  noValidate autoComplete="off">
                                        <TextField 
                                            id="driverLastName" 
                                            label="Nazwisko" 
                                            color="primary"
                                            onChange={this.handleChange('lastName')}
                                            autoComplete="new-password"
                                            value={this.state.lastName}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#5CDB95'
                                                }
                                            }} />
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '10px'}}>
                                <Col>
                                    <FormControl>
                                        <InputLabel id="genderLabel">Płeć</InputLabel>
                                            <Select
                                                id="selectUserGender"
                                                color="primary"
                                                style={{minWidth: '150px'}}
                                                value={this.state.gender}
                                                InputLabelProps={{
                                                    style:{
                                                        color: 'whitesmoke'
                                                    },
                                                }}
                                                onChange={this.handleChange('gender')}>
                                                    <MenuItem value={'M'}>Mężczyzna</MenuItem>
                                                    <MenuItem value={'K'}>Kobieta</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Col>
                                <Col>
                                    <FormControl  noValidate autoComplete="off">
                                        <TextField 
                                            id="userPeselNumber" 
                                            label="Pesel" 
                                            color="primary"
                                            autoComplete="new-password"
                                            value={this.state.peselNumber}
                                            onChange={this.handleChange('peselNumber')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#5CDB95'
                                                }
                                            }} />
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '10px'}}>
                                <Col>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="user-date-picker-dialog"
                                            label="Data urodzenia"
                                            format="MM/dd/yyyy"
                                            color="primary"
                                            value={this.state.birthDate}
                                            onChange={this.handleBirthDateChange.bind(this)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date'
                                            }}
                                            style={{color: '#5CDB95'}}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            />
                                    </MuiPickersUtilsProvider>
                                </Col>
                                <Col>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="user-date-picker-dialog"
                                            label="Data zatrudnienia"
                                            format="MM/dd/yyyy"
                                            color="primary"
                                            value={this.state.dateOfEmployment}
                                            onChange={this.handleEmploymentDateChange.bind(this)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date'
                                            }}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            />
                                    </MuiPickersUtilsProvider>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '10px'}}>
                                <Col>
                                    <FormControl>
                                        <InputLabel id="genderLabel">Rola</InputLabel>
                                            <Select
                                                id="selectUserGender"
                                                color="primary"
                                                value={this.state.userRoleId}
                                                style={{minWidth: '150px'}}
                                                InputLabelProps={{
                                                    style:{
                                                        color: 'whitesmoke'
                                                    },
                                                }}
                                                onChange={this.handleChange('userRoleId')}>
                                                    {this.state.userRoles.map((userRole) => (
                                                        <MenuItem key={userRole.id} value={userRole.id}>{userRole.roleName}</MenuItem>
                                                    ))}
                                        </Select>
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '20px'}}>
                                <Col>
                                <label className='Edit-Transporter-Sub-Header' style={{color: '#5CDB95', fontSize: '26px'}}>Dane kontaktowe</label>
                                </Col>
                            </Row>
                            <Row >
                                <Col>
                                    <form  noValidate autoComplete="off">
                                        <TextField 
                                            id="userMail" 
                                            label="Adres email" 
                                            color="primary"
                                            autoComplete="new-password"
                                            value={this.state.mail}
                                            onChange={this.handleChange('mail')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#5CDB95'
                                                }
                                            }} />
                                    </form>
                                </Col>
                                <Col>
                                    <form  noValidate autoComplete="off">
                                        <TextField 
                                            id="userPhoneNumber" 
                                            label="Nr. telefonu" 
                                            color="primary"
                                            autoComplete="new-password"
                                            value={this.state.phoneNumber}
                                            onChange={this.handleChange('phoneNumber')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#5CDB95'
                                                }
                                            }} />
                                    </form>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '15px'}}>
                                <Col>
                                    <NavLink className="Admin-Nav-Link" to={{
                                        pathname: '/admin/uzytkownicy'
                                    }}>
                                        <Button 
                                            className="Edit-User-Redirect-Button" 
                                            variant="light">Wróć
                                        </Button>
                                    </NavLink>
                                </Col>
                                <Col>
                                    <Popup 
                                        trigger={
                                            <Button 
                                                className="Edit-User-Redirect-Button" 
                                                variant="light"
                                                style={{marginLeft: '30px'}}>
                                                    Zatwierdź
                                            </Button>
                                        }
                                        modal
                                        open={this.state.isModalOpen}
                                        onOpen={this.handleOpenModal}
                                        contentStyle={{
                                            width: '30vw',
                                            height: '25vh',
                                            backgroundColor: '#202125',
                                            borderColor: '#202125',
                                            borderRadius: '15px',
                                        }}
                                        >
                                        { close => (<div>
                                            <Container>
                                                <Row style={{textAlign: 'center'}}>
                                                    <Col>
                                                        <label className='Edit-User-Modal-Header'>Czy na pewno chcesz dodać użytkownika {this.state.firstName} {this.state.lastName}?</label>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop: '25px', textAlign: 'center'}}>
                                                    <Col>
                                                        <Button 
                                                            className="Confirm-Edit-User-Button" 
                                                            variant="light"
                                                            onClick={() => {
                                                                close()
                                                            }}
                                                            >
                                                                <div>
                                                                <ImCross size='1.0em'/><span>&nbsp;</span><span>Nie</span>
                                                                </div>
                                                        </Button>
                                                    </Col>
                                                    <Col>
                                                        <Button 
                                                            className="Confirm-Edit-User-Button" 
                                                            variant="light"
                                                            onClick={() => {
                                                                this.addUser();
                                                                close();
                                                            }}
                                                            >
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
                                            borderRadius: '15px',
                                            }}>
                                        {
                                            close => (
                                                    <Container>
                                                        <Row style={{textAlign: 'center'}}>
                                                            <Col>
                                                                <label className='Edit-User-Modal-Header'>{this.state.serverResponse}</label>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{textAlign: 'center', marginTop: '30px'}}>
                                                            <Col>
                                                                <Button 
                                                                    className="Confirm-Edit-User-Button" 
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
                                </Col>
                                <Col xs='8'>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default AddUserPanel;