import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { MdAdd, MdEdit } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { CgMoreO } from 'react-icons/cg';
import { AiFillPhone, AiOutlineMail } from 'react-icons/ai';
import { IoMdContact } from 'react-icons/io';
import { FaFax, FaWarehouse } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import './WarehousesDashboard.css';
import { getSessionCookie } from '../../sessions';

class WarehousesDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: getSessionCookie(),
            warehouses: [],
            warehousesQuantity: '',
            selectedWarehouse: '',
            selected: false
        }
    }

    async getWarehouses(){
        try
        {
            const response = await axios.get('https://localhost:44394/warehouses', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
            this.setState({
                warehouses: data,
                warehousesQuantity: data.length
            })
        }
        catch(error){
            console.log(error);
        }
    }

    async componentDidMount(){
        await this.getWarehouses();
    };

    handleDetailsClick = (warehouse) => {
        console.log(warehouse)
        this.setState({
            selectedWarehouse: warehouse,
            selected: true
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
                                        <label className='Transporter-Table-Header'>Wszystkich magazynów</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label className='Transporter-Table-Header'>{this.state.warehousesQuantity}</label>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    {this.state.selected && 
                    <Col xs='8'>
                        <div className='Warehouse-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className='Warehouse-Details-Header'>
                                            <FaWarehouse size='1.2em'/> <span>&nbsp;</span><span>{this.state.selectedWarehouse.name}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className='Warehouse-Details-Sub'>
                                            <AiOutlineMail size='1.5em'/> <span>&nbsp;</span><span>{this.state.selectedWarehouse.mail !== null ? this.state.selectedWarehouse.mail : 'brak danych'}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className='Warehouse-Details-Sub'>
                                            <IoMdContact size='1.5em' /><span></span>&nbsp;&nbsp;<span>{this.state.selectedWarehouse.contactPersonFirstName}</span><span>&nbsp;</span><span>{this.state.selectedWarehouse.contactPersonLastName}</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='Warehouse-Details-Sub'>
                                            <AiFillPhone size='1.5em' /><span></span>&nbsp;&nbsp;<span>{this.state.selectedWarehouse.contactPhoneNumber !== null ? this.state.selectedWarehouse.contactPhoneNumber : 'brak danych'}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className='Warehouse-Details-Sub'>
                                            <FaFax size='1.5em' /><span></span>&nbsp;&nbsp;<span>{this.state.selectedWarehouse.fax !== null ? this.state.selectedWarehouse.fax : 'brak danych'}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>}
                </Row>
                <Row>
                    <Col>
                    <div className='Warehouses-Table-Container'>
                        <Container>
                            <Row>
                                <Col xs='8'>
                                    <label className='Warehouse-Table-Header'>Lista magazynów</label>
                                </Col>
                                <Col xs='2'>
                                        <NavLink className="Add-User-Nav-Link" to='/admin/magazyny/dodaj'>
                                            <Button 
                                                className="Add-Warehouse-Redirect-Button" 
                                                variant="light">
                                                    <MdAdd size='1.0em'/><span>&nbsp;</span><span>Dodaj</span>
                                            </Button>
                                        </NavLink>
                                </Col>
                                <Col xs='2'>
                                    <Button 
                                        className="Add-Warehouse-Redirect-Button" 
                                        variant="light"
                                        onClick={this.getWarehouses.bind(this)}>
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
                                                        label: 'Magazyn',
                                                        field: 'warehouse',
                                                        sort: 'asc',
                                                        width: 150,
                                                    },
                                                    {
                                                        label: 'Adres',
                                                        field: 'streetAddress',
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
                                                        label: 'Kod pocztowy',
                                                        field: 'zipCode',
                                                        sort: 'asc',
                                                        width: 150
                                                    },
                                                    {
                                                        label: '',
                                                        field: 'select',
                                                        sort: 'asc',
                                                        width: 50
                                                    },
                                                    {
                                                        label: '',
                                                        field: 'edit',
                                                        width: 50
                                                    },
                                                    {
                                                        label: '',
                                                        field: 'delete',
                                                        width: 50
                                                    }
                                                ],
                                                rows: this.state.warehouses.map((warehouse) => (
                                                        {
                                                            warehouse: warehouse.name,
                                                            streetAddress: warehouse.streetAddress,
                                                            city: warehouse.city,
                                                            zipCode: warehouse.zipCode,
                                                            select: <div className='User-Details-Button' onClick={this.handleDetailsClick.bind(this, warehouse)}>
                                                                        <CgMoreO className='Warehouse-Details-Icon'/>
                                                                    </div>,
                                                            edit: <div className='User-Details-Button' onClick={this.handleDetailsClick.bind(this, warehouse)}>
                                                                        <MdEdit className='Warehouse-Details-Icon'/>
                                                                    </div>,
                                                            delete: <div className='User-Details-Button'>
                                                                    <RiDeleteBin6Line className='Warehouse-Details-Icon'/>
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
export default WarehousesDashboard;