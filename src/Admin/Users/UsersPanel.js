import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { getSessionCookie } from '../../sessions';
import { MDBDataTable } from 'mdbreact';
import { Doughnut } from 'react-chartjs-2';
import { HiUserAdd, HiOutlineRefresh } from 'react-icons/hi';
import { CgMoreO }from 'react-icons/cg';
import { MdEdit } from 'react-icons/md';
import Circle from 'react-circle';
import axios from 'axios';
import './UsersPanel.css';

class UsersPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: getSessionCookie(),
            users: [],
            userRoles: [],
            addUserRedirect: false,
            initials: '',
            selectedUser: {
                id: '',
                firstName: '',
                lastName: '',
                gender: '',
                birthDate: '',
                dateOfEmployment: '',
                login: '',
                mail: '',
                phoneNumber: '',
                userRole: ''
            },
            doughnutChartData: {
                labels: [
                    'Spedytor',
                    'Admin',
                    'Pracownik zamówień'
                ],
                datasets: [{
                    data: [300, 50, 100],
                    borderColor: '#202125',
                    backgroundColor: [
                    '#db675c',
                    '#5cdb95',
                    ' #dbb35c'
                    ],
                    hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                    ]
                }]
            }
        }
    }

    // Get user roles from API
    async getUserRoles(){
        await axios.get('https://localhost:44394/user-roles', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Bearer ' + this.state.token.token
            }
        }).then((response) => {
            this.setState({
                userRoles: response.data
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    // Get users from API
    async getUsers(){
        try{
            const response = await axios.get('https://localhost:44394/users', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }});

            const data = await response.data;
            if(data.length === 0){
                this.setState({
                    users: [],
                    selectedUser: {
                        id: '',
                        firstName: '',
                        lastName: '',
                        gender: '',
                        birthDate: '',
                        dateOfEmployment: '',
                        login: '',
                        mail: '',
                        phoneNumber: '',
                        userRole: ''
                    },
                    initials: ''
                });
                return;
            }
            let ini = data[0].firstName[0].toUpperCase() + data[0].lastName[0].toUpperCase();
            this.setState({
                users: data,
                selectedUser: data[0],
                initials: ini
            })
        }
        catch(error){
            console.log(error);
        }
        
    }

    componentDidMount(){
        this.getUserRoles();
        this.getUsers();
    }

    handleDetailsClick = (data) => {
        let ini = data.firstName[0].toUpperCase() + data.lastName[0].toUpperCase();
        let tIndex = data.birthDate.indexOf('T');
        let bDate = data.birthDate?.substring(0, tIndex);
        let eDate = data.dateOfEmployment?.substring(0, tIndex);

        this.setState({
            selectedUser: {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                gender: data.gender,
                birthDate: bDate,
                dateOfEmployment: eDate,
                login: data.login,
                mail: data.mail,
                phoneNumber: data.phoneNumber,
                userRole: data.userRole
            },
            initials: ini,
            isSelected: true
        })
    }

    render(){
        return(
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col xs='4'>
                        <div className='User-Tile'>
                            <Doughnut 
                                data={this.state.doughnutChartData} 
                                options={{
                                    legend: {
                                        labels:{
                                            fontColor: 'white',
                                            fontSize: 13
                                        }
                                    }
                                }}
                            />
                        </div>
                    </Col>
                    <Col xs='2'>
                       
                        <div className='User-Tile' style={{paddingTop: '25px', textAlign: 'center', fontSize: '13px'}}>
                            <Container>
                                <Row>
                                    <Col>
                                        <label className="Log-Stats-Header-SubMessage">Logowania</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Circle
                                            animate={true}
                                            progress={95}
                                            animationDuration="1s"
                                            textColor="whitesmoke"
                                            bgColor="whitesmoke"
                                            lineWidth={30}
                                            progressColor="#5cdb95"
                                            showPercentageSymbol={true}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col xs='2'>
                        <div className='User-Tile'>
                            <Container>
                                <Row style={{paddingTop: '10px'}}>
                                    <Col>
                                        <label className="Log-Stats-Header-SubMessage">Dzisiaj</label>
                                        <label className="User-Details-SubMessage" style={{fontSize: '10px'}}>(wszystkich logowań)</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label className="Log-Stats-Header-SubMessage">122</label>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col xs='4'>
                        <div className='User-Tile'>
                        <Container>
                                <Row style={{paddingTop: '10px'}}>
                                    <Col>
                                        <label className="Log-Stats-Header-SubMessage">Ostatni zalogowany</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label className="User-Details-SubMessage">arkadiusz.carzynski</label>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop: '15px'}}>
                    <Col xs='2'>
                        <NavLink className="Add-User-Nav-Link" to= '/admin/uzytkownicy/dodaj'><Button 
                            className="Add-User-Redirect-Button" 
                            variant="light"
                            ><HiUserAdd size='1.2em'/><span>&nbsp;</span><span>Dodaj</span>
                        </Button></NavLink>
                    </Col>
                    <Col xs='2'>
                    <Button
                        className="Add-User-Redirect-Button" 
                        variant="light"><HiOutlineRefresh size='1.0em'/> <span>&nbsp;</span><span>Odśwież</span></Button>
                    </Col>
                </Row>
                <Row style={{marginTop: '15px'}}>
                    <Col xs='9' className='Users-Data-Table-Container' >
                    <MDBDataTable
                        className='Users-Data-Table'
                        style={{color: '#bdbbbb'}}
                        maxHeight="30vh"
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
                                    label: 'Login',
                                    field: 'login',
                                    sort: 'asc',
                                    width: 150
                                },
                                {
                                    label: 'Adres email',
                                    field: 'mail',
                                    sort: 'asc',
                                    width: 150
                                },
                                {
                                    label: 'Rola',
                                    field: 'role',
                                    sort: 'asc'
                                },
                                {
                                    label: '',
                                    field: 'select',
                                    sort: 'asc'
                                },
                            ],
                            rows: this.state.users.map((user) => (
                                
                                    {
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        login: user.login,
                                        mail: user.mail,
                                        role: user.userRole,
                                        select: <label className='User-Details-Button' onClick={this.handleDetailsClick.bind(this, user)}>
                                            <CgMoreO className='User-Details-Icon'/>
                                        </label>
                                    }
                                ))
                        }}
                    />
                    </Col>
                    <Col xs='4'>
                        <div className='Short-Details-User-Tile'>
                            <Container>
                            <Row>
                                <Col>
                                    <label className="User-Details-Header">Użytkownik</label>
                                </Col>
                                <Col>
                                </Col>
                                <Col style={{paddingTop: '10px'}}>
                                    <NavLink className="Add-User-Nav-Link" to={{
                                        pathname: '/admin/uzytkownicy/edytuj',
                                        userProps: this.state.selectedUser.id
                                    }}>
                                        <Button 
                                            className="Edit-User-Redirect-Button" 
                                            variant="light"
                                        ><MdEdit size='1.1em'/><span>&nbsp;</span><span>Edytuj</span>
                                        </Button>
                                    </NavLink>
                                </Col>
                            </Row>
                            <Row style={{marginTop: '10px'}}>
                                <Col xs='2'>
                                    <div className='Icon-Avatar'>{this.state.initials}</div>
                                </Col>
                                <Col xs='3' style={{paddingTop: '10px'}}>
                                    <label className="User-Details-SubMessage">{this.state.selectedUser.firstName}</label>
                                </Col>
                                <Col xs='3' style={{paddingTop: '10px'}}>
                                    <label className="User-Details-SubMessage">{this.state.selectedUser.lastName}</label>
                                </Col>
                            </Row>
                            <Row style={{paddingTop: '25px'}}>
                                <Col>
                                <label className="User-Details-SubMessage">Login: {this.state.selectedUser.login}</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                    <label className="User-Details-SubMessage">{this.state.selectedUser.gender === 'K' ? 'Kobieta' : 'Mężczyzna'}</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <label className="User-Details-SubMessage">Rola: {this.state.selectedUser.userRole}</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <label className="User-Details-SubMessage">Data urodzenia: {this.state.selectedUser.birthDate}</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <label className="User-Details-SubMessage">Data zatrudnienia: {this.state.selectedUser.dateOfEmployment}</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <label className="User-Details-SubMessage">Adres email: {this.state.selectedUser.mail}</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <label className="User-Details-SubMessage">Nr. telefonu: {this.state.selectedUser.phoneNumber}</label>
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
export default UsersPanel;