import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { getSessionCookie } from '../../sessions';
import { FaTruckMoving} from 'react-icons/fa';
import { MdEdit, MdAdd, MdDone } from 'react-icons/md';
import { ImCross } from 'react-icons/im';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiArrowBack } from 'react-icons/bi';
import { HiOutlineRefresh } from 'react-icons/hi';
import { Tooltip } from '@material-ui/core';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './VehiclesPanel.css';

class VehiclesPanel extends Component{
    constructor(props){
        super(props);

        const transporterId = this.props.location.transporterId
        const transporterName = this.props.location.transporterName

        this.state = {
            token: getSessionCookie(),
            transporterId: transporterId,
            transporterName: transporterName,
            vehicles: [],
            selectedVehicle: '',
            vehiclesQuantity: '',
            serverResponse: '',
            isServerResponseModalOpen: false,
            isModalOpen: false
        }
    }

    async getVehicles(){
        try
        {
            const response = await axios.get('https://localhost:44394/vehicles/transporters/' + this.state.transporterId, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
            console.log(data)
            if(data.length === 0){
                this.setState({
                    selectedVehicle: '',
                    vehiclesQuantity: 0
                })
                return;
            }

            this.setState({
                vehicles: data,
                vehiclesQuantity: data.length,
                selectedVehicle: data[0]
            })
        }
        catch(error){
            console.log(error);
        }
    }

    // DELETE call to api for removing vehicle
    async deleteVehicle(){
        try
        {
            const response = await axios.delete('https://localhost:44394/vehicles/' + this.state.selectedVehicle.id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            this.setState({
                serverResponse: response.data.message,
                isServerResponseModalOpen: true
            })

            await this.getVehicles();
        }
        catch(error){
            if(error.response){
                if(error.response.data.message === undefined){
                    this.setState({
                        serverResponse: "Nie można było usunąć pojazdu.",
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
    
    async componentDidMount(){
        await this.getVehicles();
    }

    handleDetailsClick = (vehicle) => {
        this.setState({
            selectedVehicle: vehicle
        })
    }

    // handle modal open/close
    handleOpenModal = (vehicle) => {
        this.setState({
            selectedVehicle: vehicle,
            isModalOpen: true
        })
    }

    handleCloseModal = () => {
        this.setState({
            isModalOpen: false
        })
    }

    handleCloseServerResponseModal = () =>{
        this.setState({
            isServerResponseModalOpen: false
        })
    }

    render(){
        return(
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col>
                        <div className='Transporter-Tile'>
                            <Container>
                                <Row style={{textAlign: 'left', paddingTop: '10px'}}>
                                    <Col>
                                        <label className='Vehicle-Info-Stats-Sub'>Przewoźnik</label>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'center'}}>
                                    <Col>
                                        <label className='Vehicle-Info-Stats' style={{fontSize: '28px'}}>{this.state.transporterName}</label>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col>
                        <div className='Transporter-Tile'>
                            <Container>
                                <Row style={{textAlign: 'left', paddingTop: '10px'}}>
                                    <Col>
                                        <label className='Vehicle-Info-Stats-Sub'>Wszystkich pojazdów</label>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'center'}}>
                                    <Col>
                                        <div className='Vehicle-Info-Stats'>
                                            {this.state.vehiclesQuantity}
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col>
                        <div className='Transporter-Tile' style={{backgroundColor: 'transparent'}}>
                            <Container>
                                <Row>
                                    <Col style={{textAlign: 'center', paddingBottom: '20px',paddingTop: '20px', color: '#da55f1'}}>
                                        <FaTruckMoving size='6.0em'/>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='Vehicles-Data-Table-Container'>
                            <Container>
                                <Row>
                                    <Col xs='7'>
                                        <label className='Vehicle-Table-Header'>Lista pojazdów </label>
                                    </Col>
                                    <Col>
                                        <NavLink className="Add-User-Nav-Link" to= '/admin/przewoznicy/'>
                                            <Button 
                                                className="Add-Vehicle-Redirect-Button" 
                                                variant="light"
                                                style={{width: '100px'}}>
                                                <BiArrowBack /><span>&nbsp;</span><span>Wróć</span>
                                            </Button>
                                        </NavLink>
                                    </Col>
                                    <Col style={{textAlign: 'right'}}>
                                        <Button 
                                            className="Add-Vehicle-Redirect-Button"
                                            style={{width: '100px'}}
                                            onClick={this.getVehicles.bind(this)} 
                                            variant="light">
                                                <HiOutlineRefresh size='1.0em'/><span>&nbsp;</span><span>Odśwież</span>
                                        </Button>
                                    </Col>
                                    <Col style={{textAlign: 'right'}}>
                                        <NavLink className="Add-User-Nav-Link" to={{
                                            pathname: '/admin/przewoznicy/' + this.state.transporterName + '/pojazdy/dodaj',
                                            transporterIdProps: this.state.transporterId
                                        }}>
                                            {this.state.token.role === 'Admin' &&
                                            <Button 
                                                className="Add-Vehicle-Redirect-Button" 
                                                variant="light">
                                                    <MdAdd size='1.0em'/><span>&nbsp;</span><span>Dodaj</span>
                                            </Button>
                                            }
                                        </NavLink>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <MDBDataTable
                                        className='Vehicles-Data-Table'
                                        style={{color: '#bdbbbb'}}
                                        maxHeight="38vh"
                                        scrollY
                                        small
                                        data={{
                                            columns: [
                                                {
                                                    label: 'Marka',
                                                    field: 'vehicleBrand',
                                                    sort: 'asc',
                                                    width: 150,
                                                },
                                                {
                                                    label: 'Model',
                                                    field: 'vehicleModel',
                                                    sort: 'asc',
                                                    width: 150
                                                },
                                                {
                                                    label: 'Pojemność załadowania',
                                                    field: 'vehicleLoadingCapacity',
                                                    sort: 'asc',
                                                    width: 150
                                                },
                                                {
                                                    label: 'Rok produkcji',
                                                    field: 'vehicleYearOfProduction',
                                                    sort: 'asc',
                                                    width: 150
                                                },
                                                {
                                                    label: 'Naczepa',
                                                    field: 'vehicleTrailer',
                                                    width: 150
                                                },
                                                {
                                                    label: 'Typ pojazdu',
                                                    field: 'vehicleType',
                                                    width: 150
                                                },
                                                {
                                                    label: '',
                                                    field: 'edit',
                                                    width: 50
                                                },
                                                {
                                                    label: '',
                                                    field: 'delete'
                                                }
                                            ],
                                            rows: this.state.vehicles.map((vehicle) => (
                                                    {
                                                        vehicleBrand: vehicle.brand,
                                                        vehicleModel: vehicle.model,
                                                        vehicleLoadingCapacity: vehicle.loadingCapacity,
                                                        vehicleYearOfProduction: vehicle.productionYear,
                                                        vehicleTrailer: vehicle.trailer,
                                                        vehicleType: vehicle.vehicleType.typeName,
                                                        edit:
                                                        <NavLink  
                                                            push to={{
                                                            pathname: '/admin/przewoznicy/' + this.state.transporterName + '/pojazdy/edytuj/' + this.state.selectedVehicle.id,
                                                            }}
                                                            >
                                                            <Tooltip title="Edycja pojazdu" aria-label="add">
                                                                <div>
                                                                    {this.state.token.role === 'Admin' &&
                                                                    <MdEdit className='Vehicle-Details-Icon' size='1.4em'/>
                                                                    }
                                                                </div>
                                                            </Tooltip>
                                                        </NavLink>,
                                                        delete:
                                                            <Tooltip title="Usuń pojazd" aria-label="add">
                                                                <div>
                                                                    {this.state.token.role === 'Admin' &&
                                                                    <RiDeleteBin6Line 
                                                                        size='1.4em'
                                                                        className='Vehicle-Details-Icon'
                                                                        onClick={this.handleOpenModal.bind(this, vehicle)}/>
                                                                    }
                                                                </div>
                                                            </Tooltip>
                                                    }
                                                ))
                                        }}
                                    />
                                    <Popup 
                                        modal
                                        open={this.state.isModalOpen}
                                        contentStyle={{
                                            width: '35vw',
                                            height: '30vh',
                                            backgroundColor: '#202125',
                                            borderColor: '#202125',
                                            borderRadius: '15px',
                                        }}>
                                        { close => (<div>
                                            <Container>
                                                <Row style={{textAlign: 'center'}}>
                                                    <Col>
                                                        <label className='Delete-Vehicle-Modal-Header'>Czy na pewno chcesz usunąć pojazd {this.state.selectedVehicle.brand} {this.state.selectedVehicle.model}?</label>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop: '45px', textAlign: 'center'}}>
                                                    <Col>
                                                        <Button 
                                                            className="Confirm-Delete-Vehicle-Button" 
                                                            variant="light"
                                                            onClick={() => {
                                                                close()
                                                            }}>
                                                            <div>
                                                                <ImCross size='1.0em'/><span>&nbsp;</span><span>Nie</span>
                                                            </div>
                                                        </Button>
                                                    </Col>
                                                    <Col>
                                                        <Button 
                                                            className="Confirm-Delete-Vehicle-Button" 
                                                            variant="light"
                                                            onClick={() => {
                                                                this.deleteVehicle();
                                                                close();
                                                            }}>
                                                                <div>
                                                                    <MdDone size='1.5em'/><span>&nbsp;</span><span>Tak</span>
                                                                </div>
                                                            </Button>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </div>)}
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
export default VehiclesPanel;