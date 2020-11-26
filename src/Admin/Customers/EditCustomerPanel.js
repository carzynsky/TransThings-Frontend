import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { MdDone } from 'react-icons/md';
import { FaUserTie } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { NavLink } from 'react-router-dom';
import { TextField, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { getSessionCookie } from '../../sessions';
import Popup from 'reactjs-popup';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import 'reactjs-popup/dist/index.css';
import './EditCustomerPanel.css';

class EditCustomerPanel extends Component{
    constructor(props){
        super(props);

        this.state = {
            token: getSessionCookie(),
            id: null,
            clientFirstName: '',
            clientLastName: '',
            companyFullName: '',
            companyShortName: '',
            clientPeselNumber: '',
            birthDate: null,
            gender: '',
            contactPhoneNumber1: '',
            contactPhoneNumber2: '',
            streetName: '',
            city: '',
            zipCode: '',
            country: '',
            nip: '',
            buildingNumber: '',
            apartmentNumber: '',
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

    // GET call to API for customer
    async getCustomerById(customerId){
        try{
            const response = await axios.get('https://localhost:44394/clients/' + customerId, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;

            this.setState({
                id: data.id,
                clientFirstName: data.clientFirstName,
                clientLastName: data.clientLastName,
                companyFullName: data.companyFullName,
                companyShortName: data.companyShortName,
                clientPeselNumber: data.clientPeselNumber,
                birthDate: data.birthDate,
                gender: data.gender,
                contactPhoneNumber1: data.contactPhoneNumber1,
                contactPhoneNumber2: data.contactPhoneNumber2,
                streetName: data.streetName,
                city: data.city,
                country: data.country,
                nip: data.nip,
                zipCode: data.zipCode,
                buildingNumber: data.buildingNumber,
                apartmentNumber: data.apartmentNumber
            })
        }
        catch(error){
            console.log(error);
        }
    }

    // PUT call to api
    async updateCustomer(){
        try
        {
            const response = await axios.put('https://localhost:44394/clients/' + this.state.id,
            {
                'clientFirstName': this.state.clientFirstName === '' ? null : this.state.clientFirstName,
                'clientLastName': this.state.clientLastName === '' ? null : this.state.clientLastName,
                'companyFullName': this.state.companyFullName === '' ? null : this.state.companyFullName,
                'companyShortName':this.state.companyShortName === '' ? null : this.state.companyShortName,
                'clientPeselNumber': this.state.clientPeselNumber === '' ? null : this.state.clientPeselNumber,
                'birthDate': this.state.birthDate === '' ? null : this.state.birthDate,
                'gender': this.state.gender === '' ? null : this.state.gender,
                'contactPhoneNumber1': this.state.contactPhoneNumber1 === '' ? null : this.state.contactPhoneNumber1,
                'contactPhoneNumber2': this.state.contactPhoneNumber2 === '' ? null : this.state.contactPhoneNumber2,
                'streetName': this.state.streetName === '' ? null : this.state.streetName,
                'city': this.state.city === '' ? null : this.state.city,
                'country': this.state.country === '' ? null : this.state.country,
                'nip': this.state.nip === '' ? null : this.state.nip,
                'buildingNumber': this.state.buildingNumber === '' ? null : this.state.buildingNumber,
                'apartmentNumber': this.state.apartmentNumber === '' ? null : this.state.apartmentNumber,
                'zipCode': this.state.zipCode === '' ? null : this.state.zipCode
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
                        serverResponse: "Nie podano danych kontrahenta!",
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

        if(name === 'clientPeselNumber'){
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

    // handle open/close modal
    handleOpenModal = () => {
        let isError = false
        if(this.state.clientFirstName === ''){
            this.setState({ firstNameIsValid: false, firstNameHelperText: 'Pole nie może być puste.' })
                isError = true
        }
        else{
            this.setState({ firstNameIsValid: true, firstNameHelperText: '' })
        }

        if(this.state.clientLastName === ''){
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

        if(this.state.clientPeselNumber === ''){
            this.setState({ peselIsValid: false, peselHelperText: 'Pole nie może być puste.'})
            isError = true
        }

        if(isError || !this.state.peselIsValid) return
        this.setState({ isModalOpen: true })
    }

    handleCloseModal = () => this.setState({ isModalOpen: false })

    // Server response pop up
    handleCloseServerResponseModal = () =>{
        this.setState({
            isServerResponseModalOpen: false
        })
    }

    handleDateChange = (date) =>{
        this.setState({
            birthDate: date
        })
    }

    async componentDidMount(){
        await this.getCustomerById(this.props.match.params.id)
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col>
                    <div className='Edit-Costumer-Container'>
                        <Container>
                            <Row>
                                <Col xs='8'>
                                    <div className='Edit-Customer-Header'>
                                        <FaUserTie size='2.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Edycja kontrahenta</span>
                                    </div>
                                </Col>
                                <Col>
                                    <NavLink className="Admin-Nav-Link" to={{
                                        pathname: this.state.token.role === 'Admin' ? '/admin/kontrahenci'
                                        : '/pracownik-zamowien/kontrahenci'
                                    }}>
                                        <Button 
                                            className="Edit-Customer-Redirect-Button" 
                                            variant="light">Wróć
                                        </Button>
                                    </NavLink>
                                </Col>
                                <Col>
                                    <Button 
                                        className="Edit-Customer-Redirect-Button" 
                                        variant="light"
                                        onClick={this.handleOpenModal}
                                        style={{marginLeft: '30px'}}>
                                            Zatwierdź
                                    </Button>
                                </Col>
                                    
                            </Row>
                            <Row style={{marginTop: '10px'}}>
                                <Col>
                                    <label className='Edit-Customer-Sub-Header' style={{ fontSize: 16 }}>Dane personalne</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormControl  noValidate autoComplete="off">
                                        <TextField 
                                            id="clientFirstName" 
                                            label=
                                            {
                                                <div>
                                                    <span style={{ color: '#f75555', fontSize: 18 }}>*</span>
                                                    <span>&nbsp;</span>
                                                    <span>Imię</span>
                                                </div>
                                            } 
                                            color="primary"
                                            onChange={this.handleChange('clientFirstName')}
                                            error={!this.state.firstNameIsValid}
                                            helperText={this.state.firstNameHelperText}
                                            autoComplete="new-password"
                                            value={this.state.clientFirstName}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#e27543'
                                                }
                                            }} />
                                    </FormControl>
                                </Col>
                                <Col>
                                    <FormControl  noValidate autoComplete="off">
                                        <TextField 
                                            id="clientLastName" 
                                            label=
                                            {
                                                <div>
                                                    <span style={{ color: '#f75555', fontSize: 18 }}>*</span>
                                                    <span>&nbsp;</span>
                                                    <span>Nazwisko</span>
                                                </div>
                                            }
                                            color="primary"
                                            onChange={this.handleChange('clientLastName')}
                                            error={!this.state.lastNameIsValid}
                                            helperText={this.state.lastNameHelperText}
                                            autoComplete="new-password"
                                            value={this.state.clientLastName}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#e27543'
                                                }
                                            }} />
                                    </FormControl>
                                </Col>
                                <Col>
                                    <FormControl>
                                        <InputLabel id="genderLabel">
                                            <span style={{ color: '#f75555', fontSize: 18 }}>*</span>
                                            <span>&nbsp;</span>
                                            <span>Płeć</span>
                                        </InputLabel>
                                            <Select
                                                id="selectCustomerGender"
                                                color="primary"
                                                value={this.state.gender}
                                                style={{minWidth: '150px'}}
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
                            </Row>
                            <Row style={{marginTop: '10px'}}>
                                <Col>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="customer-date-picker-dialog"
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
                                            onChange={this.handleDateChange.bind(this)}
                                            error={!this.state.birthDateIsValid}
                                            helperText={this.state.birthDateHelperText}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date'
                                            }}
                                            style={{color: '#e27543'}}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            />
                                    </MuiPickersUtilsProvider>
                                </Col>
                                <Col>
                                    <FormControl  noValidate autoComplete="off">
                                        <TextField 
                                            id="costumerPeselNumber" 
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
                                            value={this.state.clientPeselNumber}
                                            onChange={this.handleChange('clientPeselNumber')}
                                            error={!this.state.peselIsValid}
                                            helperText={this.state.peselHelperText}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#e27543'
                                                }
                                            }} />
                                    </FormControl>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '20px'}}>
                                <Col>
                                    <label className='Edit-Customer-Sub-Header' style={{ fontSize: 16 }}>Dane firmy</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormControl  noValidate autoComplete="off">
                                        <TextField 
                                            id="companyFullName" 
                                            label="Pełna nazwa firmy" 
                                            color="primary"
                                            onChange={this.handleChange('companyFullName')}
                                            autoComplete="new-password"
                                            value={this.state.companyFullName}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#e27543'
                                                }
                                            }} />
                                    </FormControl>
                                </Col>
                                <Col>
                                    <FormControl  noValidate autoComplete="off">
                                        <TextField 
                                            id="companyShortName" 
                                            label="Krótka nazwa firmy" 
                                            color="primary"
                                            onChange={this.handleChange('companyShortName')}
                                            autoComplete="new-password"
                                            value={this.state.companyShortName}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#e27543'
                                                }
                                            }} />
                                    </FormControl>
                                </Col>
                                <Col>
                                    <FormControl  noValidate autoComplete="off">
                                        <TextField 
                                            id="nip" 
                                            label="NIP" 
                                            color="primary"
                                            onChange={this.handleChange('nip')}
                                            autoComplete="new-password"
                                            value={this.state.nip}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#e27543'
                                                }
                                            }} />
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '10px'}}>
                                <Col>
                                    <FormControl  noValidate autoComplete="off">
                                        <TextField 
                                            id="streetAddress" 
                                            label="Adres" 
                                            color="primary"
                                            onChange={this.handleChange('streetName')}
                                            autoComplete="new-password"
                                            value={this.state.streetName}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#e27543'
                                                }
                                            }} />
                                    </FormControl>
                                </Col>
                                <Col>
                                    <FormControl  noValidate autoComplete="off">
                                        <TextField 
                                            id="zipCode" 
                                            label="Kod pocztowy" 
                                            color="primary"
                                            onChange={this.handleChange('zipCode')}
                                            autoComplete="new-password"
                                            value={this.state.zipCode}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#e27543'
                                                }
                                            }} />
                                    </FormControl>
                                </Col>
                                <Col>
                                    <FormControl  noValidate autoComplete="off">
                                        <TextField 
                                            id="city" 
                                            label="Miasto" 
                                            color="primary"
                                            onChange={this.handleChange('city')}
                                            autoComplete="new-password"
                                            value={this.state.city}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#e27543'
                                                }
                                            }} />
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '20px'}}>
                                <Col>
                                <label className='Edit-Customer-Sub-Header' style={{ fontSize: 16 }}>Dane kontaktowe</label>
                                </Col>
                            </Row>
                            <Row >
                                <Col>
                                    <form  noValidate autoComplete="off">
                                        <TextField 
                                            id="customerContactPhoneNumber1" 
                                            label="Nr. telefonu (1)" 
                                            color="primary"
                                            autoComplete="new-password"
                                            value={this.state.contactPhoneNumber1}
                                            onChange={this.handleChange('contactPhoneNumber1')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#e27543'
                                                }
                                            }} />
                                    </form>
                                </Col>
                                <Col>
                                    <form  noValidate autoComplete="off">
                                        <TextField 
                                            id="customerContactPhoneNumber2" 
                                            label="Nr. telefonu (2)" 
                                            color="primary"
                                            autoComplete="new-password"
                                            value={this.state.contactPhoneNumber2}
                                            onChange={this.handleChange('contactPhoneNumber2')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#e27543'
                                                }
                                            }} />
                                    </form>
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
                                                        <label className='Edit-Customer-Modal-Header'>Czy na pewno chcesz wprowadzić zmiany?</label>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop: '45px', textAlign: 'center'}}>
                                                    <Col>
                                                        <Button 
                                                            className="Confirm-Edit-Customer-Button" 
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
                                                            className="Confirm-Edit-Customer-Button" 
                                                            variant="light"
                                                            onClick={() => {
                                                                this.updateCustomer();
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
                                                                <label className='Edit-Customer-Modal-Header'>{this.state.serverResponse}</label>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{textAlign: 'center', marginTop: '30px'}}>
                                                            <Col>
                                                                <Button 
                                                                    className="Confirm-Edit-Customer-Button" 
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
export default EditCustomerPanel;