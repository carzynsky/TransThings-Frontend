import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './AddCustomerPanel.css';

class AddCustomerPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
    }

    render(){
        return(
           <Container>
               <Row>
                   <Col>
                        <div className='Edit-Customer-Container'>
                            <Container>
                                <Row>
                                    <Col>
                                        <Form style={{paddingLeft: '10px'}}>
                                            <Form.Group controlId="formGroupEditCustomerFirstName">
                                                <Form.Label style={{color: 'white'}}>Imię</Form.Label>
                                                <Form.Control className="My-Form-Add-User" autoComplete="off"/>
                                                <Form.Text className="text-muted" style={{color: 'white'}}></Form.Text>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form style={{paddingLeft: '10px'}}>
                                            <Form.Group controlId="formGroupEditCustomerLastName">
                                                <Form.Label style={{color: 'white'}}>Nazwisko</Form.Label>
                                                <Form.Control className="My-Form-Add-User" autoComplete="off"/>
                                                <Form.Text className="text-muted" style={{color: 'white'}}></Form.Text>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                    <Form>
                                            <Form.Group controlId="exampleForm.SelectCustom">
                                                <Form.Label style={{color: 'white'}}>Płeć</Form.Label>
                                                <Form.Control as="select" style={{backgroundColor: 'transparent', border: 'solid 2px #5cdb95', color: '#5cdb95'}}custom>
                                                    <option>Mężczyzna</option>
                                                    <option>Kobieta</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form style={{paddingLeft: '10px'}}>
                                            <Form.Group controlId="formGroupEditCustomerLastName">
                                                <Form.Label style={{color: 'white'}}>Data urodzenia</Form.Label>
                                                <Form.Control className="My-Form-Add-User" autoComplete="off"/>
                                                <Form.Text className="text-muted" style={{color: 'white'}}></Form.Text>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form style={{paddingLeft: '10px'}}>
                                            <Form.Group controlId="formGroupEditCustomerPeselNumber">
                                                <Form.Label style={{color: 'white'}}>Nr. Pesel</Form.Label>
                                                <Form.Control className="My-Form-Add-User" autoComplete="off"/>
                                                <Form.Text className="text-muted" style={{color: 'white'}}></Form.Text>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form style={{paddingLeft: '10px'}}>
                                            <Form.Group controlId="formGroupEditCustomerCompanyFullName">
                                                <Form.Label style={{color: 'white'}}>Nazwa firmy</Form.Label>
                                                <Form.Control className="My-Form-Add-User" autoComplete="off"/>
                                                <Form.Text className="text-muted" style={{color: 'white'}}></Form.Text>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form style={{paddingLeft: '10px'}}>
                                            <Form.Group controlId="formGroupEditCustomerCompanyShortName">
                                                <Form.Label style={{color: 'white'}}>Skrót firmy</Form.Label>
                                                <Form.Control className="My-Form-Add-User" autoComplete="off"/>
                                                <Form.Text className="text-muted" style={{color: 'white'}}></Form.Text>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form style={{paddingLeft: '10px'}}>
                                            <Form.Group controlId="formGroupEditCustomerNIP">
                                                <Form.Label style={{color: 'white'}}>NIP</Form.Label>
                                                <Form.Control className="My-Form-Add-User" autoComplete="off"/>
                                                <Form.Text className="text-muted" style={{color: 'white'}}></Form.Text>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form style={{paddingLeft: '10px'}}>
                                            <Form.Group controlId="formGroupEditCustomerStreetName">
                                                <Form.Label style={{color: 'white'}}>Adres</Form.Label>
                                                <Form.Control className="My-Form-Add-User" autoComplete="off"/>
                                                <Form.Text className="text-muted" style={{color: 'white'}}></Form.Text>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form style={{paddingLeft: '10px'}}>
                                            <Form.Group controlId="formGroupEditCustomerCity">
                                                <Form.Label style={{color: 'white'}}>Miasto</Form.Label>
                                                <Form.Control className="My-Form-Add-User" autoComplete="off"/>
                                                <Form.Text className="text-muted" style={{color: 'white'}}></Form.Text>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form style={{paddingLeft: '10px'}}>
                                            <Form.Group controlId="formGroupEditCustomerZipCode">
                                                <Form.Label style={{color: 'white'}}>Kod pocztowy</Form.Label>
                                                <Form.Control className="My-Form-Add-User" autoComplete="off"/>
                                                <Form.Text className="text-muted" style={{color: 'white'}}></Form.Text>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form style={{paddingLeft: '10px'}}>
                                            <Form.Group controlId="formGroupEditCustomerCountry">
                                                <Form.Label style={{color: 'white'}}>Kraj</Form.Label>
                                                <Form.Control className="My-Form-Add-User" autoComplete="off"/>
                                                <Form.Text className="text-muted" style={{color: 'white'}}></Form.Text>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form style={{paddingLeft: '10px'}}>
                                            <Form.Group controlId="formGroupEditContactPhoneNumber1">
                                                <Form.Label style={{color: 'white'}}>Nr. kontaktowy 1</Form.Label>
                                                <Form.Control className="My-Form-Add-User" autoComplete="off"/>
                                                <Form.Text className="text-muted" style={{color: 'white'}}></Form.Text>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form style={{paddingLeft: '10px'}}>
                                            <Form.Group controlId="formGroupEditContactPhoneNumber2">
                                                <Form.Label style={{color: 'white'}}>Nr. kontaktowy 2</Form.Label>
                                                <Form.Control className="My-Form-Add-User" autoComplete="off"/>
                                                <Form.Text className="text-muted" style={{color: 'white'}}></Form.Text>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs='6' style={{paddingLeft: '25px'}}>
                                        <NavLink className="Admin-Nav-Link" push to= '/admin/kontrahenci/'>
                                            <Button 
                                                className="Edit-User-Redirect-Button" 
                                                variant="light">Wróć</Button>
                                        </NavLink>
                                    </Col>
                                    <Col xs='6' style={{textAlign: 'right', paddingRight: '25px'}}>
                                        <NavLink className="Admin-Nav-Link" push to= '/admin/kontrahenci/'>
                                            <Button 
                                                className="Edit-User-Redirect-Button" 
                                                variant="light">Zapisz</Button>
                                        </NavLink>
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
export default AddCustomerPanel;