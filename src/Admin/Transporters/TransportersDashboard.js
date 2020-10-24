import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { getSessionCookie } from '../../sessions';
import { CgMoreO } from 'react-icons/cg';
import { GiFullMotorcycleHelmet } from 'react-icons/gi';
import { FaTruckMoving, FaRoute } from 'react-icons/fa';
import { MdEdit, MdAdd, MdDone } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import { RiDeleteBin6Line, RiTruckFill } from 'react-icons/ri';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './TransportersDashboard.css';

class TransportersDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: getSessionCookie(),
            transporters: [],
            drivers: [],
            selectedTransporter: '',
            transportersQuantity: '',
            isModalOpen: false
        }
    }

    async getTransporters(){
        try
        {
            const response = await axios.get('https://localhost:44394/transporters', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
            if(data.length === 0){
                this.setState({
                    selectedTransporter: ''
                })
                return;
            }

            this.setState({
                transporters: data,
                transportersQuantity: data.length,
                selectedTransporter: data[0]
            })
        }
        catch(error){
            console.log(error);
        }
    }

    async deleteTransporter(){
        try
        {
            await axios.delete('https://localhost:44394/transporters/' + this.state.selectedTransporter.id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });
            this.getTransporters();
        }
        catch(error){
            console.log(error);
        }
    }
    
    async componentDidMount(){
        await this.getTransporters();

    }

    handleDetailsClick = (transporter) => {
        console.log(transporter)
        this.setState({
            selectedTransporter: transporter
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

    render(){
        return(
            <Container>
                <Row>
                    <Col xs='8'>
                        <div className='Transporters-Data-Table-Container'>
                            <Container>
                                <Row>
                                    <Col>
                                        <label className='Transporter-Table-Header'>Lista przewoźników</label>
                                    </Col>
                                    <Col style={{textAlign: 'right'}}>
                                        {/* <NavLink className="Add-User-Nav-Link" push to='admin/przewoznicy/dodaj'>
                                            <label className="Add-Customer-Redirect">+ Dodaj</label>
                                        </NavLink> */}
                                        <NavLink className="Add-User-Nav-Link" to='/admin/przewoznicy/dodaj'>
                                            <Button 
                                                className="Add-Tranporter-Redirect-Button" 
                                                variant="light">
                                                    <MdAdd size='1.0em'/><span>&nbsp;</span><span>Dodaj</span>
                                            </Button>
                                        </NavLink>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <MDBDataTable
                                        className='Transporters-Data-Table'
                                        style={{color: '#bdbbbb'}}
                                        maxHeight="38vh"
                                        scrollY
                                        small
                                        data={{
                                            columns: [
                                                {
                                                    label: 'Przewoźnik',
                                                    field: 'transporterFullName',
                                                    sort: 'asc',
                                                    width: 150,
                                                },
                                                {
                                                    label: 'Adres',
                                                    field: 'streetAddress',
                                                    sort: 'asc',
                                                    width: 150
                                                },
                                                {
                                                    label: 'Miasto',
                                                    field: 'city',
                                                    sort: 'asc',
                                                    width: 150
                                                },
                                                {
                                                    label: 'Kod pocztowy',
                                                    field: 'zipCode',
                                                    sort: 'asc',
                                                    width: 150
                                                },
                                                {
                                                    label: 'NIP',
                                                    field: 'nip',
                                                    sort: 'asc',
                                                    width: 150
                                                },
                                                {
                                                    label: '',
                                                    field: 'select',
                                                    sort: 'asc',
                                                    width: 50
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
                                            rows: this.state.transporters.map((transporter) => (
                                                    {
                                                        transporterFullName: transporter.fullName,
                                                        streetAddress: transporter.streetAddress,
                                                        city: transporter.city,
                                                        zipCode: transporter.zipCode,
                                                        nip: transporter.nip,
                                                        select: 
                                                            <CgMoreO 
                                                                className='Transporter-Details-Icon' 
                                                                onClick={this.handleDetailsClick.bind(this, transporter)}
                                                                size='1.4em'/>,
                                                        edit:
                                                        <NavLink className="Add-User-Nav-Link" to={{
                                                            pathname: '/admin/przewoznicy/edytuj',
                                                            transporterProps: transporter}}>
                                                            <MdEdit className='Transporter-Details-Icon' size='1.4em'/>
                                                        </NavLink>,
                                                        delete:
                                                        <div>
                                                            <Popup 
                                                            trigger={
                                                                <div>
                                                                     <RiDeleteBin6Line 
                                                                        size='1.4em'
                                                                        className='Transporter-Details-Icon'
                                                                        onClick={this.handleDetailsClick.bind(this, transporter)}
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
                                                                            <label className='Delete-Transporter-Modal-Header'>Czy na pewno chcesz usunąć przewoźnika {this.state.selectedTransporter.fullName} ?</label>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row style={{marginTop: '45px', textAlign: 'center'}}>
                                                                        <Col>
                                                                        <Button 
                                                                            className="Confirm-Delete-Transporter-Button" 
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
                                                                                className="Confirm-Delete-Transporter-Button" 
                                                                                variant="light"
                                                                                onClick={() => {
                                                                                    this.deleteTransporter();
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
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col xs='4'>
                    <div className='Transporters-Data-Table-Container'>
                        <Container>
                            <Row>
                                <Col>
                                <div className='Transporter-Info-Header'>
                                    <RiTruckFill size='1.5em'/><span>&nbsp;</span>{this.state.selectedTransporter.fullName}
                                </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop:'25px'}}>
                                <Col>
                                    <label className='Transporter-Info-Mail'>{this.state.selectedTransporter.country}</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label className='Transporter-Info-Mail'>
                                        <AiOutlineMail size='1.5em'/> <span>&nbsp;</span>{this.state.selectedTransporter.mail}
                                    </label>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '25px'}}>
                                <Col className='Transporter-Info-Sub'>
                                    <FaRoute size='1.3em'/><span>&nbsp;&nbsp;</span>Obsługiwane trasy
                                </Col>
                            </Row>
                            <Row style={{marginTop: '10px'}}>
                                <Col>
                                    <label className='Transporter-Info-Mail'>{this.state.selectedTransporter.supportedPathsDescriptions}</label>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '25px'}}>
                                <Col>
                                    <NavLink 
                                        className="Add-User-Nav-Link" 
                                        push to={{
                                            // pathname: '/admin/kontrahenci/edytuj',
                                            // customerProps: customer.id
                                        }}>
                                            <Button 
                                                className="Transporters-Redirect-Button" 
                                                variant="light"><GiFullMotorcycleHelmet size='1.8em' /><span>&nbsp;</span><span>Kierowcy</span></Button>
                                    </NavLink>
                                </Col>
                                <Col>
                                    <NavLink 
                                        className="Add-User-Nav-Link" 
                                        push to={{
                                            // pathname: '/admin/kontrahenci/edytuj',
                                            // customerProps: customer.id
                                        }}>
                                            <Button 
                                                className="Transporters-Redirect-Button" 
                                                variant="light">
                                                    <FaTruckMoving size='1.5em' /><span>&nbsp;</span><span>Pojazdy</span></Button>
                                    </NavLink>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='Transporter-Tile'>
                            <Container>
                                <Row style={{textAlign: 'left', paddingTop: '10px'}}>
                                    <Col>
                                        <label className='Transporter-Info-Stats-Sub'>Wszystkich przewoźników</label>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'center'}}>
                                    <Col>
                                        <label className='Transporter-Info-Stats'>{this.state.transportersQuantity}</label>
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
                                        <label className='Transporter-Info-Stats-Sub'>Nowych w tym roku</label>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'center'}}>
                                    <Col>
                                        <label className='Transporter-Info-Stats'>8</label>
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
                                        <label className='Transporter-Info-Stats-Sub'>Nowych w tym miesiącu</label>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'center'}}>
                                    <Col>
                                        <label className='Transporter-Info-Stats'>3</label>
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
                                        <label className='Transporter-Info-Stats-Sub'>Nowych w tym tygodniu</label>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'center'}}>
                                    <Col>
                                        <label className='Transporter-Info-Stats'>3</label>
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
export default TransportersDashboard;