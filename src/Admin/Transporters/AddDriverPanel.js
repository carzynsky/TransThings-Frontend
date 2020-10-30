import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { MdDone } from 'react-icons/md';
import { GiFullMotorcycleHelmet } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';
import { NavLink } from 'react-router-dom';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { getSessionCookie } from '../../sessions';
import Popup from 'reactjs-popup';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';

import 'reactjs-popup/dist/index.css';
import './AddDriverPanel.css';

class AddDriverPanel extends Component{
    constructor(props){
        super(props);

        const transporterId = this.props.location.transporterIdProps;
        const today = new Date();
        const month = today.getMonth()+1;
        const day = today.getDate();
        const year = today.getFullYear();

        this.state = {
            token: getSessionCookie(),
            firstName: null,
            lastName: null,
            peselNumber: null,
            birthDate: month + '/' + day + '/' + year,
            gender: 'M',
            contactPhoneNumber: null,
            mail: null,
            transporterId: transporterId !== undefined ? transporterId : null,
            serverResponse: '',
            isServerResponseModalOpen: false,
            isModalOpen: false
        }
    }

    // POST call to api
    async addDriver(){
        try
        {
            const response = await axios.post('https://localhost:44394/drivers',
            {
                'firstName': this.state.firstName,
                'lastName': this.state.lastName,
                'peselNumber': this.state.peselNumber,
                'birthDate': this.state.birthDate,
                'gender': this.state.gender,
                'contactPhoneNumber': this.state.contactPhoneNumber,
                'mail': this.state.mail,
                'transporterId': this.state.transporterId
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
            this.setState({
                serverResponse: "Nie można dodać kierowcę.",
                isServerResponseModalOpen: true
            })
            console.log(error);
        }
    }

    // handle change of text fields
    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        });
      };

    handleDateChange = (date) =>{
        this.setState({
            birthDate: date
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

    render(){
        return(
            <Container>
                
                <Row>
                    <Col>
                    <div className='Edit-Driver-Container'>
                        <Container>
                            <Row>
                                <Col>
                                    <div className='Edit-Driver-Header'>
                                        <GiFullMotorcycleHelmet size='2.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Dodawanie kierowcy</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '10px'}}>
                                <Col>
                                    <label className='Edit-Transporter-Sub-Header' style={{color: '#e6e947', fontSize: '26px'}}>Dane personalne</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <FormControl  noValidate autoComplete="off">
                                    <TextField 
                                        id="driverFirstName" 
                                        label="Imię" 
                                        color="secondary"
                                        onChange={this.handleChange('firstName')}
                                        autoComplete="new-password"
                                        InputLabelProps={{
                                            style:{
                                                color: 'whitesmoke'
                                            },
                                        }}
                                        InputProps={{
                                            style: {
                                                color: '#e6e947'
                                            }
                                        }} />
                                </FormControl>
                                </Col>
                                <Col>
                                    <form  noValidate autoComplete="off">
                                        <TextField 
                                            id="driverLastName" 
                                            label="Nazwisko" 
                                            color="secondary"
                                            onChange={this.handleChange('lastName')}
                                            autoComplete="new-password"
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#e6e947'
                                                }
                                            }} />
                                    </form>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '10px'}}>
                                <Col>
                                    <FormControl>
                                        <InputLabel id="genderLabel">Płeć</InputLabel>
                                            <Select
                                                id="selectGender"
                                                color="secondary"
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
                                    <form  noValidate autoComplete="off">
                                        <TextField 
                                            id="driverPeselNumber" 
                                            label="Pesel" 
                                            color="secondary"
                                            autoComplete="new-password"
                                            onChange={this.handleChange('peselNumber')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#e6e947'
                                                }
                                            }} />
                                    </form>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '10px'}}>
                                <Col>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Data urodzenia"
                                            format="MM/dd/yyyy"
                                            color="secondary"
                                            value={this.state.birthDate}
                                            onChange={this.handleDateChange.bind(this)}
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
                            <Row style={{marginTop: '25px'}}>
                                <Col>
                                    <label className='Edit-Transporter-Sub-Header' style={{color: '#e6e947', fontSize: '26px'}}>Dane kontaktowe</label>
                                </Col>
                            </Row>
                            <Row >
                                <Col>
                                    <form  noValidate autoComplete="off">
                                        <TextField 
                                            id="driverMail" 
                                            label="Adres email" 
                                            color="secondary"
                                            autoComplete="new-password"
                                            onChange={this.handleChange('mail')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#e6e947'
                                                }
                                            }} />
                                    </form>
                                </Col>
                                <Col>
                                    <form  noValidate autoComplete="off">
                                        <TextField 
                                            id="driverContactPhoneNumber" 
                                            label="Nr. telefonu" 
                                            color="secondary"
                                            autoComplete="new-password"
                                            onChange={this.handleChange('contactPhoneNumber')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#e6e947'
                                                }
                                            }} />
                                    </form>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '15px'}}>
                                <Col>
                                    <NavLink className="Admin-Nav-Link" to={{
                                        pathname: '/admin/przewoznicy/' + this.props.match.params.name + '/kierowcy',
                                        transporterId: this.state.transporterId,
                                        transporterName: this.props.match.params.name
                                    }}>
                                        <Button 
                                            className="Edit-Driver-Redirect-Button" 
                                            variant="light">Wróć
                                        </Button>
                                    </NavLink>
                                </Col>
                                <Col>
                                    <Popup 
                                        trigger={
                                            <Button 
                                                className="Edit-Driver-Redirect-Button" 
                                                variant="light">
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
                                                        <label className='Edit-Driver-Modal-Header'>Czy na pewno chcesz dodać kierowcę?</label>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop: '45px', textAlign: 'center'}}>
                                                    <Col>
                                                    <Button 
                                                        className="Confirm-Edit-Driver-Button" 
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
                                                            className="Confirm-Edit-Driver-Button" 
                                                            variant="light"
                                                            onClick={() => {
                                                                this.addDriver();
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
                                                                <label className='Edit-Driver-Modal-Header'>{this.state.serverResponse}</label>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{textAlign: 'center', marginTop: '30px'}}>
                                                            <Col>
                                                                <Button 
                                                                    className="Confirm-Edit-Driver-Button" 
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
export default AddDriverPanel;