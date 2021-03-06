import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { HiOutlineRefresh } from 'react-icons/hi';
import { MdShowChart } from 'react-icons/md';
import { WiTime5 } from 'react-icons/wi';
import { BiShowAlt } from 'react-icons/bi';
import { Tooltip } from '@material-ui/core';
import { MDBDataTable } from 'mdbreact';
import { getSessionCookie } from '../../sessions';
import axios from 'axios';
import './ConsultationsDashboard.css';

class ConsultationsDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: getSessionCookie(),
            consultationOrders: [],
            consultationOrdersQuantity: ''
        }
    }

    // GET call to API to get orders ready for consultation by logged user
    async getOrdersReadyForConsultations(){
        try
        {
            const response = await axios.get('https://localhost:44394/orders/consultants/' + this.state.token.userId, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
            if(data.length === 0){
                this.setState({
                    consultationOrders: [],
                    consultationOrdersQuantity: 0
                })
                return
            }

            this.setState({
                consultationOrders: data,
                consultationOrdersQuantity: data.length
            })
        }
        catch(error){
            console.log(error);
        }
    }

    async componentDidMount(){
        await this.getOrdersReadyForConsultations()
    };

    render(){
        return(
            <Container>
                <Row style={{ marginTop: 50 }}>
                    <Col xs='9' style={{ minWidth: 450 }}>
                        <div className='Orders-Header'>Konsultacje zamówień transportu</div>
                    </Col>

                    <Col style={{minWidth: '120px', marginTop: '10px', textAlign: 'right' }}>
                        <Button 
                            className="Orders-Button" 
                            variant="light"
                            onClick={this.getOrdersReadyForConsultations}>
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
                                            <WiTime5 size='1.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Oczekujące konsultacje</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'center'}}>
                                    <Col>
                                        <div className='Orders-Stats-Number'>{this.state.consultationOrdersQuantity}</div>
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
                                            <MdShowChart size='1.5em'/><span>&nbsp;&nbsp;&nbsp;</span><span>Moje konsultacje</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'center'}}>
                                    <Col>
                                        <div className='Orders-Stats-Number'>{this.state.consultationOrdersQuantity}</div>
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
                                                columns: consultationOrdersColumns,
                                                rows: this.state.consultationOrders.map((consultationOrder) => (
                                                    {
                                                        orderNumber: consultationOrder.orderNumber,
                                                        client: consultationOrder.client?.clientFirstName + ' ' + consultationOrder.client?.clientLastName,
                                                        path: consultationOrder.warehouse?.city + '-' + consultationOrder.destinationCity,
                                                        expectedDate: consultationOrder.orderExpectedDate.split('T')[0],
                                                        select: 
                                                                <NavLink className="Add-User-Nav-Link" to={{
                                                                    pathname: '/spedytor/konsultacje-spedycji/' + consultationOrder.id,
                                                                    }}>
                                                                    <Tooltip title="Pokaż zamówienie" aria-label="add">
                                                                        <div className='User-Details-Button'>
                                                                            <BiShowAlt className='Warehouse-Details-Icon' size='1.4em'/>
                                                                        </div>
                                                                    </Tooltip>
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
                </Row>
            </Container>
        );
    }
}
export default ConsultationsDashboard;

const consultationOrdersColumns = 
[
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
        width: '200'
    },
    {
        label: 'Trasa',
        field: 'path',
        sort: 'asc',
        width: '250'
    },
    {
        label: 'Data zlecenia',
        field: 'expectedDate',
        sort: 'asc',
        width: '200'
    },
    {
        label: '',
        field: 'select',
        sort: 'asc'
    }
]