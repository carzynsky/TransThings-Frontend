import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { getSessionCookie } from '../../sessions';
import { GiFullMotorcycleHelmet } from 'react-icons/gi';
import { HiOutlineRefresh } from 'react-icons/hi';
import { MdEdit, MdAdd, MdDone } from 'react-icons/md';
import { ImCross } from 'react-icons/im';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiArrowBack } from 'react-icons/bi';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DriversPanel.css';

class DriversPanel extends Component{
    constructor(props){
        super(props);

        const transporterId = this.props.location.transporterId;
        const transporterName = this.props.location.transporterName;

        this.state = {
            token: getSessionCookie(),
            transporterId: transporterId,
            transporterName: transporterName,
            drivers: [],
            selectedDriver: '',
            driversQuantity: '',
            serverResponse: '',
            isServerResponseModalOpen: false,
            isModalOpen: false
        }
    }

    async getDrivers(){
        try
        {
            const response = await axios.get('https://localhost:44394/drivers/transporters/' + this.state.transporterId, {
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
                    selectedDriver: '',
                    driversQuantity: 0
                })
                return;
            }

            this.setState({
                drivers: data,
                driversQuantity: data.length,
                selectedDriver: data[0]
            })
        }
        catch(error){
            console.log(error);
        }
    }

    async deleteDriver(){
        try
        {
            const response = await axios.delete('https://localhost:44394/drivers/' + this.state.selectedDriver.id, {
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

            await this.getDrivers();
        }
        catch(error){
            this.setState({
                serverResponse: "Nie można usunąć kierowcy.",
                isServerResponseModalOpen: true
            })

            console.log(error);
        }
    }
    
    async componentDidMount(){
        await this.getDrivers();
    }

    handleDetailsClick = (driver) => {
        this.setState({
            selectedDriver: driver
        })
    }

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

    handleCloseServerResponseModal = () =>{
        this.setState({
            isServerResponseModalOpen: false
        })
    }

    render(){
        return(
            <Container>
                <Row style={{marginTop: '50px'}}>
                    {/* <Col style={{marginTop: '100px'}}>
                        <NavLink className="Add-User-Nav-Link" to= '/admin/przewoznicy/'>
                            <Button 
                                className="Drivers-Redirect-Button" 
                                variant="light"
                                style={{width: '160px'}}
                                >Wróć do przewoźników
                            </Button>
                        </NavLink>
                    </Col> */}
                    <Col>
                        <div className='Transporter-Tile' style={{backgroundColor: 'transparent', color: '#e6e947'}}>
                            <Container>
                                <Row style={{paddingTop: '25px', paddingBottom: '25px', textAlign: 'center'}}>
                                    <Col>
                                        <GiFullMotorcycleHelmet size='6em'/>
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
                                        <label className='Driver-Info-Stats-Sub'>Przewoźnik</label>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'center'}}>
                                    <Col>
                                        <label className='Driver-Info-Stats' style={{fontSize: '28px'}}>{this.state.transporterName}</label>
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
                                        <label className='Driver-Info-Stats-Sub'>Wszystkich kierowców</label>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'center'}}>
                                    <Col>
                                        <div className='Driver-Info-Stats'>
                                            {this.state.driversQuantity}
                                        </div>
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
                                        <label className='Driver-Info-Stats-Sub'>Inne</label>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'left'}}>
                                    <Col>
                                        <label className='Driver-Info-Stats'>-</label>
                                    </Col>
                                </Row>

                            </Container>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='Drivers-Data-Table-Container'>
                            <Container>
                                <Row>
                                    <Col xs='7'>
                                        <label className='Driver-Table-Header'>Lista kierowców </label>
                                    </Col>
                                    <Col>
                                        <NavLink className="Add-User-Nav-Link" to= '/admin/przewoznicy/'>
                                            <Button 
                                                className="Add-Driver-Redirect-Button" 
                                                variant="light"
                                                style={{width: '100px'}}>
                                                <BiArrowBack /><span>&nbsp;</span><span>Wróć</span>
                                            </Button>
                                        </NavLink>
                                    </Col>
                                    <Col>
                                        <Button 
                                            className="Add-Driver-Redirect-Button" 
                                            variant="light"
                                            onClick={this.getDrivers.bind(this)}
                                            style={{width: '100px'}}>
                                            <HiOutlineRefresh size='1.0em'/><span>&nbsp;</span><span>Odśwież</span>
                                        </Button>
                                    </Col>
                                    <Col>
                                        <NavLink className="Add-User-Nav-Link" to={{
                                            pathname: '/admin/przewoznicy/' + this.state.transporterName + '/kierowcy/dodaj',
                                            transporterIdProps: this.state.transporterId
                                        }}>
                                            <Button 
                                                className="Add-Driver-Redirect-Button" 
                                                variant="light">
                                                    <MdAdd size='1.0em'/><span>&nbsp;</span><span>Dodaj</span>
                                            </Button>
                                        </NavLink>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <MDBDataTable
                                        className='Drivers-Data-Table'
                                        style={{color: '#bdbbbb'}}
                                        maxHeight="38vh"
                                        scrollY
                                        small
                                        data={{
                                            columns: [
                                                {
                                                    label: 'Imię',
                                                    field: 'driverFirstName',
                                                    sort: 'asc',
                                                    width: 150,
                                                },
                                                {
                                                    label: 'Nazwisko',
                                                    field: 'driverLastName',
                                                    sort: 'asc',
                                                    width: 150
                                                },
                                                {
                                                    label: 'Nr. telefonu',
                                                    field: 'phoneNumber',
                                                    sort: 'asc',
                                                    width: 150
                                                },
                                                {
                                                    label: 'Adres email',
                                                    field: 'mail',
                                                    sort: 'asc',
                                                    width: 150
                                                },
                                                {
                                                    label: '',
                                                    field: 'edit',
                                                    width: 50
                                                },
                                                {
                                                    label: '',
                                                    field: 'delete',
                                                    width: 50
                                                }
                                            ],
                                            rows: this.state.drivers.map((driver) => (
                                                    {
                                                        driverFirstName: driver.firstName,
                                                        driverLastName: driver.lastName,
                                                        phoneNumber: driver.contactPhoneNumber,
                                                        mail: driver.mail,
                                                        edit:
                                                        <NavLink  
                                                            to={{
                                                            pathname: '/admin/przewoznicy/' + this.state.transporterName + '/kierowcy/edytuj/' + driver.id,
                                                            driverProps: driver}}>
                                                            <MdEdit className='Driver-Details-Icon' size='1.4em'/>
                                                        </NavLink>,
                                                        delete:
                                                        <div>
                                                            <Popup 
                                                            trigger={
                                                                <div>
                                                                     <RiDeleteBin6Line 
                                                                        size='1.4em'
                                                                        className='Driver-Details-Icon'
                                                                        onClick={this.handleDetailsClick.bind(this, driver)}
                                                                    />
                                                                </div>
                                                               
                                                            }
                                                            modal
                                                            open={this.state.isModalOpen}
                                                            onOpen={this.handleOpenModal}
                                                            contentStyle={{
                                                                width: '35vw',
                                                                height: '30vh',
                                                                backgroundColor: '#202125',
                                                                borderColor: '#202125',
                                                                borderRadius: '15px',
                                                            }}
                                                            >
                                                            { close => (<div>
                                                                <Container>
                                                                    <Row style={{textAlign: 'center'}}>
                                                                        <Col>
                                                                            <label className='Delete-Driver-Modal-Header'>Czy na pewno chcesz usunąć kierowcę {this.state.selectedDriver.firstName} {this.state.selectedDriver.lastName}?</label>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row style={{marginTop: '45px', textAlign: 'center'}}>
                                                                        <Col>
                                                                        <Button 
                                                                            className="Confirm-Delete-Driver-Button" 
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
                                                                                className="Confirm-Delete-Driver-Button" 
                                                                                variant="light"
                                                                                onClick={() => {
                                                                                    this.deleteDriver();
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
                                                        </div>
                                                    }
                                                ))
                                        }}
                                        />
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
                                                                    <label className='Edit-Driver-Modal-Header'>{this.state.serverResponse}</label>
                                                                </Col>
                                                            </Row>
                                                            <Row style={{textAlign: 'center', marginTop: '30px'}}>
                                                                <Col>
                                                                    <Button 
                                                                        className="Confirm-Edit-Driver-Button" 
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
export default DriversPanel;