import React, { Component } from 'react';
import io from 'socket.io-client'
import TopMenu from './TopMenu';
import ChatBody from './ChatBody';

const socketUrl = "http://localhost:3231"
export default class Layout extends Component {

	constructor(props) {
	  super(props);

	  this.state = {
	  	socket:null
	  };
	}

	componentWillMount() {
		this.initSocket()
	}

	/*
	*	Connect to and initializes the socket.
	*/
	initSocket = ()=>{
		const socket = io(socketUrl)

		socket.on('connect', ()=>{
			console.log("Connected");
		})

		this.setState({socket})
	}
	render() {
		const { socket } = this.state
		return (
			<div className="app__content">
				<div className="chat_window">
					<TopMenu />
					<ChatBody socket={socket}/>
				</div>
			</div>
		);
	}
}
