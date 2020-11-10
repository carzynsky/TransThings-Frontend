import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { MdDone, MdAdd, MdLocationOn, MdLocationCity, MdLocalPostOffice } from 'react-icons/md';
import { FaUserTie, FaWarehouse, FaFlagUsa, FaAddressCard, FaWeightHanging, FaWeight, FaGlassWhiskey, FaRegMoneyBillAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { ImCheckboxChecked, ImOffice } from 'react-icons/im';
import { BiPackage, BiMessageAdd } from 'react-icons/bi';
import { CgDetailsMore } from 'react-icons/cg';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiFillPhone } from 'react-icons/ai';
import { MDBDataTable } from 'mdbreact';
import { getSessionCookie } from '../../sessions';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
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

            loads: [],
            addLoadAmount: 1,
            addLoadWeight: 0,
            newLoadName: null,
            newLoadAmount: null,
            newLoadNetWeight: null,
            newLoadPackageWeight: 0,
            newLoadGrossWeight: 0,
            newLoadVolume: 0,
            newLoadPackageType: null,

            totalNetWeight: 0,
            totalGrossWeight: 0,
            totalVolume: 0,
            orderExpectedDate: null,
            destinationStreetAddress: null,
            destinationZipCode: null,
            destinationCity: null,
            destinationCountry: null,
            customerAdditionalInstructions: null,

            paymentForms: [],
            selectedPaymentFormId: '',

            isModalOpen: false,
            selectedPopup: '',
            isAddLoadModalOpen: false,
            isServerResponseModalOpen: false
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
                return
            }

            this.setState({ warehouses: data })
        }
        catch(error){
            console.log(error);
        }
    }

    // GET call to API to get payment forms
    async getPaymentForms(){
        try
        {
            const response = await axios.get('https://localhost:44394/payment-forms', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
            if(data.length === 0){
                this.setState({
                    paymentForms: []
                })
            }
            this.setState({
                paymentForms: data,
                selectedPaymentFormId: data[0].id
            })
        }
        catch(error){
            console.log(error);
        }
    }

    // POST call to API to add new order
    async createOrder(){
        try
        {
            const response = await axios.post('https://localhost:44394/orders',
            {
                'orderExpectedDate': this.state.orderExpectedDate,
                'totalNetWeight': this.state.totalNetWeight,
                'totalGrossWeight': this.state.totalGrossWeight,
                'totalVolume': this.state.totalVolume,
                'destinationStreetAddress': this.state.destinationStreetAddress,
                'destinationCity': this.state.destinationCity,
                'destinationZipCode': this.state.destinationZipCode,
                'destinationCountry': this.state.destinationCountry,
                'clientId': this.state.selectedClient?.id,
                'ordererId': this.state.token.userId,
                'paymentFormId': this.state.selectedPaymentFormId,
                'warehouseId': this.state.selectedWarehouse?.id,
                'customerAdditionalInstructions': this.state.customerAdditionalInstructions
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                },
                
            });

            // Set message for response
            this.setState({
                serverResponse: response.data.message
            })
            await this.addLoads(response.data.orderId)

        }
        catch(error){
            if(error.response){
                if(error.response.data.message === undefined){
                    this.setState({
                        serverResponse: "Nie podano danych zamówienia.",
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

    // POST call to API to add created loads
    async addLoads(orderId){
        try
        {
            var newLoads = [];
            this.state.loads.map(x => {
                newLoads.push({
                    'name': x.name,
                    'weight': parseFloat(x.grossWeight),
                    'amount': parseInt(x.amount),
                    'netWeight': parseFloat(x.netWeight),
                    'packageType': x.packageType,
                    'grossWeight': parseFloat(x.grossWeight),
                    'volume': parseFloat(x.volume),
                    'orderId': parseInt(orderId)
                })
            })

            const data = 
            {
                'loads': newLoads
            }

            console.log(data)
            const response = await axios.post('https://localhost:44394/loads',
            {
                'loads': newLoads
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                },
                
            });

            
            this.setState({
                isServerResponseModalOpen: true
            })
        }
        catch(error){
            if(error.response){
                if(error.response.data.message === undefined){
                    this.setState({
                        serverResponse: "Nie podano danych towarów.",
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

    // handle change of state by passed name
    handleChange = (name) => (event) => this.setState({ [name]: event.target.value })

    // handle open popup
    handleOpenModal = (data) => this.setState({ selectedPopup: data, isModalOpen: true })

    // handle close popup
    handleCloseModal = () => this.setState({ isModalOpen: false })

    // handle selected client
    handleSelectedClient = (client) => this.setState({ selectedClient: client })

    // handle selected client
    handleSelectedWarehouse = (warehouse) => this.setState({ selectedWarehouse: warehouse })

    handleOpenAddLoadModal = () => this.setState({ isAddLoadModalOpen: true })

    handleCloseAddLoadModal = () => this.setState({ isAddLoadModalOpen: false })

    // handle add created load to table
    handleConfirmAddLoad = () => {
        var _loads = this.state.loads;
        var len = _loads.length;
        var newId = len === 0 ? 1 : _loads[len-1].id+1;
        _loads.push({
            'id': newId,
            'name': this.state.newLoadName,
            'amount': this.state.addLoadAmount,
            'netWeight': this.state.addLoadAmount * this.state.addLoadWeight,
            'grossWeight': this.state.addLoadAmount * this.state.addLoadWeight + parseInt(this.state.newLoadPackageWeight),
            'volume': this.state.newLoadVolume,
            'packageType': this.state.newLoadPackageType,
            'orderId': 0
        });
        this.setState({
            loads: _loads,
            addLoadAmount: 1,
            addLoadWeight: 0,
            newLoadPackageWeight: 0,
            newLoadVolume: 0,
            newLoadPackageType: null,
            totalNetWeight: parseInt(this.state.totalNetWeight) + this.state.addLoadAmount * this.state.addLoadWeight,
            totalGrossWeight: parseInt(this.state.totalGrossWeight) + this.state.addLoadAmount * this.state.addLoadWeight + parseInt(this.state.newLoadPackageWeight),
            totalVolume: parseInt(this.state.totalVolume) + parseInt(this.state.newLoadVolume)
        })
    }

    handleDeleteSelectedLoad = (load) => {
        var filteredLoads = this.state.loads.filter( x => x.id !== load.id);

        var newTotalNetWeight = 0;
        var newTotalGrossWeight = 0;
        var newTotalVolume = 0;

        filteredLoads.map((x) => {
            newTotalNetWeight += x.netWeight;
            newTotalGrossWeight += x.grossWeight;
            newTotalVolume += x.volume;
        });

        this.setState({
            loads: filteredLoads,
            totalNetWeight: newTotalNetWeight,
            totalGrossWeight: newTotalGrossWeight,
            totalVolume: newTotalVolume
        })
    }

    handleExpectedDate = (date) => this.setState({ orderExpectedDate: date })

    async componentDidMount(){
        await this.getClients();
        await this.getWarehouses();
        await this.getPaymentForms();
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
                            onClick={this.handleOpenModal.bind(this, 'confirm')}
                            style={{width: '110px'}}>
                                <MdDone size='1.0em'/><span>&nbsp;</span><span>Utwórz</span>
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
                                                <span style={{color: '#f75353'}}> <FaAddressCard /><span>&nbsp;&nbsp;</span>Pesel: </span><span>&nbsp;&nbsp;</span>{this.state.selectedClient?.clientPeselNumber}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{color: '#f75353'}}><ImOffice /> <span>&nbsp;&nbsp;</span>Firma:</span><span>&nbsp;&nbsp;</span>{this.state.selectedClient?.companyFullName === null ? 'brak danych' : this.state.selectedClient?.companyFullName}
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
                                                <span style={{color: '#f75353'}}><HiOutlineOfficeBuilding /><span>&nbsp;&nbsp;</span>Adres:</span><span>&nbsp;&nbsp;</span>{this.state.selectedClient?.streetName} {this.state.selectedClient?.city} {this.state.selectedClient?.zipCode}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{color: '#f75353'}}> <AiFillPhone /><span>&nbsp;&nbsp;</span>Nr. kontaktowy(1):<span>&nbsp;&nbsp;</span></span>{this.state.selectedClient?.contactPhoneNumber1}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{color: '#f75353'}}><AiFillPhone /><span>&nbsp;&nbsp;</span>Nr. kontaktowy(2):<span>&nbsp;&nbsp;</span></span>{this.state.selectedClient?.contactPhoneNumber2}
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
                                                label={
                                                    <div>
                                                        <HiOutlineOfficeBuilding /><span>&nbsp;&nbsp;</span><span>Adres</span>
                                                    </div>
                                                }
                                                color="primary"
                                                style={{minWidth: '300px'}}
                                                onChange={this.handleChange('destinationStreetAddress')}
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
                                                label={
                                                    <div>
                                                        <MdLocalPostOffice /><span>&nbsp;&nbsp;</span><span>Kod pocztowy</span>
                                                    </div>
                                                }
                                                color="primary"
                                                style={{minWidth: '300px'}}
                                                onChange={this.handleChange('destinationZipCode')}
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
                                                label={
                                                    <div>
                                                         <MdLocationCity /><span>&nbsp;&nbsp;</span><span>Miasto</span>
                                                    </div>
                                                }
                                                color="primary"
                                                onChange={this.handleChange('destinationCity')}
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
                                                label={
                                                    <div>
                                                        <FaFlagUsa /><span>&nbsp;&nbsp;</span><span>Kraj</span>
                                                    </div>
                                                }
                                                color="primary"
                                                onChange={this.handleChange('destinationCountry')}
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
                                            style={{width: '80px'}}
                                            onClick={this.handleOpenAddLoadModal}>
                                                 <MdAdd size='1.0em'/><span>&nbsp;</span><span>Dodaj</span>
                                        </Button>
                                    </Col>
                                </Row>

                                {this.state.loads.length === 0 && 
                                    <Row>
                                        <Col>
                                            <label className='Tile-Data-Label' style={{fontSize: '18px'}}>Brak towarów</label>
                                        </Col>
                                    </Row>
                                }

                                {this.state.loads.length !== 0 && 
                                    <MDBDataTable
                                        className='Customers-Data-Table'
                                        style={{color: '#bdbbbb'}}
                                        maxHeight="35vh"
                                        scrollY
                                        small
                                        data={{
                                            columns: loadsColumns,
                                            rows:
                                                this.state.loads.map((load) => (
                                                    {
                                                        name: load.name,
                                                        amount: load.amount,
                                                        netWeight: load.netWeight,
                                                        grossWeight: load.grossWeight,
                                                        volume: load.volume,
                                                        delete: <RiDeleteBin6Line 
                                                                        size='1.3em' 
                                                                        className='Delete-Load-Icon'
                                                                        onClick={this.handleDeleteSelectedLoad.bind(this, load)}/>
                                                    }
                                                ))
                                        }}
                                    />
                                }
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
                                <Row>
                                    <Col>
                                        <div className='Tile-Data-Label' style={{fontSize: '14px'}}>
                                            <FaWeightHanging size='1.3em'/><span>&nbsp;&nbsp;</span>Całkowita waga netto:<span>&nbsp;&nbsp;</span><span style={{color: '#f75353'}}>{this.state.totalNetWeight}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className='Tile-Data-Label' style={{fontSize: '14px'}}>
                                            <FaWeight size='1.3em'/><span>&nbsp;&nbsp;</span>Całkowita waga brutto:<span>&nbsp;&nbsp;</span><span style={{color: '#f75353'}}>{this.state.totalGrossWeight}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className='Tile-Data-Label' style={{fontSize: '14px'}}>
                                            <FaGlassWhiskey size='1.3em'/><span>&nbsp;&nbsp;</span>Całkowita objętość:<span>&nbsp;&nbsp;</span><span style={{color: '#f75353'}}>{this.state.totalVolume}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: '25px', paddingLeft: '5px'}}>
                                    <Col>
                                        <FormControl>
                                            <InputLabel id="genderLabel">
                                                <FaRegMoneyBillAlt size='1.3em'/><span>&nbsp;&nbsp;</span>Forma płatności
                                            </InputLabel>
                                                <Select
                                                    id="selectUserGender"
                                                    color="primary"
                                                    value={this.state.selectedPaymentFormId}
                                                    style={{width: '300px'}}
                                                    InputLabelProps={{
                                                        style:{
                                                            color: 'whitesmoke'
                                                        },
                                                    }}
                                                    onChange={this.handleChange('selectedPaymentFormId')}>
                                                        {this.state.paymentForms.map((paymentForm) => (
                                                            <MenuItem key={paymentForm.id} value={paymentForm.id}>{paymentForm.paymentName}</MenuItem>
                                                        ))}
                                                </Select>
                                        </FormControl>
                                    </Col>
                                </Row>
                                <Row style={{paddingLeft: '5px'}}>
                                    <Col>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="user-date-picker-dialog"
                                                label="Oczekiwana data"
                                                format="MM/dd/yyyy"
                                                color="primary"
                                                value={this.state.orderExpectedDate}
                                                onChange={this.handleExpectedDate.bind(this)}
                                                style={{width: '450px'}}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date'
                                                }}
                                                style={{color: '#5CDB95'}}
                                                InputLabelProps={{
                                                    style:{
                                                        color: 'whitesmoke'
                                                    },
                                                }}
                                                />
                                        </MuiPickersUtilsProvider>
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
                                                onChange={this.handleChange('customerAdditionalInstructions')}
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
                    open={this.state.isModalOpen && this.state.selectedPopup !== 'confirm'}
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
                <Popup 
                    modal
                    open={this.state.isAddLoadModalOpen}
                    onClose={this.handleCloseAddLoadModal}
                    contentStyle={{
                        width: '50vw',
                        height: '68vh',
                        backgroundColor: '#202125',
                        borderColor: '#202125',
                        borderRadius: '15px'}}>
                    {
                        close => (
                            <Container>
                            <Row style={{textAlign: 'center'}}>
                                <Col>
                                    <label className='Orders-Header'>
                                        Dodawanie towaru
                                    </label>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '10px', paddingLeft: '10px'}}>
                                <Col>
                                    <FormControl>
                                        <TextField
                                            id="additionalInformation" 
                                            label='Nazwa'
                                            color="primary"
                                            onChange={this.handleChange('newLoadName')}
                                            style={{minWidth: '0px'}}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#5c8bdb'
                                                },
                                            }} 
                                        />
                                    </FormControl>
                                </Col>
                            </Row>

                            <Row style={{marginTop: '10px', paddingLeft: '10px'}}>
                                <Col>
                                    <FormControl>
                                        <TextField
                                            id="additionalInformation" 
                                            label='Ilość (szt)'
                                            color="primary"
                                            onChange={this.handleChange('addLoadAmount')}
                                            value={this.state.addLoadAmount}
                                            style={{minWidth: '0px'}}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#5c8bdb'
                                                },
                                            }} 
                                        />
                                    </FormControl>
                                </Col>
                                <Col>
                                    <FormControl>
                                        <TextField
                                            id="additionalInformation" 
                                            label='Waga poj. sztuki (kg)'
                                            color="primary"
                                            value={this.state.addLoadWeight}
                                            onChange={this.handleChange('addLoadWeight')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#5c8bdb'
                                                },
                                            }} 
                                        />
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '10px', paddingLeft: '10px'}}>
                                <Col>
                                    <FormControl>
                                        <TextField
                                            id="additionalInformation" 
                                            label='Rodzaj pakunku'
                                            color="primary"
                                            onChange={this.handleChange('newLoadPackageType')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#5c8bdb'
                                                },
                                            }} 
                                        />
                                    </FormControl>
                                </Col>
                                <Col>
                                    <FormControl>
                                        <TextField
                                            id="additionalInformation" 
                                            label='Waga opakowania'
                                            color="primary"
                                            type='number'
                                            style={{width: '150px'}}
                                            onChange={this.handleChange('newLoadPackageWeight')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                inputProps: { min: 0, max: 999999 },
                                                style: {
                                                    color: '#5c8bdb'
                                                },
                                            }} 
                                        />
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '10px', paddingLeft: '10px'}}>
                                <Col>
                                    <FormControl>
                                        <TextField
                                            id="additionalInformation" 
                                            label='Objętość (LITR)'
                                            color="primary"
                                            type='number'
                                            style={{width: '150px'}}
                                            onChange={this.handleChange('newLoadVolume')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                inputProps: { min: 0, max: 999999 },
                                                style: {
                                                    color: '#5c8bdb'
                                                },
                                            }} 
                                        />
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '30px'}}>
                                <Col>
                                    <label className='Tile-Data-Label'>
                                        <span style={{color: '#f75353', fontSize: '18px'}}>Waga netto (kg): </span>
                                        <span style={{fontSize: '18px'}}>{this.state.addLoadAmount * this.state.addLoadWeight}</span>
                                    </label>
                                </Col>
                                <Col>
                                    <label className='Tile-Data-Label'>
                                        <span style={{color: '#f75353', fontSize: '18px'}}>Waga brutto (kg): </span>
                                        <span style={{fontSize: '18px'}}>{this.state.addLoadAmount * this.state.addLoadWeight + parseInt(this.state.newLoadPackageWeight)}</span>
                                    </label>
                                </Col>
                            </Row>
                            <Row style={{textAlign: 'center', marginTop: '60px'}}>
                                <Col>
                                    <Button 
                                        className="Tile-Button" 
                                        variant="light"
                                        style={{width: '110px'}}
                                        onClick={() => {
                                            this.handleConfirmAddLoad();
                                            close();
                                        }}>
                                            <MdDone size='1.0em'/><span>&nbsp;</span><span>Zatwierdź</span>
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                        )
                    }
                </Popup>

                <Popup 
                    modal
                    open={this.state.isModalOpen && this.state.selectedPopup === 'confirm'}
                    onClose={this.handleCloseModal}
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
                                        <label className='Edit-User-Modal-Header'>Czy napewno chcesz utworzyć zamówienie?</label>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'center', marginTop: '30px'}}>
                                    <Col>
                                        <Button 
                                            className="Confirm-Edit-User-Button" 
                                            variant="light"
                                            onClick={() => {
                                                close();
                                            }}>
                                            Nie
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button 
                                            className="Confirm-Edit-User-Button" 
                                            variant="light"
                                            onClick={() => {
                                                this.createOrder();
                                                close();
                                            }}>
                                            Tak
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        )
                    }
                </Popup>

                <Popup 
                    modal
                    open={this.state.isServerResponseModalOpen}
                    onClose={this.handleCloseModal}
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
                                        <label className='Edit-User-Modal-Header'>{this.state.serverResponse}</label>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'center', marginTop: '30px'}}>
                                    <Col>
                                        <NavLink className='Add-User-Nav-Link' to={{
                                            pathname: '/pracownik-zamowien/zamowienia'
                                        }}>
                                            <Button 
                                                className="Orders-Button" 
                                                variant="light"
                                                onClick={() => {
                                                    close();
                                                }}>
                                                Ok
                                            </Button>
                                        </NavLink>
                                    </Col>
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
        width: 250,
    },
    {
        label: 'Adres',
        field: 'streetAddress',
        sort: 'asc',
        width: 250
    },
    {
        label: 'Miasto',
        field: 'city',
        sort: 'asc',
        width: 250
    },
    {
        label: 'Kod pocztowy',
        field: 'zipCode',
        sort: 'asc',
        width: 200
    },
    {
        label: '',
        field: 'select'
    }
];

const loadsColumns = 
[
    {
        label: 'Nazwa',
        field: 'name',
        sort: 'asc',
        width: 150,
    },
    {
        label: 'Ilość (szt)',
        field: 'amount',
        sort: 'asc',
        width: 50
    },
    {
        label: 'Waga netto (kg)',
        field: 'netWeight',
        sort: 'asc',
        width: 100
    },
    {
        label: 'Waga brutto (kg)',
        field: 'grossWeight',
        sort: 'asc',
        width: 100
    },
    {
        label: 'Obj. (LITR)',
        field: 'volume',
        sort: 'asc',
        width: 100
    },
    {
        label: '',
        field: 'delete',
        sort:'asc'
    }
];