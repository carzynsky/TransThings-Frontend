import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { MdDone, MdAdd, MdLocationOn, MdLocationCity, MdLocalPostOffice, MdVerifiedUser, MdEventAvailable } from 'react-icons/md';
import { FaUserTie, FaCloudscale, FaWarehouse, FaFlagUsa, FaAddressCard, FaWeightHanging, FaWeight, FaGlassWhiskey, FaRegMoneyBillAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { ImCheckboxChecked, ImOffice } from 'react-icons/im';
import { BiPackage, BiMessageAdd, BiTask } from 'react-icons/bi';
import { CgDetailsMore, CgFileDocument, CgCalendarDates } from 'react-icons/cg';
import { RiDeleteBin6Line, RiTruckLine } from 'react-icons/ri';
import { AiFillPhone } from 'react-icons/ai';
import { GiPathDistance } from 'react-icons/gi';
import { MDBDataTable } from 'mdbreact';
import { getSessionCookie } from '../../sessions';
import { TextField, FormControl, InputLabel, Select, MenuItem, Checkbox } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import './EditOrderPanel.css';

class EditOrderPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: getSessionCookie(),
            selectedClient: '',
            isClientVerified: false,
            isAvailableAtWarehouse: false,
            netPrice: false,
            grossPrice: false,
            rate: null,

            order: '',

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
            orderRealizationDate: null,
            destinationStreetAddress: '',
            destinationZipCode: '',
            destinationCity: '',
            destinationCountry: '',
            customerAdditionalInstructions: null,
            transportDistance: '',

            paymentForms: [],
            selectedPaymentFormId: '',

            orderStatuses: [],
            selectedOrderStatusId: '',

            forwarders: [],
            selectedConsultant: null,

            vehicleTypes: [],
            selectedVehicleTypeId: '',

            selectConsultantAsForwarder: false,
            additionalInformation: null,
            forwardingOrderId: null,
            forwardingOrderNumber: '',
            forwardingOrders: [],
            forwarder: '',

            isModalOpen: false,
            selectedPopup: '',
            isAddLoadModalOpen: false,
            isCreateForwardingOrderModalOpen: false,
            isAssignForwardingOrderModalOpen: false,
            isServerResponseModalOpen: false,
            isOk: false
        }
    }

    // GET call to API to get clients
    async getOrderById(orderId){
        try
        {
            const response = await axios.get('https://localhost:44394/orders/' + orderId, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data
            console.log(data)

            this.setState({
                order: data,
                selectedClient: data.client,
                selectedWarehouse: data.warehouse,
                selectedConsultant: data.consultant,
                totalNetWeight: data.totalNetWeight,
                totalGrossWeight: data.totalGrossWeight,
                totalVolume: data.totalVolume,
                destinationStreetAddress: data.destinationStreetAddress,
                customerAdditionalInstructions: data.customerAdditionalInstructions,
                destinationZipCode: data.destinationZipCode,
                destinationCountry: data.destinationCountry,
                destinationCity: data.destinationCity,
                orderExpectedDate: data.orderExpectedDate,
                orderRealizationDate: data.orderRealizationDate,
                selectedPaymentFormId: data.paymentFormId,
                selectedOrderStatusId: data.orderStatusId,
                selectedVehicleTypeId: data.vehicleTypeId,
                forwardingOrderNumber: data.forwardingOrder?.forwardingOrderNumber,
                forwarder: data.forwardingOrder?.forwarder,
                forwardingOrderId: data.forwardingOrderId,
                netPrice: data.netPrice?.toFixed(2),
                grossPrice: data.grossPrice?.toFixed(2),
                transportDistance: data.transportDistance,
                isClientVerified: data.isClientVerified,
                isAvailableAtWarehouse: data.isAvailableAtWarehouse,
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

            this.setState({
                warehouses: data
            })
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
                return
            }
            this.setState({
                paymentForms: data
            })
        }
        catch(error){
            console.log(error);
        }
    }

    // GET call to API to get vehicle types
    async getVehicleTypes(){
        try
        {
            const response = await axios.get('https://localhost:44394/vehicle-types', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
            if(data.length === 0){
                this.setState({
                    vehicleTypes: []
                })
                return
            }

            this.setState({
                vehicleTypes: data
            })
        }
        catch(error){
            console.log(error);
        }
    }

    // GET call to API to get forwarders
    async getForwarders(){
        try
        {
            const response = await axios.get('https://localhost:44394/users/role/2', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            })

            const data = await response.data
            if(data.length === 0){
                this.setState({ forwarders: [] })
                return
            }

            this.setState({ forwarders: data })
        }
        catch(error){
            console.log(error);
        }
    }

    // GET call to API to get loads by order id
    async getLoads(){
        try
        {
            const response = await axios.get('https://localhost:44394/loads/orders/' + this.state.order?.id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
            if(data.length === 0){
                this.setState({
                    loads: []
                })
            }

            this.setState({
                loads: data
            })
        }
        catch(error){
            console.log(error);
        }
    }

    // GET call to API to get forwardingOrders
    async getForwardingOrders(){
        try
        {
            const response = await axios.get('https://localhost:44394/forwarding-orders/', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
            if(data.length === 0){
                this.setState({ forwardingOrders: [] })
                return
            }

            this.setState({ forwardingOrders: data })
        }
        catch(error){
            console.log(error);
        }
    }

    // GET call to API to get order statuses
    async getOrderStatuses(){
        try
        {
            const response = await axios.get('https://localhost:44394/order-statuses', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data

            if(data.length === 0){
                this.setState({
                    orderStatuses: []
                })
            }

            this.setState({
                orderStatuses: data
            })
        }
        catch(error){
            console.log(error);
        }
    }

    // PUT call to API to add update order
    async updateOrder(){
        try
        {
            const response = await axios.put('https://localhost:44394/orders/' + this.state.order?.id,
            {
                'orderExpectedDate': this.state.orderExpectedDate,
                'totalNetWeight': this.state.totalNetWeight,
                'totalGrossWeight': this.state.totalGrossWeight,
                'totalVolume': parseFloat(this.state.totalVolume),
                'destinationStreetAddress': this.state.destinationStreetAddress,
                'destinationCity': this.state.destinationCity,
                'destinationZipCode': this.state.destinationZipCode,
                'destinationCountry': this.state.destinationCountry,
                'clientId': this.state.selectedClient?.id,
                'ordererId': this.state.token.userId,
                'paymentFormId': this.state.selectedPaymentFormId,
                'warehouseId': this.state.selectedWarehouse?.id,
                'customerAdditionalInstructions': this.state.customerAdditionalInstructions,
                'transportDistance': this.state.transportDistance === '' ? null : parseFloat(this.state.transportDistance),
                'netPrice': this.state.token.role === 'Orderer' ? parseFloat(this.state.netPrice) : parseFloat(((parseFloat(this.state.totalGrossWeight) + parseFloat(this.state.totalVolume)) * this.state.transportDistance * this.state.rate).toFixed(2)),
                'grossPrice': this.state.token.role === 'Orderer' ? parseFloat(this.state.grossPrice) : parseFloat(((parseFloat(this.state.totalGrossWeight) + parseFloat(this.state.totalVolume)) * this.state.transportDistance * this.state.rate * 1.23).toFixed(2)),
                'isClientVerified': this.state.isClientVerified,
                'isAvailableAtWarehouse': this.state.isAvailableAtWarehouse,
                'orderStatusId': this.state.selectedOrderStatusId,
                'consultantId': this.state.selectedConsultant?.id,
                'forwardingOrderId': this.state.forwardingOrderId,
                'vehicleTypeId': this.state.selectedVehicleTypeId === '' ? null : this.state.selectedVehicleTypeId
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                },
                
            })

            //Set message for response
            if(!this.state.isCreateForwardingOrderModalOpen){
                this.setState({ serverResponse: response.data.message })
            }

            await this.addOrUpdateLoads()
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

    // PUT call to API to add or update loads
    async addOrUpdateLoads(){
        try
        {
            var newLoads = [];
            this.state.loads.map(x => {
                if(x.orderId === 0){
                    newLoads.push({
                        'name': x.name,
                        'weight': parseFloat(x.grossWeight),
                        'amount': parseInt(x.amount),
                        'netWeight': parseFloat(x.netWeight),
                        'packageType': x.packageType,
                        'grossWeight': parseFloat(x.grossWeight),
                        'volume': parseFloat(x.volume),
                        'orderId': this.state.order?.id
                    })
                    return
                }

                newLoads.push({
                    'id': x.id,
                    'name': x.name,
                    'weight': parseFloat(x.grossWeight),
                    'amount': parseInt(x.amount),
                    'netWeight': parseFloat(x.netWeight),
                    'packageType': x.packageType,
                    'grossWeight': parseFloat(x.grossWeight),
                    'volume': parseFloat(x.volume),
                    'orderId': this.state.order?.id
                })
            })

            const response = await axios.put('https://localhost:44394/loads/' + this.state.order?.id,
            {
                'loads': newLoads
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                },
                
            })

            this.setState({
                isServerResponseModalOpen: true,
                isOk: true
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
            console.log(error)
        }
    }

    // POST call to API to create forwarding order
    async createForwardingOrder(){
        try{
            const response = await axios.post('https://localhost:44394/forwarding-orders',
            {
                'additionalDescription': this.state.additionalInformation,
                'forwarderId': this.state.selectConsultantAsForwarder ? this.state.order?.consultantId : null,
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                },
                
            })

            this.setState({
                serverResponse: response.data.message,
                forwardingOrderId: response.data.forwardingOrderId
            })

            await this.updateOrder()
        }
        catch(error){
            if(error.response){
                if(error.response.data.message === undefined){
                    this.setState({
                        serverResponse: "Nie podano danych zlecenia spedycji.",
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
            console.log(error)
        }
    }

    // handle change generic
    handleChange = (name) => (event) => {
        if(name === 'isClientVerified' || name === 'isAvailableAtWarehouse' || name === 'selectConsultantAsForwarder'){
            this.setState({
                [name]: event.target.checked
            })
            return
        }

        this.setState({
            [name]: event.target.value
        })
    }

    // handle open popup
    handleOpenModal = (data) => this.setState({ selectedPopup: data, isModalOpen: true })

    // handle close popup
    handleCloseModal = () => this.setState({ isModalOpen: false})

    // handle selected client
    handleSelectedClient = (client) => this.setState({ selectedClient: client })

    // handle selected warehouse
    handleSelectedWarehouse = (warehouse) => this.setState({ selectedWarehouse: warehouse })

    // handle selected consultant
    handleSelectedConsultant = (consultant) => this.setState({ selectedConsultant: consultant })

    // handle selected (assigned) forwarding order to this transport order
    handleSelectedAssignedForwardingOrder = (forwardingOrder) => this.setState({ 
        forwardingOrderId: forwardingOrder?.id, 
        isAssignForwardingOrderModalOpen: false ,
        forwardingOrderNumber: forwardingOrder.forwardingOrderNumber,
        forwarder: forwardingOrder.forwarder
    })

    // handle open modal for new load
    handleOpenAddLoadModal = () => this.setState({ isAddLoadModalOpen: true })

    // handle close model for new load
    handleCloseAddLoadModal = () => this.setState({ isAddLoadModalOpen: false })

    // handle open create forwarding order modal
    handleOpenCreateForwardingOrderModal = () => this.setState({ isCreateForwardingOrderModalOpen: true })

    // handle close create forwarding order modal
    handleCloseCreateForwardingOrderModal = () => this.setState({ isCreateForwardingOrderModalOpen: false })

    // handle open / close assign existing forwarding order to this transport order modal
    handleOpenAssignForwardingOrderModal = () => this.setState({ isAssignForwardingOrderModalOpen: true })
    handleCloseAssignForwardingOrderModal = () => this.setState({ isAssignForwardingOrderModalOpen: false })

    // handle add created load to table
    handleConfirmAddLoad = () => {
        var _loads = this.state.loads
        var len = _loads.length
        var newId = len === 0 ? 1 : _loads[len-1].id+1
        _loads.push({
            'id': newId,
            'name': this.state.newLoadName,
            'amount': this.state.addLoadAmount,
            'netWeight': this.state.addLoadAmount * this.state.addLoadWeight,
            'grossWeight': this.state.addLoadAmount * this.state.addLoadWeight + parseInt(this.state.newLoadPackageWeight),
            'volume': this.state.newLoadVolume,
            'packageType': this.state.newLoadPackageType,
            'orderId': 0
        })

        this.setState({
            loads: _loads,
            addLoadAmount: 1,
            addLoadWeight: 0,
            newLoadPackageWeight: 0,
            newLoadVolume: 0,
            newLoadPackageType: null,
            totalNetWeight: parseInt(this.state.totalNetWeight) + this.state.addLoadAmount * this.state.addLoadWeight,
            totalGrossWeight: parseInt(this.state.totalGrossWeight) + this.state.addLoadAmount * this.state.addLoadWeight + parseInt(this.state.newLoadPackageWeight),
            totalVolume: parseFloat(this.state.totalVolume) + parseFloat(this.state.newLoadVolume)
        })
    }

    // handle remove created loads from table
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

    // handle expected realization date of order
    handleExpectedDate = (date) => this.setState({ orderExpectedDate: date })

    async componentDidMount(){
        await this.getWarehouses()
        await this.getPaymentForms()
        await this.getVehicleTypes()
        await this.getOrderStatuses()
        await this.getForwarders()
        await this.getOrderById(this.props.match.params.id);
        await this.getLoads()
        await this.getForwardingOrders()
    };

    render(){
        return(
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col xs='9' style={{minWidth: '500px'}}>
                        <div className='Orders-Header'>Edycja zamówienia transportu</div>
                    </Col>

                    <Col xs='1' style={{minWidth: '120px', marginTop: '10px'}}>
                        <NavLink className='Add-User-Nav-Link' to={{
                            pathname: this.state.token.role === 'Orderer' ? '/pracownik-zamowien/zamowienia' 
                            : '/spedytor/konsultacje-spedycji'
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
                                <MdDone size='1.0em'/><span>&nbsp;</span><span>Zapisz</span>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='Orders-Header' style={{ fontSize: 18, color: 'whitesmoke' }}>
                            <CgFileDocument /><span>&nbsp;&nbsp;</span><span>{this.state.order?.orderNumber}</span>
                        </div>
                    </Col>
                    <Col>
                        <div className='Orders-Header' style={{ fontSize: 18, color: 'whitesmoke' }}>
                            <BiTask /><span>&nbsp;&nbsp;</span><span>{this.state.forwardingOrderNumber === undefined ? 'brak' : this.state.forwardingOrderNumber}</span>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className='Orders-Header' style={{ fontSize: 18, color: 'whitesmoke' }}>
                            {this.state.order?.orderRealizationDate !== null &&
                            <div>
                                <CgCalendarDates /><span>&nbsp;&nbsp;</span><span >Data zakończenia: </span><span>{this.state.orderRealizationDate?.split('T')[0]}</span>
                            </div>
                            }
                        </div>
                    </Col>
                </Row>
                
                <Row style={{ marginTop: 25 }}>
                    <Col style={{ paddingTop: 25 }}>
                        <FormControl>
                            <InputLabel id="genderLabel">
                                Status
                            </InputLabel>
                            <Select
                                id="selectUserGender"
                                color="primary"
                                value={this.state.selectedOrderStatusId}
                                style={{width: '250px'}}
                                InputLabelProps={{
                                    style:{
                                        color: 'whitesmoke'
                                    }
                                }}
                                onChange={this.handleChange('selectedOrderStatusId')}>
                                {this.state.orderStatuses.map((orderStatus) => (
                                    <MenuItem key={orderStatus.id} value={orderStatus.id}>{orderStatus.statusName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Col>
                    <Col xs='3'>
                        <div className='Small-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className='Orders-Stats-Header' style={{fontSize: '14px'}}>
                                            Przyjmujący zamówienie
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ textAlign: 'center', marginTop: 10 }}>
                                    <Col>
                                        <div className='Tile-Data-Label' style={{ fontSize: 20}}>
                                            {this.state.order?.orderer?.firstName}<span>&nbsp;</span>{this.state.order?.orderer?.lastName} 
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col xs='3'>
                        <div className='Small-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className='Orders-Stats-Header' style={{fontSize: '14px'}}>
                                            Konsultant spedycji
                                        </div>
                                    </Col>
                                    {this.state.selectedConsultant !== null &&
                                    <Col>
                                            <Button 
                                                className="Small-Button"
                                                variant="light"
                                                style={{marginTop: 15}}
                                                onClick={this.handleOpenModal.bind(this, 'addConsultant')}>Zmień
                                            </Button>
                                    </Col>
                                    }

                                </Row>
                                <Row style={{textAlign: 'center', marginTop: 5}}>
                                    <Col>
                                        {this.state.selectedConsultant !== null &&
                                            <div className='Tile-Data-Label' style={{fontSize: 20}}>{this.state.selectedConsultant?.firstName} {this.state.selectedConsultant?.lastName}</div>
                                        }
                                        {this.state.selectedConsultant === null &&
                                            <Button 
                                                className="Small-Button"
                                                variant="light"
                                                style={{marginTop: 10}}
                                                onClick={this.handleOpenModal.bind(this, 'addConsultant')}>Dodaj
                                            </Button>
                                        }
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col xs='3'>
                        <div className='Small-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 14 }}>
                                            Spedytor
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'center', marginTop: 10}}>
                                    <Col>
                                        <div className='Tile-Data-Label' style={{ fontSize: 20 }}>{this.state.forwarder === undefined ? 'brak' 
                                        : <span><span>{this.state.forwarder?.firstName}</span><span>&nbsp;</span><span>{this.state.forwarder?.lastName}</span></span>}</div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>

                {this.state.token.role === 'Orderer' && this.state.forwardingOrderId === null && this.state.selectedOrderStatusId === 2 && 
                <Row style={{ marginTop: 25 }}>
                    <Col>
                        <div className='Order-Client-Tile'>
                            <Container>
                                <Row style={{ marginTop: 10 }}>
                                    <Col xs='6'>
                                        <div className='Tile-Header' style={{ color: '#50ee9c' }}>
                                            Tworzenie zlecenia spedycji
                                        </div>
                                    </Col>
                                    <Col>
                                        <Button 
                                            className="Orders-Button" 
                                            variant="light"
                                            style={{ width: 100, marginTop: 15 }}
                                            onClick={this.handleOpenCreateForwardingOrderModal}>
                                            Utwórz
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button 
                                            className="Orders-Button" 
                                            variant="light"
                                            style={{ width: 100, marginTop: 15 }}
                                            onClick={this.handleOpenAssignForwardingOrderModal}>
                                            Przypisz
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                }

                <Row style={{marginTop: '25px'}}>
                    <Col>
                        <div className='Order-Client-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className='Orders-Header' style={{ fontSize: 20 }}>
                                            <FaUserTie size='1.3em'/><span>&nbsp;&nbsp;</span><span>Klient</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <label className='Orders-Header' style={{fontSize: 20, color: 'whitesmoke' }}>
                                            {this.state.selectedClient?.clientFirstName} {this.state.selectedClient?.clientLastName}
                                        </label>
                                    </Col>
                                </Row>

                                {this.state.selectedClient === null && 
                                <Row>
                                    <Col>
                                        <label className='Orders-Header' style={{ color: 'whitesmoke', fontSize: 18 }}>Nie wybrano</label>
                                    </Col>
                                </Row>
                                }

                                {this.state.selectedClient !== null &&
                                <div>
                                    <Row>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{ color: '#50ee9c' }}> <FaAddressCard /><span>&nbsp;&nbsp;</span>Pesel: </span><span>&nbsp;&nbsp;</span>{this.state.selectedClient?.clientPeselNumber}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: -10 }}>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{ color: '#50ee9c' }}><ImOffice /> <span>&nbsp;&nbsp;</span>Firma:</span><span>&nbsp;&nbsp;</span>{this.state.selectedClient?.companyFullName === null ? 'brak danych' : this.state.selectedClient?.companyFullName}
                                            </label>
                                        </Col>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                {this.state.selectedClient?.companyShortName === null ? '' : this.state.selectedClient?.companyShortName}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: -10 }}>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{ color: '#50ee9c' }}>NIP: </span>{this.state.selectedClient?.nip === null ? 'brak danych' : this.state.selectedClient?.nip}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: -10 }}>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{ color: '#50ee9c' }}><HiOutlineOfficeBuilding /><span>&nbsp;&nbsp;</span>Adres:</span><span>&nbsp;&nbsp;</span>{this.state.selectedClient?.streetName} {this.state.selectedClient?.city} {this.state.selectedClient?.zipCode}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: -10 }}>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{ color: '#50ee9c' }}> <AiFillPhone /><span>&nbsp;&nbsp;</span>Nr. kontaktowy(1):<span>&nbsp;&nbsp;</span></span>{this.state.selectedClient?.contactPhoneNumber1}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: -10 }}>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{ color: '#50ee9c' }}><AiFillPhone /><span>&nbsp;&nbsp;</span>Nr. kontaktowy(2):<span>&nbsp;&nbsp;</span></span>{this.state.selectedClient?.contactPhoneNumber2}
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
                                        <div className='Orders-Header' style={{ fontSize: 20 }}>
                                            <FaWarehouse size='1.3em'/><span>&nbsp;&nbsp;</span><span>Magazyn</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <label className='Tile-Data-Label' style={{ fontSize: 18 }}>
                                            {this.state.selectedWarehouse?.name}
                                        </label>
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
                                        <label className='Tile-Data-Label' style={{ fontSize: 18 }}>Nie wybrano</label>
                                    </Col>
                                </Row>
                                }

                                {this.state.selectedWarehouse !== null &&
                                <div>
                                    <Row>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{color: '#50ee9c'}}>Adres: </span>{this.state.selectedWarehouse?.streetAddress} {this.state.selectedWarehouse?.zipCode} {this.state.selectedWarehouse?.city}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: -10 }}>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{color: '#50ee9c'}}>Dane osoby do kontaktu: </span>{this.state.selectedWarehouse?.contactPersonFirstName} {this.state.selectedWarehouse?.contactPersonLastName}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: -10 }}>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{color: '#50ee9c'}}>Nr. kontaktowy: </span>{this.state.selectedWarehouse?.contactPhoneNumber}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: -10 }}>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{color: '#50ee9c'}}>Adres email: </span>{this.state.selectedWarehouse?.mail}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: -10 }}>
                                        <Col>
                                            <label className='Tile-Data-Label'>
                                                <span style={{color: '#50ee9c'}}>Fax: </span>{this.state.selectedWarehouse?.fax}
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
                                        <div className='Orders-Header' style={{ fontSize: 20 }}>
                                            <MdLocationOn size='1.3em'/><span>&nbsp;&nbsp;</span><span>Adres dostawy</span>
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
                                                value={this.state.destinationStreetAddress}
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
                                                value={this.state.destinationZipCode}
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
                                                value={this.state.destinationCity}
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
                                                value={this.state.destinationCountry}
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
                                        <div className='Orders-Header' style={{ fontSize: 20 }}>
                                            <BiPackage size='1.3em'/><span>&nbsp;&nbsp;</span><span>Towary</span>
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
                                                                        className='Table-Icon'
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
                <Row style={{marginTop: '25px'}}>
                    <Col>
                        <div className='Order-Client-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className='Orders-Header' style={{ fontSize: 20 }}>
                                            <CgDetailsMore size='1.3em'/><span>&nbsp;&nbsp;</span><span>Szczegóły zamówienia</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className='Tile-Data-Label' style={{fontSize: '14px'}}>
                                            <FaWeightHanging size='1.3em'/><span>&nbsp;&nbsp;</span>Całkowita waga netto (kg):<span>&nbsp;&nbsp;</span><span style={{color: '#50ee9c'}}>{this.state.totalNetWeight}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className='Tile-Data-Label' style={{fontSize: '14px'}}>
                                            <FaWeight size='1.3em'/><span>&nbsp;&nbsp;</span>Całkowita waga brutto (kg):<span>&nbsp;&nbsp;</span><span style={{color: '#50ee9c'}}>{this.state.totalGrossWeight}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className='Tile-Data-Label' style={{fontSize: '14px'}}>
                                            <FaGlassWhiskey size='1.3em'/><span>&nbsp;&nbsp;</span>Całkowita objętość (LITR):<span>&nbsp;&nbsp;</span><span style={{color: '#50ee9c'}}>{this.state.totalVolume}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className='Tile-Data-Label' style={{fontSize: '14px'}}>
                                            <FaRegMoneyBillAlt size='1.3em'/><span>&nbsp;&nbsp;</span>Całkowita kwota netto (zł)<span>&nbsp;&nbsp;</span><span style={{color: '#50ee9c'}}>{this.state.netPrice}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className='Tile-Data-Label' style={{fontSize: '14px'}}>
                                            <FaRegMoneyBillAlt size='1.3em'/><span>&nbsp;&nbsp;</span>Całkowita kwota brutto (zł)<span>&nbsp;&nbsp;</span><span style={{color: '#50ee9c'}}>
                                            {this.state.grossPrice} </span>
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
                                                style={ {width: '450px', color: '#5CDB95'}}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date'
                                                }}
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
                                        <div className='Orders-Header' style={{ fontSize: 20 }}>
                                            <BiMessageAdd size='1.3em'/><span>&nbsp;&nbsp;</span><span>Dodatkowe informacje</span>
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
                                                value={this.state.customerAdditionalInstructions}
                                                onChange={this.handleChange('customerAdditionalInstructions')}
                                                style={{minWidth: '450px'}}
                                                InputLabelProps={{
                                                    style:{
                                                        color: 'whitesmoke'
                                                    },
                                                }}
                                                InputProps={{
                                                    style: {
                                                        color: 'whitesmoke'
                                                    },
                                                }} />
                                        </FormControl>
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
                                        <div className='Orders-Header' style={{ fontSize: 20 }}>
                                            <CgDetailsMore size='1.3em'/><span>&nbsp;&nbsp;</span><span>Weryfikacja</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className='Tile-Data-Label' style={{fontSize: '14px'}}>
                                            <MdVerifiedUser size='1.3em'/><span>&nbsp;&nbsp;</span>Klient zweryfikowany<span>&nbsp;&nbsp;</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <Checkbox 
                                            color='primary'
                                            inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                                            checked={this.state.isClientVerified}
                                            onChange={this.handleChange('isClientVerified')}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className='Tile-Data-Label' style={{fontSize: '14px'}}>
                                            <MdEventAvailable size='1.3em'/><span>&nbsp;&nbsp;</span>Towary dostępne w magazynie<span>&nbsp;&nbsp;</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <Checkbox 
                                            color='primary'
                                            inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                                            checked={this.state.isAvailableAtWarehouse}
                                            onChange={this.handleChange('isAvailableAtWarehouse')}/>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                    <Row style={{ marginTop: 25, paddingBottom: 15 }}>
                        <Col>
                            <div className='Order-Client-Tile'>
                                <Container>
                                    <Row>
                                        <Col>
                                            <div className='Orders-Header' style={{ fontSize: 20 }}>
                                                <BiMessageAdd size='1.3em'/><span>&nbsp;&nbsp;</span><span>Szczegóły trasy</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: 10 }}>
                                        <Col>
                                            <Container>
                                                <Row>
                                                    <Col>
                                                        <label className='Tile-Data-Label' style={{fontSize: 16 , color: '#50ee9c'}}>Transport z:</label>
                                                    </Col>
                                                </Row>
                                                <Row style={{ marginTop: -5 }}>
                                                    <Col>
                                                        <label className='Tile-Data-Label' style={{ fontSize: 16 }}>{this.state.selectedWarehouse?.name}</label>
                                                    </Col>
                                                </Row>
                                                <Row style={{ marginTop: -10}}>
                                                    <Col>
                                                        <div className='Tile-Data-Label' style={{ fontSize: 16 }}>
                                                            {this.state.selectedWarehouse?.streetAddress}<span>&nbsp;&nbsp;</span>{this.state.selectedWarehouse?.zipCode}<span>&nbsp;&nbsp;</span>{this.state.selectedWarehouse?.city}
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Col>
                                        <Col>
                                            <Container>
                                                <Row>
                                                    <Col>
                                                        <label className='Tile-Data-Label' style={{ fontSize: 16, color: '#50ee9c' }}>Transport do:</label>
                                                    </Col>
                                                </Row>
                                                <Row style={{ marginTop: -5 }}>
                                                    <Col>
                                                        <label className='Tile-Data-Label' style={{ fontSize: 16 }}>{this.state.order?.client?.clientFirstName} {this.state.order?.client?.clientLastName}</label>
                                                    </Col>
                                                </Row>
                                                <Row style={{ marginTop: -10 }}>
                                                    <Col>
                                                        <div className='Tile-Data-Label' style={{ fontSize: 16 }}>
                                                            {this.state.destinationStreetAddress}<span>&nbsp;&nbsp;</span>{this.state.destinationZipCode}<span>&nbsp;&nbsp;</span>{this.state.destinationCity}
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: 15, paddingLeft: 15 }}>
                                        <Col>
                                            <label className='Tile-Data-Label' style={{fontSize: 18, color: '#50ee9c'}}>Optymalna trasa</label>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingLeft: 20 }}>
                                        <Col>
                                            <FormControl  noValidate autoComplete="off">
                                                <TextField 
                                                    id="optimalRouteDistance" 
                                                    label={
                                                        <div>
                                                            <GiPathDistance /><span>&nbsp;&nbsp;</span><span>Dystans (km)</span>
                                                        </div>
                                                    }
                                                    color="primary"
                                                    onChange={this.handleChange('transportDistance')}
                                                    value={this.state.transportDistance}
                                                    style={{minWidth: '350px'}}
                                                    type='number'
                                                    InputLabelProps={{
                                                        style:{
                                                            color: 'whitesmoke'
                                                        },
                                                    }}
                                                    InputProps={{
                                                        inputProps: { min: 0, max: 999999999 },
                                                        style: {
                                                            color: '#5c8bdb'
                                                        },
                                                    }} />
                                            </FormControl>
                                        </Col>
                                        {this.state.token.role === 'Forwarder' &&
                                        <Col>
                                            <FormControl  noValidate autoComplete="off">
                                                <TextField 
                                                    id="optimalRouteDistance" 
                                                    label={
                                                        <div>
                                                            <FaCloudscale /><span>&nbsp;&nbsp;</span><span>Stawka</span>
                                                        </div>
                                                    }
                                                    color="primary"
                                                    onChange={this.handleChange('rate')}
                                                    value={this.state.rate}
                                                    type='number'
                                                    style={{minWidth: '350px'}}
                                                    InputLabelProps={{
                                                        style:{
                                                            color: 'whitesmoke'
                                                        },
                                                    }}
                                                    InputProps={{
                                                        inputProps: { min: 0, max: 999999999 },
                                                        style: {
                                                            color: '#5c8bdb'
                                                        },
                                                    }} />
                                            </FormControl>
                                        </Col>
                                        }
                                        
                                    </Row>
                                    {this.state.token.role === 'Forwarder' &&
                                     <Row style={{ paddingLeft: 20, marginTop: 10 }}>
                                        <Col>
                                            <div className='Tile-Data-Label' style={{fontSize: '14px'}}>
                                                <FaRegMoneyBillAlt size='1.3em'/><span>&nbsp;&nbsp;</span>Nowa kwota netto (zł)<span>&nbsp;&nbsp;</span><span style={{color: '#f75353'}}>
                                                    {((parseFloat(this.state.totalGrossWeight) + parseFloat(this.state.totalVolume)) * this.state.transportDistance * this.state.rate).toFixed(2)}
                                                </span>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className='Tile-Data-Label' style={{fontSize: '14px'}}>
                                                <FaRegMoneyBillAlt size='1.3em'/><span>&nbsp;&nbsp;</span>Nowa kwota brutto (zł)<span>&nbsp;&nbsp;</span><span style={{color: '#f75353'}}>
                                                    {((parseFloat(this.state.totalGrossWeight) + parseFloat(this.state.totalVolume)) * this.state.transportDistance * this.state.rate * 1.23).toFixed(2)}
                                                </span>
                                            </div>
                                        </Col>
                                    </Row> 
                                    }
                                    <Row style={{ paddingLeft: 20, marginTop: 15 }}>
                                        <Col>
                                            <FormControl>
                                                <InputLabel id="genderLabel">
                                                    <RiTruckLine size='1.3em'/><span>&nbsp;&nbsp;</span>Rodzaj pojazdu
                                                </InputLabel>
                                                    <Select
                                                        id="selectUserGender"
                                                        color="primary"
                                                        value={this.state.selectedVehicleTypeId}
                                                        style={{width: '300px'}}
                                                        InputLabelProps={{
                                                            style:{
                                                                color: 'whitesmoke'
                                                            },
                                                        }}
                                                        onChange={this.handleChange('selectedVehicleTypeId')}>
                                                            {this.state.vehicleTypes.map((vehicleType) => (
                                                                <MenuItem key={vehicleType.id} value={vehicleType.id}>{vehicleType.typeName}</MenuItem>
                                                            ))}
                                                    </Select>
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
                                        {this.state.selectedPopup === 'addConsultant' ? 'Wybierz konsultanta spedycji' : 'Wybierz magazyn'}
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
                                    columns: this.state.selectedPopup === 'addConsultant' ? forwardersColumns : warehousesColumns,
                                    rows: this.state.selectedPopup === 'addConsultant' ? 

                                        this.state.forwarders.map((forwarder) => (
                                            {
                                                firstName: forwarder.firstName,
                                                lastName: forwarder.lastName,
                                                login: forwarder.login,
                                                mail: forwarder.mail,
                                                select: <ImCheckboxChecked 
                                                            className='Select-On-Popup' 
                                                            size='1.5em'
                                                            onClick={() => {
                                                                this.handleSelectedConsultant(forwarder)
                                                                close()
                                                            }}/>
                                                }
                                            ))
                                        :
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
                                    <label className='Orders-Header' style={{ fontSize: 20 }}>
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
                                            type='number'
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: 'whitesmoke'
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
                                                    color: 'whitesmoke'
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
                                                    color: 'whitesmoke'
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
                                                    color: 'whitesmoke'
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
                                                    color: 'whitesmoke'
                                                },
                                            }} 
                                        />
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '30px'}}>
                                <Col>
                                    <label className='Tile-Data-Label'>
                                        <span style={{ color: '#50ee9c', fontSize: 16 }}>Waga netto (kg): </span>
                                        <span style={{ fontSize: 16 }}>{this.state.addLoadAmount * this.state.addLoadWeight}</span>
                                    </label>
                                </Col>
                                <Col>
                                    <label className='Tile-Data-Label'>
                                        <span style={{ color: '#50ee9c', fontSize: 16 }}>Waga brutto (kg): </span>
                                        <span style={{ fontSize: 16 }}>{this.state.addLoadAmount * this.state.addLoadWeight + parseInt(this.state.newLoadPackageWeight)}</span>
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
                                        <label className='Edit-User-Modal-Header'>Czy napewno chcesz zaktualizować zamówienie?</label>
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
                                                this.updateOrder()
                                                close()
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
                                        {this.state.isOk &&
                                        
                                        <NavLink className='Add-User-Nav-Link' to={{
                                            pathname: this.state.token.role === 'Orderer' ? '/pracownik-zamowien/zamowienia'
                                            : '/spedytor/konsultacje-spedycji'
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
                                        }
                                        {!this.state.isOk &&
                                            <Button 
                                                className="Orders-Button" 
                                                variant="light"
                                                onClick={() => {
                                                    close();
                                                }}>
                                                Ok
                                            </Button>
                                        }
                                    </Col>
                                </Row>
                            </Container>
                        )
                    }
                </Popup>
                <Popup 
                    modal
                    open={this.state.isCreateForwardingOrderModalOpen}
                    onClose={this.handleCloseCreateForwardingOrderModal}
                    contentStyle={{
                        width: '50vw',
                        height: '55vh',
                        backgroundColor: '#202125',
                        borderColor: '#202125',
                        borderRadius: '15px',
                    }}>
                    {
                        close => (
                            <Container>
                                <Row style={{textAlign: 'center'}}>
                                    <Col>
                                        <label className='Edit-User-Modal-Header'>Tworzenie zlecenia spedycji</label>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 25, textAlign: 'center' }}>
                                    <Col xs>
                                        <label className='Tile-Data-Label' style={{ fontSize: 14 }}>Przypisz konsultanta jako spedytora</label>
                                    </Col>
                                    <Col>
                                        <Checkbox 
                                            inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                                            checked={this.state.selectConsultantAsForwarder}
                                            onChange={this.handleChange('selectConsultantAsForwarder')}
                                            />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 25, textAlign: 'center', paddingLeft: 60 }}>
                                    <Col>
                                        <FormControl  noValidate autoComplete="off">
                                            <TextField
                                                id="additionalInformation" 
                                                multiline
                                                rowsMax={6}
                                                placeholder='Dodatkowe informacje...'
                                                color="primary"
                                                onChange={this.handleChange('additionalInformation')}
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
                                    <Col>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 50, textAlign: 'center' }}>
                                    <Col>
                                        <Button 
                                            className="Orders-Button" 
                                            variant="light"
                                            onClick={() => {
                                                this.createForwardingOrder()
                                                close()
                                            }}>Utwórz
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        )
                    }
                </Popup>
                <Popup 
                    modal
                    open={this.state.isAssignForwardingOrderModalOpen}
                    onClose={this.handleCloseAssignForwardingOrderModal}
                    contentStyle={{
                        width: '55vw',
                        height: '75vh',
                        backgroundColor: '#202125',
                        borderColor: '#202125',
                        borderRadius: '15px',
                    }}>
                    {
                        close => (
                            <Container>
                                <Row style={{textAlign: 'center'}}>
                                    <Col>
                                        <label className='Edit-User-Modal-Header'>Przypisz zamówienie do istniejącego zlecenia spedycji</label>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 25 }}>
                                    <Col>
                                        <MDBDataTable
                                            className='Customers-Data-Table'
                                            style={{ color: '#bdbbbb' }}
                                            maxHeight="35vh"
                                            scrollY
                                            small
                                            data={{
                                                columns: forwardingOrdersColumns,
                                                rows:
                                                    this.state.forwardingOrders.map((forwardingOrder) => (
                                                        {
                                                            forwardingOrderNumber: forwardingOrder.forwardingOrderNumber,
                                                            createDate: forwardingOrder.createDate,
                                                            forwarder: forwardingOrder.forwarder?.firstName + ' ' + forwardingOrder.forwarder?.lastName,
                                                            contactPhoneNumber: forwardingOrder.constactPhoneNumber,
                                                            select: 
                                                                <ImCheckboxChecked
                                                                    className='Transporter-Details-Icon' 
                                                                    onClick={this.handleSelectedAssignedForwardingOrder.bind(this, forwardingOrder)}
                                                                    size='1.4em'/>,
                                                        }
                                                    ))
                                            }}
                                        />
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
export default EditOrderPanel;

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

const forwardersColumns = 
[
    {
        label: 'Imię',
        field: 'firstName',
        sort: 'asc',
        width: 250,
    },
    {
        label: 'Nazwisko',
        field: 'lastName',
        sort: 'asc',
        width: 250
    },
    {
        label: 'Login',
        field: 'login',
        sort: 'asc',
        width: 250
    },
    {
        label: 'Adres email',
        field: 'mail',
        sort: 'asc',
        width: 250
    },
    {
        label: '',
        field: 'select',
        sort: 'asc',
        width: 250
    }
]

const forwardingOrdersColumns = 
[
    {
        label: 'Nr. zlecenia',
        field: 'forwardingOrderNumber',
        sort: 'asc',
        width: '250'
    },
    {
        label: 'Data utworzenia',
        field: 'createDate',
        sort: 'asc',
        width: '250'
    },
    {
        label: 'Spedytor',
        field: 'forwarder',
        sort: 'asc',
        width: '250'
    },
    {
        label: 'Nr. kontaktowy',
        field: 'contactPhoneNumber',
        sort: 'asc',
        width: '250'
    },
    {
        label: '',
        field: 'select',
        sort: 'asc'
    }
]