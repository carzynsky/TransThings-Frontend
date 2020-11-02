import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { getSessionCookie } from '../../sessions';
import { MDBDataTable } from 'mdbreact';
import { Doughnut } from 'react-chartjs-2';
import { HiUserAdd, HiOutlineRefresh } from 'react-icons/hi';
import { RiFileHistoryLine, RiDeleteBin6Line } from 'react-icons/ri';
import { CgMoreO }from 'react-icons/cg';
import { MdEdit, MdDone } from 'react-icons/md';
import { ImCross } from 'react-icons/im';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
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
            serverResponse: '',
            isServerResponseModalOpen: false,
            isModalOpen: false,
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
            let tIndex = data[0].birthDate.indexOf('T');
            let bDate = data[0].birthDate?.substring(0, tIndex);
            let eDate = data[0].dateOfEmployment?.substring(0, tIndex);

            this.setState({
                users: data,
                selectedUser: {
                    id: data[0].id,
                    firstName: data[0].firstName,
                    lastName: data[0].lastName,
                    gender: data[0].gender,
                    login: data[0].login,
                    mail: data[0].mail,
                    phoneNumber: data[0].phoneNumber,
                    userRole: data[0].userRole,
                    birthDate: bDate,
                    dateOfEmployment: eDate
                },
                initials: ini
            })
        }
        catch(error){
            console.log(error);
        }
    }

     // DELETE call to api for removing selected user
     async deleteUser(){
        await this.deleteUserLoginHistory();
        try
        {
            const response = await axios.delete('https://localhost:44394/users/' + this.state.selectedUser.id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            this.setState({
                serverResponse: response.data.message,
                isServerResponseModalOpen: true
            })

            await this.getUsers();
        }
        catch(error){
            if(error.response){
                this.setState({
                    serverResponse: error.response.data.message,
                    isServerResponseModalOpen: false
                })
            }
            console.log(error);
        }
    }

    // DELETE call to api for removing selected user's all login history
     async deleteUserLoginHistory(){
        try
        {
            await axios.delete('https://localhost:44394/login-histories/users/' + this.state.selectedUser.id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });
        }
        catch(error){
            console.log(error);
        }
    }

    async componentDidMount(){
        await this.getUserRoles();
        await this.getUsers();
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

    // handle modal open/close
    handleOpenModal = () => {
        this.setState({
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
                        <NavLink className="Add-User-Nav-Link" to= '/admin/uzytkownicy/dodaj'>
                            <Button 
                                className="Add-User-Redirect-Button" 
                                variant="light"
                                ><HiUserAdd size='1.2em'/><span>&nbsp;</span><span>Dodaj</span>
                            </Button>
                        </NavLink>
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
                                <Col xs='4'>
                                    <label className="User-Details-Header">Użytkownik</label>
                                </Col>
                                <Col xs='4'>
                                </Col>
                                <Col xs ='1'style={{paddingTop: '15px'}}>
                                    <NavLink className="Add-User-Nav-Link" to={{
                                        pathname: '/admin/uzytkownicy/edytuj/' + this.state.selectedUser.id,
                                        state: { from: this.props.location.pathname }
                                    }}>
                                      <MdEdit size='1.5em' className='User-Details-Icon'/>
                                    </NavLink>
                                </Col>
                                <Col xs ='1' style={{paddingTop: '15px'}}>
                                    <NavLink className="Add-User-Nav-Link" to={{
                                        pathname: '/admin/uzytkownicy/historia-logowan/' + this.state.selectedUser.id
                                    }}>
                                      <RiFileHistoryLine size='1.5em' className='User-Details-Icon-Login-History-Redirect'/>
                                    </NavLink>
                                </Col>
                                <Col xs ='1' style={{paddingTop: '15px'}}>
                                    {this.state.selectedUser.login !== this.state.token.login &&
                                    <div>
                                        <Popup 
                                            trigger={
                                                        <div>
                                                            <RiDeleteBin6Line size='1.5em' className='User-Details-Icon-Delete-Redirect'/>
                                                        </div>
                                                    }
                                            modal
                                            open={this.state.isModalOpen}
                                            onOpen={this.handleOpenModal}
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
                                                                        <label className='Delete-User-Modal-Header'>Czy na pewno chcesz usunąć użytkownika {this.state.selectedUser.firstName} {this.state.selectedUser.lastName}?</label>
                                                                    </Col>
                                                                </Row>
                                                                <Row style={{marginTop: '25px', textAlign: 'center'}}>
                                                                    <Col>
                                                                        <Button 
                                                                            className="Confirm-Delete-User-Button" 
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
                                                                            className="Confirm-Delete-User-Button" 
                                                                            variant="light"
                                                                            onClick={() => {
                                                                                this.deleteUser();
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
                                       
                                    </div>}
                                    <Popup 
                                            modal
                                            open={this.state.isServerResponseModalOpen}
                                            contentStyle={{
                                                width: '30vw',
                                                height: '25vh',
                                                backgroundColor: '#202125',
                                                borderColor: '#202125',
                                                borderRadius: '15px',
                                                }}>
                                            {
                                                close => (
                                                        <Container>
                                                            <Row style={{textAlign: 'center'}}>
                                                                <Col>
                                                                    <label className='Delete-User-Modal-Header'>{this.state.serverResponse}</label>
                                                                </Col>
                                                            </Row>
                                                            <Row style={{textAlign: 'center', marginTop: '30px'}}>
                                                                <Col>
                                                                    <Button 
                                                                        className="Confirm-Delete-User-Button" 
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
                                </Col>
                            </Row>
                            <Row style={{marginTop: '10px'}}>
                                <Col xs='2'>
                                    <div className='Icon-Avatar'>{this.state.initials}</div>
                                </Col>
                                <Col style={{paddingTop: '10px'}}>
                                    <label className="User-Details-SubMessage">{this.state.selectedUser.firstName}<span>&nbsp;&nbsp;</span>{this.state.selectedUser.lastName}</label>
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