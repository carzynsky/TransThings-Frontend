import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { HiOutlineRefresh } from 'react-icons/hi';
import { CgMoreO } from 'react-icons/cg';
import { MDBDataTable } from 'mdbreact';
import { getSessionCookie } from '../../sessions';
import { Select, FormControl, MenuItem, InputLabel, Tooltip } from '@material-ui/core';
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
                <Row style={{marginTop: '50px'}}>
                    <Col xs='9' style={{minWidth: '450px'}}>
                        <div className='Orders-Header'>Konsultacje zamówień transportu</div>
                    </Col>

                    <Col xs='1' style={{minWidth: '120px', marginTop: '10px'}}>
                        <Button 
                            className="Orders-Button" 
                            variant="light"
                            >
                                <HiOutlineRefresh size='1.0em'/><span>&nbsp;</span><span>Odśwież</span>
                        </Button>
                    </Col>
                    {/* <Col xs='1' style={{minWidth: '120px', marginTop: '10px'}}>
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
                    </Col> */}
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
                                                                        <div className='User-Details-Button'>
                                                                            <CgMoreO className='Warehouse-Details-Icon'/>
                                                                        </div>
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
        label: '',
        field: 'select',
        sort: 'asc'
    }
]