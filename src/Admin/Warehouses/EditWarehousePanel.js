import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { MdAdd, MdEdit, MdDone } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { CgMoreO } from 'react-icons/cg';
import { AiFillPhone, AiOutlineMail } from 'react-icons/ai';
import { IoMdContact } from 'react-icons/io';
import { ImCross } from 'react-icons/im';
import { FaFax, FaWarehouse, FaCity } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import { getSessionCookie } from '../../sessions';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './EditWarehousePanel.css';


class EditWarehousePanel extends Component{
    constructor(props){
        super(props);

        const warehouse = this.props.location.warehouseProps;

        this.state = {
            token: getSessionCookie(),
            id: warehouse !== undefined ? warehouse.id : null,
            name: warehouse !== undefined ? warehouse.name : null,
            streetAddress: warehouse !== undefined ? warehouse.streetAddress : null,
            zipCode: warehouse !== undefined ? warehouse.zipCode : null,
            city: warehouse !== undefined ? warehouse.city : null,
            contactPhoneNumber: warehouse !== undefined ? warehouse.contactPhoneNumber : null,
            contactPersonFirstName: warehouse !== undefined ? warehouse.contactPersonFirstName : null,
            contactPersonLastName: warehouse !== undefined ? warehouse.contactPersonLastName : null,
            mail: warehouse !== undefined ? warehouse.mail : null,
            fax: warehouse !== undefined ? warehouse.fax : null,
            isModalOpen: false
        }
    }

    // PUT call to api
    async updateWarehouse(){
        try
        {
            const response = await axios.put('https://localhost:44394/warehouses/' + this.state.id,
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
                alert('Zaktualizowano magazyn.')
        }
        catch(error){
            console.log(error);
        }
    }

    // Handle click 'Save' button
    handleSaveButton = () => {
        this.setState({
            trigger: true
        })
        // this.updateWarehouse();
    }

    // handle change of text fields
    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        });
      };

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
                                        <FaWarehouse size='2.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Edycja magazynu</span>
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
                                        autoComplete="new-password"
                                        defaultValue={this.state.name}
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
                                        id="warehouseStreetAddress" 
                                        label="Adres" 
                                        color="primary"
                                        autoComplete="new-password"
                                        defaultValue={this.state.streetAddress}
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
                                        defaultValue={this.state.zipCode}
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
                                        defaultValue={this.state.city}
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
                                    <label className='Edit-Warehouse-Sub-Header'>Dane osoby do kontaktu</label>
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
                                            defaultValue={this.state.contactPersonFirstName}
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
                                            defaultValue={this.state.contactPersonLastName}
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
                                            defaultValue={this.state.contactPhoneNumber}
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
                                    <label className='Edit-Warehouse-Sub-Header'>Pozostałe dane kontaktowe</label>
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
                                            defaultValue={this.state.mail}
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
                                            }} 
                                            style={{width: '320px'}}/>
                                    </form>
                                </Col>
                                <Col>
                                    <form  noValidate autoComplete="off">
                                        <TextField 
                                            id="warehouseFax" 
                                            label={<div><FaFax/><span>&nbsp;</span><span>Fax</span></div>}
                                            color="primary"
                                            autoComplete="new-password"
                                            defaultValue={this.state.fax}
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
                                <Col xs='1'>
                                    {/* <NavLink className="Admin-Nav-Link" push to= '/admin/magazyny/'>
                                        <Button 
                                            className="Add-Warehouse-Redirect-Button" 
                                            variant="light">
                                            Wróć
                                        </Button>
                                    </NavLink> */}
                                    <NavLink className="Admin-Nav-Link" push to= '/admin/magazyny/'>
                                        <Button 
                                            className="Add-Warehouse-Redirect-Button" 
                                            variant="light">
                                            Wróć
                                        </Button>
                                    </NavLink>
                                </Col>
                                <Col xs='1'>
                                    <Popup 
                                        trigger={
                                            <Button 
                                                className="Confirm-Edit-Warehouse-Button" 
                                                variant="light"
                                                onClick={this.handleSaveButton}
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
                                                        <label className='Edit-Warehouse-Modal-Header'>Czy na pewno chcesz wprowadzić zmiany?</label>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop: '45px', textAlign: 'center'}}>
                                                    <Col>
                                                    <Button 
                                                        className="Confirm-Edit-Warehouse-Button" 
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
                                                            className="Confirm-Edit-Warehouse-Button" 
                                                            variant="light"
                                                            onClick={() => {
                                                                this.updateWarehouse();
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
export default EditWarehousePanel;