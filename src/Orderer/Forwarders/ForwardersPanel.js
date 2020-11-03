import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { HiOutlineRefresh } from 'react-icons/hi';
import { CgMoreO } from 'react-icons/cg';
import { RiUserVoiceFill } from 'react-icons/ri';
import { AiOutlineMail, AiFillPhone } from 'react-icons/ai';
import { MDBDataTable } from 'mdbreact';
import { getSessionCookie } from '../../sessions';
import axios from 'axios';
import './ForwardersPanel.css';

class ForwardersPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: getSessionCookie(),
            forwarders: [],
            forwardersQuantity: '',
            selectedForwarder: '',
            selected: true
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
            });

            const data = await response.data;
            if(data.length === 0){
                this.setState({
                    forwarders: [],
                    forwardersQuantity: 0,
                    selectedForwarder: ''
                })
                return;
            }

            this.setState({
                forwarders: data,
                forwardersQuantity: data.length,
                selectedForwarder: data[0]
            })
        }
        catch(error){
            console.log(error);
        }
    }

    async componentDidMount(){
        await this.getForwarders();
    };

    // handle selected forwarder
    handleDetailsClick = (forwarder) => {
        this.setState({
            selectedForwarder: forwarder
        })
    }
    render(){
        return(
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col xs='4'>
                        <div className='Warehouse-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <label className='Warehouse-Stats-Header'>Wszystkich spedytorów</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label className='Warehouse-Stats-Header' style={{fontSize: '36px'}}>{this.state.forwardersQuantity}</label>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col xs='8'>
                        <div className='Warehouse-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className='Warehouse-Details-Header'>
                                            <RiUserVoiceFill size='1.2em'/> <span>&nbsp;</span><span>{this.state.selectedForwarder?.firstName} {this.state.selectedForwarder?.lastName}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className='Warehouse-Details-Sub'>
                                            {this.state.selectedForwarder?.login}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className='Warehouse-Details-Sub'>
                                            <AiOutlineMail size='1.5em'/> <span>&nbsp;&nbsp;</span><span>{this.state.selectedForwarder?.mail !== null ? this.state.selectedForwarder?.mail : 'brak danych'}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className='Warehouse-Details-Sub'>
                                            <AiFillPhone size='1.5em' /><span></span>&nbsp;&nbsp;&nbsp;<span>{this.state.selectedForwarder?.phoneNumber !== null ? this.state.selectedForwarder?.phoneNumber : 'brak danych'}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='Warehouses-Table-Container'>
                            <Container>
                                <Row>
                                    <Col xs='9'>
                                        <label className='Warehouse-Table-Header'>Lista spedytorów</label>
                                    </Col>
                                    <Col xs='1'style={{marginLeft: '25px'}}>
                                        <Button 
                                            className="Add-Warehouse-Redirect-Button" 
                                            variant="light"
                                            onClick={this.getForwarders}>
                                                <HiOutlineRefresh size='1.0em'/><span>&nbsp;</span><span>Odśwież</span>
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <MDBDataTable
                                            className='Warehouses-Data-Table'
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
                                                        width: 150,
                                                    },
                                                    {
                                                        label: 'Nazwisko',
                                                        field: 'lastName',
                                                        sort: 'asc',
                                                        width: 150
                                                    },
                                                    {
                                                        label: 'Login',
                                                        field: 'login',
                                                        sort: 'asc',
                                                        width: '150'
                                                    },
                                                    {
                                                        label: 'Adres email',
                                                        field: 'mail',
                                                        sort: 'asc',
                                                        width: '150'
                                                    },
                                                    {
                                                        label: '',
                                                        field: 'select',
                                                        sort: 'asc',
                                                        width: '150'
                                                    }
                                                ],
                                                rows: this.state.forwarders.map((forwarder) => (
                                                    {
                                                        firstName: forwarder.firstName,
                                                        lastName: forwarder.lastName,
                                                        login: forwarder.login,
                                                        mail: forwarder.mail,
                                                        select: 
                                                            <div className='Forwarder-Details-Icon' onClick={this.handleDetailsClick.bind(this, forwarder)}>
                                                                <CgMoreO className='User-Details-Icon'/>
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
export default ForwardersPanel;