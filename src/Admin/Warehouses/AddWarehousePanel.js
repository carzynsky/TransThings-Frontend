import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { AiFillPhone, AiOutlineMail } from 'react-icons/ai';
import { IoMdContact } from 'react-icons/io';
import { FaFax, FaWarehouse, FaCity } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import './AddWarehousePanel.css';
import { getSessionCookie } from '../../sessions';

class AddWarehousePanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: getSessionCookie(),
            name: '',
            streetAddress: '',
            zipCode: '',
            city: '',
            contactPhoneNumber: '',
            contactPersonFirstName: '',
            contactPersonLastName: '',
            mail: '',
            fax: ''
        }
    }

    // POST call to api
    async addWarehouse(){
        try
        {
            const response = await axios.post('https://localhost:44394/warehouses',
            {
                'name': this.state.name,
                'streetAddress': this.state.streetAddress,
                'zipCode': this.state.zipCode,
                'city': this.state.city,
                'contactPhoneNumber': this.state.contactPhoneNumber,
                'contactPersonFirstName': this.state.contactPersonFirstName,
                'contactPersonLastName': this.state.contactPersonLastName,
                'mail': this.state.mail,
                'fax': this.state.fax
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                },
                
            });
            if(response.status === 200)
                alert('Dodano magazyn.');

        }
        catch(error){
            console.log(error);
        }
    }

    handleSaveButton = () => {
        this.addWarehouse();
    }

    // handle change of text fields
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
      };

    render(){
        return(
            <Container>
                <Row>
                    <Col>
                    <div className='Add-Warehouse-Container'>
                        <Container>
                            <Row>
                                <Col>
                                    <div className='Add-Warehouse-Header'>
                                        <FaWarehouse size='2.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Dodawanie magazynu</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '15px'}}>
                                <Col>
                                <form  noValidate autoComplete="off">
                                    <TextField 
                                        id="warehouseName" 
                                        label="Magazyn" 
                                        color="primary"
                                        onChange={this.handleChange('name')}
                                        InputLabelProps={{
                                            style:{
                                                color: 'whitesmoke'
                                            },
                                        }}
                                        InputProps={{
                                            style: {
                                                color: '#5c8bdb'
                                            },
                                        }} />
                                </form>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '5px'}}>
                                <Col>
                                <form  noValidate autoComplete="off">
                                    <TextField 
                                        id="warehouseStreetAddress" 
                                        label="Adres" 
                                        color="primary"
                                        autoComplete="new-password"
                                        onChange={this.handleChange('streetAddress')}
                                        InputLabelProps={{
                                            style:{
                                                color: 'whitesmoke'
                                            },
                                        }}
                                        InputProps={{
                                            style: {
                                                color: '#5c8bdb'
                                            }
                                        }} />
                                </form>
                                </Col>
                                <Col>
                                <form  noValidate autoComplete="off">
                                    <TextField 
                                        id="warehouseZipCode" 
                                        label="Kod pocztowy" 
                                        color="primary"
                                        autoComplete="new-password"
                                        onChange={this.handleChange('zipCode')}
                                        InputLabelProps={{
                                            style:{
                                                color: 'whitesmoke'
                                            },
                                        }}
                                        InputProps={{
                                            style: {
                                                color: '#5c8bdb'
                                            }
                                        }} />
                                </form>
                                </Col>
                                <Col>
                                <form  noValidate autoComplete="off">
                                    <TextField 
                                        id="warehouseCity" 
                                        label={<div><FaCity/><span>&nbsp;&nbsp;</span><span>Miasto</span></div>}
                                        color="primary"
                                        autoComplete="new-password"
                                        onChange={this.handleChange('city')}
                                        InputLabelProps={{
                                            style:{
                                                color: 'whitesmoke'
                                            },
                                        }}
                                        InputProps={{
                                            style: {
                                                color: '#5c8bdb'
                                            }
                                        }} />
                                </form>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '25px'}}>
                                <Col>
                                    <label className='Warehouse-Table-Header'>Dane osoby do kontaktu</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <form  noValidate autoComplete="off">
                                        <TextField 
                                            id="warehouseContactPersonFirstName" 
                                            label={<div><IoMdContact /><span>&nbsp;</span><span>Imię</span></div>}
                                            color="primary"
                                            autoComplete="new-password"
                                            onChange={this.handleChange('contactPersonFirstName')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#5c8bdb'
                                                }
                                            }} />
                                    </form>
                                </Col>
                                <Col>
                                    <form  noValidate autoComplete="off">
                                        <TextField 
                                            id="warehouseContactPersonLastName" 
                                            label={<div><IoMdContact /><span>&nbsp;</span><span>Nazwisko</span></div>}
                                            color="primary"
                                            autoComplete="new-password"
                                            onChange={this.handleChange('contactPersonLastName')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#5c8bdb'
                                                }
                                            }} />
                                    </form>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '5px'}}>
                                <Col>
                                    <form  noValidate autoComplete="off">
                                        <TextField 
                                            id="warehouseContactPhoneNumber" 
                                            label={<div><AiFillPhone/><span>&nbsp;</span> <span>Nr. telefonu</span></div>}
                                            color="primary"
                                            autoComplete="new-password"
                                            onChange={this.handleChange('contactPhoneNumber')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#5c8bdb'
                                                }
                                            }} />
                                    </form>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '25px'}}>
                                <Col>
                                    <label className='Warehouse-Table-Header'>Pozostałe dane kontaktowe</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <form  noValidate autoComplete="off">
                                        <TextField 
                                            id="warehouseMail" 
                                            label={<div><AiOutlineMail /><span>&nbsp;</span> <span>Adres email</span></div>}
                                            color="primary"
                                            autoComplete="new-password"
                                            onChange={this.handleChange('mail')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#5c8bdb'
                                                }
                                            }} />
                                    </form>
                                </Col>
                                <Col>
                                    <form  noValidate autoComplete="off">
                                        <TextField 
                                            id="warehouseFax" 
                                            label={<div><FaFax/><span>&nbsp;</span><span>Fax</span></div>}
                                            color="primary"
                                            autoComplete="new-password"
                                            onChange={this.handleChange('fax')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#5c8bdb'
                                                }
                                            }} />
                                    </form>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '40px'}}>
                                <Col xs='2'>
                                    <NavLink className="Admin-Nav-Link" push to= '/admin/magazyny/'>
                                        <Button 
                                            className="Add-Warehouse-Redirect-Button" 
                                            variant="light">
                                            Wróć
                                        </Button>
                                    </NavLink>
                                </Col>
                                <Col xs='2'>
                                <Button 
                                    className="Add-Warehouse-Redirect-Button" 
                                    variant="light"
                                    onClick={this.handleSaveButton}
                                    >
                                    Zapisz</Button>
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
export default AddWarehousePanel;