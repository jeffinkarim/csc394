import React from 'react';
import ReactDOM from 'react-dom';
import { Button,Card,Table, ModalTitle, ModalFooter, ModalBody } from 'react-bootstrap';
import Modal from 'react-modal';
import ModalHeader from 'react-bootstrap/ModalHeader';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const nPic = 'https://i.imgur.com/wymzMzc.png';
const bPic = 'https://i.imgur.com/TpS7LuU.png';
const sPic = 'https://i.imgur.com/ayQNwTs.png';
const gPic = 'https://i.imgur.com/TWij8AC.png';

function RenderMedal(props) {
  const result = props.Top / props.Bottom;
  console.log(result);
  if (result >= 4.5) {
    return <img src={gPic} height="100" width="100" />;
  }else if ( result >= 3.5 && result < 4.5 ){
	return <img src={sPic} height="100" width="100" />; 
  }else if ( result >= 3 && result < 3.5 ){
	return <img src={bPic} height="100" width="100" />; 
  }else {
	return <img src={nPic} height="100" width="100" />;   
  }
}

export default class Usercard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		userName: props.userName,
		GroupID: props.GroupID,
		Name: props.Name,
		groupSize: 0,
		modalIsOpen: false,
		gC: 0,
		oT: 0,
		qW: 0,
		rC: 0
    };
	
	this.openModal = this.openModal.bind(this);
	this.closeModal = this.closeModal.bind(this);
  }
  
  openModal() {
    this.setState({modalIsOpen: true});
  }
  
  closeModal() {
    this.setState({modalIsOpen: false});
  }
    
  componentDidMount() {
	fetch('/getUser').then(res => {
		res.json().then(data => {
			data.forEach(user => {
				if (user.userName == this.state.userName){
					this.setState({gC: user.gC});
					this.setState({oT: user.oT});
					this.setState({qW: user.qW});
					this.setState({rC: user.rC});
				} else {
					if (user.GroupID == this.state.GroupID){
						this.state.groupSize = this.state.groupSize + 1;
					}
				}
			});
		})
	}).catch(err => console.log(err));
  } 
	
  render() {
	
    return (
		<Card style={{ width: '20rem', position:'relative',
		zIndex: '999999999',
		top: '10px',
		left: '10px' }}>
			<Card.Img variant="top" src="https://banner2.kisspng.com/20180402/bfw/kisspng-agar-io-fez-imgur-deal-with-it-5ac2a891993f76.8607229515227065776277.jpg" />
			<Card.Body>
				<Card.Title>{this.state.Name}</Card.Title>
				
				<Button variant="success" style = {{position:'relative', zIndex:'999999999'}}
						onClick={this.openModal}>
					View My Report
				</Button>
				<Modal style = {{borderStyle:'solid', backgroundColor:'white', borderColor:'black', borderWidth:'5px', position:'relative', width:'1000px', zIndex:'99999999999999999999999999999999'}}
				
				
				isOpen={this.state.modalIsOpen}
					   onRequestClose={this.closeModal}
					   style={customStyles}
					   contentLabel="Latest Review Report">
					<ModalHeader style = {{textAlign:"center",fontWeight:'bold'}} >
					<ModalTitle style = {{fontWeight:'bold'}}><p>Hello, {this.state.Name}</p></ModalTitle> </ModalHeader>
					<ModalBody> 
					<p>The following is the score you got from the latest group review</p>
					<Table striped bordered hover size="sm">
						<thead>
						  <tr>
							<th>Good Communication</th>
							<th>On Time</th>
							<th>Exceptional Work</th>
							<th>Reachable</th>
						  </tr>
						</thead>
						<tbody>
						  <tr>
							<td>{this.state.gC} out of {5 * this.state.groupSize}</td>
							<td>{this.state.oT} out of {5 * this.state.groupSize}</td>
							<td>{this.state.qW} out of {5 * this.state.groupSize}</td>
							<td>{this.state.rC} out of {5 * this.state.groupSize}</td>
						  </tr>
						  <tr>
							<td><RenderMedal Top={this.state.gC} Bottom={this.state.groupSize}/></td>
							<td><RenderMedal Top={this.state.oT} Bottom={this.state.groupSize}/></td>
							<td><RenderMedal Top={this.state.qW} Bottom={this.state.groupSize}/></td>
							<td><RenderMedal Top={this.state.rC} Bottom={this.state.groupSize}/></td>
						  </tr>
						</tbody>
					</Table>
					</ModalBody>
					<ModalFooter>
					<Button variant = "success" onClick={this.closeModal}>Close Review</Button>
					</ModalFooter>
				</Modal>
			</Card.Body>
		</Card>
    );
  }
}