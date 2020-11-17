import React, { Component } from 'react';
import { Row, Col, Container, Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { getSessionCookie } from '../../sessions';
import { MdEdit, MdDone, MdShowChart } from 'react-icons/md';
import { HiUserAdd } from 'react-icons/hi';
import { FaUserTie } from 'react-icons/fa';
import { Tooltip } from '@material-ui/core';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ImCross } from 'react-icons/im';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import './CustomersDashboard.css';

class CustomersDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            customers: [],
            customersCount: '',
            token: getSessionCookie(),
            selectedCustomerId: '',
            selectedCustomer: '',
            serverResponse: '',
            isServerResponseModalOpen: false,
            isModalOpen: false,
        }
    }

    // GET call to api for customers
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

      // DELETE call to api for removing selected customer
    async deleteCustomer(){
        try
        {
            const response = await axios.delete('https://localhost:44394/clients/' + this.state.selectedCustomer.id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            await this.getCustomers();
            this.setState({
                serverResponse: response.data.message,
                isServerResponseModalOpen: true
            })

        }
        catch(error){
            if(error.response){
                if(error.response.data.message === undefined){
                    this.setState({
                        serverResponse: "Nie można usunąć kontrahenta!",
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

    // Handle id for selected customer
    handleSelectedCustomer = (data) => {
        this.setState({
            selectedCustomerId: data
        })
    }

    // handle modal open/close
    handleOpenModal = (customer) => {
        this.setState({
            selectedCustomer: customer,
            isModalOpen: true
        })
    }

    handleCloseModal = () => {
        this.setState({
            isModalOpen: false
        })
    }

    handleCloseServerResponseModal = () =>{
        this.setState({
            isServerResponseModalOpen: false
        })
    }

    async componentDidMount(){
        await this.getCustomers();
    }

    render(){
        return(
            <Container>
                <Row style={{ marginTop: 100 }}>
                    <Col>
                        <div className='Customers-Data-Table-Container'>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className="Customer-Info-Header">
                                            <FaUserTie size='2.0em' style={{ paddingBottom: 10 }}/><span>&nbsp;&nbsp;</span><span style={{ fontSize: 26 }}>Lista kontrahentów</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="Customer-Info-Header">
                                            <MdShowChart size='1.5em'/><span>&nbsp;&nbsp;</span><span style={{ fontSize: 26 }}>{this.state.customersCount}</span>
                                        </div>
                                    </Col>
                                    <Col style={{textAlign: 'right', paddingRight: '30px'}}>
                                        <NavLink className="Add-User-Nav-Link" to={{
                                            pathname: this.state.token.role === 'Admin' ? '/admin/kontrahenci/dodaj' 
                                            : '/pracownik-zamowien/kontrahenci/dodaj'
                                        }}>
                                            <Button 
                                                className="Add-Customer-Redirect-Button" 
                                                variant="light">
                                                <HiUserAdd size='1.2em'/><span>&nbsp;</span><span>Dodaj</span>
                                            </Button>
                                        </NavLink>
                                    </Col>
                                </Row>
                                <Row style={{paddingTop: 25 }}>
                                <MDBDataTable
                                    className='Customers-Data-Table'
                                    style={{color: '#bdbbbb'}}
                                    maxHeight="35vh"
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
                                                width: 50
                                            },
                                            {
                                                label: '',
                                                field: 'delete',
                                            }
                                        ],
                                        rows: this.state.customers.map((customer) => (
                                            
                                                {
                                                    firstName: customer.clientFirstName,
                                                    lastName: customer.clientLastName,
                                                    companyFullName: customer.companyFullName,
                                                    nip: customer.nip,
                                                    city: customer.city,
                                                    streetName: customer.streetName,
                                                    phoneNumber1: customer.contactPhoneNumber1,
                                                    edit:
                                                        <Tooltip title="Edycja kontrahenta" aria-label="add">
                                                            <NavLink className="Add-User-Nav-Link" push to={{
                                                                pathname: this.state.token.role === 'Admin' ?
                                                                '/admin/kontrahenci/edytuj/' + customer.id 
                                                                : '/pracownik-zamowien/kontrahenci/edytuj/' + customer.id
                                                            }}>
                                                                <MdEdit size='1.3em' className='Customer-Details-Icon'/>
                                                            </NavLink>
                                                        </Tooltip>,
                                                    delete:
                                                            <Tooltip title="Usuń kontrahenta" aria-label="add">
                                                                <div>
                                                                    <RiDeleteBin6Line 
                                                                        size='1.3em' 
                                                                        className='Customer-Details-Icon'
                                                                        onClick={this.handleOpenModal.bind(this, customer)}/>
                                                                </div>
                                                            </Tooltip>
                                                }
                                            ))
                                    }}
                                />
                                </Row>
                                <Popup 
                                    modal
                                    open={this.state.isModalOpen}
                                    onClose={this.handleCloseModal}
                                    contentStyle={{
                                        width: '35vw',
                                        height: '30vh',
                                        backgroundColor: '#202125',
                                        borderColor: '#202125',
                                        borderRadius: '15px',
                                    }}>
                                    { close => (<div>
                                            <Container>
                                                <Row style={{textAlign: 'center'}}>
                                                    <Col>
                                                        <label className='Delete-Customer-Modal-Header'>Czy na pewno chcesz usunąć kontrahenta {this.state.selectedCustomer.clientFirstName} {this.state.selectedCustomer.clientLastName}?</label>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop: '25px', textAlign: 'center'}}>
                                                    <Col>
                                                        <Button 
                                                            className="Confirm-Delete-Customer-Button" 
                                                            variant="light"
                                                            onClick={() => {
                                                                close();
                                                            }}>
                                                            <div>
                                                                <ImCross size='1.0em'/><span>&nbsp;</span><span>Nie</span>
                                                            </div>
                                                        </Button>
                                                    </Col>
                                                    <Col>
                                                        <Button 
                                                            className="Confirm-Delete-Customer-Button" 
                                                            variant="light"
                                                            onClick={() => {
                                                                this.deleteCustomer();
                                                                close();
                                                            }}>
                                                            <div>
                                                                <MdDone size='1.5em'/><span>&nbsp;</span><span>Tak</span>
                                                            </div>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </div>
                                    )}
                                </Popup>
                                <Popup 
                                    modal
                                    open={this.state.isServerResponseModalOpen}
                                    onClose={this.handleCloseServerResponseModal.bind(this)}
                                    contentStyle={{
                                    width: '30vw',
                                    height: '25vh',
                                    backgroundColor: '#202125',
                                    borderColor: '#202125',
                                    borderRadius: '15px',}}>
                                    {
                                        close => (
                                            <Container>
                                                <Row style={{textAlign: 'center'}}>
                                                    <Col>
                                                        <label className='Delete-Customer-Modal-Header'>{this.state.serverResponse}</label>
                                                    </Col>
                                                </Row>
                                                <Row style={{textAlign: 'center', marginTop: '30px'}}>
                                                    <Col>
                                                        <Button 
                                                            className="Confirm-Delete-Customer-Button" 
                                                            variant="light"
                                                            onClick={() => {
                                                                this.handleCloseServerResponseModal();
                                                                close();
                                                            }}>
                                                            Zamknij
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        )
                                    }
                                </Popup>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default CustomersDashboard;