import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { MdDone, MdAdd, MdLocationOn } from 'react-icons/md';
import { FaUserTie, FaWarehouse  } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { ImCheckboxChecked } from 'react-icons/im';
import { BiPackage, BiMessageAdd } from 'react-icons/bi';
import { CgDetailsMore } from 'react-icons/cg';
import { MDBDataTable } from 'mdbreact';
import { getSessionCookie } from '../../sessions';
import { TextField, FormControl } from '@material-ui/core';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import './AddOrderPanel.css';

class AddOrderPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: getSessionCookie(),
            clients: [],
            selectedClient: null,
            warehouses: [],
            selectedWarehouse: null,
            isModalOpen: false,
            selectedPopup: ''
        }
    }

    // GET call to API to get clients
    async getClients(){
        try
        {
            const response = await axios.get('https://localhost:44394/clients', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
            if(data.length === 0){
                this.setState({
                    clients: []
                })
            }
            this.setState({
                clients: data
            })
        }
        catch(error){
            console.log(error);
        }
    }

    // GET call to API to get clients
    async getWarehouses(){
        try
        {
            const response = await axios.get('https://localhost:44394/warehouses', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;

            if(data.length === 0){
                this.setState({
                    warehouses: []
                })
            }
            this.setState({
                warehouses: data
            })
        }
        catch(error){
            console.log(error);
        }
    }

    // handle open popup
    handleOpenModal = (data) => {
        this.setState({
            selectedPopup: data,
            isModalOpen: true
        })
    }

    // handle close popup
    handleCloseModal = () => {
        this.setState({
            isModalOpen: false
        })
    }

    // handle selected client
    handleSelectedClient = (client) => {
        this.setState({
            selectedClient: client
        })
    }

    // handle selected client
    handleSelectedWarehouse = (warehouse) => {
        this.setState({
            selectedWarehouse: warehouse
        })
    }


    async componentDidMount(){
        await this.getClients();
        await this.getWarehouses();
    };

    render(){
        return(
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col xs='9' style={{minWidth: '500px'}}>
                        <div className='Orders-Header' style={{color: '#f75353'}}>Tworzenie zamówienia transportu</div>
                    </Col>

                    <Col xs='1' style={{minWidth: '120px', marginTop: '10px'}}>
                        <NavLink className='Add-User-Nav-Link' to={{
                            pathname: '/pracownik-zamowien/zamowienia'
                        }}>
                            <Button 
                                className="Orders-Button" 
                                variant="light">
                                Wróć
                            </Button>
                        </NavLink>
                        
                    </Col>
                    <Col xs='1' style={{minWidth: '120px', marginTop: '10px'}}>
                        <Button 
                            className="Orders-Button" 
                            variant="light"
                            style={{width: '110px'}}>
                                <MdDone size='1.0em'/><span>&nbsp;</span><span>Zatwierdź</span>
                        </Button>
                    </Col>
                </Row>
                <Row style={{marginTop: '25px'}}>
                    <Col>
                        <div className='Order-Client-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className='Tile-Header' style={{color: '#f75353'}}>
                                            <FaUserTie size='1.5em'/><span>&nbsp;&nbsp;</span><span>Klient</span>
                                        </div>
                                    </Col>
                                    <Col style={{textAlign: 'right'}}>
                                        <Button 
                                            className="Tile-Button" 
                                            variant="light"
                                            onClick={this.handleOpenModal.bind(this, 'clients')}>
                                                {this.state.selectedClient === null ? 'Wybierz' : 'Zmień'}
                                        </Button>
                                    </Col>
                                </Row>

                                {this.state.selectedClient === null && 
                                <Row>
                                    <Col>
                                        <label className='Tile-Data-Label' style={{fontSize: '18px'}}>Nie wybrano</label>
                                    </Col>
                                </Row>
                                }

                                {this.state.selectedClient !== null &&
                                <div>
                                    <Row>
                                        <Col>
                                            <label className='Tile-Data-Label' style={{fontSize: '22px'}}>
                                                {this.state.selectedClient?.clientFirstName} {this.state.selectedClient?.clientLastName}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{color: '#f75353'}}>Pesel: </span>{this.state.selectedClient?.clientPeselNumber}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{color: '#f75353'}}>Firma: </span>{this.state.selectedClient?.companyFullName === null ? 'brak danych' : this.state.selectedClient?.companyFullName}
                                            </label>
                                        </Col>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                {this.state.selectedClient?.companyShortName === null ? '' : this.state.selectedClient?.companyShortName}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{color: '#f75353'}}>NIP: </span>{this.state.selectedClient?.nip === null ? 'brak danych' : this.state.selectedClient?.nip}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{color: '#f75353'}}>Adres: </span>{this.state.selectedClient?.streetName} {this.state.selectedClient?.city} {this.state.selectedClient?.zipCode}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{color: '#f75353'}}>Nr. kontaktowy(1): </span>{this.state.selectedClient?.contactPhoneNumber1}
                                            </label>
                                        </Col>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{color: '#f75353'}}>Nr. kontaktowy(2): </span>{this.state.selectedClient?.contactPhoneNumber2}
                                            </label>
                                        </Col>
                                    </Row>
                                    
                                </div>
                                }

                            </Container>
                        </div>
                    </Col>
                    <Col>
                        <div className='Order-Client-Tile'>
                        <Container>
                                <Row>
                                    <Col>
                                        <div className='Tile-Header' style={{color: '#f75353'}}>
                                            <FaWarehouse size='1.5em'/><span>&nbsp;&nbsp;</span><span>Magazyn</span>
                                        </div>
                                    </Col>
                                    <Col style={{textAlign: 'right'}}>
                                        <Button 
                                            className="Tile-Button" 
                                            variant="light"
                                            onClick={this.handleOpenModal.bind(this, 'warehouses')}>
                                                {this.state.selectedWarehouse === null ? 'Wybierz' : 'Zmień'}
                                        </Button>
                                    </Col>
                                </Row>

                                {this.state.selectedWarehouse === null &&
                                <Row>
                                    <Col>
                                        <label className='Tile-Data-Label' style={{fontSize: '18px'}}>Nie wybrano</label>
                                    </Col>
                                </Row>
                                }

                                {this.state.selectedWarehouse !== null &&
                                <div>
                                    <Row>
                                        <Col>
                                            <label className='Tile-Data-Label' style={{fontSize: '22px'}}>
                                                {this.state.selectedWarehouse?.name}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{color: '#f75353'}}>Adres: </span>{this.state.selectedWarehouse?.streetAddress} {this.state.selectedWarehouse?.zipCode} {this.state.selectedWarehouse?.city}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{color: '#f75353'}}>Dane osoby do kontaktu: </span>{this.state.selectedWarehouse?.contactPersonFirstName} {this.state.selectedWarehouse?.contactPersonLastName}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{color: '#f75353'}}>Nr. kontaktowy: </span>{this.state.selectedWarehouse?.contactPhoneNumber}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{color: '#f75353'}}>Adres email: </span>{this.state.selectedWarehouse?.mail}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{color: '#f75353'}}>Fax: </span>{this.state.selectedWarehouse?.fax}
                                            </label>
                                        </Col>
                                    </Row>
                                </div>
                                }

                            </Container>
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop: '25px'}}>
                    <Col>
                        <div className='Order-Client-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className='Tile-Header' style={{color: '#f75353'}}>
                                            <MdLocationOn size='1.5em'/><span>&nbsp;&nbsp;</span><span>Adres dostawy</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: '10px', paddingLeft: '5px'}}>
                                    <Col>
                                        <FormControl  noValidate autoComplete="off">
                                            <TextField 
                                                id="destinationStreetAddress" 
                                                label="Adres" 
                                                color="primary"
                                                style={{minWidth: '300px'}}
                                                // onChange={this.handleChange('name')}
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
                                        </FormControl>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: '10px', paddingLeft: '5px'}}>
                                    <Col>
                                        <FormControl  noValidate autoComplete="off">
                                            <TextField 
                                                id="destinationZipCode" 
                                                label="Kod pocztowy" 
                                                color="primary"
                                                style={{minWidth: '300px'}}
                                                // onChange={this.handleChange('name')}
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
                                        </FormControl>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: '10px', paddingLeft: '5px'}}>
                                    <Col>
                                        <FormControl  noValidate autoComplete="off">
                                            <TextField 
                                                id="destinationCity" 
                                                label="Miasto" 
                                                color="primary"
                                                // onChange={this.handleChange('name')}
                                                style={{minWidth: '300px'}}
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
                                        </FormControl>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: '10px', paddingLeft: '5px'}}>
                                    <Col>
                                        <FormControl  noValidate autoComplete="off">
                                            <TextField 
                                                id="destinationCountry" 
                                                label="Kraj" 
                                                color="primary"
                                                // onChange={this.handleChange('name')}
                                                style={{minWidth: '150px'}}
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
                                        </FormControl>
                                    </Col>
                                </Row>
                                
                            </Container>
                        </div>
                    </Col>
                    <Col>
                        <div className='Order-Client-Tile'>
                        <Container>
                                <Row>
                                    <Col>
                                        <div className='Tile-Header' style={{color: '#f75353'}}>
                                            <BiPackage size='1.5em'/><span>&nbsp;&nbsp;</span><span>Towary</span>
                                        </div>
                                    </Col>
                                    <Col style={{textAlign: 'right'}}>
                                        <Button 
                                            className="Tile-Button" 
                                            variant="light"
                                            style={{width: '80px'}}>
                                                 <MdAdd size='1.0em'/><span>&nbsp;</span><span>Dodaj</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop: '25px', marginBottom: '15px'}}>
                    <Col>
                        <div className='Order-Client-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className='Tile-Header' style={{color: '#f75353'}}>
                                            <CgDetailsMore size='1.5em'/><span>&nbsp;&nbsp;</span><span>Szczegóły zamówienia</span>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col>
                        <div className='Order-Client-Tile'>
                        <Container>
                                <Row>
                                    <Col>
                                        <div className='Tile-Header' style={{color: '#f75353'}}>
                                            <BiMessageAdd size='1.5em'/><span>&nbsp;&nbsp;</span><span>Dodatkowe informacje</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: '10px'}}>
                                    <Col>
                                        <FormControl  noValidate autoComplete="off">
                                            <TextField
                                                id="additionalInformation" 
                                                multiline
                                                rowsMax={10}
                                                placeholder='Tutaj wpisz uwagi do zamówienia...'
                                                color="primary"
                                                // onChange={this.handleChange('name')}
                                                style={{minWidth: '450px'}}
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
                                        </FormControl>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>

                <Popup 
                    modal
                    open={this.state.isModalOpen}
                    onClose={this.handleCloseModal}
                    contentStyle={{
                        width: '60vw',
                        height: '60vh',
                        backgroundColor: '#202125',
                        borderColor: '#202125',
                        borderRadius: '15px'}}>
                    {
                        close => (
                            <Container>
                            <Row style={{textAlign: 'center'}}>
                                <Col>
                                    <label className='Orders-Header'>
                                        {this.state.selectedPopup === 'clients' ? 'Wybierz klienta' : 'Wybierz magazyn'}
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                            <MDBDataTable
                                className='Customers-Data-Table'
                                style={{color: '#bdbbbb'}}
                                maxHeight="35vh"
                                scrollY
                                small
                                data={{
                                    columns: this.state.selectedPopup === 'clients' ? clientsColumns : 
                                            this.state.selectedPopup === 'warehouses' ? warehousesColumns : null,
                                    rows: this.state.selectedPopup === 'clients' ? 
                                    this.state.clients.map((client) => (
                                        {
                                            firstName: client.clientFirstName,
                                            lastName: client.clientLastName,
                                            companyFullName: client.companyFullName,
                                            nip: client.nip,
                                            city: client.city,
                                            streetName: client.streetName,
                                            select: <ImCheckboxChecked 
                                                        className='Select-On-Popup' 
                                                        size='1.5em' 
                                                        onClick={() => {
                                                            this.handleSelectedClient(client);
                                                            close();
                                                        }}/>
                                            }
                                        )) : 
                                        this.state.warehouses.map((warehouse) => (
                                            {
                                                warehouse: warehouse.name,
                                                streetAddress: warehouse.streetAddress,
                                                city: warehouse.city,
                                                zipCode: warehouse.zipCode,
                                                select: <ImCheckboxChecked 
                                                            className='Select-On-Popup' 
                                                            size='1.5em' 
                                                            onClick={() => {
                                                                this.handleSelectedWarehouse(warehouse);
                                                                close();
                                                            }}/>
                                                }
                                            ))
                                }}
                            />
                            </Row>
                        </Container>
                        )
                    }
                </Popup>
            </Container>

            
        );
    }
}
export default AddOrderPanel;


const clientsColumns = 
    [
        {
            label: 'Imię',
            field: 'firstName',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Nazwisko',
            field: 'lastName',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Firma',
            field: 'companyFullName',
            sort: 'asc',
            width: 200
        },
        {
            label: 'NIP',
            field: 'nip',
            sort: 'asc',
            width: 100
        },
        {
            label: 'Miasto',
            field: 'city',
            sort: 'asc',
            width: 100
        },
        {
            label: 'Adres',
            field: 'streetName',
            sort: 'asc',
            width: 100
        },
        {
            label: '',
            field: 'select'
        }
    ];

const warehousesColumns = 
[
    {
        label: 'Magazyn',
        field: 'warehouse',
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
        label: '',
        field: 'select'
    }
];

