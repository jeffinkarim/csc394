import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Row, Col, Button, Card, Form, Navbar } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

export default class PSignedin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		userName: this.props.location.state.userName,
		Name: this.props.location.state.Name,
		GroupID: "",
		Count: 0,
		Index: 0,
		StudentNameList: [],
		redirect: false
    };
	
	this.handleGroupID = this.handleGroupID.bind(this);
	this.handleNOnClick = this.handleNOnClick.bind(this);
  }
  
  handleGroupID(event) {
	 this.setState({GroupID: event.target.value}); 
  }
  
  handleNOnClick(event) {
	 if (this.state.Index + 1 == this.state.StudentNameList.length){
		 this.setState({redirect: true});
	 }
	 this.setState({ Index: this.state.Index + 1});
	 this.setState({ Count: this.state.Count - 1}); 
	 event.preventDefault();
	 axios.post('/updateGroup', {
        GroupID:  this.state.GroupID,
		CName:  this.state.StudentNameList[this.state.Index]
     }).then(res => res.json()).catch(err => console.log(err))

    console.log(this.state)
  }
  
  componentDidMount() {
	let StudentList = [];	
	fetch('/getUser').then(res => {
		res.json().then(data => {
			data.forEach(user => {
				if (user.userName != this.state.userName && user.userType != "Teaching Stuff"){
					StudentList.push(user.Name);
				}
			});
			this.setState({ StudentNameList: StudentList});
			this.setState({ Count: StudentList.length});
		})
	}).catch(err => console.log(err));
  }
  
  render() {
	  if (this.state.redirect) {
		return <Redirect push to="/" />;
      } 
	  //console.log(this.state.Name);
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
			<Card style={{ width: '20rem', position:'relative', top: '10px', left:'10px'}}>
			  <Card.Img variant="top" src="https://s2.ax1x.com/2019/06/11/VciDsA.jpg" />
			  <Card.Body>
				<Card.Title>Hello, {this.state.Name}</Card.Title>
			  </Card.Body>
		    </Card>
		  </Col>
		  
		  <Col>
				<Card style = {{position:'relative', zIndex:'999999', borderStyle:'solid', borderRadius:'12px',
										borderWidth: '5px',
										backgroundColor: 'white',
										borderColor: 'black',
			width: '800px', marginRight:'300px', marginTop:'100px'}}>
					<Card.Header style = {{fontSize:'30px', color: 'black', backgroundColor:'lightgrey', borderBottom: 'solid', fontWeight: 'bold', shadow: '1px 1px 2px #000'}}> PLACE YOUR STUDENTS INTO GROUPS</Card.Header>
				  <Card.Header>
					{this.state.Count - 1} student(s) left to group
					
				  </Card.Header>
				  <Card.Body>
					<Card.Title style = {{textAlign:'center'}}>{this.state.StudentNameList[this.state.Index]}</Card.Title>
					<Form>
						<Form.Label>Group ID</Form.Label>
						<Form.Control type="text"
									  value={this.state.GroupID}
									  onChange={this.handleGroupID}
									  placeholder="Please assign this student a group" />
						<Form.Text className="text-muted">
							Usually Group ID is in capitalized letter(A,B,C...).
						</Form.Text>
					</Form>
					<br/>
					<Row>
						<Col><Button variant="success"
									 onClick={this.handleNOnClick}>
								Next
						</Button></Col>
					</Row>
				   </Card.Body>
				</Card>
		  </Col>
		</Row>
		</div>
	  );
  }
}