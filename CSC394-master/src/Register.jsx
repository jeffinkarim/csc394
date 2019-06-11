import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, InputGroup, Navbar, Jumbotron, Image, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
	  Name: '',
      passWord: '',
	  userType: '',
	  redirect: false
    };
  
    this.handleUserChange = this.handleUserChange.bind(this);
	this.handlePwChange = this.handlePwChange.bind(this);
	this.handleUtChange = this.handleUtChange.bind(this);
	this.handleNameChange = this.handleNameChange.bind(this);
	
	this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleUserChange(event) {
	 this.setState({userName: event.target.value}); 
  }
  
  handleNameChange(event) {
	 this.setState({Name: event.target.value}); 
  }
  
  handlePwChange(event) {
	 this.setState({passWord: event.target.value}); 
  }
  
  handleUtChange(event) {
	 this.setState({userType: event.target.value}); 
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const {  userName, passWord, userType, Name } = this.state
    axios.post('/addUser', {
        userName:  userName,
        passWord: passWord,
        userType: userType,
		Name: Name
    })
    .then(res => res.json())
    .catch(err => console.log(err))

    console.log(this.state)
	this.setState({redirect: true});
    //this.clearInputs();
  }
	
  render() {
	if (this.state.redirect) {
		return <Redirect push to="/" />;
    }  
	  
    return (
		<div style = {{background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(28,28,184,1) 0%, rgba(0,228,255,1) 100%)'}}>
			<Navbar bg="dark">
				<Navbar.Brand href="#home" style = {{fontSize:'40px', color: 'lightblue', fontFamily: "'Rogue Script', cursive", shadow: '1px 1px 2px #000'}}>
				<img src='https://s2.ax1x.com/2019/06/11/VcP2v9.png' width="70px" height="70px" className="d-inline-block align-top" alt="React Bootstrap logo"/>{' Badge Buddy'}
                </Navbar.Brand>
            </Navbar>
			
			<Row style = {{marginRight:'0'}}>
				<Col>
					<Jumbotron style = {{backgroundColor:'transparent', color:'white', textAlign:'center'}}>
					<h1>Did you know?</h1>
					<p>
						Peer review allows students to clarify their own ideas as they explain them to classmates and as they formulate questions about their classmates’
					</p>
					<Image src='https://s2.ax1x.com/2019/06/11/VcPzUf.png' fluid style= {{width:'400px', height:'400px'}} />
					</Jumbotron>
				</Col>
				
				<Col>
				  <Form method= "POST" onSubmit={this.handleSubmit} style = {{width:'400px', marginTop:'50px', marginLeft:'auto', marginRight:'auto',borderStyle: 'solid', borderRadius:'12px', textAlign:'center', verticalAlign: 'middle', backgroundColor: 'white', position: 'relative', zIndex: '99999'}}>
					
					<Form.Group controlId="validationCustomUsername" style= {{marginTop:'20px', marginBottom:'20px', marginLeft:'20px', marginRight:'20px'}}>
					   <Form.Label>Username</Form.Label>
						<InputGroup>
						  <InputGroup.Prepend>
							<InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
						  </InputGroup.Prepend>
						  <Form.Control
							type="text"
							placeholder="Username"
							value={this.state.userName}
							onChange={this.handleUserChange}
							aria-describedby="inputGroupPrepend"
							required/>
						  <Form.Control.Feedback type="invalid">
							Please choose a username.
						  </Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
					
					<Form.Group controlId="formBasicEmail" style= {{marginTop:'20px', marginBottom:'20px', marginLeft:'20px', marginRight:'20px'}}>
					   <Form.Label>Real Name</Form.Label>
					   <Form.Control type="text" 
									 value={this.state.Name}
									 onChange={this.handleNameChange}
									 placeholder="Actual Name" />
					   <Form.Text className="text-muted">
							Please enter your actual name. I.E:"John Doe"
					   </Form.Text>
					</Form.Group>
					
					<Form.Group controlId="formBasicPassword" style= {{marginTop:'20px', marginBottom:'20px', marginLeft:'20px', marginRight:'20px'}}>
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" 
									  placeholder="Password" 
									  value={this.state.passWord}
									  onChange={this.handlePwChange}/>
					</Form.Group>
					
					<Form.Group controlId="exampleForm.ControlSelect1"  style= {{marginTop:'20px', marginBottom:'20px', marginLeft:'20px', marginRight:'20px'}}>
						<Form.Label>Account Type</Form.Label>
						<Form.Control as="select"
									  value={this.state.userType}
									  onChange={this.handleUtChange}>
							<option></option>		  
							<option>Teaching Stuff</option>
							<option>Student</option>
						</Form.Control>
					</Form.Group>
					
					<Button variant="primary" type="submit" style = {{marginBottom:'20px'}}>
						Register
					</Button>
				</Form>
			 </Col>
		   </Row>
		</div>
    );
  }
}

