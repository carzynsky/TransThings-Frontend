import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { HiOutlineRefresh } from 'react-icons/hi';
import { MdAdd } from 'react-icons/md';
import { MDBDataTable } from 'mdbreact';
import { getSessionCookie } from '../../sessions';
import axios from 'axios';
import './OrdersDashboard.css';

class OrdersDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: getSessionCookie(),
            orders: [],
            ordersQuantity: ''
        }
    }

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
            console.log(data)
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

    async componentDidMount(){
        await this.getOrders();
    };

    render(){
        return(
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col xs='8'>
                        <label className='Warehouse-Stats-Header'>Zamówienia transportu</label>
                    </Col>

                    <Col xs='2' style={{minWidth: '120px'}}>
                        <Button 
                            className="Add-Warehouse-Redirect-Button" 
                            variant="light"
                            onClick={this.getOrders}>
                                <HiOutlineRefresh size='1.0em'/><span>&nbsp;</span><span>Odśwież</span>
                        </Button>
                    </Col>
                    <Col xs='2' style={{minWidth: '120px'}}>
                        <Button 
                            className="Add-Warehouse-Redirect-Button" 
                            variant="light">
                                <MdAdd size='1.0em'/><span>&nbsp;</span><span>Dodaj</span>
                        </Button>
                    </Col>
                </Row>
                <Row>
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
                                                        width: '180'
                                                    },
                                                    {
                                                        label: 'Trasa',
                                                        field: 'path',
                                                        sort: 'asc',
                                                        width: '220'
                                                    },
                                                    {
                                                        label: 'Data zlecenia',
                                                        field: 'expectedDate',
                                                        sort: 'asc',
                                                        width: '100'
                                                    },
                                                    {
                                                        label: 'Status',
                                                        field: 'orderStatus',
                                                        sort: 'asc',
                                                        width: '100'
                                                    },
                                                    {
                                                        label: '',
                                                        field: 'select',
                                                        sort: 'asc',
                                                    }
                                                ],
                                                rows: this.state.orders.map((order) => (
                                                    {
                                                        orderNumber: order.orderNumber,
                                                        forwardingOrderNumber: order.forwardingOrderNumber?.forwardingOrderNumber,
                                                        client: order.client.clientFirstName + ' ' + order.client.clientLastName,
                                                        path: order.warehouse.city + '-' + order.destinationCity,
                                                        expectedDate: order.orderExpectedDate.split('T')[0],
                                                        orderStatus: order.orderStatus?.statusName
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