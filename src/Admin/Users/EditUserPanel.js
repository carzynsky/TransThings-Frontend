import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { MdDone } from 'react-icons/md';
import { ImCross } from 'react-icons/im';
import { AiOutlineUser } from 'react-icons/ai';
import { NavLink, Redirect } from 'react-router-dom';
import { TextField, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { getSessionCookie } from '../../sessions';
import Popup from 'reactjs-popup';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import 'reactjs-popup/dist/index.css';
import './EditUserPanel.css';

class EditUserPanel extends Component{
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
            gender: '',
            phoneNumber: '',
            mail: '',
            login: '',
            userRoleId: '',
            serverResponse: '',
            isServerResponseModalOpen: false,
            isModalOpen: false,
            isPeselValid: true,

            firstNameIsValid: true,
            lastNameIsValid: true,
            loginIsValid: true,
            birthDateIsValid: true,
            firstNameHelperText: '',
            lastNameHelperText: '',
            loginHelperText: '',
            birthDateHelperText: '',
            peselErrorText: ''
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
                userRoles: data
            })
        }
        catch(error){
            console.log(error);
        }
    }
    // GET call to API for user
    async getUserById(userId){
        try{
            const response = await axios.get('https://localhost:44394/users/' + userId, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
            let tIndex = data.birthDate.indexOf('T');
            let bDate = data.birthDate?.substring(0, tIndex);
            let eDate = data.dateOfEmployment?.substring(0, tIndex);

            this.setState({
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                peselNumber: data.peselNumber,
                birthDate: bDate,
                dateOfEmployment: eDate,
                login: data.login,
                gender: data.gender,
                phoneNumber: data.phoneNumber,
                mail: data.mail,
                userRoleId: data.userRoleId
            })
        }
        catch(error){
            console.log(error);
        }
    }

    // PUT call to api
    async updateUser(){
        try
        {
            const response = await axios.put('https://localhost:44394/users/' + this.state.id,
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
                if(error.response.data.message === undefined){
                    this.setState({
                        serverResponse: "Nie podano danych użytkownika.",
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
        var val = event.target.value
        this.setState({
            [name]: val
        })
        if(name === 'peselNumber'){
            let isNum = /^\d+$/.test(val)
            if(!isNum) {
                this.setState({ peselErrorText: 'Numer pesel może zawierać tylko cyfry.', isPeselValid: false })
                return
            }
            if(val.length !== 11){
                this.setState({ peselErrorText: 'Numer pesel musi zawierać 11 cyfr.', isPeselValid: false })
                return
            }
            this.setState({ peselErrorText: '', isPeselValid: true })
        }
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
        let isError = false
        if(this.state.firstName === ''){
            this.setState({ firstNameIsValid: false, firstNameHelperText: 'Pole nie może być puste.' })
                isError = true
        }
        else{
            this.setState({ firstNameIsValid: true, firstNameHelperText: '' })
        }

        if(this.state.lastName === ''){
            this.setState({ lastNameIsValid: false, lastNameHelperText: 'Pole nie może być puste.' })
            isError = true
        }
        else{
            this.setState({ lastNameIsValid: true, lastNameHelperText: '' })
        }

        if(this.state.login === ''){
            this.setState({ loginIsValid: false, loginHelperText: 'Pole nie może być puste.' })
            isError = true
        }
        else{
            this.setState({ loginIsValid: true, loginHelperText: '' })
        }

        if(this.state.birthDate === null){
            this.setState({ birthDateIsValid: false, birthDateHelperText: 'Pole nie może być puste.' })
            isError = true
        }
        else{
            this.setState({ birthDateIsValid: true, birthDateHelperText: '' })
        }

        if(this.state.peselNumber === ''){
            this.setState({ isPeselValid: false, peselErrorText: 'Pole nie może być puste.'})
            isError = true
        }

        if(isError) return
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
        await this.getUserById(this.props.match.params.id)
    }

    render(){
        if(this.props.match.params.id != this.state.token.userId){
            if(this.state.token.role === 'Orderer'){
                return <Redirect to='/pracownik-zamowien/profil' />
            }
            else if(this.state.token.role === 'Forwarder'){
                return <Redirect to='/spedytor/profil' />
            }
            else if(window.location.href.includes('/admin/profil/edycja')){
                return <Redirect to='/admin/profil' />
            }
        }

        return(
            <Container>
                <Row>
                    <Col>
                    <div className='Edit-User-Container'>
                        <Container>
                            <Row>
                                <Col>
                                    <div className='Edit-User-Header'>
                                        <AiOutlineUser size='2.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Edycja użytkownika</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '10px'}}>
                                <Col>
                                    <label className='Edit-Transporter-Sub-Header' style={{color: '#5CDB95', fontSize: 18 }}>Dane personalne</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormControl  noValidate autoComplete="off">
                                        <TextField 
                                            id="userFirstName" 
                                            label=
                                            {
                                                <div>
                                                    <span style={{ color: '#f75555', fontSize: 18 }}>*</span>
                                                    <span>&nbsp;</span>
                                                    <span>Imię</span>
                                                </div>
                                            } 
                                            color="primary"
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
                                                    color: '#5CDB95'
                                                }
                                            }} />
                                    </FormControl>
                                </Col>
                                <Col>
                                    <FormControl  noValidate autoComplete="off">
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
                                            color="primary"
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
                                            label=
                                            {
                                                <div>
                                                    <span style={{ color: '#f75555', fontSize: 18 }}>*</span>
                                                    <span>&nbsp;</span>
                                                    <span>Pesel</span>
                                                </div>
                                            }
                                            color="primary"
                                            autoComplete="new-password"
                                            value={this.state.peselNumber}
                                            error={!this.state.isPeselValid}
                                            helperText={this.state.peselErrorText}
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
                                            label=
                                            {
                                                <div>
                                                    <span style={{ color: '#f75555', fontSize: 18 }}>*</span>
                                                    <span>&nbsp;</span>
                                                    <span>Data urodzenia</span>
                                                </div>
                                            }
                                            format="MM/dd/yyyy"
                                            color="primary"
                                            value={this.state.birthDate}
                                            error={!this.state.birthDateIsValid}
                                            helperText={this.state.birthDateHelperText}
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
                                                disabled={this.props.location.state?.from === undefined 
                                                    || this.props.location.state.from !== '/admin/uzytkownicy'
                                                    || this.state.token.userId === this.state.id}
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
                                    <label className='Edit-Transporter-Sub-Header' style={{color: '#5CDB95', fontSize: 18 }}>Dane kontaktowe</label>
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
                                         pathname: this.state.token.role === 'Admin' ?
                                         (window.location.href.includes('/admin/profil/edycja') ?  ('/admin/profil') : ('/admin/uzytkownicy')) : 
                                         this.state.token.role === 'Orderer' ? ('/pracownik-zamowien/profil') :
                                         '/spedytor/profil'
                                    }}>
                                        <Button 
                                            className="Edit-User-Redirect-Button" 
                                            variant="light">Wróć
                                        </Button>
                                    </NavLink>
                                </Col>
                                <Col>
                                    <Button 
                                        className="Edit-User-Redirect-Button" 
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
                                                        <label className='Edit-User-Modal-Header'>Czy na pewno chcesz wprowadzić zmiany?</label>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop: '45px', textAlign: 'center'}}>
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
                                                                this.updateUser();
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
            </Container>
        );
    }
}
export default EditUserPanel;