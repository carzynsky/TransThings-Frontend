import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { getSessionCookie } from '../../sessions';
import { MDBDataTable } from 'mdbreact';
import { Doughnut } from 'react-chartjs-2';
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
        console.log('jestem')
        await axios.get('https://localhost:44394/users', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Bearer ' + this.state.token.token
            }
        }).then((response) => {
            this.setState({
                users: response.data
            })
        }).catch((error) => {
            console.log(error);
        })
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
            initials: ini
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
                            >DODAJ
                        </Button></NavLink>
                    </Col>
                    <Col xs='2'>
                    <Button
                        className="Add-User-Redirect-Button" 
                        variant="light">ODŚWIEŻ</Button>
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
                                        select: <label className='User-Details-Button' onClick={this.handleDetailsClick.bind(this, user)}>+</label>
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
                                    <Button 
                                        className="Edit-User-Redirect-Button" 
                                        variant="light"
                                    >EDYTUJ
                                    </Button>
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