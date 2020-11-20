import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { HiOutlineRefresh } from 'react-icons/hi';
import { MdAdd, MdEdit, MdShowChart } from 'react-icons/md';
import { FiChevronDown } from 'react-icons/fi';
import { FaRegFilePdf } from 'react-icons/fa';
import { MDBDataTable } from 'mdbreact';
import { getSessionCookie } from '../../sessions';
import { Select, FormControl, MenuItem, InputLabel, Tooltip } from '@material-ui/core';
import axios from 'axios';
import './OrdersDashboard.css';

class OrdersDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: getSessionCookie(),
            orders: [],
            ordersQuantity: '',
            selectedFilterId: 0,
            orderStatuses: []
        }
    }

    // handle filter data
    handleChange = (name) => (data)  => {{this.setState({ [name]: data.target.value })}}

    // GET call to API to get forwarders
    async getOrders(){
        try
        {
            const response = await axios.get('https://localhost:44394/orders', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
            if(data.length === 0){
                this.setState({
                    orders: [],
                    ordersQuantity: 0
                })
                return;
            }

            this.setState({
                orders: data,
                ordersQuantity: data.length
            })
        }
        catch(error){
            console.log(error);
        }
    }

    // GET call to API to order statuses
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
                this.setState({ orderStatuses: [] })
                return;
            }

            var _customOrderStatuses = [ {id: 0, statusName: 'Wszystkie' }]
            data.map(x => (
                _customOrderStatuses.push(x)
            ))

            console.log(_customOrderStatuses)
            this.setState({ orderStatuses: _customOrderStatuses, selectedFilterId: 0 })
        }
        catch(error){
            console.log(error);
        }
    }

    async componentDidMount(){
        await this.getOrderStatuses()
        await this.getOrders()
    };

    render(){
        return(
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col xs='9' style={{minWidth: '450px'}}>
                        <div className='Orders-Header'>Zamówienia transportu</div>
                    </Col>

                    <Col xs='1' style={{minWidth: '120px', marginTop: '10px'}}>
                        <Button 
                            className="Orders-Button" 
                            variant="light"
                            onClick={this.getOrders}>
                                <HiOutlineRefresh size='1.0em'/><span>&nbsp;</span><span>Odśwież</span>
                        </Button>
                    </Col>
                    <Col xs='1' style={{minWidth: '120px', marginTop: '10px'}}>
                        <NavLink className='Orderer-Nav-Link' to={{
                            pathname: '/pracownik-zamowien/zamowienia/dodaj',
                            state: { from: this.props.location.pathname }
                            }}>
                            <Button 
                                className="Orders-Button" 
                                variant="light">
                                    <MdAdd size='1.0em'/><span>&nbsp;</span><span>Dodaj</span>
                            </Button>
                        </NavLink>
                    </Col>
                </Row>
                <Row style={{marginTop: '15px'}}>
                    <Col>
                        <Container>
                            <Row>
                                <div className='Orders-Sub-Header'>
                                    <FiChevronDown size='1.2em'/><span>&nbsp;</span><span>Filtry</span>
                                </div>
                            </Row>
                            <Row style={{marginTop: '15px'}}>
                                <Col>
                                    <FormControl variant="outlined">
                                        <InputLabel id="genderLabel">Status zamówienia</InputLabel>
                                        <Select
                                            id="selectUserGender"
                                            color="primary"
                                            value={this.state.selectedFilterId}
                                            style={{minWidth: '150px'}}
                                            onChange={this.handleChange('selectedFilterId')}
                                            InputLabelProps={{
                                                style:{
                                                    color: 'whitesmoke'
                                                },
                                            }}>
                                            {this.state.orderStatuses.map(x => (
                                                 <MenuItem key={x.id} value={x.id}>{x.statusName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col>
                        <div className='Orders-Sub-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className='Orders-Stats-Header' style={{fontSize: '14px'}}>
                                            <MdShowChart size='1.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Wszystkich zamówień</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'center'}}>
                                    <Col>
                                        <div className='Orders-Stats-Number'>{this.state.ordersQuantity}</div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row style={{marginTop: '30px'}}>
                    <Col>
                        <div className='Orders-Table-Container'>
                            <Container>
                                <Row>
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
                                                        label: 'Nr. zlecenia',
                                                        field: 'forwardingOrderNumber',
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
                                                rows: this.state.selectedFilterId === 0 ? 
                                                this.state.orders.map((order) => (
                                                    {
                                                        orderNumber: order.orderNumber,
                                                        forwardingOrderNumber: order.forwardingOrder?.forwardingOrderNumber,
                                                        client: order.client.clientFirstName + ' ' + order.client.clientLastName,
                                                        path: order.warehouse.city + '-' + order.destinationCity,
                                                        expectedDate: order.orderExpectedDate?.split('T')[0],
                                                        orderStatus: 
                                                        <div>
                                                            <div 
                                                                className='Order-Status-Block'
                                                                style={{
                                                                    backgroundColor: order.orderStatus?.statusName === 'Utworzone' ? ' #fff134' 
                                                                    : order.orderStatus?.statusName === 'Anulowane' ? '#f75353' : '#34ff4c',
                                                                    boxShadow: order.orderStatus?.statusName === 'Utworzone' ? '2px 2px 13px -4px #fff134'
                                                                    : order.orderStatus?.statusName === 'Anulowane' ? '2px 2px 13px -4px #f75353'
                                                                    : '2px 2px 13px -4px #34ff4c'}}>
                                                                {order.orderStatus?.statusName}
                                                            </div>
                                                            <Container>
                                                                <Row style={{marginTop: '5px'}}>
                                                                    <Col xs='2'>
                                                                        <NavLink className="Add-User-Nav-Link" to={{
                                                                            pathname: '/pracownik-zamowien/zamowienia/'+ order.id,
                                                                            }}>
                                                                            <Tooltip title="Edycja zamówienia" aria-label="add">
                                                                                <div className='User-Details-Button' >
                                                                                    <MdEdit size='1.0em' className='User-Details-Icon'/>
                                                                                </div>
                                                                            </Tooltip>
                                                                        </NavLink>
                                                                    </Col>
                                                                </Row>
                                                            </Container>
                                                        </div>
                                                           
                                                    }
                                                )) :
                                                this.state.orders.filter(x => x.orderStatusId === this.state.selectedFilterId).map((order) => (
                                                    {
                                                        orderNumber: order.orderNumber,
                                                        forwardingOrderNumber: order.forwardingOrder?.forwardingOrderNumber,
                                                        client: order.client.clientFirstName + ' ' + order.client.clientLastName,
                                                        path: order.warehouse.city + '-' + order.destinationCity,
                                                        expectedDate: order.orderExpectedDate?.split('T')[0],
                                                        orderStatus: 
                                                        <div>
                                                            <div 
                                                                className='Order-Status-Block'
                                                                style={{
                                                                    backgroundColor: order.orderStatus?.statusName === 'Utworzone' ? ' #fff134' 
                                                                    : order.orderStatus?.statusName === 'Anulowane' ? '#f75353' : '#34ff4c',
                                                                    boxShadow: order.orderStatus?.statusName === 'Utworzone' ? '2px 2px 13px -4px #fff134'
                                                                    : order.orderStatus?.statusName === 'Anulowane' ? '2px 2px 13px -4px #f75353'
                                                                    : '2px 2px 13px -4px #34ff4c'}}>
                                                                {order.orderStatus?.statusName}
                                                            </div>
                                                            <Container>
                                                                <Row style={{marginTop: '5px'}}>
                                                                    <Col xs='2'>
                                                                        <NavLink className="Add-User-Nav-Link" to={{
                                                                            pathname: '/pracownik-zamowien/zamowienia/'+ order.id,
                                                                            }}>
                                                                            <Tooltip title="Edycja zamówienia" aria-label="add">
                                                                                <div className='User-Details-Button' >
                                                                                    <MdEdit size='1.0em' className='User-Details-Icon'/>
                                                                                </div>
                                                                            </Tooltip>
                                                                        </NavLink>
                                                                    </Col>
                                                                </Row>
                                                            </Container>
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
                </Row>
            </Container>
        );
    }
}
export default OrdersDashboard;