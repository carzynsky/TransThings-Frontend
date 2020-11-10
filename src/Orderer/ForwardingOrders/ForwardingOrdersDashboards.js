import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { HiOutlineRefresh } from 'react-icons/hi';
import { MDBDataTable } from 'mdbreact';
import { getSessionCookie } from '../../sessions';
import axios from 'axios';
import './ForwardingOrdersDashboard.css';

class ForwardingOrdersDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: getSessionCookie(),
            forwardingOrders: [],
            forwardingOrdersQuantity: ''
        }
    }

    // GET call to API to get forwarders
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
                    forwardingOrdersQuantity: 0
                })
                return
            }

            this.setState({
                forwardingOrders: data,
                forwardingOrdersQuantity: data.length
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
                <Row style={{marginTop: '50px'}}>
                    <Col xs='9' style={{minWidth: '450px'}}>
                        <div className='Orders-Header'>Zlecenia spedycji</div>
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
                                                columns: [
                                                    {
                                                        label: 'Nr. zlecenia',
                                                        field: 'forwardingOrderNumber',
                                                        sort: 'asc',
                                                        width: '200'
                                                    },
                                                    {
                                                        label: 'Data utworzenia',
                                                        field: 'createDate',
                                                        sort: 'asc',
                                                        width: '150'
                                                    },
                                                    {
                                                        label: 'Spedytor',
                                                        field: 'forwarder',
                                                        sort: 'asc',
                                                        width: '200'
                                                    }
                                                ],
                                                rows: this.state.forwardingOrders.map((forwardingOrder) => (
                                                    {
                                                        forwardingOrderNumber: forwardingOrder.forwardingOrderNumber,
                                                        createDate: forwardingOrder.createDate.split('T')[0],
                                                        forwarder: forwardingOrder.forwarder?.firstName + ' ' + forwardingOrder.forwarder?.lastName,
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
export default ForwardingOrdersDashboard;