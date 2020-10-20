import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AddUserPanel.css';

class EditUserPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            birthdate: new Date(),
            dateOfEmployment: new Date()
        }
    }
    componentDidMount(){
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col xs='8'>
                        <Row>
                            <div className='Add-User-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                    <label className='Add-User-Title'>Dane osobowe</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Form style={{paddingLeft: '10px'}}>
                                        <Form.Group controlId="formGroupNewUserFirstName">
                                            <Form.Label style={{color: 'white'}}>Imię</Form.Label>
                                            <Form.Control defaultValue='Maciej'className="My-Form-Add-User" autoComplete="off"/>
                                            <Form.Text className="text-muted" style={{color: 'white'}}></Form.Text>
                                        </Form.Group>
                                    </Form>
                                    </Col>
                                    <Col>
                                    <Form style={{paddingLeft: '10px'}}>
                                        <Form.Group controlId="formGroupNewUserFirstName">
                                            <Form.Label style={{color: 'white'}}>Nazwisko</Form.Label>
                                            <Form.Control  defaultValue='Kąska' className="My-Form-Add-User" autoComplete="off"/>
                                            <Form.Text className="text-muted" style={{color: 'white'}}></Form.Text>
                                        </Form.Group>
                                    </Form>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form>
                                            <Form.Group controlId="exampleForm.SelectCustom">
                                                <Form.Label style={{color: 'white'}}>Płeć</Form.Label>
                                                <Form.Control as="select" custom>
                                                    <option>Mężczyzna</option>
                                                    <option>Kobieta</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                    <Form style={{paddingLeft: '10px'}}>
                                        <Form.Group controlId="formGroupNewUserFirstName">
                                            <Form.Label style={{color: 'white'}}>Pesel</Form.Label>
                                            <Form.Control defaultValue='09080709812' className="My-Form-Add-User" autoComplete="off"/>
                                            <Form.Text className="text-muted" style={{color: 'white'}}></Form.Text>
                                        </Form.Group>
                                    </Form>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form style={{paddingLeft: '10px'}}>
                                            <Form.Group controlId="formGroupNewUserFirstName">
                                                <Form.Label style={{color: 'white'}}>Login:</Form.Label>
                                                <Form.Control defaultValue='maciej.kaska' className="My-Form-Add-User" autoComplete="off"/>
                                                <Form.Text className="text-muted" style={{color: 'white'}}></Form.Text>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form style={{paddingLeft: '10px'}}>
                                            <Form.Group controlId="formGroupNewUserFirstName">
                                                <Form.Label style={{color: 'white'}}>Mail:</Form.Label>
                                                <Form.Control defaultValue='maciej.kaska@gmail.com' className="My-Form-Add-User" autoComplete="off"/>
                                                <Form.Text className="text-muted" style={{color: 'white'}}></Form.Text>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form>
                                            <Form.Group controlId="exampleForm.SelectCustom">
                                                <Form.Label style={{color: 'white'}}>Rola</Form.Label>
                                                <Form.Control as="select" custom>
                                                    <option>Administrator</option>
                                                    <option>Pracownik zamówień</option>
                                                    <option>Spedytor</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
                            </div>
                        </Row>
                        <Row style={{marginTop: '25px'}}>
                            <Col xs='2'>
                            <NavLink className="Admin-Nav-Link" push to= '/admin/uzytkownicy/'>
                                <Button 
                                    className="Edit-User-Redirect-Button" 
                                    variant="light">WRÓĆ</Button>
                            </NavLink>
                            </Col>
                            
                            <Col xs='2'>
                            <NavLink className="Admin-Nav-Link" push to= '/admin/uzytkownicy/'>
                                <Button 
                                    className="Edit-User-Redirect-Button" 
                                    variant="light">ZAPISZ</Button>
                            </NavLink>
                            </Col>
                            <Col xs='8'></Col>
                        </Row>
                    </Col>
                    <Col xs='4' style={{paddingLeft: '50px'}}>
                        <Row>
                            <div className='Small-Calendar-Tile'>
                                <Container>
                                    <Row>
                                        <Col>
                                        <label className='Add-User-Title'>Data urodzenia</label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <Calendar className='Calendar-Style'
                                            // onChange={}
                                            value={this.state.birthdate}/>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </Row>
                        <Row>
                            <div className='Small-Calendar-Tile'>
                                <Container>
                                    <Row>
                                        <Col>
                                        <label className='Add-User-Title'>Data zatrudnienia</label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <Calendar className='Calendar-Style'
                                            // onChange={}
                                            value={this.state.birthdate}/>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </Row>
                        
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                </Row>
            </Container>
        );
    }

}
export default EditUserPanel