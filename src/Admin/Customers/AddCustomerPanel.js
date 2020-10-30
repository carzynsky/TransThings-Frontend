import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { MdDone } from 'react-icons/md';
import { FaUserNurse } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { NavLink } from 'react-router-dom';
import { TextField, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { getSessionCookie } from '../../sessions';
import Popup from 'reactjs-popup';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import 'reactjs-popup/dist/index.css';
import './AddCustomerPanel.css';

class AddCustomerPanel extends Component{
    constructor(props){
        super(props);

        const today = new Date();
        const month = today.getMonth()+1;
        const day = today.getDate();
        const year = today.getFullYear();

        this.state = {
            token: getSessionCookie(),
            clientFirstName: '',
            clientLastName: '',
            companyFullName: '',
            companyShortName: '',
            clientPeselNumber: '',
            birthDate: month + '/' + day + '/' + year,
            gender: 'M',
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
            isModalOpen: false
        }
    }

    // POST call to api
    async addCustomer(){
        try
        {
            const data = {
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
            }
            console.log(data)
            const response = await axios.post('https://localhost:44394/clients',
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
            this.setState({
                serverResponse: "Nie można było dodać kontrahenta.",
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

    handleDateChange = (date) =>{
        this.setState({
            birthDate: date
        })
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
                                        <FaUserNurse size='2.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Dodawanie kontrahenta</span>
                                    </div>
                                </Col>
                                <Col>
                                    <NavLink className="Admin-Nav-Link" to={{
                                        pathname: '/admin/kontrahenci'
                                    }}>
                                        <Button 
                                            className="Edit-Customer-Redirect-Button" 
                                            variant="light">Wróć
                                        </Button>
                                    </NavLink>
                                </Col>
                                <Col>
                                    <Popup 
                                        trigger={
                                            <Button 
                                                className="Edit-Customer-Redirect-Button" 
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
                                                        <label className='Edit-Customer-Modal-Header'>Czy na pewno chcesz dodać klienta {this.state.clientFirstName} {this.state.clientLastName}?</label>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop: '25px', textAlign: 'center'}}>
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
                                                                this.addCustomer();
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
                                </Col>
                            </Row>
                            <Row style={{marginTop: '10px'}}>
                                <Col>
                                    <label className='Edit-Customer-Sub-Header'>Dane personalne</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormControl  noValidate autoComplete="off">
                                        <TextField 
                                            id="clientFirstName" 
                                            label="Imię" 
                                            color="primary"
                                            onChange={this.handleChange('clientFirstName')}
                                            autoComplete="new-password"
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
                                            label="Nazwisko" 
                                            color="primary"
                                            onChange={this.handleChange('clientLastName')}
                                            autoComplete="new-password"
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
                                        <InputLabel id="genderLabel">Płeć</InputLabel>
                                            <Select
                                                id="selectCustomerGender"
                                                color="primary"
                                                style={{minWidth: '150px'}}
                                                InputLabelProps={{
                                                    style:{
                                                        color: 'whitesmoke'
                                                    },
                                                }}
                                                value={this.state.gender}
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
                                            label="Data urodzenia"
                                            format="MM/dd/yyyy"
                                            color="primary"
                                            value={this.state.birthDate}
                                            onChange={this.handleDateChange.bind(this)}
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
                                            label="Pesel" 
                                            color="primary"
                                            autoComplete="new-password"
                                            onChange={this.handleChange('clientPeselNumber')}
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
                                    <label className='Edit-Customer-Sub-Header'>Dane firmy</label>
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
                                <label className='Edit-Customer-Sub-Header'>Dane kontaktowe</label>
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
            </Container>
        );
    }
}
export default AddCustomerPanel;