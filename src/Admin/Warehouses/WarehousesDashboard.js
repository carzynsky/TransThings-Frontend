import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { MdAdd, MdEdit, MdDone } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { CgMoreO } from 'react-icons/cg';
import { AiFillPhone, AiOutlineMail } from 'react-icons/ai';
import { IoMdContact } from 'react-icons/io';
import { ImCross } from 'react-icons/im';
import { FaFax, FaWarehouse } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { Tooltip } from '@material-ui/core';
import axios from 'axios';
import { getSessionCookie } from '../../sessions';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './WarehousesDashboard.css';

class WarehousesDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: getSessionCookie(),
            warehouses: [],
            warehousesQuantity: '',
            selectedWarehouse: '',
            selected: true,
            isModalOpen: false,
            serverResponse: '',
            isServerResponseModalOpen: false,
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
            if(data.length === 0){
                this.setState({
                    warehouses: [],
                    warehousesQuantity: 0,
                    selectedWarehouse: ''
                })
                return;
            }
            this.setState({
                warehouses: data,
                warehousesQuantity: data.length,
                selectedWarehouse: data[0]
            })
        }
        catch(error){
            console.log(error);
        }
    }

    async deleteWarehouse(){
        try
        {
            const response = await axios.delete('https://localhost:44394/warehouses/' + this.state.selectedWarehouse.id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });
            await this.getWarehouses();
            this.setState({
                serverResponse: response.data.message,
                isServerResponseModalOpen: true
            })
        }
        catch(error){
            if(error.response){
                if(error.response.data.message === undefined){
                    this.setState({
                        serverResponse: "Nie można usunąć magazynu!",
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

    async componentDidMount(){
        await this.getWarehouses();
    };

    handleDetailsClick = (warehouse) => {
        this.setState({
            selectedWarehouse: warehouse
        })
    }

    handleOpenModal = (warehouse) => {
        this.setState({
            selectedWarehouse: warehouse,
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

    render(){
        return(
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col xs='4'>
                        <div className='Warehouse-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <label className='Warehouse-Stats-Header'>Wszystkich magazynów</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label className='Warehouse-Stats-Header' style={{fontSize: '36px'}}>{this.state.warehousesQuantity}</label>
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
                                            <AiOutlineMail size='1.5em'/> <span>&nbsp;&nbsp;</span><span>{this.state.selectedWarehouse.mail !== null ? this.state.selectedWarehouse.mail : 'brak danych'}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className='Warehouse-Details-Sub'>
                                            <IoMdContact size='1.5em' /><span></span>&nbsp;&nbsp;&nbsp;<span>{this.state.selectedWarehouse.contactPersonFirstName}</span><span>&nbsp;</span><span>{this.state.selectedWarehouse.contactPersonLastName}</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='Warehouse-Details-Sub'>
                                            <AiFillPhone size='1.5em' /><span></span>&nbsp;&nbsp;&nbsp;<span>{this.state.selectedWarehouse.contactPhoneNumber !== null ? this.state.selectedWarehouse.contactPhoneNumber : 'brak danych'}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className='Warehouse-Details-Sub'>
                                            <FaFax size='1.5em' /><span></span>&nbsp;&nbsp;&nbsp;<span>{this.state.selectedWarehouse.fax !== null ? this.state.selectedWarehouse.fax : 'brak danych'}</span>
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
                                <Col xs='9'>
                                    <label className='Warehouse-Table-Header'>Lista magazynów</label>
                                </Col>
                                <Col xs='1'>
                                {this.state.token.role === 'Admin' &&
                                        <NavLink className="Add-User-Nav-Link" to='/admin/magazyny/dodaj'>
                                            <Button 
                                                className="Add-Warehouse-Redirect-Button" 
                                                variant="light">
                                                    <MdAdd size='1.0em'/><span>&nbsp;</span><span>Dodaj</span>
                                            </Button>
                                        </NavLink>
    }
                                </Col>
                                <Col xs='1'style={{marginLeft: '25px'}}>
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
                                                        width: 50
                                                    },
                                                    {
                                                        label: '',
                                                        field: 'edit',
                                                        width: 50,
                                                        sort: 'asc',
                                                    },
                                                    {
                                                        label: '',
                                                        field: 'delete',
                                                        width: 50,
                                                        sort: 'asc',
                                                    }
                                                ],
                                                rows: this.state.warehouses.map((warehouse) => (
                                                        {
                                                            warehouse: warehouse.name,
                                                            streetAddress: warehouse.streetAddress,
                                                            city: warehouse.city,
                                                            zipCode: warehouse.zipCode,
                                                            select: 
                                                            <Tooltip title="Szczegóły magazynu" aria-label="add">
                                                                <div className='User-Details-Button' onClick={this.handleDetailsClick.bind(this, warehouse)}>
                                                                    <CgMoreO className='Warehouse-Details-Icon'/>
                                                                </div>
                                                            </Tooltip>
                                                           ,
                                                            edit:
                                                                <div>
                                                                    {this.state.token.role === 'Admin' && 
                                                                    <NavLink className="Add-User-Nav-Link" to={{
                                                                        pathname: '/admin/magazyny/edytuj',
                                                                        warehouseProps: warehouse}}>
                                                                        <Tooltip title="Edycja magazynu" aria-label="add">
                                                                            <div className='User-Details-Button'>
                                                                                <MdEdit className='Warehouse-Details-Icon' size='1.0em'/>
                                                                            </div>
                                                                        </Tooltip>
                                                                    </NavLink>
                                                                    }
                                                                </div>,
                                                            delete:
                                                                <Tooltip title="Usuń magazyn" aria-label="add">
                                                                    <div className='User-Details-Button'>
                                                                        {this.state.token.role === 'Admin' &&
                                                                        <RiDeleteBin6Line 
                                                                            className='Warehouse-Details-Icon'
                                                                            onClick={this.handleOpenModal.bind(this, warehouse)}/>
                                                                        }
                                                                </div>
                                                                </Tooltip>
                                                        }
                                                    ))
                                            }}
                                    />
                                </Col>
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
                                        }}
                                    >
                                    { close => (
                                        <div>
                                            <Container>
                                                <Row style={{textAlign: 'center'}}>
                                                    <Col>
                                                        <label className='Edit-Warehouse-Modal-Header'>Czy na pewno chcesz usunąć magazyn {this.state.selectedWarehouse.name} ?</label>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop: '45px', textAlign: 'center'}}>
                                                    <Col>
                                                        <Button 
                                                            className="Confirm-Edit-Warehouse-Button" 
                                                            variant="light"
                                                            onClick={() => {
                                                                close()
                                                            }}>
                                                            <div>
                                                                <ImCross size='1.0em'/><span>&nbsp;</span><span>Nie</span>
                                                            </div>
                                                        </Button>
                                                    </Col>
                                                    <Col>
                                                        <Button 
                                                            className="Confirm-Edit-Warehouse-Button" 
                                                            variant="light"
                                                            onClick={() => {
                                                                this.deleteWarehouse();
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
                            </Row>
                            <Popup 
                                    modal
                                    open={this.state.isServerResponseModalOpen}
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
                                                        <label className='Edit-Warehouse-Modal-Header'>{this.state.serverResponse}</label>
                                                    </Col>
                                                </Row>
                                                <Row style={{textAlign: 'center', marginTop: '30px'}}>
                                                    <Col>
                                                        <Button 
                                                            className="Confirm-Edit-Warehouse-Button" 
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
export default WarehousesDashboard;