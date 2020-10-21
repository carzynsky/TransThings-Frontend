import React, { Component } from 'react';
import { Row, Col, Container, Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { getSessionCookie } from '../../sessions';
import axios from 'axios';
import './CustomersDashboard.css';

class CustomersDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            customers: [],
            customersCount: '',
            token: getSessionCookie()
        }
    }

    async getCustomers(){
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
            this.setState({
                customers: data,
                customersCount: data.length
            })
        }
        catch(error){
            console.log(error);
        }
    }

    async componentDidMount(){
        await this.getCustomers();
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col>
                        <div className='Customer-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <label className="Customer-Info-Header">Kontrahenci</label>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col>
                        <div className='Customer-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <label className="Customer-Info-Header">Wszystkich</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label className="Customer-Info-Header" style={{color: 'white', fontSize: '30px'}}>{this.state.customersCount}</label>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col>
                        <div className='Customer-Tile'>
                        <Container>
                                <Row>
                                    <Col>
                                        <label className="Customer-Info-Header">Inne</label>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className='Customers-Data-Table-Container'>
                            <Container>
                                <Row>
                                    <Col>
                                        <label className="Customer-Info-Header">Lista kontrahentów</label>
                                    </Col>
                                    <Col style={{textAlign: 'right'}}>
                                    <NavLink className="Add-User-Nav-Link" push to= '/admin/kontrahenci/dodaj'>
                                        <label className="Add-Customer-Redirect">+ Dodaj</label>
                                    </NavLink>
                                    </Col>
                                </Row>
                                <Row>
                                <MDBDataTable
                                    className='Customers-Data-Table'
                                    style={{color: '#bdbbbb'}}
                                    maxHeight="40vh"
                                    scrollY
                                    small
                                    data={{
                                        columns: [
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
                                                width: 150
                                            },
                                            {
                                                label: 'Firma (skrót)',
                                                field: 'companyShortName',
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
                                                label: 'Miasto',
                                                field: 'city',
                                                sort: 'asc',
                                                width: 150
                                            },
                                            {
                                                label: 'Adres',
                                                field: 'streetName',
                                                sort: 'asc',
                                                width: 150
                                            },
                                            {
                                                label: 'Nr. kontaktowy',
                                                field: 'phoneNumber1',
                                                sort: 'asc',
                                                width: 150
                                            },
                                            {
                                                label: '',
                                                field: 'edit',
                                                width: 150
                                            }
                                        ],
                                        rows: this.state.customers.map((customer) => (
                                            
                                                {
                                                    firstName: customer.clientFirstName,
                                                    lastName: customer.clientLastName,
                                                    companyFullName: customer.companyFullName,
                                                    companyShortName: customer.companyShortName,
                                                    nip: customer.nip,
                                                    city: customer.city,
                                                    streetName: customer.streetName,
                                                    phoneNumber1: customer.contactPhoneNumber1,
                                                    edit:
                                                        <NavLink className="Add-User-Nav-Link" push to={{
                                                            pathname: '/admin/kontrahenci/edytuj',
                                                            customerProps: customer.id
                                                        }}>
                                                            <Button 
                                                                className="Edit-Customer-Redirect-Button" 
                                                                variant="light"
                                                            >Edytuj</Button>
                                                        </NavLink>
                                                }
                                            ))
                                    }}
                                />
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default CustomersDashboard;