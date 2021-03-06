import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { CgNotes, CgFileDocument, CgGym } from 'react-icons/cg';
import { RiUserVoiceFill, RiDeleteBin6Line, RiTruckFill } from 'react-icons/ri';
import { BiTask, BiCalendar, BiShowAlt, BiPackage } from 'react-icons/bi';
import { FaWeightHanging, FaWeight, FaGlassWhiskey, FaWarehouse, FaMapMarkerAlt, FaMapMarker, FaFlagUsa, FaRegMoneyBillAlt, FaTruckMoving } from 'react-icons/fa';
import { MdShowChart, MdAdd, MdEdit, MdDone, MdLocationCity, MdLocalPostOffice, MdAssignmentTurnedIn } from 'react-icons/md';
import { ImCheckboxChecked } from 'react-icons/im';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { AiOutlineCar, AiOutlineUser } from 'react-icons/ai';
import { GiPathDistance, GiFullMotorcycleHelmet } from 'react-icons/gi';
import { SiStatuspage } from 'react-icons/si';
import { Tooltip, FormControl, TextField, InputLabel, Select, MenuItem } from '@material-ui/core';
import { FiChevronDown, FiChevronUp, FiMap } from 'react-icons/fi';
import { getSessionCookie } from '../../sessions';
import { MDBDataTable } from 'mdbreact';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import './EditForwardingOrderPanel.css';

class EditForwardingOrderPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: getSessionCookie(),
            forwardingOrder: '',
            additionalDescription: '',
            ordersByForwardingOrder: [],
            ordersByForwardingOrderQuantity: '',
            allLoads: [],
            allLoadsQuantity: '',

            orderStatuses: [],
            newOrderStatusIdForOrder: '',

            events: [],
            eventsQuantity: 0,

            transits: [],
            transitsQuantity: 0,

            existingTransits: [],

            transporters: [],
            newTransitSelectedTransporter: '',

            drivers: [],
            newTransitSelectedDriver: '',

            vehicles: [],
            newTransitSelectedVehicle: '',

            paymentForms: [],
            newTransitSelectedPaymentFormId: '',

            newTransitRouteShortPath: '',
            newTransitStartDate: '',
            newTransitEndDate: '',
            newTransitNetPrice: '',
            newTransitGrossPrice: '',
            newTransitSourceStreetAddress: '',
            newTransitSourceZipCode: '',
            newTransitSourceCity: '',
            newTransitSourceCountry: '',
            newTransitDestinationStreetAddress: '',
            newTransitDestinationZipCode: '',
            newTransitDestinationCity: '',
            newTransitDestinationCountry: '',
            newTransitTransportDistance: '',

            newTransitTransportDistanceIsValid: true,
            newTransitTransportDistanceHelperText: '',
            newTransitNetPriceIsValid: true,
            newTransitNetPriceHelperText: '',
            newTransitGrossPriceIsValid: true,
            newTransitGrossPriceHelperText: '',

            selectedOrder: '',
            formatDate: '',

            newEventName: '',
            newEventStartTime: '',
            newEventEndTime: '',
            newEventContactPersonFirstName: '',
            newEventContactPersonLastName: '',
            newEventContactPersonPhoneNumber: '',
            newEventPlace: '',
            newEventStreetAddress: '',
            newEventOtherInformation: '',
            newEventForwardingOrderId: '',

            newEventNameIsValid: true,
            newEventNameHelperText: '',
            newEventPlaceIsValid: true,
            newEventPlaceHelperText: '',
            newEventStreetAddressIsValid: true,
            newEventStreetAddressHelperText: '',

            isOrdersTableVisible: false,
            isAllLoadsVisible: false,
            isAddEventModalOpen: false,
            isEditAdditionalDescriptionModalOpen: false,
            isAddTransitModalOpen: false,
            isAddTransitModalTransportersTableVisible: false,
            isAddTransitModalDriversTableVisible: false,
            isAddTransitModalVehiclesTableVisible: false,
            isAddExistingTransitModalOpen: false,

            serverResponseMessage: '',
            isServerResponseModalOpen: false
        }
    }

    // handle visibility of orders table
    handleOrdersTableVisibility = () => this.setState({ isOrdersTableVisible: !this.state.isOrdersTableVisible })

    // handle visibility of all loads
    handleAllLoadsVisibility = () => this.setState({ isAllLoadsVisible: !this.state.isAllLoadsVisible })

    // handle selected order
    handleSelectedOrder = (order) => this.setState({ selectedOrder: order })

    // handle change generic
    handleChange = (name) => (event) => this.setState({ [name]: event.target.value })

    handleStartDateChange = (event) => this.setState({ newTransitStartDate: event.target.value })
    handleEndDateChange = (event) => this.setState({ newTransitEndDate: event.target.value })

    // handle dates
    handleEventStartTimeChange = (event) => this.setState({ newEventStartTime: event.target.value })
    handleEventEndTimeChange = (event) => this.setState({ newEventEndTime: event.target.value })

    // handle open/close add event modal
    handleAddEventModal = () => this.setState({ 
        isAddEventModalOpen: !this.state.isAddEventModalOpen,
        newEventNameIsValid: true,
        newEventNameHelperText: '',
        newEventPlaceIsValid: true,
        newEventPlaceHelperText: '',
        newEventStreetAddressIsValid: true,
        newEventStreetAddressHelperText: ''
     })

    // handle open/close add transit modal
    handleOpenAddTransitModal = () => this.setState({ isAddTransitModalOpen: true })

    handleCloseAddTransitModal = () => this.setState({
        isAddTransitModalOpen: false,
        newTransitRouteShortPath: '',
        newTransitStartDate: '',
        newTransitEndDate: '',
        newTransitNetPrice: '',
        newTransitGrossPrice: '',
        newTransitSourceStreetAddress: '',
        newTransitSourceZipCode: '',
        newTransitSourceCity: '',
        newTransitSourceCountry: '',
        newTransitDestinationStreetAddress: '',
        newTransitDestinationZipCode: '',
        newTransitDestinationCity: '',
        newTransitDestinationCountry: '',
        newTransitTransportDistance: '',
        newTransitNetPriceIsValid: true,
        newTransitNetPriceHelperText: '',
        newTransitGrossPriceIsValid: true,
        newTransitGrossPriceHelperText: '',
        newTransitTransportDistanceIsValid: true,
        newTransitTransportDistanceHelperText: ''
     })

    // handle visibility of add transit modal tables
    handleAddTransitModalTransportersTableVisibility = () => this.setState({ isAddTransitModalTransportersTableVisible: !this.state.isAddTransitModalTransportersTableVisible })
    handleAddTransitModalDriversTableVisibility = () => this.setState({ isAddTransitModalDriversTableVisible: !this.state.isAddTransitModalDriversTableVisible })
    handleAddTransitModalVehiclesTableVisibility = () => this.setState({ isAddTransitModalVehiclesTableVisible: !this.state.isAddTransitModalVehiclesTableVisible })

    // handle selected transporter / driver / vehicle / payment form for new transit
    handleSelectedTransporterForNewTransit = (transporter) => {
        this.setState({ 
            newTransitSelectedTransporter: transporter, 
            isAddTransitModalTransportersTableVisible: false,
            newTransitSelectedDriver: '',
            newTransitSelectedVehicle: ''
         })
    }
    handleSelectedDriverForNewTransit = (driver) => this.setState({ newTransitSelectedDriver: driver, isAddTransitModalDriversTableVisible: false })
    handleSelectedVehicleForNewTransit = (vehicle) => this.setState({ newTransitSelectedVehicle: vehicle, isAddTransitModalVehiclesTableVisible: false })
    handleSelectedPaymentFormIdForNewTransit = (event) => this.setState({ newTransitSelectedPaymentFormId: event.target.value }) 

    handleSelectedExistingTransitToForwardingOrder = (transit) => {
        var _transits = this.state.transits

        _transits.push({
            'id': transit.id,
            'routeShortPath': transit.routeShortPath,
            'netPrice': transit.netPrice,
            'grossPrice': transit.grossPrice,
            'startDate': transit.startDate,
            'endDate': transit.endDate,
            'transitSourceStreetAddress': transit.transitSourceStreetAddress,
            'transitSourceZipCode': transit.transitSourceZipCode,
            'transitSourceCity': transit.transitSourceCity,
            'transitSourceCountry': transit.transitSourceCountry,
            'transitDestinationStreetAddress': transit.transitDestinationStreetAddress,
            'transitDestinationZipCode': transit.transitDestinationZipCode,
            'transitDestinationCity': transit.transitDestinationCity,
            'transitDestinationCountry': transit.transitDestinationCountry,
            'transportDistance': transit.transportDistance,
            'paymentFormId': transit.paymentFormId,
            'transporter': transit.transporter,
            'vehicle': transit.vehicle,
            'driver': transit.driver
        })

        this.setState({
            transits: _transits,
            transitsQuantity: _transits.length,
            isAddExistingTransitModalOpen: false
        })
    }

    // handle open edit additional description modal
    handleOpenEditAdditionalDescriptionModal = () => this.setState({ isEditAdditionalDescriptionModalOpen: true })

    // handle close edit additional description modal
    handleCloseEditAdditionalDescriptionModal = () => this.setState({ isEditAdditionalDescriptionModalOpen: false })

    // handle open / close existing transit modal
    handleOpenAddExistingTransitModal = () => this.setState({ isAddExistingTransitModalOpen: true })
    handleCloseAddExistingTransitModal = () => this.setState({ isAddExistingTransitModalOpen: false })

    // handle close server response modal
    handleOpenServerResponseModal = () => this.setState({ isServerResponseModalOpen: true })

    // handle close server response modal
    handleCloseServerResponseModal = () => this.setState({ isServerResponseModalOpen: false })

    // handle open order status of order modal
    handleOpenChangeOrderStatusModal = (order) => this.setState({ isChangeOrderStatusModalOpen: true, newOrderStatusIdForOrder: order.orderStatusId, selectedOrder: order })
    handleCloseChangeOrderStatusModal = () => this.setState({ isChangeOrderStatusModalOpen: false })

    // handle save button
    handleSaveButton = () => {
        this.addOrUpdateEvents()
    }

    addEvent = () => {
        var _events = this.state.events
        var len = _events.length
        var newId = len === 0 ? 1 : _events[len-1].id+1
        _events.push({
            'id': newId,
            'eventName': this.state.newEventName,
            'eventStartTime': this.state.newEventStartTime,
            'eventEndTime': this.state.newEventEndTime,
            'contactPersonFirstName': this.state.newEventContactPersonFirstName,
            'contactPersonLastName': this.state.newEventContactPersonLastName,
            'contactPersonPhoneNumber': this.state.newEventContactPersonPhoneNumber,
            'eventPlace': this.state.newEventPlace,
            'eventStreetAddress': this.state.newEventStreetAddress,
            'forwardingOrderId': 0
        })

        this.setState({
            events: _events,
            eventsQuantity: _events.length,
            newEventPlaceIsValid: true,
            newEventPlaceHelperText: '',
            newEventStreetAddressIsValid: true,
            newEventStreetAddressHelperText: '',
            newEventNameIsValid: true,
            newEventNameHelperText: '',
            newEventName: '',
            newEventStartTime: '',
            newEventEndTime: '',
            newEventContactPersonFirstName: '',
            newEventContactPersonLastName: '',
            newEventContactPersonPhoneNumber: '',
            newEventPlace: '',
            newEventStreetAddress: ''
        })
    }

    removeEvent = (event) => {
        var _events = this.state.events.filter(x => x.id !== event.id );
        var len = _events.length
        this.setState({ events: _events, eventsQuantity: len })
    }

    addTransit = () => {
        var _transits = this.state.transits
        var len = _transits.length
        var newId = len === 0 ? 1 : _transits[len-1].id+1
        _transits.push({
            'id': newId,
            'routeShortPath': this.state.newTransitRouteShortPath,
            'netPrice': this.state.newTransitNetPrice,
            'grossPrice': this.state.newTransitGrossPrice,
            'startDate': this.state.newTransitStartDate,
            'endDate': this.state.newTransitEndDate,
            'transitSourceStreetAddress': this.state.newTransitSourceStreetAddress,
            'transitSourceZipCode': this.state.newTransitSourceZipCode,
            'transitSourceCity': this.state.newTransitSourceCity,
            'transitSourceCountry': this.state.newTransitSourceCountry,
            'transitDestinationStreetAddress': this.state.newTransitDestinationStreetAddress,
            'transitDestinationZipCode': this.state.newTransitDestinationZipCode,
            'transitDestinationCity': this.state.newTransitDestinationCity,
            'transitDestinationCountry': this.state.newTransitDestinationCountry,
            'transportDistance': this.state.newTransitTransportDistance,
            'paymentFormId': this.state.newTransitSelectedPaymentFormId,
            'transporter': this.state.newTransitSelectedTransporter,
            'vehicle': this.state.newTransitSelectedVehicle,
            'driver': this.state.newTransitSelectedDriver,
            'isNew': 1
        })

        this.setState({
            transits: _transits,
            transitsQuantity: _transits.length,
            newTransitRouteShortPath: '',
            newTransitNetPrice: '',
            newTransitStartDate: null,
            newTransitEndDate: null,
            newTransitSourceStreetAddress: '',
            newTransitSourceCity: '',
            newTransitSourceZipCode: '',
            newTransitSourceCountry: '',
            newTransitDestinationStreetAddress: '',
            newTransitDestinationCity: '',
            newTransitDestinationZipCode: '',
            newTransitDestinationCountry: '',
            newTransitTransportDistance: '',
            newTransitSelectedPaymentFormId: this.state.paymentForms[0]?.id,
            newTransitSelectedTransporter: '',
            newTransitSelectedDriver: '',
            newTransitSelectedVehicle: ''
        })
    }

    removeTransit = (transit) => {
        var _transits = this.state.transits.filter(x => x.id !== transit.id );
        var len = _transits.length
        this.setState({ transits: _transits, transitsQuantity: len })
    }

    // GET call to API to get forwardingOrder by id
    async getForwardingOrderById(forwardingOrderId){
        try
        {
            const response = await axios.get('https://localhost:44394/forwarding-orders/' + forwardingOrderId, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;

            var year = ''
            var day = ''
            var monthName = ''

            if(data.createDate !== null){
                let onlyDate = data.createDate?.split('T')
                let arr = onlyDate[0].split('-')

                year = arr[0]
                let monthNumber = arr[1]
                monthName = monthNames[monthNumber]
                day = arr[2]
            }

            this.setState({ 
                forwardingOrder: data,
                additionalDescription: data.additionalDescription,
                formatDate: day + ' ' + monthName + ' ' + year
             })
        }
        catch(error){
            console.log(error);
        }
    }

    // PUT call to API to update forwarding order by id
    async updateForwardingOrderById(){
        try
        {
            const response = await axios.put('https://localhost:44394/forwarding-orders/' + this.state.forwardingOrder?.id,
            {
                'forwardingOrderNumber': this.state.forwardingOrder?.forwardingOrderNumber,
                'createDate': this.state.forwardingOrder?.createDate,
                'forwarderId': this.state.forwardingOrder?.forwarderId,
                'additionalDescription': this.state.additionalDescription
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            this.setState({ isServerResponseModalOpen: true, serverResponseMessage: response.data.message })
            await this.getForwardingOrderById(this.state.forwardingOrder?.id)

        }
        catch(error){
            if(error.response){
                if(error.response.data.message === undefined){
                    this.setState({
                        serverResponseMessage: "Podano niepoprawne dane dodatkowe zlecenia",
                        isServerResponseModalOpen: true
                    })
                }
                else{
                    this.setState({
                        serverResponseMessage: error.response.data.message,
                        isServerResponseModalOpen: true
                    })
                }
            }
            console.log(error);
        }
    }

    // GET call to API to get orders by forwarding order
    async getOrdersByForwardingOrder(forwardingOrderId){
        try
        {
            const response = await axios.get('https://localhost:44394/orders/forwarding-orders/' + forwardingOrderId, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
            
            if(data.length === 0) {
                this.setState({ ordersByForwardingOrder: [], ordersByForwardingOrderQuantity: 0 })
                return
            }

            this.setState({ ordersByForwardingOrder: data, ordersByForwardingOrderQuantity: data.length })
        }
        catch(error){
            console.log(error);
        }
    }

    // POST call to API, which returns all loads from all orders
    async getAllLoads(){
        var orderIds = []
        this.state.ordersByForwardingOrder.forEach(element => {
            orderIds.push(element.id)
        });

        if(orderIds.length === 0) return;

        try
        {
            const response = await axios.post('https://localhost:44394/loads/orders',
            {
               "orderIds": orderIds
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                },
                
            })

            const data = await response.data
            if(data.length === 0){
                this.setState({ allLoads: [], allLoadsQuantity: 0 })
                return
            }

            this.setState({ allLoads: data, allLoadsQuantity: data.length })
        }
        catch(error){
            console.log(error)
        }
    }

    // GET call to API to get all transporters
    async getTransporters(){
        try
        {
            const response = await axios.get('https://localhost:44394/transporters',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                },
                
            })

            const data = await response.data
            data.length === 0 ? this.setState({ transporters: [] }) : this.setState({ transporters: data })
        }
        catch(error){
            console.log(error)
        }
    }

    // GET call to API to get all drivers
    async getDrivers(){
        try
        {
            const response = await axios.get('https://localhost:44394/drivers',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                },
                
            })

            const data = await response.data
            data.length === 0 ? this.setState({ drivers: [] }) : this.setState({ drivers: data })
        }
        catch(error){
            console.log(error)
        }
    }

    // GET call to API to get all vehicles
    async getVehicles(){
        try
        {
            const response = await axios.get('https://localhost:44394/vehicles',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                },
                
            })

            const data = await response.data
            data.length === 0 ? this.setState({ vehicles: [] }) : this.setState({ vehicles: data })
        }
        catch(error){
            console.log(error)
        }
    }

    // GET call to API to get all payment forms
    async getPaymentForms(){
        try
        {
            const response = await axios.get('https://localhost:44394/payment-forms',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                },
            })

            const data = await response.data
            data.length === 0 ? this.setState({ paymentForms: [], newTransitSelectedPaymentFormId: '' }) : this.setState({ paymentForms: data, newTransitSelectedPaymentFormId: data[0]?.id })
        }
        catch(error){
            console.log(error)
        }
    }

    // GET call to API to get order statuses
    async getOrderStatuses(){
        try
        {
            const response = await axios.get('https://localhost:44394/order-statuses',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                },
            })

            const data = await response.data
            data.length === 0 ? this.setState({ orderStatuses: [] }) : this.setState({ orderStatuses: data })
        }
        catch(error){
            console.log(error)
        }
    }

    // GET call to API to get events by forwarding order id
    async getEventsByForwardingOrder(forwardingOrderId){
        try
        {
            const response = await axios.get('https://localhost:44394/events/forwarding-orders/' + forwardingOrderId, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            })

            const data = await response.data
            if(data.length === 0){
                this.setState({ events: [], eventsQuantity: 0 })
                return
            }

            this.setState({ events: data, eventsQuantity: data.length })
        }
        catch(error){
            console.log(error);
        }
    }

    // GET call to API to get all transits by forwarding order
    async getTransitsByForwardingOrder(forwardingOrderId){
        try
        {
            const response = await axios.get('https://localhost:44394/transits/forwarding-orders/' + forwardingOrderId, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            })

            const data = await response.data
            if(data.length === 0){
                this.setState({ transits: [], transitsQuantity: 0 })
                return
            }

            this.setState({ transits: data, transitsQuantity: data.length })
        }
        catch(error){
            console.log(error);
        }
    }

    // GET call to API to get all existing transits
    async getExistingTransits(){
        try
        {
            const response = await axios.get('https://localhost:44394/transits',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                },
            })

            const data = await response.data
            data.length === 0 ? this.setState({ existingTransits: [] }) : this.setState({ existingTransits: data })
        }
        catch(error){
            console.log(error)
        }
    }

    // PUT call to API to add or update events
    async addOrUpdateEvents(){
        try
        {
            var newOrUpdatedEvents = [];
            this.state.events.map(x => {
                if(x.forwardingOrderId === 0){
                    newOrUpdatedEvents.push({
                        'eventName': x.eventName,
                        'eventStartTime': x.eventStartTime,
                        'eventEndTime': x.eventEndTime,
                        'contactPersonFirstName': x.contactPersonFirstName,
                        'contactPersonLastName': x.contactPersonLastName,
                        'contactPersonPhoneNumber': x.contactPersonPhoneNumber,
                        'eventPlace': x.eventPlace,
                        'eventStreetAddress': x.eventStreetAddress,
                        'forwardingOrderId': this.state.forwardingOrder?.id
                    })
                    return
                }

                newOrUpdatedEvents.push({
                    'id': x.id,
                    'eventStartTime': x.eventStartTime,
                    'eventEndTime': x.eventEndTime,
                    'contactPersonFirstName': x.contactPersonFirstName,
                    'contactPersonLastName': x.contactPersonLastName,
                    'contactPersonPhoneNumber': x.contactPersonPhoneNumber,
                    'eventPlace': x.eventPlace,
                    'eventStreetAddress': x.eventStreetAddress,
                    'forwardingOrderId': x.forwardingOrderId
                })
            })

            const response = await axios.put('https://localhost:44394/events/' + this.state.forwardingOrder?.id,
            {
                'events': newOrUpdatedEvents
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                },
            })

            await this.addOrUpdateTransits()
        }
        catch(error){
            if(error.response){
                if(error.response.data.message === undefined){
                    this.setState({
                        serverResponseMessage: "Nie podano danych załadunku/rozładunku.",
                        isServerResponseModalOpen: true
                    })
                }
                else{
                    this.setState({
                        serverResponseMessage: error.response.data.message,
                        isServerResponseModalOpen: true
                    })
                }
            }
            console.log(error)
        }
    }

    // PUT call to API to add or update transits
    async addOrUpdateTransits(){
        try
        {
            var newOrUpdatedTransits = [];
            this.state.transits.map(x => {
                if(x.isNew !== null && x.isNew === 1){
                    newOrUpdatedTransits.push({
                        'routeShortPath': x.routeShortPath,
                        'netPrice': parseFloat(x.netPrice),
                        'startDate': x.startDate,
                        'endDate': x.endDate,
                        'grossPrice': parseFloat(x.grossPrice),
                        'transitSourceStreetAddress': x.transitSourceStreetAddress,
                        'transitSourceZipCode': x.transitSourceZipCode,
                        'transitSourceCity': x.transitSourceCity,
                        'transitSourceCountry': x.transitSourceCountry,
                        'transitDestinationStreetAddress': x.transitDestinationStreetAddress,
                        'transitDestinationZipCode': x.transitDestinationZipCode,
                        'transitDestinationCity': x.transitDestinationCity,
                        'transitDestinationCountry': x.transitDestinationCountry,
                        'transportDistance': parseFloat(x.transportDistance),
                        'paymentFormId': x.paymentFormId,
                        'transporterId': x.transporter?.id,
                        'vehicleId': x.vehicle?.id,
                        'driverId': x.driver?.id,
                    })
                    return
                }

                // for already existing
                newOrUpdatedTransits.push({
                        'id': x.id,
                        'routeShortPath': x.routeShortPath,
                        'netPrice': parseFloat(x.netPrice),
                        'startDate': x.startDate,
                        'endDate': x.endDate,
                        'grossPrice': parseFloat(x.grossPrice),
                        'transitSourceStreetAddress': x.transitSourceStreetAddress,
                        'transitSourceZipCode': x.transitSourceZipCode,
                        'transitSourceCity': x.transitSourceCity,
                        'transitSourceCountry': x.transitSourceCountry,
                        'transitDestinationStreetAddress': x.transitDestinationStreetAddress,
                        'transitDestinationZipCode': x.transitDestinationZipCode,
                        'transitDestinationCity': x.transitDestinationCity,
                        'transitDestinationCountry': x.transitDestinationCountry,
                        'transportDistance': parseFloat(x.transportDistance),
                        'paymentFormId': x.paymentFormId,
                        'transporterId': x.transporter?.id,
                        'vehicleId': x.vehicle?.id,
                        'driverId': x.driver?.id,
                })
            })

            const response = await axios.put('https://localhost:44394/transits/' + this.state.forwardingOrder?.id,
            {
                'transits': newOrUpdatedTransits
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                },
            })

            this.setState({ isServerResponseModalOpen: true, serverResponseMessage: "Zakutalizowano dane zlecenia spedycji." })
        }
        catch(error){
            if(error.response){
                if(error.response.data.message === undefined){
                    this.setState({
                        serverResponseMessage: "Nie podano danych przejazdów.",
                        isServerResponseModalOpen: true
                    })
                }
                else{
                    this.setState({
                        serverResponseMessage: error.response.data.message,
                        isServerResponseModalOpen: true
                    })
                }
            }
            console.log(error)
        }
    }

    // PUT call to API to update order status of order
    async updateOrderStatusOfOrder(){
        try
        {
            const response = await axios.put('https://localhost:44394/orders/' + this.state.selectedOrder?.id,
            {
                'orderCreationDate': this.state.selectedOrder?.orderCreationDate,
                'orderExpectedDate': this.state.selectedOrder?.orderExpectedDate,
                'orderRealizationDate': this.state.selectedOrder?.orderRealizationDate,
                'netPrice': this.state.selectedOrder?.netPrice,
                'grossPrice': this.state.selectedOrder?.grossPrice,
                'totalNetWeight': this.state.selectedOrder?.totalNetWeight,
                'totalGrossWeight': this.state.selectedOrder?.totalGrossWeight,
                'totalVolume': this.state.selectedOrder?.totalVolume,
                'transportDistance': this.state.selectedOrder?.transportDistance,
                'isClientVerified': this.state.selectedOrder?.isClientVerified,
                'isAvailableAtWarehouse': this.state.selectedOrder?.isAvailableAtWarehouse,
                'destinationStreetAddress': this.state.selectedOrder?.destinationStreetAddress,
                'destinationZipCode': this.state.selectedOrder?.destinationZipCode,
                'destinationCity': this.state.selectedOrder?.destinationCity,
                'destinationCountry': this.state.selectedOrder?.destinationCountry,
                'customerAdditionalInstructions': this.state.selectedOrder?.customerAdditionalInstructions,
                'clientId': this.state.selectedOrder?.clientId,
                'vehicleTypeId': this.state.selectedOrder?.vehicleTypeId,
                'ordererId': this.state.selectedOrder?.ordererId,
                'orderStatusId': this.state.newOrderStatusIdForOrder,
                'paymentFormId': this.state.selectedOrder?.paymentFormId,
                'warehouseId': this.state.selectedOrder?.warehouseId,
                'consultantId': this.state.selectedOrder?.consultantId,
                'forwardingOrderId': this.state.selectedOrder?.forwardingOrderId
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                },
            })

            await this.getOrdersByForwardingOrder(this.props.match.params.id)
            this.setState({ isServerResponseModalOpen: true, serverResponseMessage: response.data.message })
        }
        catch(error){
            if(error.response){
                if(error.response.data.message === undefined){
                    this.setState({
                        serverResponseMessage: "Nie podano danych zamówienia.",
                        isServerResponseModalOpen: true
                    })
                }
                else{
                    this.setState({
                        serverResponseMessage: error.response.data.message,
                        isServerResponseModalOpen: true
                    })
                }
            }
            console.log(error)
        }
    }

    async componentDidMount(){
        await this.getForwardingOrderById(this.props.match.params.id)
        await this.getOrdersByForwardingOrder(this.props.match.params.id)
        await this.getEventsByForwardingOrder(this.props.match.params.id)
        await this.getTransitsByForwardingOrder(this.props.match.params.id)
        await this.getTransporters()
        await this.getVehicles()
        await this.getDrivers()
        await this.getAllLoads()
        await this.getPaymentForms()
        await this.getOrderStatuses()
        await this.getExistingTransits()
    }

    render(){
        return(
            <Container>
                <Row style={{ marginTop: 50 }}>
                    <Col xs='4' style={{ minWidth: 350 }}>
                        <div className='Orders-Header'>Zlecenie spedycji</div>
                    </Col>
                    <Col xs='5'>
                        <div className='Orders-Header' style={{ fontSize: 22, paddingTop: 22, color: 'whitesmoke' }}>
                            <BiTask /><span>&nbsp;&nbsp;</span><span>{this.state.forwardingOrder?.forwardingOrderNumber === null ? 'brak' : this.state.forwardingOrder?.forwardingOrderNumber}</span>
                        </div>
                    </Col>
                    <Col style={{ minWidth: 120, marginTop: 10}}>
                        <NavLink className='Add-User-Nav-Link' to={{
                            pathname: '/spedytor/zlecenia' }}>
                                <Button 
                                    className="Orders-Button" 
                                    variant="light">
                                    Wróć
                                </Button>
                        </NavLink>
                    </Col>
                    <Col style={{ minWidth: 120, marginTop: 10}}>
                        <Button 
                            className="Orders-Button" 
                            variant="light"
                            onClick={this.handleSaveButton}>
                                Zapisz
                        </Button>
                    </Col>
                </Row>
                <Row style={{ marginTop: 25 }}>
                    <Col>
                        <div className='Orders-Sub-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 14 }}>
                                            <RiUserVoiceFill size='1.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Spedytor</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ textAlign: 'center' , marginTop: 10 }}>
                                    <Col>
                                        <div className='Orders-Stats-Number' style={{ fontSize: 18, color: 'whitesmoke' }}>
                                            <span>{this.state.forwardingOrder?.forwarder?.firstName}</span><span>&nbsp;</span><span>{this.state.forwardingOrder?.forwarder?.lastName}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col>
                        <div className='Orders-Sub-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 14 }}>
                                            <BiCalendar size='1.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Data utworzenia</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ textAlign: 'center', marginTop: 5 }}>
                                    <Col>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 18, color: 'whitesmoke' }}>
                                            {this.state.formatDate}
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col xs='6'>
                        <div className='Orders-Sub-Tile' style={{ maxWidth: 600 }}>
                            <Container>
                                <Row>
                                    <Col xs='9'>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 14 }}>
                                            <CgNotes size='1.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Dodatkowe informacje zlecenia</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <Button 
                                            className="Green-Button" 
                                            variant="light"
                                            onClick={this.handleOpenEditAdditionalDescriptionModal}>
                                                 <MdEdit size='1.0em'/><span>&nbsp;</span><span>Edytuj</span>
                                        </Button>
                                    </Col>
                                </Row>
                                <Row style={{ textAlign: 'center' }}>
                                    <Col>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 14, color: 'whitesmoke' }}>
                                            {this.state.forwardingOrder?.additionalDescription}
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: 15 }}>
                    <div className='Forwarding-Order-Show-Nav' onClick={this.handleOrdersTableVisibility}>
                        {!this.state.isOrdersTableVisible &&
                            <div>
                                <FiChevronDown size='1.0em' /><span>&nbsp;</span><span style={{ fontSize: 18 }}>Pokaż zamówienia</span>
                            </div>
                        }
                        {this.state.isOrdersTableVisible &&
                            <div>
                                <FiChevronUp size='1.0em' /><span>&nbsp;</span><span style={{ fontSize: 18 }}>Ukryj zamówienia</span>
                            </div>
                        }
                    </div>
                </Row>
                {this.state.isOrdersTableVisible &&
                <div>
                <Row style={{ marginTop: 5 }}>
                    <Col>
                        <div className='Orders-Table-Container'>
                            <Container>
                                <Row>
                                    <Col xs='9'>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 20 }}>
                                            <CgFileDocument size='1.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Lista objętych zamówień transportu</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 20 }}>
                                            <MdShowChart size='1.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>{this.state.ordersByForwardingOrderQuantity}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ paddingTop: 30 }}>
                                    <Col>
                                        <MDBDataTable
                                            className='Orders-Data-Table'
                                            style={{color: '#bdbbbb'}}
                                            maxHeight="55vh"
                                            scrollY
                                            small
                                            data={{
                                                columns: [
                                                    {
                                                        label: 'Nr. zamówienia',
                                                        field: 'orderNumber',
                                                        sort: 'asc',
                                                        width: '200'
                                                    },
                                                    {
                                                        label: 'Klient',
                                                        field: 'client',
                                                        sort: 'asc',
                                                        width: '150'
                                                    },
                                                    {
                                                        label: 'Trasa',
                                                        field: 'path',
                                                        sort: 'asc',
                                                        width: '200'
                                                    },
                                                    {
                                                        label: 'Data zlecenia',
                                                        field: 'expectedDate',
                                                        sort: 'asc',
                                                        width: '120'
                                                    },
                                                    {
                                                        label: 'Status',
                                                        field: 'orderStatus',
                                                        sort: 'asc'
                                                    }
                                                ],
                                                rows:
                                                this.state.ordersByForwardingOrder.map((order) => ({
                                                    orderNumber: order.orderNumber,
                                                    client: order.client?.clientFirstName + ' ' + order.client?.clientLastName,
                                                    path: order.warehouse?.city + '-' + order.destinationCity,
                                                    expectedDate: order.orderExpectedDate?.split('T')[0],
                                                    orderStatus: 
                                                    <div>
                                                        <Row>
                                                            <Col xs='8'>
                                                                <div 
                                                                    className='Order-Status-Block'
                                                                    style={{
                                                                        backgroundColor: order.orderStatus?.statusName === 'Utworzone' ? ' #fff134' 
                                                                        : order.orderStatus?.statusName === 'Anulowane' ? '#f75353' : '#34ff4c',
                                                                        boxShadow: order.orderStatus?.statusName === 'Utworzone' ? '2px 2px 13px -4px #fff134'
                                                                        : order.orderStatus?.statusName === 'Anulowane' ? '2px 2px 13px -4px #f75353'
                                                                        : '2px 2px 13px -4px #34ff4c'
                                                                        }}>
                                                                    {order.orderStatus?.statusName}
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <Tooltip title="Pokaż szczegóły zamówienia" aria-label="add">
                                                                    <div className='User-Details-Button'>
                                                                        <BiShowAlt className='Warehouse-Details-Icon' size='1.2em' onClick={this.handleSelectedOrder.bind(this, order)}/>
                                                                    </div>
                                                                </Tooltip>
                                                            </Col>
                                                            <Col>
                                                                <Tooltip title="Edytuj status zamówienia" aria-label="add">
                                                                    <div className='User-Details-Button'>
                                                                        <MdEdit 
                                                                            className='Warehouse-Details-Icon' 
                                                                            size='1.0em'
                                                                            onClick={this.handleOpenChangeOrderStatusModal.bind(this, order)}
                                                                         />
                                                                    </div>
                                                                </Tooltip>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                }))
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
                {this.state.selectedOrder !== '' &&
                <Row style={{ marginTop: 25 }}>
                    <Col>
                        <div className='Orders-Sub-Tile' style={{ maxWidth: 600, height: 260 }}>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 18 }}>
                                            <CgNotes size='1.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Szczegóły zamówienia</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 16 }}>
                                            {this.state.selectedOrder?.orderNumber}
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 5, textAlign: 'left' }}>
                                    <Col>
                                        <div className='Tile-Data-Label' style={{ fontSize: 12 }}>
                                            <FaWeightHanging size='1.3em' style={{ color: '#50ee9c' }}/><span>&nbsp;&nbsp;</span>
                                            <span style={{ color: '#50ee9c' }}>Całkowita waga netto (kg):</span>
                                            <span>&nbsp;&nbsp;</span><span>{this.state.selectedOrder?.totalNetWeight}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ textAlign: 'left' }}>
                                    <Col>
                                        <div className='Tile-Data-Label' style={{ fontSize: 12 }}>
                                            <FaWeight size='1.3em' style={{ color: '#50ee9c' }}/><span>&nbsp;&nbsp;</span>
                                            <span style={{ color: '#50ee9c' }}>Całkowita waga brutto (kg):</span>
                                            <span>&nbsp;&nbsp;</span><span>{this.state.selectedOrder?.totalGrossWeight}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ textAlign: 'left' }}>
                                    <Col>
                                        <div className='Tile-Data-Label' style={{ fontSize: 12 }}>
                                            <FaGlassWhiskey size='1.3em' style={{ color: '#50ee9c' }}/><span>&nbsp;&nbsp;</span>
                                            <span style={{ color: '#50ee9c' }}>Pojemność (LITR):</span>
                                            <span>&nbsp;&nbsp;</span>
                                            <span>{this.state.selectedOrder?.totalVolume}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ textAlign: 'left' }}>
                                    <Col>
                                        <div className='Tile-Data-Label' style={{ fontSize: 12 }}>
                                            <FiMap size='1.3em' style={{ color: '#50ee9c' }}/>
                                            <span>&nbsp;&nbsp;</span>
                                            <span style={{ color: '#50ee9c' }}>Adres dostawy:</span>
                                            <span>&nbsp;&nbsp;</span>
                                            <span>{this.state.selectedOrder?.destinationStreetAddress}</span>
                                            <span>&nbsp;&nbsp;</span>
                                            <span>{this.state.selectedOrder?.destinationZipCode}</span>
                                            <span>&nbsp;&nbsp;</span>
                                            <span>{this.state.selectedOrder?.destinationCity}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ textAlign: 'left' }}>
                                    <Col>
                                        <div className='Tile-Data-Label' style={{ fontSize: 12 }}>
                                            <FaWarehouse size='1.3em' style={{ color: '#50ee9c' }}/>
                                            <span>&nbsp;&nbsp;</span>
                                            <span style={{ color: '#50ee9c' }}>Magazyn:</span>
                                            <span>&nbsp;&nbsp;</span>
                                            <span>{this.state.selectedOrder?.warehouse?.name}</span>
                                            <span>&nbsp;&nbsp;</span>
                                            <span>{this.state.selectedOrder?.warehouse?.streetAddress}</span>
                                            <span>&nbsp;&nbsp;</span>
                                            <span>{this.state.selectedOrder?.warehouse?.zipCode}</span>
                                            <span>&nbsp;&nbsp;</span>
                                            <span>{this.state.selectedOrder?.warehouse?.city}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col>
                        <div  className='Orders-Sub-Tile' style={{ maxWidth: 600 }}>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 18 }}>
                                            <BiPackage size='1.5em'/><span>&nbsp;&nbsp;</span><span>Towary</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 16 }}>
                                            {this.state.selectedOrder?.orderNumber}
                                        </div>
                                    </Col>
                                </Row>

                                {this.state.allLoads.length === 0 && 
                                    <Row>
                                        <Col>
                                            <label className='Orders-Stats-Header' style={{ fontSize: 18 }}>Brak towarów</label>
                                        </Col>
                                    </Row>
                                }

                                {this.state.allLoads.length !== 0 && 
                                    <MDBDataTable
                                        className='Customers-Data-Table'
                                        style={{color: '#bdbbbb'}}
                                        maxHeight="35vh"
                                        scrollY
                                        small
                                        data={{
                                            columns: loadsColumns,
                                            rows:
                                                this.state.allLoads.filter(x => x.orderId === this.state.selectedOrder?.id).map((load) => (
                                                    {
                                                        name: load.name,
                                                        amount: load.amount,
                                                        netWeight: load.netWeight,
                                                        grossWeight: load.grossWeight,
                                                        volume: load.volume
                                                    }
                                                ))
                                        }}
                                    />
                                }
                            </Container>
                        </div>
                        
                    </Col>
                </Row>
                }
                </div>
                }

                <Row style={{ marginTop: 5 }}>
                    <div className='Forwarding-Order-Show-Nav' onClick={this.handleAllLoadsVisibility}>
                        {!this.state.isAllLoadsVisible &&
                            <div>
                                <FiChevronDown size='1.0em' /><span>&nbsp;</span><span style={{ fontSize: 18 }}>Pokaż wszystkie towary</span>
                            </div>
                        }
                        {this.state.isAllLoadsVisible &&
                            <div>
                                <FiChevronUp size='1.0em' /><span>&nbsp;</span><span style={{ fontSize: 18 }}>Ukryj wszystkie towary</span>
                            </div>
                        }
                    </div>
                </Row>
                { this.state.isAllLoadsVisible &&
                <Row style={{ marginTop: 25 }}>
                    <Col>
                        <div  className='Orders-Sub-Tile' style={{ maxWidth: 600 }}>
                            <Container>
                                <Row>
                                    <Col xs='9'>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 18 }}>
                                            <BiPackage size='1.5em'/><span>&nbsp;&nbsp;</span><span>Wszystkie towary</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 20 }}>
                                            <MdShowChart size='1.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>{this.state.allLoadsQuantity}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <MDBDataTable
                                            className='Customers-Data-Table'
                                            style={{color: '#bdbbbb'}}
                                            maxHeight="35vh"
                                            scrollY
                                            small
                                            data={{
                                                columns: loadsColumns,
                                                rows:
                                                    this.state.allLoads.map((load) => (
                                                        {
                                                            name: load.name,
                                                            amount: load.amount,
                                                            netWeight: load.netWeight,
                                                            grossWeight: load.grossWeight,
                                                            volume: load.volume
                                                        }
                                                    ))
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                }
                <Row style={{ marginTop: 25, marginBottom: 35 }}>
                    <Col>
                        <div className='Orders-Sub-Tile' style={{ maxWidth: 1200 }}>
                            <Container>
                                <Row>
                                    <Col xs='8'>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 18 }}>
                                            <AiOutlineCar size='1.5em'/><span>&nbsp;&nbsp;</span><span>Przejazdy</span>
                                        </div>
                                    </Col>
                                    <Col xs='1'>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 20 }}>
                                            <MdShowChart size='1.5em'/><span>&nbsp;&nbsp;&nbsp;</span>
                                            <span>{this.state.transitsQuantity}</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <Button 
                                            className="Green-Button" 
                                            variant="light"
                                            style={{ width: 100 }}
                                            onClick={this.handleOpenAddExistingTransitModal}>
                                                 <MdAssignmentTurnedIn size='1.0em'/><span>&nbsp;</span><span>Przypisz</span>
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button 
                                            className="Green-Button" 
                                            variant="light"
                                            style={{ width: 80 }}
                                            onClick={this.handleOpenAddTransitModal}>
                                                 <MdAdd size='1.0em'/><span>&nbsp;</span><span>Dodaj</span>
                                        </Button>
                                    </Col>
                                </Row>
                                {this.state.transitsQuantity === 0 &&
                                <Row style={{ textAlign: 'center' }}>
                                    <Col>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 22 }}>
                                            Brak
                                        </div>
                                    </Col>
                                </Row>
                                }
                                {this.state.transitsQuantity !== 0 &&
                                <Row style={{ marginTop: 15 }}>
                                    <Col>
                                        <MDBDataTable
                                            className='Customers-Data-Table'
                                            style={{ color: '#bdbbbb' }}
                                            maxHeight="35vh"
                                            scrollY
                                            small
                                            data={{
                                                columns: transitsColumns,
                                                rows:
                                                    this.state.transits.map((transit) => (
                                                        {
                                                            routeShortPath: transit.routeShortPath,
                                                            transitSource: transit.transitSourceStreetAddress + ' ' + transit.transitSourceCity,
                                                            transitDestination: transit.transitDestinationStreetAddress + ' ' + transit.transitDestinationCity,
                                                            transitDates: transit.startDate?.replace('T', ' ') + ' - ' + transit.endDate?.replace('T', ' '),
                                                            transporter: transit.transporter?.fullName,
                                                            driver: transit.driver?.firstName + ' ' + transit.driver?.lastName,
                                                            vehicle: transit.vehicle?.brand + ' ' + transit.vehicle?.model,
                                                            select:
                                                                <Tooltip title="Pokaż szczegóły przejazdu" aria-label="add">
                                                                    <div>
                                                                        <BiShowAlt className='Table-Icon' size='1.5em' />
                                                                    </div>
                                                                </Tooltip>,
                                                            delete: 
                                                                <Tooltip title="Usuń przejazd" aria-label="add">
                                                                    <div>
                                                                        <RiDeleteBin6Line 
                                                                            size='1.3em' 
                                                                            className='Delete-Load-Icon'
                                                                            onClick={this.removeTransit.bind(this,transit)}/>
                                                                    </div>
                                                                </Tooltip>
                                                                
                                                        }
                                                    ))
                                            }}
                                        />
                                    </Col>
                                </Row>
                                }
                            </Container>
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginBottom: 35 }}> 
                    <Col>
                        <div  className='Orders-Sub-Tile' style={{ maxWidth: 1200 }}>
                            <Container>
                                <Row>
                                    <Col xs='9'>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 18 }}>
                                            <CgGym size='1.5em'/><span>&nbsp;&nbsp;</span><span>Załadunki/Rozładunki</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 20 }}>
                                            <MdShowChart size='1.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>{this.state.eventsQuantity}</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <Button 
                                            className="Green-Button" 
                                            variant="light"
                                            style={{ width: 80 }}
                                            onClick={this.handleAddEventModal}>
                                                 <MdAdd size='1.0em'/><span>&nbsp;</span><span>Dodaj</span>
                                        </Button>
                                    </Col>
                                </Row>
                                {this.state.eventsQuantity === 0 && 
                                <Row style={{ textAlign: 'center'}}>
                                    <Col>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 22 }}>Brak</div>
                                    </Col>
                                </Row>
                                }
                                {this.state.eventsQuantity !== 0 &&
                                <Row style={{ marginTop: 15 }}>
                                    <Col>
                                        <MDBDataTable
                                            className='Customers-Data-Table'
                                            style={{ color: '#bdbbbb' }}
                                            maxHeight="35vh"
                                            scrollY
                                            small
                                            data={{
                                                columns: eventsColumns,
                                                rows:
                                                    this.state.events.map((event) => (
                                                        {
                                                            name: event.eventName,
                                                            startTime: event.eventStartTime.replace('T', ' '),
                                                            endTime: event.eventEndTime.replace('T', ' '),
                                                            contactPerson: event.contactPersonFirstName + ' ' + event.contactPersonLastName,
                                                            contactPhoneNumber: event.contactPersonPhoneNumber,
                                                            place: event.eventPlace,
                                                            address: event.eventStreetAddress,
                                                            delete: 
                                                            <RiDeleteBin6Line 
                                                                size='1.3em' 
                                                                className='Table-Icon'
                                                                onClick={this.removeEvent.bind(this, event)}
                                                            />
                                                        }
                                                    ))
                                            }}
                                        />
                                    </Col>
                                </Row>
                                }
                            </Container>
                        </div>
                    </Col>
                </Row>
                <Popup 
                    modal
                    open={this.state.isEditAdditionalDescriptionModalOpen}
                    onClose={this.handleCloseEditAdditionalDescriptionModal}
                    contentStyle={{
                        width: '50vw',
                        height: '50vh',
                        backgroundColor: '#202125',
                        borderColor: '#202125',
                        borderRadius: '15px',
                    }}>
                    {
                        close => (
                            <Container>
                                <Row style={{textAlign: 'center'}}>
                                    <Col>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 26 }}>
                                            <CgNotes size='1.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Edycja dodatkowych informacji o zleceniu</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 60, textAlign: 'center' }}>
                                    <Col>
                                        <FormControl  noValidate autoComplete="off">
                                            <TextField
                                                id="additionalInformation" 
                                                multiline
                                                rowsMax={6}
                                                defaultValue={this.state.forwardingOrder?.additionalDescription}
                                                placeholder='Dodatkowe informacje...'
                                                color="primary"
                                                onChange={this.handleChange('additionalDescription')}
                                                style={{ minWidth: 450 }}
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
                                <Row style={{ marginTop: 50, textAlign: 'center' }}>
                                    <Col>
                                        <Button 
                                            className="Orders-Button" 
                                            variant="light"
                                            onClick={() => {
                                                this.updateForwardingOrderById()
                                                close()
                                            }}>Zapisz
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
                    onClose={this.handleCloseServerResponseModal}
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
                                        <label className='Edit-User-Modal-Header'>{this.state.serverResponseMessage}</label>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'center', marginTop: '30px'}}>
                                    <Col>
                                        <Button 
                                            className="Orders-Button" 
                                            variant="light"
                                            onClick={() => {
                                                close()
                                            }}>
                                            Ok
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        )
                    }
                </Popup>
                <Popup 
                    modal
                    open={this.state.isChangeOrderStatusModalOpen}
                    onClose={this.handleCloseChangeOrderStatusModal}
                    closeOnDocumentClick={false}
                    contentStyle={{
                        width: '40vw',
                        height: '40vh',
                        backgroundColor: '#202125',
                        borderColor: '#202125',
                        borderRadius: '15px',
                    }}>
                    {
                        close => (
                            <Container>
                                <Row style={{ textAlign: 'center' }}>
                                    <Col>
                                        <label className='Edit-User-Modal-Header' style={{ fontSize: 30 }}>
                                            <SiStatuspage size='1.3em'/><span>&nbsp;&nbsp;</span>Zmiana statusu zamówienia
                                        </label>
                                    </Col>
                                </Row>
                                <Row style={{ textAlign: 'center', marginTop: 40 }}>
                                    <Col>
                                        <FormControl>
                                            <InputLabel id="genderLabel">
                                                <FaRegMoneyBillAlt size='1.3em'/><span>&nbsp;&nbsp;</span>Status zamówienia
                                            </InputLabel>
                                                <Select
                                                    id="selectPaymentForm"
                                                    color="primary"
                                                    value={this.state.newOrderStatusIdForOrder}
                                                    style={{width: '300px'}}
                                                    InputLabelProps={{
                                                        style:{
                                                            color: 'whitesmoke'
                                                        },
                                                    }}
                                                    onChange={this.handleChange('newOrderStatusIdForOrder')}>
                                                        {this.state.orderStatuses.map((orderStatus) => (
                                                            <MenuItem key={orderStatus.id} value={orderStatus.id}>{orderStatus.statusName}</MenuItem>
                                                        ))}
                                                    </Select>
                                        </FormControl>
                                    </Col>
                                </Row>
                                <Row style={{ textAlign: 'center', marginTop: 50 }}>
                                    <Col>
                                        <Button 
                                            className="Orders-Button" 
                                            variant="light"
                                            onClick={() => {
                                                close()
                                            }}>
                                            Zamknij
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button 
                                            className="Orders-Button" 
                                            variant="light"
                                            onClick={() => {
                                                this.updateOrderStatusOfOrder()
                                                close()
                                            }}>
                                            Zatwierdź
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        )
                    }
                </Popup>
                <Popup 
                    modal
                    open={this.state.isAddEventModalOpen}
                    onClose={this.handleAddEventModal}
                    contentStyle={{
                        width: '50vw',
                        height: '80vh',
                        backgroundColor: '#202125',
                        borderColor: '#202125',
                        borderRadius: '15px'}}>
                    {
                        close => (
                            <Container>
                            <Row style={{textAlign: 'center'}}>
                                <Col>
                                    <div className='Orders-Header' style={{ fontSize: 26 }}>
                                        <CgGym size='1.2em'/><span>&nbsp;&nbsp;</span><span>Dodawanie załadunku/rozładunku</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop: 40, paddingLeft: '10px'}}>
                                <Col>
                                    <FormControl>
                                        <TextField
                                            id="additionalInformation" 
                                            label=
                                            {
                                                <div>
                                                    <span style={{ color: '#f75555', fontSize: 18 }}>*</span>
                                                    <span>&nbsp;</span>
                                                    <span>Nazwa zdarzenia</span>
                                                </div>
                                            }
                                            color="primary"
                                            onChange={this.handleChange('newEventName')}
                                            error={!this.state.newEventNameIsValid}
                                            helperText={this.state.newEventNameHelperText}
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

                            <Row style={{marginTop: 10 , paddingLeft: 10 }}>
                                <Col>
                                    <FormControl noValidate>
                                        <TextField
                                            id="datetime-local"
                                            label="Czas rozpoczęcia"
                                            type="datetime-local"
                                            defaultValue=""
                                            onChange={this.handleEventStartTimeChange.bind(this)}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                                shrink: true
                                            }}
                                        />
                                    </FormControl>
                                </Col>
                                <Col>
                                    <FormControl noValidate>
                                        <TextField
                                            id="datetime-local"
                                            label="Czas zakończenia"
                                            type="datetime-local"
                                            defaultValue=""
                                            onChange={this.handleEventEndTimeChange.bind(this)}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                                shrink: true
                                            }}
                                        />
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: 10 }}>
                                <Col>
                                    <div className='Orders-Stats-Header' style={{ fontSize: 16 }}>
                                        <AiOutlineUser size='1.2em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Dane osoby do kontaktu</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: 5, paddingLeft: 10 }}>
                                <Col>
                                    <FormControl>
                                        <TextField
                                            id="additionalInformation" 
                                            label='Imię'
                                            color="primary"
                                            onChange={this.handleChange('newEventContactPersonFirstName')}
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
                                            label='Nazwisko'
                                            color="primary"
                                            onChange={this.handleChange('newEventContactPersonLastName')}
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
                            <Row style={{ marginTop: 10, paddingLeft: 10 }}>
                                <Col>
                                    <FormControl>
                                        <TextField
                                            id="additionalInformation" 
                                            label='Nr. telefonu'
                                            color="primary"
                                            style={{ width: 150 }}
                                            onChange={this.handleChange('newEventContactPersonPhoneNumber')}
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
                            <Row style={{ marginTop: 15 }}>
                                <Col>
                                    <div className='Orders-Stats-Header' style={{ fontSize: 16  }}>
                                        <MdLocationCity size='1.2em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Dane adresowe</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: 5, paddingLeft: 10 }}>
                                <Col>
                                    <FormControl>
                                        <TextField
                                            id="additionalInformation" 
                                            label=
                                            {
                                                <div>
                                                    <span style={{ color: '#f75555', fontSize: 18 }}>*</span>
                                                    <span>&nbsp;</span>
                                                    <span>Miejsce</span>
                                                </div>
                                            }
                                            color="primary"
                                            onChange={this.handleChange('newEventPlace')}
                                            error={!this.state.newEventPlaceIsValid}
                                            helperText={this.state.newEventPlaceHelperText}
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
                                            label=
                                            {
                                                <div>
                                                    <span style={{ color: '#f75555', fontSize: 18 }}>*</span>
                                                    <span>&nbsp;</span>
                                                    <span>Adres</span>
                                                </div>
                                            }
                                            color="primary"
                                            style={{ width: 250 }}
                                            error={!this.state.newEventStreetAddressIsValid}
                                            helperText={this.state.newEventStreetAddressHelperText}
                                            onChange={this.handleChange('newEventStreetAddress')}
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
                            <Row style={{textAlign: 'center', marginTop: 30 }}>
                                <Col>
                                    <Button 
                                        className="Green-Button" 
                                        variant="light"
                                        style={{width: '110px'}}
                                        onClick={() => {
                                            let isError = false
                                            if(this.state.newEventName === ''){
                                                this.setState({ newEventNameIsValid: false, newEventNameHelperText: 'Pole nie może być puste.' })
                                                isError = true;
                                            }
                                            else{
                                                this.setState({ newEventNameIsValid: true, newEventNameHelperText: '' })
                                            }
                                            if(this.state.newEventPlace === ''){
                                                this.setState({ newEventPlaceIsValid: false, newEventPlaceHelperText: 'Pole nie może być puste.' })
                                                isError = true;
                                            }
                                            else{
                                                this.setState({ newEventPlaceIsValid: true, newEventPlaceHelperText: '' })
                                            }
                                            if(this.state.newEventStreetAddress === ''){
                                                this.setState({ newEventStreetAddressIsValid: false, newEventStreetAddressHelperText: 'Pole nie może być puste.' })
                                                isError = true;
                                            }
                                            else{
                                                this.setState({ newEventStreetAddressIsValid: true, newEventStreetAddressHelperText: '' })
                                            }
                                            if(isError) return
                                            this.addEvent();
                                            close()
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
                    closeOnDocumentClick={false}
                    open={this.state.isAddTransitModalOpen}
                    onClose={this.handleCloseAddTransitModal}
                    contentStyle={{
                        width: '50vw',
                        height: '95vh',
                        overflowY: 'scroll',
                        backgroundColor: '#202125',
                        borderColor: '#202125',
                        borderRadius: '15px'}}>
                    {
                        close => (
                            <Container>
                            <Row style={{textAlign: 'center'}}>
                                <Col>
                                    <label className='Orders-Header' style={{ fontSize: 26 }}>
                                        <AiOutlineCar size='1.2em'/><span>&nbsp;&nbsp;</span><span>Dodawanie przejazdu</span>
                                    </label>
                                </Col>
                            </Row>
                            <Row style={{marginTop: 50, paddingLeft: '10px'}}>
                                <Col>
                                    <FormControl>
                                        <TextField
                                            id="additionalInformation" 
                                            label='Trasa (skrót)'
                                            color="primary"
                                            onChange={this.handleChange('newTransitRouteShortPath')}
                                            style={{ width: 250 }}
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
                                            label=
                                            { 
                                                <div>
                                                    <span style={{ color: '#f75555', fontSize: 18 }}>*</span>
                                                    <span>&nbsp;</span>
                                                    <GiPathDistance/><span>&nbsp;&nbsp;</span><span>Długość trasy (km)</span>
                                                </div>
                                            }
                                            color="primary"
                                            type='number'
                                            onChange={this.handleChange('newTransitTransportDistance')}
                                            error={!this.state.newTransitTransportDistanceIsValid}
                                            helperText={this.state.newTransitTransportDistanceHelperText}
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
                            <Row style={{ marginTop: 25 }}>
                                <Col>
                                    <div className='Orders-Header' style={{ fontSize: 16 }}>
                                        <FaMapMarkerAlt size='1.2em'/><span>&nbsp;&nbsp;</span><span>Przejazd z:</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop: 10 , paddingLeft: 10 }}>
                                <Col>
                                    <FormControl>
                                        <TextField
                                            id="additionalInformation" 
                                            label=
                                            { 
                                                <div>
                                                    <HiOutlineOfficeBuilding /><span>&nbsp;&nbsp;</span><span>Adres</span>
                                                </div>
                                            }
                                            color="primary"
                                            onChange={this.handleChange('newTransitSourceStreetAddress')}
                                            style={{ width: 250 }}
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
                                            label=
                                            { 
                                                <div>
                                                    <MdLocalPostOffice /><span>&nbsp;&nbsp;</span><span>Kod pocztowy</span>
                                                </div>
                                            }
                                            color="primary"
                                            onChange={this.handleChange('newTransitSourceZipCode')}
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
                            <Row style={{marginTop: 5 , paddingLeft: 10 }}>
                                <Col>
                                    <FormControl>
                                        <TextField
                                            id="additionalInformation" 
                                            label=
                                            { 
                                                <div>
                                                    <MdLocationCity /><span>&nbsp;&nbsp;</span><span>Miasto</span>
                                                </div>
                                            }
                                            color="primary"
                                            onChange={this.handleChange('newTransitSourceCity')}
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
                                            label=
                                            {
                                                <div>
                                                    <FaFlagUsa /><span>&nbsp;&nbsp;</span><span>Kraj</span>
                                                </div>
                                            }
                                                    
                                            color="primary"
                                            onChange={this.handleChange('newTransitSourceCountry')}
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
                            <Row style={{ marginTop: 15 }}>
                                <Col>
                                    <div className='Orders-Header' style={{ fontSize: 16 }}>
                                        <FaMapMarker size='1.2em'/><span>&nbsp;&nbsp;</span><span>Przejazd do:</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop: 10 , paddingLeft: 10 }}>
                                <Col>
                                    <FormControl>
                                        <TextField
                                            id="additionalInformation" 
                                            label=
                                            { 
                                                <div>
                                                    <HiOutlineOfficeBuilding /><span>&nbsp;&nbsp;</span><span>Adres</span>
                                                </div>
                                            }
                                            color="primary"
                                            onChange={this.handleChange('newTransitDestinationStreetAddress')}
                                            style={{ width: 250 }}
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
                                            label=
                                            { 
                                                <div>
                                                    <MdLocalPostOffice /><span>&nbsp;&nbsp;</span><span>Kod pocztowy</span>
                                                </div>
                                            }
                                            color="primary"
                                            onChange={this.handleChange('newTransitDestinationZipCode')}
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
                            <Row style={{marginTop: 15 , paddingLeft: 10 }}>
                                <Col>
                                    <FormControl>
                                        <TextField
                                            id="additionalInformation" 
                                            label=
                                            { 
                                                <div>
                                                    <MdLocationCity /><span>&nbsp;&nbsp;</span><span>Miasto</span>
                                                </div>
                                            }
                                            color="primary"
                                            onChange={this.handleChange('newTransitDestinationCity')}
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
                                            label=
                                            { 
                                                <div>
                                                    <FaFlagUsa /><span>&nbsp;&nbsp;</span><span>Kraj</span>
                                                </div>
                                            }
                                            color="primary"
                                            onChange={this.handleChange('newTransitDestinationCountry')}
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
                            <Row style={{ marginTop: 15, paddingLeft: 10 }}>
                                <Col>
                                    <FormControl noValidate>
                                        <TextField
                                            id="transitStartDate"
                                            label="Czas rozpoczęcia"
                                            type="datetime-local"
                                            defaultValue={this.state.newTransitStartDate}
                                            onChange={this.handleStartDateChange.bind(this)}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                                shrink: true
                                            }}
                                        />
                                    </FormControl>
                                </Col>
                                <Col>
                                    <FormControl noValidate>
                                        <TextField
                                            id="transitEndDate"
                                            label="Czas zakończenia"
                                            type="datetime-local"
                                            defaultValue={this.state.newTransitEndDate}
                                            onChange={this.handleEndDateChange.bind(this)}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                                shrink: true
                                            }}
                                        />
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: 15 }}>
                                <Col xs='3'> 
                                    <div className='Orders-Header' style={{ fontSize: 16 }}>
                                        <span style={{ color: '#f75555', fontSize: 16 }}>*</span>
                                        <span>&nbsp;</span>
                                        <RiTruckFill size='1.2em'/><span>&nbsp;&nbsp;</span><span>Przewoźnik: </span>
                                    </div>
                                </Col>
                                <Col>
                                    <Button 
                                        className="Green-Button" 
                                        variant="light"
                                        style={{width: 90, height: 30, fontSize: 13, paddingTop: 5 }}
                                        onClick={this.handleAddTransitModalTransportersTableVisibility}>
                                            <MdEdit size='1.0em'/><span>&nbsp;</span>
                                            <span>{this.state.newTransitSelectedTransporter === '' ? 'Dodaj' : 'Zmień'}</span>
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className='Orders-Header' style={{ fontSize: 16, color: 'whitesmoke' }}>
                                        {this.state.newTransitSelectedTransporter?.fullName}
                                    </div>
                                </Col>
                            </Row>
                            {this.state.isAddTransitModalTransportersTableVisible &&
                            <Row style={{ marginTop: 10 }}>
                                <Col>
                                    <MDBDataTable
                                            className='Customers-Data-Table'
                                            style={{ color: '#bdbbbb' }}
                                            maxHeight="35vh"
                                            scrollY
                                            small
                                            data={{
                                                columns: transportersColumns,
                                                rows:
                                                    this.state.transporters.map((transporter) => (
                                                        {
                                                            transporterFullName: transporter.fullName,
                                                            city: transporter.city,
                                                            nip: transporter.nip,
                                                            select: 
                                                                <ImCheckboxChecked
                                                                    className='Table-Icon' 
                                                                    onClick={this.handleSelectedTransporterForNewTransit.bind(this, transporter)}
                                                                    size='1.1em'/>,
                                                        }
                                                    ))
                                            }}
                                        />
                                </Col>
                            </Row>
                            }
                            {this.state.newTransitSelectedTransporter !== '' &&
                            <div>
                            <Row style={{ marginTop: 10 }}>
                                <Col xs='3'> 
                                    <div className='Orders-Header' style={{ fontSize: 16 }}>
                                        <span style={{ color: '#f75555', fontSize: 16 }}>*</span>
                                        <span>&nbsp;</span>
                                        <GiFullMotorcycleHelmet size='1.2em'/><span>&nbsp;&nbsp;</span><span>Kierowca: </span>
                                    </div>
                                </Col>
                                <Col>
                                    <Button 
                                        className="Green-Button" 
                                        variant="light"
                                        style={{ width: 90, height: 30, fontSize: 13, paddingTop: 5 }}
                                        onClick={this.handleAddTransitModalDriversTableVisibility}>
                                            <MdEdit size='1.0em'/><span>&nbsp;</span>
                                            <span>{this.state.newTransitSelectedDriver === '' ? 'Dodaj' : 'Zmień'}</span>
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className='Tile-Header' style={{ fontSize: 16, color: 'whitesmoke' }}>
                                        {this.state.newTransitSelectedDriver?.firstName}<span>&nbsp;</span>{this.state.newTransitSelectedDriver?.lastName}
                                    </div>
                                </Col>
                            </Row>
                            {this.state.isAddTransitModalDriversTableVisible &&
                            <Row style={{ marginTop: 10 }}>
                                <Col>
                                    <MDBDataTable
                                            className='Customers-Data-Table'
                                            style={{ color: '#bdbbbb' }}
                                            maxHeight="35vh"
                                            scrollY
                                            small
                                            data={{
                                                columns: driversColumns,
                                                rows:
                                                    this.state.drivers.filter(x => x.transporterId === this.state.newTransitSelectedTransporter.id).map((driver) => (
                                                        {
                                                            driverFirstName: driver.firstName,
                                                            driverLastName: driver.lastName,
                                                            phoneNumber: driver.contactPhoneNumber,
                                                            mail: driver.mail,
                                                            select: 
                                                                <ImCheckboxChecked
                                                                    className='Table-Icon' 
                                                                    onClick={this.handleSelectedDriverForNewTransit.bind(this, driver)}
                                                                    size='1.1em'/>,
                                                        }
                                                    ))
                                            }}
                                        />
                                </Col>
                            </Row>
                            }
                            <Row style={{ marginTop: 10 }}>
                                <Col xs='3'> 
                                    <div className='Orders-Header' style={{ fontSize: 16 }}>
                                        <span style={{ color: '#f75555', fontSize: 16 }}>*</span>
                                        <span>&nbsp;</span>
                                        <FaTruckMoving size='1.2em'/><span>&nbsp;&nbsp;</span><span>Pojazd: </span>
                                    </div>
                                </Col>
                                <Col>
                                    <Button 
                                        className="Green-Button" 
                                        variant="light"
                                        style={{ width: 90, height: 30, fontSize: 13, paddingTop: 5 }}
                                        onClick={this.handleAddTransitModalVehiclesTableVisibility}>
                                            <MdEdit size='1.0em'/><span>&nbsp;</span>
                                            <span>{this.state.newTransitSelectedVehicle === '' ? 'Dodaj' : 'Zmień'}</span>
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className='Orders-Header' style={{ fontSize: 16, color: 'whitesmoke' }}>
                                        {this.state.newTransitSelectedVehicle?.brand}<span>&nbsp;</span>{this.state.newTransitSelectedVehicle?.model}
                                    </div>
                                </Col>
                            </Row>
                            {this.state.isAddTransitModalVehiclesTableVisible &&
                            <Row style={{ marginTop: 10 }}>
                                <Col>
                                    <MDBDataTable
                                            className='Customers-Data-Table'
                                            style={{ color: '#bdbbbb' }}
                                            maxHeight="35vh"
                                            scrollY
                                            small
                                            data={{
                                                columns: vehiclesColumns,
                                                rows:
                                                    this.state.vehicles.filter(x => x.transporterId === this.state.newTransitSelectedTransporter.id).map((vehicle) => (
                                                        {
                                                            vehicleBrand: vehicle.brand,
                                                            vehicleModel: vehicle.model,
                                                            vehicleLoadingCapacity: vehicle.loadingCapacity,
                                                            vehicleTrailer: vehicle.trailer,
                                                            vehicleType: vehicle.vehicleType.typeName,
                                                            select: 
                                                                <ImCheckboxChecked
                                                                    className='Table-Icon' 
                                                                    onClick={this.handleSelectedVehicleForNewTransit.bind(this, vehicle)}
                                                                    size='1.1em'/>,
                                                        }
                                                    ))
                                            }}
                                        />
                                </Col>
                            </Row>
                            }
                            </div>
                            }
                            <Row style={{ marginTop: 15 }}>
                                <Col>
                                    <div className='Orders-Header' style={{ fontSize: 16 }}>
                                        <FaRegMoneyBillAlt size='1.2em'/><span>&nbsp;&nbsp;</span><span>Szczegóły finansowe</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: 5, paddingLeft: 10 }}>
                                <Col>
                                    <FormControl>
                                        <TextField
                                            id="additionalInformation" 
                                            label=
                                            {
                                                <div>
                                                    <span style={{ color: '#f75555', fontSize: 18 }}>*</span>
                                                    <span>&nbsp;</span>
                                                    <span>Cena netto (zł)</span>
                                                </div>
                                            }
                                            color="primary"
                                            type='number'
                                            style={{ width: 150 }}
                                            onChange={this.handleChange('newTransitNetPrice')}
                                            error={!this.state.newTransitNetPriceIsValid}
                                            helperText={this.state.newTransitNetPriceHelperText}
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
                                            label=
                                            {
                                                <div>
                                                    <span style={{ color: '#f75555', fontSize: 18 }}>*</span>
                                                    <span>&nbsp;</span>
                                                    <span>Cena brutto (zł)</span>
                                                </div>
                                            }
                                            color="primary"
                                            type='number'
                                            style={{ width: 150 }}
                                            onChange={this.handleChange('newTransitGrossPrice')}
                                            error={!this.state.newTransitGrossPriceIsValid}
                                            helperText={this.state.newTransitGrossPriceHelperText}
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
                            <Row style={{ marginTop: 10, paddingLeft: 10 }}>
                                <Col>
                                    <FormControl>
                                        <InputLabel id="genderLabel">
                                            <FaRegMoneyBillAlt size='1.3em'/><span>&nbsp;&nbsp;</span>Forma płatności
                                        </InputLabel>
                                            <Select
                                                id="selectPaymentForm"
                                                color="primary"
                                                value={this.state.newTransitSelectedPaymentFormId}
                                                style={{width: '300px'}}
                                                InputLabelProps={{
                                                    style:{
                                                        color: 'whitesmoke'
                                                    },
                                                }}
                                                onChange={this.handleSelectedPaymentFormIdForNewTransit}>
                                                    {this.state.paymentForms.map((paymentForm) => (
                                                        <MenuItem key={paymentForm.id} value={paymentForm.id}>{paymentForm.paymentName}</MenuItem>
                                                    ))}
                                                </Select>
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row style={{textAlign: 'center', marginTop: 40, marginBottom: 15 }}>
                                <Col>
                                </Col>
                                <Col>
                                    <Button 
                                        className="Green-Button" 
                                        variant="light"
                                        style={{ width: 110 }}
                                        onClick={() => {
                                            close()
                                        }}>
                                            Zamknij
                                    </Button>
                                </Col>
                                <Col>
                                    <Button 
                                        className="Green-Button" 
                                        variant="light"
                                        style={{ width: 110 }}
                                        onClick={() => {
                                            let isError = false

                                            if(this.state.newTransitTransportDistance === ''){
                                                this.setState({ newTransitTransportDistanceIsValid: false, newTransitTransportDistanceHelperText: 'Pole nie może być puste.'})
                                                isError = true
                                            }
                                            else{
                                                this.setState({ newTransitTransportDistanceIsValid: true, newTransitTransportDistanceHelperText: ''})
                                            }

                                            if(this.state.newTransitNetPrice === ''){
                                                this.setState({ newTransitNetPriceIsValid: false, newTransitNetPriceHelperText: 'Pole nie może być puste.'})
                                                isError = true
                                            }
                                            else{
                                                this.setState({ newTransitNetPriceIsValid: true, newTransitNetPriceHelperText: ''})
                                            }

                                            if(this.state.newTransitGrossPrice === ''){
                                                this.setState({ newTransitGrossPriceIsValid: false, newTransitGrossPriceHelperText: 'Pole nie może być puste.'})
                                                isError = true
                                            }
                                            else{
                                                this.setState({ newTransitGrossPriceIsValid: true, newTransitGrossPriceHelperText: ''})
                                            }
                                            if(this.state.newTransitSelectedTransporter === '' || this.state.newTransitSelectedDriver === '' || this.state.newTransitSelectedVehicle === '') isError = true

                                            if(isError) return
                                            this.addTransit()
                                            close()
                                        }}>
                                            <MdDone size='1.0em'/><span>&nbsp;</span><span>Zatwierdź</span>
                                    </Button>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                        </Container>
                        )
                    }
                </Popup>

                <Popup 
                    modal
                    open={this.state.isAddExistingTransitModalOpen}
                    onClose={this.handleCloseAddExistingTransitModal}
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
                                        <label className='Edit-User-Modal-Header'>Przypisz przejazd do zlecenia spedycji</label>
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
                                                columns: transitsColumns2,
                                                rows:
                                                    this.state.existingTransits.map((existingTransit) => (
                                                        {
                                                            routeShortPath: existingTransit.routeShortPath,
                                                            transitSource: existingTransit.transitSourceStreetAddress + ' ' + existingTransit.transitSourceCity,
                                                            transitDestination: existingTransit.transitDestinationStreetAddress + ' ' + existingTransit.transitDestinationCity,
                                                            transitDates: existingTransit.startDate.replace('T', ' ') + ' -> ' + existingTransit.endDate.replace('T', ' '),
                                                            transporter: existingTransit.transporter?.fullName,
                                                            driver: existingTransit.driver?.firstName + ' ' + existingTransit.driver?.lastName,
                                                            vehicle: existingTransit.vehicle?.brand + ' ' + existingTransit.vehicle?.model,
                                                            select:
                                                                <ImCheckboxChecked
                                                                    className='Table-Icon' 
                                                                    onClick={this.handleSelectedExistingTransitToForwardingOrder.bind(this, existingTransit)}
                                                                    size='1.1em'/>
                                                            
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
export default EditForwardingOrderPanel;

const monthNames = ["STYCZEŃ", "LUTY", "MARZEC", "KWIECIEŃ", "MAJ", "CZERWIEC",
  "LIPIEC", "SIERPIEŃ", "WRZESIEŃ", "PAŹDZIERNIK", "LISTOPAD", "GRUDZIEŃ"
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
        width: 150
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
        sort: 'asc'
    }
];

const eventsColumns =
[
    {
        label: 'Nazwa',
        field: 'name',
        sort: 'asc',
        width: 125,
    },
    {
        label: 'Czas rozp.',
        field: 'startTime',
        sort: 'asc',
        width: 125
    },
    {
        label: 'Czas zakończ.',
        field: 'endTime',
        sort: 'asc',
        width: 125
    },
    {
        label: 'Kontakt',
        field: 'contactPerson',
        sort: 'asc',
        width: 125
    },
    {
        label: 'Nr. kontaktowy',
        field: 'contactPhoneNumber',
        sort: 'asc',
        width: 125
    },
    {
        label: 'Miejsce',
        field: 'place',
        sort: 'asc',
        width: 125
    },
    {
        label: 'Adres',
        field: 'address',
        sort: 'asc',
        width: 125
    },
    {
        label: '',
        field: 'delete',
        sort: 'asc'
    }
];

const transportersColumns =
[
    {
        label: 'Przewoźnik',
        field: 'transporterFullName',
        sort: 'asc',
        width: 150,
    },
    {
        label: 'Miasto',
        field: 'city',
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
        sort: 'asc'
    }
]

const driversColumns =
[
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
        field: 'select'
    }
]

const vehiclesColumns =
[
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
        field: 'select'
    }
]

const transitsColumns =
[
    {
        label: 'Trasa',
        field: 'routeShortPath',
        sort: 'asc',
        width: 150,
    },
    {
        label: 'Transport z:',
        field: 'transitSource',
        sort: 'asc',
        width: 150
    },
    {
        label: 'Transport do:',
        field: 'transitDestination',
        sort: 'asc',
        width: 150
    },
    {
        label: 'Data rozp. / zakończ.',
        field: 'transitDates',
        sort: 'asc',
        width: 150
    },
    {
        label: 'Przewoźnik',
        field: 'transporter',
        width: 150
    },
    {
        label: 'Kierowca',
        field: 'driver',
        width: 100
    },
    {
        label: 'Pojazd',
        field: 'vehicle',
        width: 100
    },
    {
        label: '',
        field: 'select',
        width: 50
    },
    {
        label: '',
        field: 'delete'
    }
]

const transitsColumns2 =
[
    {
        label: 'Trasa',
        field: 'routeShortPath',
        sort: 'asc',
        width: 125,
    },
    {
        label: 'Transport z:',
        field: 'transitSource',
        sort: 'asc',
        width: 125
    },
    {
        label: 'Transport do:',
        field: 'transitDestination',
        sort: 'asc',
        width: 125
    },
    {
        label: 'Data rozp. / zakończ.',
        field: 'transitDates',
        sort: 'asc',
        width: 125
    },
    {
        label: 'Przewoźnik',
        field: 'transporter',
        width: 100
    },
    {
        label: 'Kierowca',
        field: 'driver',
        width: 100
    },
    {
        label: 'Pojazd',
        field: 'vehicle',
        width: 100
    },
    {
        label: '',
        field: 'select'
    }

]
