import React, {Component} from 'react';
import {Container, Col, Row, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import './NotFound.css';

class NotFound extends Component{
    constructor(props){
        super(props)
        this.state={
            redirect: false,
            loaded: false
        }
    }

    handleClick = () => {
        this.setState({
            redirect: true
        })
    }
    
    componentDidMount(){
        setTimeout(() => {
            this.setState({
                loaded: true
            })
        }, 500);
    }

    render(){
        if(this.state.redirect){
            return <Redirect push to='/' />
        }
        if(this.state.loaded){
            return(
            <div>
                <Container style={{marginTop: '100px'}}>
                    <Row>
                        <Col xs='12' style={{marginLeft: '150px', marginTop: '50px'}}>
                            <Row>
                                <label className="Error-Code-Label">404</label>
                            </Row>
                            <Row>
                                <label className="Error-Message-Label">Nie znaleziono strony o podanym adresie.</label>
                            </Row>
                            <Row>
                                <Button 
                                    className="Home-Redirect-Button" 
                                    variant="light"
                                    onClick={this.handleClick.bind(this)}
                                    >Wróć
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>)
        }
        return(
            <div>
                <Container style={{marginTop: '100px'}}>
                    <Row>
                        <Col xs='12' style={{marginLeft: '150px', marginTop: '50px'}}>
                            <Row>
                                {/* <label className="Error-Code-Label">404</label> */}
                            </Row>
                            <Row>
                                {/* <label className="Error-Message-Label">Nie znaleziono strony o podanym adresie.</label> */}
                            </Row>
                            <Row>
                                {/* <Button 
                                    className="Home-Redirect-Button" 
                                    variant="light"
                                    onClick={this.handleClick.bind(this)}
                                    >Wróć
                                </Button> */}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>)
    }
}
export default NotFound;