import React from 'react';
import ReactDOM from 'react-dom';
import { Button,Form,Col,Row,Navbar,Jumbotron,Image } from 'react-bootstrap';
import axios from 'axios';
import Register from './Register.jsx';
import SSignedin from './SSignedin.jsx';
import { Redirect } from 'react-router-dom';

import './Button.css';

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Registerredirect: false,
	  SSignedinredirect: false,
	  PSignedinredirect: false,
	  NoMatchredirect: false,
	  userName: '',
	  Name: '',
	  passWord: '',
	  GroupID: ''
    };
  
	this.handleUserChange = this.handleUserChange.bind(this);
	this.handlePwChange = this.handlePwChange.bind(this);
	this.handleROnClick = this.handleROnClick.bind(this);
	this.handleSOnClick = this.handleSOnClick.bind(this);
  }
  
  handleUserChange(event) {
	 this.setState({userName: event.target.value}); 
  }
  
  handlePwChange(event) {
	 this.setState({passWord: event.target.value}); 
  }
  
  handleROnClick() {
	this.setState({Registerredirect: true});
  }
  
  handleSOnClick(event) {
	event.preventDefault();
    fetch('/getUser').then(res => {
		res.json().then(data => {
			data.forEach(user => {
				if (user.userName == this.state.userName){
					if (user.passWord == this.state.passWord){
						if (user.userType == "Teaching Stuff"){
						  this.setState({Name: user.Name});
						  this.setState({PSignedinredirect: true});
						}else{
						  this.setState({GroupID: user.GroupID});
						  this.setState({Name: user.Name});
						  this.setState({SSignedinredirect: true});	
						}
					}else{
						this.setState({NoMatchredirect: true});
					}
				}
			})
		})
	}).catch(err => console.log(err))
  }
	
  render() {
	if (this.state.Registerredirect) {
		return <Redirect push to="/Register" />;
    }	
	if (this.state.SSignedinredirect) {
		return <Redirect push to={{
		 pathname:"/SSignedin",
		 state: { userName: this.state.userName, GroupID: this.state.GroupID, Name: this.state.Name }
		}}/>;
    }
	if (this.state.PSignedinredirect) {
		return <Redirect push to={{
		 pathname:"/PSignedin",
		 state: { userName: this.state.userName, Name: this.state.Name}
		}}/>;
    }
	if (this.state.NoMatchredirect) {
		return <Redirect push to="/404" />;
    }
	  
    return (
		<div style = {{background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(28,28,184,1) 0%, rgba(0,228,255,1) 100%)'}}>
			  <Navbar bg="dark">
				<Navbar.Brand href="#home" style = {{fontSize:'40px', color: 'lightblue', fontFamily: "'Rogue Script', cursive", shadow: '1px 1px 2px #000'}}>
				<img src='https://s2.ax1x.com/2019/06/11/VcP2v9.png'
					 width="70px"
					 height="70px"
                     className="d-inline-block align-top"
                     alt="React Bootstrap logo"/>{' Badge Buddy'}
                </Navbar.Brand>
			  </Navbar>
			  
			  <Row style = {{marginRight:'0'}}>
					<Col>
						<Jumbotron style = {{backgroundColor:'transparent', color:'white', textAlign:'center'}}>
							<h1>Welcome back Buddy!</h1>
							<p>Have you done your weekly review yet? </p>
							<Image src='https://s2.ax1x.com/2019/06/11/VcPWuR.png' fluid style= {{width:'400px', height:'400px'}} />
							<p>Login to your account or Register today.</p>
                        </Jumbotron>
	               </Col>
				   
				   <Col>
					  <Form style = {{width:'500px', marginTop:'100px',marginLeft:'auto', marginRight:'auto', borderStyle: 'solid', borderRadius:'12px', textAlign:'center', verticalAlign: 'middle', backgroundColor: 'white', position: 'absolute',zIndex: '9999999'}}>
						<Form.Group controlId="userName"  style= {{marginTop:'20px', marginBottom:'20px', marginLeft:'20px', marginRight:'20px'}}>
							<Form.Label>Username</Form.Label>
							<Form.Control type="username" 
										  value={this.state.userName}
										  onChange={this.handleUserChange}
										  placeholder="Enter Username" />
							<Form.Text className="text-muted">
								We need Username, Email is not accepted.
							</Form.Text>
						</Form.Group>

						<Form.Group controlId="passWord" style = {{marginLeft:'20px', marginRight:'20px'}}>
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" 
										  value={this.state.passWord}
										  onChange={this.handlePwChange}
										  placeholder="Password" />
						</Form.Group>
						
						<Row>
						  <Col>
							<Button variant="primary" onClick={this.handleSOnClick} type="submit" style = {{marginBottom:'20px'}}>
								Signin
							</Button>
						  </Col>
						  <Col>		  
							<Button variant="primary" onClick={this.handleROnClick} type="submit" style = {{marginBottom:'20px'}}>
								Register
							</Button>
						  </Col>
						</Row>			
					 </Form>
				  </Col>
			   </Row>
		</div>
    );
  }
}