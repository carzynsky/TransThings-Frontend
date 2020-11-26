import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { getSessionCookie } from '../../sessions';
import { CgMoreO } from 'react-icons/cg';
import { GiFullMotorcycleHelmet } from 'react-icons/gi';
import { FaTruckMoving, FaRoute } from 'react-icons/fa';
import { MdEdit, MdAdd, MdDone, MdShowChart } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import { RiDeleteBin6Line, RiTruckFill } from 'react-icons/ri';
import { Tooltip } from '@material-ui/core';
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
            selectedTransporter: '',
            transportersQuantity: '',
            serverResponse: '',
            isServerResponseModalOpen: false,
            isModalOpen: false
        }
    }

    // GET call to api to get transporters
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
                    selectedTransporter: '',
                    transportersQuantity: 0
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

    // DELETE call to api to remove selected transporter
    async deleteTransporter(){
        try
        {
            const response = await axios.delete('https://localhost:44394/transporters/' + this.state.selectedTransporter.id, {
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
            
            await this.getTransporters();

        }
        catch(error){
            if(error.response){
                if(error.response.data.message === undefined){
                    this.setState({
                        serverResponse: "Nie można usunąć przewoźnika!",
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
        await this.getTransporters();
    }

    handleDetailsClick = (transporter) => this.setState({ selectedTransporter: transporter })

    // handle open/close modal popup
    handleOpenModal = () => this.setState({ isModalOpen: true })

    handleCloseModal = () => this.setState({ isModalOpen: false })

    // Server response pop up
    handleCloseServerResponseModal = () => this.setState({ isServerResponseModalOpen: false })

    render(){
        return(
            <Container>
                <Row>
                    <Col xs='8'>
                        <div className='Transporters-Data-Table-Container'>
                            <Container>
                                <Row>
                                    <Col xs='6'>
                                        <label className='Transporter-Table-Header'>Lista przewoźników</label>
                                    </Col>
                                    <Col>
                                        <div className='Transporter-Table-Header'>
                                            <MdShowChart size='1.3em'/><span>&nbsp;</span><span>{this.state.transportersQuantity}</span>
                                        </div>
                                    </Col>
                                    <Col style={{textAlign: 'right'}}>
                                        {this.state.token.role === 'Admin' &&
                                        <NavLink className="Add-User-Nav-Link" to='/admin/przewoznicy/dodaj'>
                                            <Button 
                                                className="Add-Tranporter-Redirect-Button" 
                                                variant="light">
                                                    <MdAdd size='1.0em'/><span>&nbsp;</span><span>Dodaj</span>
                                            </Button>
                                        </NavLink>
                                            }
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
                                                        <Tooltip title="Szczegóły przewoźnika" aria-label="add"> 
                                                                <div>
                                                                    <CgMoreO 
                                                                        className='Transporter-Details-Icon' 
                                                                        onClick={this.handleDetailsClick.bind(this, transporter)}
                                                                        size='1.4em'/>
                                                                </div>
                                                        </Tooltip>,
                                                        edit:
                                                        <div>
                                                        {this.state.token.role === 'Admin' && 
                                                        <NavLink className="Add-User-Nav-Link" to={{
                                                            pathname: '/admin/przewoznicy/'+ transporter.fullName +'/edytuj',
                                                            transporterProps: transporter}}>
                                                            <Tooltip title="Edycja przewoźnika" aria-label="add"> 
                                                                <div>
                                                                    <MdEdit className='Transporter-Details-Icon' size='1.4em'/>
                                                                </div>
                                                            </Tooltip>
                                                        </NavLink>
                                                        }
                                                        </div>
                                                       ,
                                                        delete:
                                                        <div>
                                                            {this.state.token.role === 'Admin' &&
                                                            <Popup 
                                                            trigger={
                                                                <Tooltip title="Usuń przewoźnika" aria-label="add"> 
                                                                <div>
                                                                     <RiDeleteBin6Line 
                                                                        size='1.4em'
                                                                        className='Transporter-Details-Icon'
                                                                        onClick={this.handleDetailsClick.bind(this, transporter)}
                                                                    />
                                                                </div>
                                                                </Tooltip>
                                                               
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
                                                        }
                                                        </div>
                                                    }
                                                ))
                                        }}
                                />
                                    </Col>
                                </Row>
                                <Popup 
                                    modal
                                    open={this.state.isServerResponseModalOpen}
                                    onClose={this.handleCloseServerResponseModal}
                                    contentStyle={{
                                        width: '30vw',
                                        height: '25vh',
                                        backgroundColor: '#202125',
                                        borderColor: '#202125',
                                        borderRadius: '15px',
                                    }}
                                >
                                    {
                                        close => (
                                            <Container>
                                                <Row style={{textAlign: 'center'}}>
                                                    <Col>
                                                        <label className='Delete-Transporter-Modal-Header'>{this.state.serverResponse}</label>
                                                    </Col>
                                                </Row>
                                                <Row style={{textAlign: 'center', marginTop: '30px'}}>
                                                    <Col>
                                                        <Button 
                                                            className="Confirm-Delete-Transporter-Button" 
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
                            </Container>
                        </div>
                    </Col>
                    <Col xs='4'>
                    <div className='Transporters-Data-Table-Container' style={ {minWidth: '200px' }}>
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
                                            pathname: '/admin/przewoznicy/' + this.state.selectedTransporter.fullName + '/kierowcy',
                                            transporterId: this.state.selectedTransporter.id,
                                            transporterName: this.state.selectedTransporter.fullName
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
                                            pathname: '/admin/przewoznicy/' + this.state.selectedTransporter.fullName + '/pojazdy',
                                            transporterId: this.state.selectedTransporter.id,
                                            transporterName: this.state.selectedTransporter.fullName
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
            </Container>
        );
    }
}
export default TransportersDashboard;