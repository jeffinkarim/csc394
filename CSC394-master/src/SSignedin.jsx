import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Row, Button, Card, Form, Col,Navbar } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Rating from 'react-rating';
import Usercard from './Usercard.jsx';

export default class SSignedin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		userName: this.props.location.state.userName,
		GroupID: this.props.location.state.GroupID,
		Name: this.props.location.state.Name,
		Index: 0,
		oT: 0,
		gC: 0,
		qW: 0,
		rC: 0,
		NameList: [],
		redirect: false
    };
	
	this.handleNOnClick = this.handleNOnClick.bind(this);
  }
  
  
  handleNOnClick(event) {
	 if (this.state.Index + 1 == this.state.NameList.length){
		 this.setState({redirect: true});
	 }
	 this.setState({ Index: this.state.Index + 1}); 
	 event.preventDefault();
	 axios.post('/updateScore', {
        oT:  parseInt(this.state.oT),
        gC:  parseInt(this.state.gC),
        qW:  parseInt(this.state.qW),
		rC:  parseInt(this.state.rC),
		CName:  this.state.NameList[this.state.Index]
     }).then(res => res.json()).catch(err => console.log(err))

    this.setState({ oT: 0}); 
	this.setState({ gC: 0});
	this.setState({ qW: 0});
	this.setState({ rC: 0});
  }
  
  componentDidMount() {
	let GroupList = [];	
	fetch('/getUser').then(res => {
		res.json().then(data => {
			data.forEach(user => {
				if (user.userName != this.state.userName && user.GroupID == this.state.GroupID){
					GroupList.push(user.Name);
				}
			});
			this.setState({ NameList: GroupList});
		})
	}).catch(err => console.log(err));
  }  
	
  render() {
    if (this.state.redirect) {
		return <Redirect push to="/" />;
    } 	  
	//console.log(this.state.NameList.length);
	//console.log(this.state.GroupID);
	return(
		<div>
		<Navbar bg="dark">
    <Navbar.Brand href="#home" style = {{fontSize:'40px', color: 'lightblue', fontFamily: "'Rogue Script', cursive", shadow: '1px 1px 2px #000'}}>
      <img
        src="https://i.imgur.com/1ZhRALV.png"
        width="70px"
        height="70px"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />{' Badge Buddy'}
    </Navbar.Brand>
  	</Navbar>

	  <Row style = {{marginRight:'15px'}}>
		<Col>
			<Usercard style ={{ position: 'relative',zIndex:'9999999999'}} userName={this.state.userName} Name={this.state.Name}
					  GroupID={this.state.GroupID}/>
		</Col>
	    
		<Col>
			<Card style = {{//width:'800px',
									//	height:'300px',
									//	marginLeft:'600px',
									//	marginTop:'100px',
										position: 'relative',
										zIndex: '99999',
										width:'800px',
										marginLeft:'200px',
										marginTop:'100px',
										borderStyle:'solid', borderRadius:'12px',
										borderWidth: '5px',
										backgroundColor: 'white',
										borderColor: 'black'
										}}>
				<Card.Header style = {{fontSize:'30px', color: 'black', backgroundColor:'lightgrey', borderBottom:'solid', fontWeight: 'bold', borderColor: 'black', shadow: '1px 1px 2px #000'}}>
					REVIEW YOUR GROUP MEMBERS
				</Card.Header>							
				<Card.Header style = {{textAlign:"center", fontWeight: 'bold'}}>
					{this.state.NameList[this.state.Index]}
				</Card.Header>
			<Card.Body>	
			<Form>
				<Form.Row>
					<Col>
						<Form.Row><Form.Label>On Time</Form.Label></Form.Row>
						<Form.Row>
						<Rating emptySymbol={<img src="https://s2.ax1x.com/2019/06/07/VwksXT.png" style={{width:"50px", height:"50px"}}  />}
								fullSymbol={<img src="https://s2.ax1x.com/2019/06/07/VwkrcV.png" style={{width:"50px", height:"50px"}} />}
								initialRating={this.state.oT} 
								onChange={(value) => this.setState({oT: value})}/>
						</Form.Row>
					</Col>
					
					<Col>
						<Form.Row><Form.Label>Good Communication</Form.Label></Form.Row>
						<Form.Row>
						<Rating emptySymbol={<img src="https://s2.ax1x.com/2019/06/07/VwksXT.png" style={{width:"50px", height:"50px"}}  />}
								fullSymbol={<img src="https://s2.ax1x.com/2019/06/07/VwkrcV.png" style={{width:"50px", height:"50px"}} />}
								initialRating={this.state.gC} 
								onChange={(value) => this.setState({gC: value})}/>
						</Form.Row>
					</Col>
				</Form.Row>
				
				<Form.Row>
					<Col>
						<Form.Row><Form.Label>Exceptional Work</Form.Label></Form.Row>
						<Form.Row>
						<Rating emptySymbol={<img src="https://s2.ax1x.com/2019/06/07/VwksXT.png" style={{width:"50px", height:"50px"}}  />}
								fullSymbol={<img src="https://s2.ax1x.com/2019/06/07/VwkrcV.png" style={{width:"50px", height:"50px"}} />}
								initialRating={this.state.qW} 
								onChange={(value) => this.setState({qW: value})}/>
						</Form.Row>
					</Col>
					
					<Col>
						<Form.Row><Form.Label>Reachable</Form.Label></Form.Row>
						<Form.Row>
						<Rating emptySymbol={<img src="https://s2.ax1x.com/2019/06/07/VwksXT.png" style={{width:"50px", height:"50px"}}  />}
								fullSymbol={<img src="https://s2.ax1x.com/2019/06/07/VwkrcV.png" style={{width:"50px", height:"50px"}} />}
								initialRating={this.state.rC} 
								onChange={(value) => this.setState({rC: value})}/>
						</Form.Row>
					</Col>
				</Form.Row>
			</Form>
			<br/>
			<Row>
				<Col><Button variant="success" onClick={this.handleNOnClick}>Next</Button></Col>
			</Row>	
			</Card.Body>
			</Card>
		</Col>
		
		<Col>
		</Col>
		</Row>
		</div>	
	);
  }
}