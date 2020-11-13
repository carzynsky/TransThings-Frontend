import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { HiOutlineRefresh } from 'react-icons/hi';
import { MdShowChart, MdEdit } from 'react-icons/md';
import { BiShowAlt } from 'react-icons/bi';
import { Tooltip } from '@material-ui/core';
import { MDBDataTable } from 'mdbreact';
import { getSessionCookie } from '../../sessions';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './ForwarderForwardingOrdersDashboard.css';

class ForwarderForwardingOrdersDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: getSessionCookie(),
            forwardingOrders: [],
            forwardingOrdersQuantity: '',
            userForwardingOrdersQuantity: ''
        }
    }

    // GET call to API to get forwardingOrders
    async getForwardingOrders(){
        try
        {
            const response = await axios.get('https://localhost:44394/forwarding-orders', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
            if(data.length === 0){
                this.setState({
                    forwardingOrders: [],
                    forwardingOrdersQuantity: 0,
                    userForwardingOrdersQuantity: 0
                })
                return
            }

            let filtered =  data.filter(x => x.forwarderId === this.state.token.userId)

            this.setState({
                forwardingOrders: data,
                forwardingOrdersQuantity: data.length,
                userForwardingOrdersQuantity: filtered.length
            })
        }
        catch(error){
            console.log(error);
        }
    }

    async componentDidMount(){
        await this.getForwardingOrders();
    };

    render(){
        return(
            <Container>
                <Row style={{ marginTop: 50 }}>
                    <Col xs='9' style={{ minWidth: 450 }}>
                        <div className='Orders-Header'>Zlecenia spedycji</div>
                    </Col>

                    <Col style={{ minWidth: 120, marginTop: 10, textAlign: 'right' }}>
                        <Button 
                            className="Orders-Button" 
                            variant="light"
                            >
                                <HiOutlineRefresh size='1.0em'/><span>&nbsp;</span><span>Odśwież</span>
                        </Button>
                    </Col>
                </Row>
                <Row style={{ marginTop: 15 }}>
                    <Col>
                        <div className='Orders-Sub-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className='Orders-Stats-Header' style={{ fontSize: 14 }}>
                                            <MdShowChart size='1.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Wszystkich zleceń</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'center'}}>
                                    <Col>
                                        <div className='Orders-Stats-Number'>{this.state.forwardingOrdersQuantity}</div>
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
                                            <MdShowChart size='1.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Moje aktywne zlecenia</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'center'}}>
                                    <Col>
                                        <div className='Orders-Stats-Number'>{this.state.userForwardingOrdersQuantity}</div>
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
                                                columns: forwardingOrdersColumns,
                                                rows: this.state.forwardingOrders.map((forwardingOrder) => (
                                                    {
                                                        forwardingOrderNumber: forwardingOrder.forwardingOrderNumber,
                                                        createDate: forwardingOrder.createDate.split('T')[0],
                                                        forwarder: forwardingOrder.forwarder?.firstName + ' ' + forwardingOrder.forwarder?.lastName,
                                                        contactPhoneNumber: forwardingOrder.forwarder?.phoneNumber,
                                                        select: 
                                                                <Tooltip title="Pokaż szczegóły zlecenia" aria-label="add">
                                                                    <div className='User-Details-Button'>
                                                                        <BiShowAlt className='Warehouse-Details-Icon' size='1.4em'/>
                                                                    </div>
                                                                </Tooltip>,
                                                        edit: this.state.token.userId === forwardingOrder.forwarderId ?
                                                                <NavLink className='Add-User-Nav-Link' to={{
                                                                    pathname: '/spedytor/zlecenia/'+ forwardingOrder.id,
                                                                    }}>
                                                                    <Tooltip title="Edytuj zlecenie" aria-label="add">
                                                                        <div className='User-Details-Button'>
                                                                            <MdEdit className='Warehouse-Details-Icon' size='1.0em'/>
                                                                        </div>
                                                                    </Tooltip>
                                                                </NavLink> : ''
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
export default ForwarderForwardingOrdersDashboard;

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
        sort: 'asc',
        width: '50'
    },
    {
        label: '',
        field: 'edit',
        sort: 'asc'
    }
]