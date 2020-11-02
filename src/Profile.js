import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { SiKeepassxc } from 'react-icons/si';
import { AiFillPhone, AiOutlineMail } from 'react-icons/ai';
import { VscWarning } from 'react-icons/vsc';
import { TextField, FormControl } from '@material-ui/core';
import { getSessionCookie } from './sessions';
import Popup from 'reactjs-popup';
import axios from 'axios';
import 'reactjs-popup/dist/index.css';
import './Profile.css';

class Profile extends Component{
    constructor(props){
        super(props);

        const token = getSessionCookie();
        this.state = {
            token: token,
            user: '',
            initials: '',
            bDate: '',
            eDate: '',
            oldPassword: '',
            newPassword1: '',
            newPassword2: '',
            isModalOpen: false,
            serverResponse: '',
            isServerResponseBad: false,
            errorText: '',
            errorTextOldPassword: '',
            oldPasswordIsValid: false,
            isValid: false,
            afterChange: false,
            isChangePasswordSuccessful: false
        }
    }

    // GET call to API to get user by id
    async getUser(){
        try{
            const response = await axios.get('https://localhost:44394/users/' + this.state.token.userId,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                },
                
            });

            const data = await response.data;

            let ini = data.firstName[0].toUpperCase() + data.lastName[0].toUpperCase();
            let tIndex = data.birthDate.indexOf('T');
            let bDate = data.birthDate?.substring(0, tIndex);
            let eDate = data.dateOfEmployment?.substring(0, tIndex);

            this.setState({
                user: data,
                initials: ini,
                bDate: bDate,
                eDate: eDate
            })
        }
        catch(error){
            console.log(error);
        }
    }

    // Validation of provided passwords
    async validation(){
        let isError = false;

        if(this.state.oldPassword === ''){
            this.setState({
                oldPasswordIsValid: false,
                errorTextOldPassword: 'Pole nie mogą być puste.'
            });
            isError = true;
        }
         
        if(this.state.newPassword1 === '' || this.state.newPassword2 === ''){
            this.setState({
                isValid: false,
                errorText: 'Pola nie mogą być puste.'
            })
            isError = true;
        }



        else if(this.state.newPassword1 !== this.state.newPassword2){
            this.setState({
                isValid: false,
                errorText: 'Podane hasła się różnią.'
            })
            isError = true;
        }

        if(isError) return;
        await this.updatePassword();
    }
    // PUT call to API to get user by id
    async updatePassword(){
        try{
            const response = await axios.put('https://localhost:44394/users/' + this.state.token.userId + '/change-password',
            {
                'newPassword': this.state.newPassword1,
                'newPasswordAgain': this.state.newPassword2,
                'oldPassword': this.state.oldPassword
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token,
                    'responseType': "application/json"
                },
                
            });

            this.setState({
                serverResponse: response.data.message,
                isServerResponseModalOpen: true,
                isChangePasswordSuccessful: true
            })
        }
        catch(error){
            if(error.response){
                this.setState({
                    serverResponse: error.response.data.message,
                    isServerResponseBad: true
                })
                console.log(error.response.data); // => the response payload 
                return;
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

    // Server response pop up
    handleCloseServerResponseModal = () =>{
        this.setState({
            isServerResponseModalOpen: false
        })
    }

    // handle change of text fields
    handleChange = (name) => (event) => {
        if(!this.state.isValid){
            this.setState({
                isValid: true,
                errorText: ''
            })
        }
        if(this.state.isServerResponseBad){
            this.setState({
                isServerResponseBad: false
            })
        }
        if(!this.state.oldPasswordIsValid){
            this.setState({
                oldPasswordIsValid: true,
                errorTextOldPassword: ''
            })
        }
        this.setState({
            [name]: event.target.value
        });
      };


    async componentDidMount(){
        await this.getUser();
    }

    render(){
        return(
            <Container>
                <Row style={{marginTop: '150px'}}>
                    <Col xs='2'>
                        <div className='Profile-Panel-Icon-Avatar'>{this.state.initials}</div>
                    </Col>
                    <Col>
                        <div>
                            <Container>
                                <Row>
                                    <Col xs='8'>
                                        <label className="Profile-First-Last-Name">{this.state.user.firstName} {this.state.user.lastName}</label>
                                    </Col>
                                    <Col xs='2'>
                                        <NavLink className="Add-User-Nav-Link" to={{
                                            pathname: this.state.token.role === 'Admin' ? ('/admin/profil/edycja/' + this.state.user.id) : 
                                            this.state.token.role === 'Orderer' ? ('/pracownik-zamowien/profil/edycja/' + this.state.user.id) :
                                            '/spedytor/profil/edycja/' + this.state.user.id,
                                            state: { from: this.props.location.pathname }
                                        }}>
                                            <Button 
                                                className="Change-Password-User-Button" 
                                                variant="light"
                                                ><MdEdit size='1.2em'/><span>&nbsp;</span><span>Edytuj dane</span>
                                            </Button>
                                        </NavLink>
                                    </Col>
                                    <Col xs='2'>
                                        <Button 
                                            className="Change-Password-User-Button" 
                                            variant="light"
                                            onClick={this.handleOpenModal.bind(this)}>
                                                <RiLockPasswordLine size='1.2em'/><span>&nbsp;</span><span>Zmień hasło</span>
                                        </Button>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label className="Profile-Small-Header">{this.state.user.userRole}</label>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop: '50px'}}>
                    <Col>
                        <div className='Profile-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <label className="Profile-Small-Header">Dane personalne</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label className="Profile-Data-Label"><span style={{color: '#3e895c'}}>Imię:</span>&nbsp;&nbsp;<span></span>{this.state.user.firstName}</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label className="Profile-Data-Label"><span style={{color: '#3e895c'}}>Nazwisko:</span><span>&nbsp;&nbsp;</span>{this.state.user.lastName}</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label className="Profile-Data-Label"><span style={{color: '#3e895c'}}>Płeć:</span><span>&nbsp;&nbsp;</span>{this.state.user.gender === 'M' ? 'Mężczyzna' : 'Kobieta'}</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label className="Profile-Data-Label"><span style={{color: '#3e895c'}}>Data urodzenia:</span><span>&nbsp;&nbsp;</span>{this.state.bDate}</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label className="Profile-Data-Label"><span style={{color: '#3e895c'}}>Data zatrudnienia:</span><span>&nbsp;&nbsp;</span>{this.state.eDate}</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label className="Profile-Data-Label"><span style={{color: '#3e895c'}}>Pesel:</span><span>&nbsp;&nbsp;</span>{this.state.user.peselNumber}</label>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col>
                        <div className='Profile-Tile'>
                        <Container>
                                <Row>
                                    <Col>
                                        <label className="Profile-Small-Header">Dane kontaktowe</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label className="Profile-Data-Label"><span style={{color: '#3e895c'}}><AiOutlineMail /><span>&nbsp;</span>Adres email:</span><span>&nbsp;&nbsp;</span>{this.state.user.mail}</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label className="Profile-Data-Label"><span style={{color: '#3e895c'}}><AiFillPhone /><span>&nbsp;</span> Nr. telefonu:</span><span>&nbsp;&nbsp;</span>{this.state.user.phoneNumber}</label>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col>
                        <div className='Profile-Tile'>
                        <Container>
                                <Row>
                                    <Col>
                                        <label className="Profile-Small-Header">Inne</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label className="Profile-Data-Label"><span style={{color: '#3e895c'}}>Login:</span><span>&nbsp;&nbsp;</span>{this.state.token.login}</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label className="Profile-Data-Label"><span style={{color: '#3e895c'}}>Rola:</span><span>&nbsp;&nbsp;</span>{this.state.token.role}</label>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
                <Popup 
                    open={this.state.isModalOpen}
                    onClose={this.handleCloseModal.bind(this)}
                    contentStyle={{
                        width: '45vw',
                        height: '60vh',
                        backgroundColor: '#202125',
                        borderColor: '#202125',
                        borderRadius: '25px',
                    }}>
                    {
                        close => (
                            <Container>
                                <Row style={{textAlign: 'center'}}>
                                    <Col>
                                        <div className='Delete-User-Modal-Header' style={{fontSize: '36px'}}>
                                            <SiKeepassxc size='1.1em' /><span>&nbsp;&nbsp;</span><span>Zmiana hasła</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'center', marginTop: '30px'}}>
                                    <Col>
                                        <FormControl noValidate autoComplete="off">
                                            <TextField 
                                                type="password"
                                                id="newPassword1" 
                                                label=
                                                {<div>
                                                    <RiLockPasswordLine style={{color: '#e6914b'}}/><span>&nbsp;</span><span>Podaj stare hasło</span>
                                                </div>}
                                                color="primary"
                                                onChange={this.handleChange('oldPassword')}
                                                autoComplete="new-password"
                                                error ={
                                                    (!this.state.oldPasswordIsValid && this.state.errorTextOldPassword !== '') ? true : false 
                                                }
                                                helperText={this.state.errorTextOldPassword}
                                                style={{minWidth: '250px'}}
                                                InputLabelProps={{
                                                    style:{
                                                        color: '#dcdada'
                                                    },
                                                }}
                                                InputProps={{
                                                    style: {
                                                        color: '#e6914b'
                                                    }
                                                }} />
                                        </FormControl>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'center', marginTop: '15px'}}>
                                    <Col>
                                        <FormControl noValidate autoComplete="off">
                                            <TextField 
                                                type="password"
                                                id="newPassword1" 
                                                label=
                                                {<div>
                                                    <RiLockPasswordLine style={{color: '#5CDB95'}}/><span>&nbsp;</span><span>Nowe hasło</span>
                                                </div>}
                                                color="primary"
                                                onChange={this.handleChange('newPassword1')}
                                                autoComplete="new-password"
                                                style={{minWidth: '250px'}}
                                                InputLabelProps={{
                                                    style:{
                                                        color: '#dcdada'
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
                                <Row style={{textAlign: 'center', marginTop: '15px'}}>
                                    <Col>
                                        <FormControl noValidate autoComplete="off">
                                            <TextField 
                                                type="password"
                                                id="password1" 
                                                label= 
                                                    {<div>
                                                        <RiLockPasswordLine style={{color: '#5CDB95'}}/><span>&nbsp;</span><span>Nowe hasło ponownie</span>
                                                    </div>}
                                                error ={
                                                    (!this.state.isValid && this.state.errorText !== '') ? true : false 
                                                }
                                                helperText={this.state.errorText}
                                                color="primary"
                                                onChange={this.handleChange('newPassword2')}
                                                autoComplete="new-password"
                                                style={{minWidth: '250px'}}
                                                InputLabelProps={{
                                                    style:{
                                                        color: '#dcdada'
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
                                <Row style={{textAlign: 'center'}}>
                                    <Col>
                                        {this.state.isServerResponseBad && 
                                        <div className='Delete-User-Modal-Header' style={{fontSize: '14px', color: '#e64b62'}}>
                                            <VscWarning size='1.3em' /><span>&nbsp;&nbsp;&nbsp;</span><span>{this.state.serverResponse}</span>
                                        </div>
                                        }
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'center', marginTop: '45px'}}>
                                    <Col>
                                        <Button 
                                            className="Confirm-Delete-User-Button" 
                                            variant="light"
                                            onClick={() => {
                                                this.handleCloseModal();
                                                close();
                                            }}>
                                            Zamknij
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button 
                                            className="Confirm-Delete-User-Button" 
                                            variant="light"
                                            onClick={() => {
                                                this.validation();
                                                if(this.state.isChangePasswordSuccessful){
                                                    this.handleCloseModal();
                                                    close();
                                                }
                                            }}>
                                            Potwierdź
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        )
                    }
                </Popup>
                
                <Popup 
                    modal
                    open={this.state.isChangePasswordSuccessful}
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
export default Profile;