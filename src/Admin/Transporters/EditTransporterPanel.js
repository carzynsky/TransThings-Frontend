import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { MdDone } from 'react-icons/md';
import { AiFillPhone, AiOutlineMail } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import { FaRoute, FaCity } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { RiTruckFill } from 'react-icons/ri';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import { getSessionCookie } from '../../sessions';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './EditTransporterPanel.css';

class EditTransporterPanel extends Component{
    constructor(props){
        super(props);

        const transporter = this.props.location.transporterProps;

        this.state = {
            token: getSessionCookie(),
            id: transporter !== undefined ? transporter.id : null,
            fullName: transporter !== undefined ? transporter.fullName : null,
            streetAddress: transporter !== undefined ? transporter.streetAddress : null,
            shortName: transporter !== undefined ? transporter.shortName : null,
            zipCode: transporter !== undefined ? transporter.zipCode : null,
            city: transporter !== undefined ? transporter.city : null,
            nip: transporter !== undefined ? transporter.nip : null,
            country: transporter !== undefined ? transporter.country : null,
            supportedPathsDescription: transporter !== undefined ? transporter.supportedPathsDescriptions : null,
            mail: transporter !== undefined ? transporter.mail : null,
            isModalOpen: false
        }
    }

    // PUT call to api
    async updateTransporter(){
        try
        {
            const response = await axios.put('https://localhost:44394/transporters/' + this.state.id,
            {
                'fullName': this.state.fullName,
                'shortName': this.state.shortName,
                'streetAddress': this.state.streetAddress,
                'zipCode': this.state.zipCode,
                'city': this.state.city,
                'nip': this.state.nip,
                'country': this.state.country,
                'supportedPathsDescriptions': this.state.supportedPathsDescription,
                'mail': this.state.mail
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                },
                
            });
            if(response.status === 200)
                alert('Zaktualizowano przewoźnika.')
        }
        catch(error){
            console.log(error);
        }
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
                    <div className='Edit-Transporter-Container'>
                        <Container>
                            <Row>
                                <Col>
                                    <div className='Edit-Transporter-Header'>
                                        <RiTruckFill size='2.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Edycja przewoźnika</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '15px'}}>
                                <Col>
                                <form  noValidate autoComplete="off">
                                    <TextField 
                                        id="transporterFullName" 
                                        label="Pełna nazwa" 
                                        color="secondary"
                                        onChange={this.handleChange('fullName')}
                                        autoComplete="new-password"
                                        defaultValue={this.state.fullName}
                                        InputLabelProps={{
                                            style:{
                                                color: 'whitesmoke'
                                            },
                                        }}
                                        InputProps={{
                                            style: {
                                                color: '#e64b62'
                                            }
                                        }} />
                                </form>
                                </Col>
                                <Col>
                                <form  noValidate autoComplete="off">
                                    <TextField 
                                        id="transporterShortName" 
                                        label="Krótka nazwa" 
                                        color="secondary"
                                        onChange={this.handleChange('shortName')}
                                        autoComplete="new-password"
                                        defaultValue={this.state.shortName}
                                        InputLabelProps={{
                                            style:{
                                                color: 'whitesmoke'
                                            },
                                        }}
                                        InputProps={{
                                            style: {
                                                color: '#e64b62'
                                            }
                                        }} />
                                </form>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '5px'}}>
                            <Col>
                                <form  noValidate autoComplete="off">
                                    <TextField 
                                        id="transporterNip" 
                                        label="NIP" 
                                        color="secondary"
                                        autoComplete="new-password"
                                        defaultValue={this.state.nip}
                                        onChange={this.handleChange('nip')}
                                        InputLabelProps={{
                                            style:{
                                                color: 'whitesmoke'
                                            },
                                        }}
                                        InputProps={{
                                            style: {
                                                color: '#e64b62'
                                            }
                                        }} />
                                </form>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '20px'}}>
                                <Col>
                                    <label className='Edit-Transporter-Sub-Header'>Dane adresowe</label>
                                </Col>
                            </Row>
                            <Row >
                                <Col>
                                <form  noValidate autoComplete="off">
                                    <TextField 
                                        id="transporterStreetAddress" 
                                        label="Adres" 
                                        color="secondary"
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
                                                color: '#e64b62'
                                            }
                                        }} />
                                </form>
                                </Col>
                                <Col>
                                <form  noValidate autoComplete="off">
                                    <TextField 
                                        id="transporterZipCode" 
                                        label="Kod pocztowy" 
                                        color="secondary"
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
                                                color: '#e64b62'
                                            }
                                        }} />
                                </form>
                                </Col>
                                <Col>
                                <form  noValidate autoComplete="off">
                                    <TextField 
                                        id="transporterCity" 
                                        label={<div><FaCity/><span>&nbsp;&nbsp;</span><span>Miasto</span></div>}
                                        color="secondary"
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
                                                color: '#e64b62'
                                            }
                                        }} />
                                </form>
                                </Col>
                            </Row>

                            <Row style={{marginTop: '5px'}}>
                                <Col>
                                    <form  noValidate autoComplete="off">
                                        <TextField 
                                            id="transporterCountry" 
                                            label='Kraj'
                                            color="secondary"
                                            autoComplete="new-password"
                                            defaultValue={this.state.country}
                                            onChange={this.handleChange('country')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#e64b62'
                                                }
                                            }} />
                                    </form>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '5px'}}>
                                <Col>
                                    <form  noValidate autoComplete="off">
                                        <TextField 
                                            id="transporterMail" 
                                            label={<div><AiOutlineMail /><span>&nbsp;</span> <span>Adres email</span></div>}
                                            color="secondary"
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
                                                    color: '#e64b62'
                                                }
                                            }} 
                                            style={{width: '320px'}}/>
                                    </form>
                                </Col>
                            </Row>
                            
                            <Row style={{marginTop: '15px'}}>
                                <Col>
                                    <div className='Edit-Transporter-Sub-Header'>
                                        <FaRoute /><span>&nbsp;</span><span>Obsługiwane trasy</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '5px'}}>
                                <Col>
                                    <form  noValidate autoComplete="off">
                                        <TextField 
                                            id="warehouseMail" 
                                            label='Trasy'
                                            color="secondary"
                                            autoComplete="new-password"
                                            defaultValue={this.state.supportedPathsDescription}
                                            onChange={this.handleChange('supportedPathsDescription')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#e64b62'
                                                }
                                            }} 
                                            style={{width: '35vw'}}/>
                                    </form>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '35px'}}>
                                <Col xs='1'>
                                    <NavLink className="Admin-Nav-Link" to= '/admin/przewoznicy/'>
                                        <Button 
                                            className="Edit-Transporter-Redirect-Button" 
                                            variant="light">Wróć
                                        </Button>
                                    </NavLink>
                                </Col>
                                <Col xs='1'>
                                    <Popup 
                                        trigger={
                                            <Button 
                                                className="Edit-Transporter-Redirect-Button" 
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
                                                        <label className='Edit-Transporter-Modal-Header'>Czy na pewno chcesz wprowadzić zmiany?</label>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop: '45px', textAlign: 'center'}}>
                                                    <Col>
                                                    <Button 
                                                        className="Confirm-Edit-Transporter-Button" 
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
                                                            className="Confirm-Edit-Transporter-Button" 
                                                            variant="light"
                                                            onClick={() => {
                                                                this.updateTransporter();
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
export default EditTransporterPanel;