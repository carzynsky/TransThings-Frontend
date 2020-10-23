import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { getSessionCookie } from '../../sessions';
import { CgMoreO } from 'react-icons/cg';
import { GiFullMotorcycleHelmet } from 'react-icons/gi';
import { FaTruckMoving } from 'react-icons/fa';
import { MdEdit, MdAdd } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import axios from 'axios';
import './TransportersDashboard.css';

class TransportersDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: getSessionCookie(),
            transporters: [],
            drivers: [],
            selected: false,
            selectedTransporter: '',
            transportersQuantity: ''
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
            this.setState({
                transporters: data,
                transportersQuantity: data.length
            })
        }
        catch(error){
            console.log(error);
        }
    }
    
    async componentDidMount(){
        await this.getTransporters();
        console.log(this.state.selectedTransporter);

    }

    handleDetailsClick = (transporter) => {
        this.setState({
            selectedTransporter: transporter,
            selected: true
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
                                                    width: 100
                                                
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
                                                        <NavLink 
                                                            className="Add-User-Nav-Link" 
                                                            push to={{
                                                                // pathname: '/admin/kontrahenci/edytuj',
                                                                // customerProps: customer.id
                                                            }}>
                                                                <Button 
                                                                    className="Transporter-Details-Button" 
                                                                    onClick={this.handleDetailsClick.bind(this, transporter)}
                                                                    variant="light"><CgMoreO size='1.1em' /><span>&nbsp;</span><span>Szczegóły</span></Button>
                                                        </NavLink>
                                                    }
                                                ))
                                        }}
                                />
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    {this.state.selected && 
                    <Col xs='4'>
                    <div className='Transporters-Data-Table-Container'>
                        <Container>
                            <Row>
                                <Col>
                                    <label className='Transporter-Info-Header'>{this.state.selectedTransporter.fullName}</label>
                                </Col>
                            </Row>
                            <Row>
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
                                <Col>
                                    <label className='Transporter-Info-Mail'>{this.state.selectedTransporter.supportedPathsDescriptions}</label>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '15px'}}>
                                <Col>
                                    {this.state.selected && <NavLink 
                                        className="Add-User-Nav-Link" 
                                        push to={{
                                            // pathname: '/admin/kontrahenci/edytuj',
                                            // customerProps: customer.id
                                        }}>
                                            <Button 
                                                className="Transporters-Redirect-Button" 
                                                variant="light"><GiFullMotorcycleHelmet size='1.8em' /><span>&nbsp;</span><span>Kierowcy</span></Button>
                                    </NavLink>}
                                </Col>
                            </Row>
                            <Row style={{marginTop: '15px'}}>
                                <Col>
                                    {this.state.selected && <NavLink 
                                        className="Add-User-Nav-Link" 
                                        push to={{
                                            // pathname: '/admin/kontrahenci/edytuj',
                                            // customerProps: customer.id
                                        }}>
                                            <Button 
                                                className="Transporters-Redirect-Button" 
                                                variant="light">
                                                    <FaTruckMoving size='1.5em' /><span>&nbsp;</span><span>Pojazdy</span></Button>
                                    </NavLink>}
                                </Col>
                            </Row>
                            <Row style={{marginTop: '15px'}}>
                                <Col>
                                    {this.state.selected && <NavLink 
                                        className="Add-User-Nav-Link" 
                                        push to={{
                                            // pathname: '/admin/kontrahenci/edytuj',
                                            // customerProps: customer.id
                                        }}>
                                            <Button 
                                                className="Transporters-Redirect-Button" 
                                                variant="light">
                                                    <MdEdit size='1.3em' /><span>&nbsp;</span><span>Edycja</span></Button>
                                    </NavLink>}
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    </Col>}
                </Row>
                <Row>
                    <Col>
                        <div className='Transporter-Tile'>
                            <Container>
                                <Row style={{textAlign: 'left', paddingTop: '10px'}}>
                                    <Col>
                                        <label className='Transporter-Info-Stats-Sub'>Liczba wszystkich przewoźników</label>
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