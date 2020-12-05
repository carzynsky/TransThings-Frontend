import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { MdShowChart} from 'react-icons/md';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { getSessionCookie } from '../../sessions';
import Circle from 'react-circle';
import 'reactjs-popup/dist/index.css';
import './StatisticsDashboard.css';

class StatisticsDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: getSessionCookie(),
            orderStats: '',
            eventStats: '',
            transitStats: '',
            lineChartData: {
                labels: ['', '', '', '', '', ''],
                datasets: [
                  {
                    label: '# zamówień',
                    data: [0, 0, 0, 0, 0, 0],
                    fill: false,
                    backgroundColor: 'rgba(248, 74, 112, 0.3)',
                    borderColor: 'rgba(248, 74, 112, 0.4)',
                  },
                ],

            },
            barChartData: {
                labels: ['', '', '', '', '', ''],
                datasets: [
                  {
                    label: '# przejazdów',
                    data: [0, 0, 0, 0, 16, 22],
                    fill: false,
                    backgroundColor: 'rgba(216, 248, 74, 0.7)',
                    borderColor: 'rgba(248, 74, 112, 0.4)',
                  },
                ],

            },
        }
    }

    async getOrderStats(){
        try
        {
            const response = await axios.get('https://localhost:44394/orders/stats', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
            var months = [];
            var ordersData = [];

            data.ordersByLastMonths.map( x => {
                months.push(x.month)
                ordersData.push(x.amountOfOrders)
            })

            this.setState({ 
                orderStats: data,
                lineChartData:{
                    labels: months,
                    datasets:[
                        {
                            label: '# zamówień',
                            data: ordersData,
                            fill: false,
                            backgroundColor: 'rgba(248, 74, 112, 0.8)',
                            borderColor: 'rgba(255, 99, 132, 0.3)',
                          }
                    ]
                }
             })
        }
        catch(error){
            console.log(error);
        }
    }

    async getEventStats(){
        try
        {
            const response = await axios.get('https://localhost:44394/events/stats', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
        
            this.setState({ eventStats: data })
        }
        catch(error){
            console.log(error);
        }
    }

    async getTransitStats(){
        try
        {
            const response = await axios.get('https://localhost:44394/transits/stats', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + this.state.token.token
                }
            });

            const data = await response.data;
            var months = [];
            var transitsData = [];

            if(data.transitsByLastMonths !== null){
                data.transitsByLastMonths.map( x => {
                    months.push(x.month)
                    transitsData.push(x.amountOfTransits)
                })
            }
           
        
            this.setState({ 
                transitStats: data,
                barChartData:{
                    labels: months,
                    datasets:[
                        {
                            label: '# przejazdów',
                            data: transitsData,
                            fill: false,
                            backgroundColor: 'rgba(216, 248, 74, 0.7)',
                            borderColor: 'rgba(255, 99, 132, 0.3)',
                          }
                    ]
                }

            })
        }
        catch(error){
            console.log(error);
        }
    }

    async componentDidMount(){
        await this.getOrderStats()
        await this.getEventStats()
        await this.getTransitStats()
    };

    render(){
        return(
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col xs='8'>
                        <div className='Order-Stats-Line-Chart-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className='Order-Stats-Tile-Header'>Wykres liczby zamówień (ostatnie 6 miesięcy)</div>
                                    </Col>
                                </Row>
                                <Row style={{ paddingTop: 10 }}>
                                    <Col>
                                        <Line 
                                            data={this.state.lineChartData} 
                                            options={lineChartOptions} 
                                            width={40}
                                            height={15}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <div className='Order-Stats-Small-Tile'>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <div className='Order-Stats-Tile-Header'>
                                                    Zamówień<span>&nbsp;&nbsp;&nbsp;</span><span style={{ color: 'grey', fontSize: 12 }}>(w tym miesiącu)</span>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: 'center', marginTop: 10 }}>
                                            <Col>
                                                <div className='Order-Stats-Text'>
                                                    <MdShowChart />
                                                    <span>&nbsp;</span>
                                                    {this.state.orderStats?.ordersThisMonth}
                                                    <span>&nbsp;&nbsp;</span>
                                                    <span style={{ fontSize: 14, color: '#5CDB95' }}>{this.state.orderStats?.lastMonthComparerMessage}</span>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 35 }}>
                            <Col>
                                <div className='Order-Stats-Small-Tile'>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <div className='Order-Stats-Tile-Header'>Terminowość</div>
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: 'center', paddingTop: 5 }}>
                                            <Col>
                                                <Circle
                                                    animate={true}
                                                    progress={this.state.orderStats?.timelyDeliveriesRatio}
                                                    animationDuration="2s"
                                                    size={85}
                                                    textColor="whitesmoke"
                                                    bgColor="black"
                                                    roundedStroke={true}
                                                    lineWidth={30}
                                                    progressColor="rgba(248, 74, 112, 0.9"
                                                    showPercentageSymbol={true}
                                                />
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ marginTop: 15 }}>
                    <Col xs='8'>
                        <div className='Order-Stats-Line-Chart-Tile'>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className='Order-Stats-Tile-Header' style={{ color: 'rgba(216, 248, 74, 0.9)' }}>Wykres liczby przejazdów (ostatnie 6 miesięcy)</div>
                                    </Col>
                                </Row>
                                <Row style={{ paddingTop: 10 }}>
                                    <Col>
                                        <Bar
                                            data={this.state.barChartData} 
                                            options={lineChartOptions} 
                                            width={40}
                                            height={15}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col>
                        <div className='Order-Stats-Medium-Tile'>
                            <Container>
                                <Row style={{ paddingTop: 15 }}>
                                    <Col>
                                        <div className='Order-Stats-Tile-Header' style={{ fontSize: 22, color: 'rgba(74, 147, 248, 0.9)' }}>
                                            Załadunków / rozładunków
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <div className='Order-Stats-Tile-Header'>
                                                    <span style={{ color: 'whitesmoke', fontSize: 12 }}>Ten miesiąc</span>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <div className='Order-Stats-Tile-Header' style={{ color: 'rgba(74, 147, 248, 0.9)' }}>
                                                    <MdShowChart /><span>&nbsp;</span>{this.state.eventStats?.eventsThisMonth}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <div className='Order-Stats-Tile-Header'>
                                                    <span style={{ color: 'whitesmoke', fontSize: 12 }}>Poprzedni miesiąc</span>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <div className='Order-Stats-Tile-Header' style={{ color: 'rgba(74, 147, 248, 0.9)' }}>
                                                    <MdShowChart /><span>&nbsp;</span>{this.state.eventStats?.eventsLastMonth}
                                                </div>
                                            </Col>
                                        </Row>
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
export default StatisticsDashboard;

const lineChartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 50,
            fontColor: 'rgb(255,255,255,0.6)',
          },
        },
      ],
      xAxes: [{
        ticks: {
          fontColor: 'rgb(255,255,255,0.78)'
        }
      }]
    },
    legend: {
        labels: {
          fontColor: 'rgb(255,255,255,0.6)',
          fontSize: 12
        }
      },
  }