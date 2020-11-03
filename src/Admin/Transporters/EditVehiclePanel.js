import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { MdDone } from 'react-icons/md';
import { FaTruckMoving } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { TextField, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import { getSessionCookie } from '../../sessions';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './EditVehiclePanel.css';

class EditVehiclePanel extends Component{
    constructor(props){
        super(props);

        this.state = {
            token: getSessionCookie(),
            vehicleTypes: [],
            id: '',
            brand: '',
            model: '',
            loadingCapacity: '',
            productionYear: '',
            trailer: '',
            transporterId: '',
            vehicleTypeId: '',
            serverResponse: '',
            isServerResponseModalOpen: false,
            isModalOpen: false
        }
    }

    // GET call to api for vehicle types
    async getVehicleTypes(){
        try{
            const response = await axios.get('https://localhost:44394/vehicle-types/', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
            this.setState({
                vehicleTypes: data
            })
        }
        catch(error){
            console.log(error);
        }
    }

    // GET call to API for vehicle
    async getVehicleById(vehicleId){
        try{
            const response = await axios.get('https://localhost:44394/vehicles/' + vehicleId, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;

            this.setState({
                id: data.id,
                brand: data.brand,
                model: data.model,
                loadingCapacity: data.loadingCapacity,
                productionYear: data.productionYear,
                trailer: data.trailer,
                transporterId: data.transporterId,
                vehicleTypeId: data.vehicleTypeId
            })
        }
        catch(error){
            console.log(error);
        }
    }

    // PUT call to api
    async updateVehicle(){
        try
        {
            const response = await axios.put('https://localhost:44394/vehicles/' + this.state.id,
            {
                'brand': this.state.brand === '' ? null : this.state.brand,
                'model': this.state.model === '' ? null : this.state.model,
                'loadingCapacity': this.state.loadingCapacity === '' ? null : this.state.loadingCapacity,
                'productionYear': this.state.productionYear === '' ? null : this.state.productionYear,
                'trailer': this.state.trailer === '' ? null : this.state.trailer,
                'vehicleTypeId': this.state.vehicleTypeId === '' ? null : this.state.vehicleTypeId,
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
                        serverResponse: "Nie podano danych pojazdu.",
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

    async componentDidMount(){
        await this.getVehicleTypes();
        await this.getVehicleById(this.props.match.params.id);
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
                                    <div className='Edit-Vehicle-Header'>
                                        <FaTruckMoving size='2.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Edycja pojazdu</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '15px'}}>
                                <Col>
                                <FormControl  noValidate autoComplete="off">
                                    <TextField 
                                        id="vehicleBrand" 
                                        label="Marka" 
                                        color="secondary"
                                        onChange={this.handleChange('brand')}
                                        autoComplete="new-password"
                                        value={this.state.brand}
                                        InputLabelProps={{
                                            style:{
                                                color: 'whitesmoke'
                                            },
                                        }}
                                        InputProps={{
                                            style: {
                                                color: '#da55f1'
                                            }
                                        }} />
                                </FormControl>
                                </Col>
                                <Col>
                                    <FormControl  noValidate autoComplete="off">
                                        <TextField 
                                            id="vehicleModel" 
                                            label="Model" 
                                            color="secondary"
                                            onChange={this.handleChange('model')}
                                            autoComplete="new-password"
                                            value={this.state.model}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#da55f1'
                                                }
                                            }} />
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '10px'}}>
                                <Col>
                                    <FormControl  noValidate autoComplete="off">
                                        <TextField 
                                            id="vehicleProductionYear" 
                                            label="Rok produkcji" 
                                            color="secondary"
                                            autoComplete="new-password"
                                            value={this.state.productionYear}
                                            onChange={this.handleChange('productionYear')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#da55f1'
                                                }
                                            }} />
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '10px'}}>
                                <Col>
                                    <FormControl  noValidate autoComplete="off">
                                        <TextField 
                                            id="vehicleLoadingCapacity" 
                                            label='Pojemność załadunku'
                                            color="secondary"
                                            autoComplete="new-password"
                                            value={this.state.loadingCapacity}
                                            onChange={this.handleChange('loadingCapacity')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#da55f1'
                                                }
                                            }} />
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '10px'}}>
                                <Col>
                                    <FormControl>
                                        <InputLabel id="vehicleTypeLabel">Typ pojazdu</InputLabel>
                                            <Select
                                                id="selectVehicleType"
                                                color="secondary"
                                                value={this.state.vehicleTypeId}
                                                onChange={this.handleChange('vehicleTypeId')}>
                                                {this.state.vehicleTypes.map((vehicleType) => (
                                                    <MenuItem key={vehicleType.id} value={vehicleType.id}>{vehicleType.typeName}</MenuItem>
                                                ))}
                                            </Select>
                                    </FormControl>
                                </Col>
                                <Col>
                                    <FormControl  noValidate autoComplete="off">
                                        <TextField 
                                            id="vehicleTrailer" 
                                            label='Naczepa'
                                            color="secondary"
                                            autoComplete="new-password"
                                            value={this.state.trailer}
                                            onChange={this.handleChange('trailer')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#da55f1'
                                                }
                                            }} />
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '35px'}}>
                                <Col xs='1'>
                                    <NavLink className="Admin-Nav-Link" to= {{
                                        pathname: '/admin/przewoznicy/' + this.props.match.params.name + '/pojazdy',
                                        transporterId: this.state.transporterId,
                                        transporterName: this.props.match.params.name
                                    }}>
                                        <Button 
                                            className="Edit-Vehicle-Redirect-Button" 
                                            variant="light">Wróć
                                        </Button>
                                    </NavLink>
                                </Col>
                                <Col xs='1'>
                                    <Popup 
                                        trigger={
                                            <Button 
                                                className="Edit-Vehicle-Redirect-Button" 
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
                                                        <label className='Edit-Vehicle-Modal-Header'>Czy na pewno chcesz wprowadzić zmiany?</label>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop: '45px', textAlign: 'center'}}>
                                                    <Col>
                                                        <Button 
                                                            className="Confirm-Edit-Vehicle-Button" 
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
                                                            className="Confirm-Edit-Vehicle-Button" 
                                                            variant="light"
                                                            onClick={() => {
                                                                this.updateVehicle();
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
                                                                <label className='Edit-Vehicle-Modal-Header'>{this.state.serverResponse}</label>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{textAlign: 'center', marginTop: '30px'}}>
                                                            <Col>
                                                                <Button 
                                                                    className="Confirm-Edit-Vehicle-Button" 
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
                        </Container>
                    </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default EditVehiclePanel;