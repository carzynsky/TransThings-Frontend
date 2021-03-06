import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { MdDone } from 'react-icons/md';
import { GiFullMotorcycleHelmet } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';
import { NavLink } from 'react-router-dom';
import { TextField, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { getSessionCookie } from '../../sessions';
import Popup from 'reactjs-popup';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';

import 'reactjs-popup/dist/index.css';
import './EditDriverPanel.css';

class EditDriverPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: getSessionCookie(),
            id: '',
            firstName: '',
            lastName: '',
            peselNumber: '',
            birthDate: null,
            gender: '',
            contactPhoneNumber: '',
            mail: '',
            transporterId: '',
            serverResponse: '',
            isServerResponseModalOpen: false,
            isModalOpen: false,
            firstNameIsValid: true,
            lastNameIsValid: true,
            birthDateIsValid: true,
            peselIsValid: true,
            firstNameHelperText: '',
            lastNameHelperText: '',
            birthDateHelperText: '',
            peselHelperText: '',
        }
    }

    async getDriverById(driverId){
        try{
            const response = await axios.get('https://localhost:44394/drivers/' + driverId, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
            let tIndex = data.birthDate.indexOf('T');
            let bDate = data.birthDate?.substring(0, tIndex);

            this.setState({
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                peselNumber: data.peselNumber,
                birthDate: bDate,
                gender: data.gender,
                contactPhoneNumber: data.contactPhoneNumber,
                mail: data.mail,
                transporterId: data.transporterId
            })
        }
        catch(error){
            console.log(error);
        }
    }

    // PUT call to api
    async updateDriver(){
        console.log(this.state.gender)
        try
        {
            const response = await axios.put('https://localhost:44394/drivers/' + this.state.id,
            {
                'firstName': this.state.firstName === '' ? null : this.state.firstName,
                'lastName': this.state.lastName === '' ? null : this.state.lastName,
                'peselNumber': this.state.peselNumber === '' ? null : this.state.peselNumber,
                'birthDate': this.state.birthDate === '' ? null : this.state.birthDate,
                'gender': this.state.gender === '' ? null : this.state.gender,
                'contactPhoneNumber': this.state.contactPhoneNumber === '' ? null : this.state.contactPhoneNumber,
                'mail': this.state.mail === '' ? null : this.state.mail,
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
            if(error.response){
                if(error.response.data.message === undefined){
                    this.setState({
                        serverResponse: "Nie podano danych kierowcy.",
                        isServerResponseModalOpen: true
                    })
                }
                else{
                    this.setState({
                        serverResponse: error.response.data.message,
                        isServerResponseModalOpen: true
                    })
                }
            }
            console.log(error);
        }
    }

    // handle change of text fields
    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        });
        if(name === 'peselNumber'){
            let val = event.target.value
            let isNum = /^\d+$/.test(val)
            if(!isNum) {
                this.setState({ peselHelperText: 'Numer pesel może zawierać tylko cyfry.', peselIsValid: false })
                return
            }
            if(val.length !== 11){
                this.setState({ peselHelperText: 'Numer pesel musi zawierać 11 cyfr.', peselIsValid: false })
                return
            }
            this.setState({ peselHelperText: '', peselIsValid: true })
        }
      };

    handleDateChange = (date) =>{
        this.setState({
            birthDate: date
        })
    }
      
    // handle open/close modal
    handleOpenModal = () => {
        let isError = false
        if(this.state.firstName === '' || this.state.firstName === null){
            this.setState({ firstNameIsValid: false, firstNameHelperText: 'Pole nie może być puste.' })
                isError = true
        }
        else{
            this.setState({ firstNameIsValid: true, firstNameHelperText: '' })
        }

        if(this.state.lastName === '' || this.state.lastName === null){
            this.setState({ lastNameIsValid: false, lastNameHelperText: 'Pole nie może być puste.' })
            isError = true
        }
        else{
            this.setState({ lastNameIsValid: true, lastNameHelperText: '' })
        }

        if(this.state.birthDate === null){
            this.setState({ birthDateIsValid: false, birthDateHelperText: 'Pole nie może być puste.' })
            isError = true
        }
        else{
            this.setState({ birthDateIsValid: true, birthDateHelperText: '' })
        }

        if(this.state.peselNumber === '' || this.state.peselNumber === null){
            this.setState({ peselIsValid: false, peselHelperText: 'Pole nie może być puste.'})
            isError = true
        }

        if(isError || !this.state.peselIsValid) return
        this.setState({ isModalOpen: true })
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
        await this.getDriverById(this.props.match.params.id)
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
                                        <GiFullMotorcycleHelmet size='2.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Edycja kierowcy</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '10px'}}>
                                <Col>
                                    <label className='Edit-Transporter-Sub-Header' style={{color: '#50ee9c', fontSize: '18px'}}>Dane personalne</label>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '15px'}}>
                                <Col>
                                <FormControl  noValidate autoComplete="off">
                                    <TextField 
                                        id="driverFirstName" 
                                        label=
                                        {
                                            <div>
                                                <span style={{ color: '#f75555', fontSize: 18 }}>*</span>
                                                <span>&nbsp;</span>
                                                <span>Imię</span>
                                            </div>
                                        } 
                                        color="secondary"
                                        onChange={this.handleChange('firstName')}
                                        error={!this.state.firstNameIsValid}
                                        helperText={this.state.firstNameHelperText}
                                        autoComplete="new-password"
                                        value={this.state.firstName}
                                        InputLabelProps={{
                                            style:{
                                                color: 'whitesmoke'
                                            },
                                        }}
                                        InputProps={{
                                            style: {
                                                color: 'whitesmoke'
                                            }
                                        }} />
                                </FormControl>
                                </Col>
                                <Col>
                                    <form  noValidate autoComplete="off">
                                        <TextField 
                                            id="driverLastName" 
                                            label=
                                            {
                                                <div>
                                                    <span style={{ color: '#f75555', fontSize: 18 }}>*</span>
                                                    <span>&nbsp;</span>
                                                    <span>Nazwisko</span>
                                                </div>
                                            } 
                                            color="secondary"
                                            onChange={this.handleChange('lastName')}
                                            error={!this.state.lastNameIsValid}
                                            helperText={this.state.lastNameHelperText}
                                            autoComplete="new-password"
                                            value={this.state.lastName}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: 'whitesmoke'
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
                                            label=
                                            {
                                                <div>
                                                    <span style={{ color: '#f75555', fontSize: 18 }}>*</span>
                                                    <span>&nbsp;</span>
                                                    <span>Pesel</span>
                                                </div>
                                            }
                                            color="secondary"
                                            autoComplete="new-password"
                                            value={this.state.peselNumber}
                                            onChange={this.handleChange('peselNumber')}
                                            error={!this.state.peselIsValid}
                                            helperText={this.state.peselHelperText}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: 'whitesmoke'
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
                                            label=
                                            {
                                                <div>
                                                    <span style={{ color: '#f75555', fontSize: 18 }}>*</span>
                                                    <span>&nbsp;</span>
                                                    <span>Data urodzenia</span>
                                                </div>
                                            }
                                            format="MM/dd/yyyy"
                                            color="secondary"
                                            value={this.state.birthDate}
                                            onChange={this.handleDateChange.bind(this)}
                                            error={!this.state.birthDateIsValid}
                                            helperText={this.state.birthDateHelperText}
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
                                <label className='Edit-Transporter-Sub-Header' style={{color: '#50ee9c', fontSize: '18px'}}>Dane kontaktowe</label>
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
                                            value={this.state.mail}
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
                                            value={this.state.contactPhoneNumber}
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
                                    <Button 
                                        className="Edit-Driver-Redirect-Button" 
                                        variant="light"
                                        onClick={this.handleOpenModal}
                                        style={{marginLeft: '30px'}}>
                                            Zatwierdź
                                    </Button>
                                </Col>
                                <Col xs='8'>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    </Col>
                </Row>
                <Popup 
                                        modal
                                        open={this.state.isModalOpen}
                                        onClose={this.handleCloseModal}
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
                                                        <label className='Edit-Driver-Modal-Header'>Czy na pewno chcesz wprowadzić zmiany?</label>
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
                                                                this.updateDriver();
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
            </Container>
        );
    }
}
export default EditDriverPanel;