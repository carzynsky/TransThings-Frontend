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

class AddVehiclePanel extends Component{
    constructor(props){
        super(props);

        const transporterId = this.props.location.transporterIdProps;

        this.state = {
            token: getSessionCookie(),
            vehicleTypes: [],
            brand: null,
            model: null,
            loadingCapacity: null,
            productionYear: null,
            trailer: null,
            transporterId: transporterId !== undefined ? transporterId : null,
            vehicleTypeId: '',
            serverResponse: null,
            isServerResponseModalOpen: false,
            isModalOpen: false
        }
    }

    // GET call to api for vehicle types
    async getVehicleTypes(){
        try{
            const response = await axios.get('https://localhost:44394/vehicle-types', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
            if(data.length === 0) return;

            this.setState({
                vehicleTypes: data,
                vehicleTypeId: data[0].id
            })
        }
        catch(error){
            console.log(error);
        }
    }

    // POST call to api
    async addVehicle(){
        try
        {
            const response = await axios.post('https://localhost:44394/vehicles',
            {
                'brand': this.state.brand,
                'model': this.state.model,
                'loadingCapacity': parseFloat(this.state.loadingCapacity),
                'productionYear': this.state.productionYear,
                'trailer': this.state.trailer,
                'vehicleTypeId': this.state.vehicleTypeId,
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
                serverResponse: "Nie można było dodać pojazdu.",
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

    async componentDidMount(){
        await this.getVehicleTypes();
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
                                        <FaTruckMoving size='2.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Dodawanie pojazdu</span>
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
                                                style={{minWidth: '150px'}}
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
                                                                this.addVehicle();
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
export default AddVehiclePanel;