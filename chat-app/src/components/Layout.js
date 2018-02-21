import React, { Component } from 'react';
import io from 'socket.io-client';

const socketUrl = "http://192.168.1.16:3231";
export default class Layout extends Component{
	
	constructor(props){
		super(props);

		this.state = {
			socket:null
		}
	}
	componentWillMount(){
		this.initSocket();
	}

	initSocket = ()=>{
		const socket = io(socketUrl);
		socket.on('connect', ()=>{
			console.log("Connected");
		})

		this.setState({socket});
	}

	render(){
		return(
			<div className="chat_window">
			</div>
		);
	}
}