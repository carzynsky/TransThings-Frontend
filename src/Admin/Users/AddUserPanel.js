import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AddUserPanel.css';

class AddUserPanel extends Component{
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
            <Container fluid style={{marginTop: '50px'}}>
                <Row>
                    <Col>
                    <div className='Add-User-Tile'>
                        <Container>
                            <Col>
                            <label className='Add-User-Title'>Dodawanie użytkownika</label>
                            </Col>
                        </Container>
                    </div>
                        
                    </Col>
                    <Col>
                    <div className='Small-Calendar-Tile'>
                        <Container>
                            <Row>
                                <Col>
                                <label className='Add-User-Title'>Data urodzenia</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <Calendar
                                    // onChange={}
                                    value={this.state.birthdate}/>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs='5'></Col>
                    <Col xs='1'>
                    <NavLink className="Admin-Nav-Link" push to= '/admin/uzytkownicy/'>
                        <Button 
                            className="Edit-User-Redirect-Button" 
                            variant="light">WRÓĆ</Button>
                    </NavLink>
                    </Col>
                    
                    <Col xs='1'>
                    <NavLink className="Admin-Nav-Link" push to= '/admin/uzytkownicy/'>
                        <Button 
                            className="Edit-User-Redirect-Button" 
                            variant="light">ZAPISZ</Button>
                    </NavLink>
                    </Col>
                </Row>
            </Container>
        );
    }

}
export default AddUserPanel