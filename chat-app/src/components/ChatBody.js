import React, { Component } from 'react';
import $ from 'jquery';
import _map from 'lodash/map';
import MessageList from './MessageList';
import {LOGIN} from '../Events';

export default class ChatBody extends Component{
  constructor(props){
    super(props);

    this.state = {
      messages: [
        {id:1, userId: 0, message: 'Hello'}
      ],
      user: null,
    };
  }

  componentDidMount(){
    const { socket } = this.props;
    //Listen when the users login and setState user : socketId from the server
    socket.on(LOGIN, (res) => {
      this.setState({user: res});
    });

    //lắng nghe event 'newMessage' và gọi hàm newMessage khi có event
    socket.on('newMessage', (response) => {
         console.log('Nhận về', response.userId);
         console.log("data", response.mes);
         this.newMessage(response);
    });

    this.login();
  }


  login(){
    const { socket } = this.props;

    socket.emit(LOGIN);
  }

  //Khi có tin nhắn mới, sẽ push tin nhắn vào state mesgages, và nó sẽ được render ra màn hình
  newMessage(m) {
      const messages = this.state.messages;
      let ids = _map(messages, 'id');
      let max = Math.max(...ids);
      messages.push({
          id: max+1,
          userId: m.id,
          message: m.mes
      });

      let objMessage = $('.messages');
      if (objMessage[0].scrollHeight - objMessage[0].scrollTop === objMessage[0].clientHeight ) {
          this.setState({messages});
          objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300); //tạo hiệu ứng cuộn khi có tin nhắn mới

      } else {
          this.setState({messages});
          if (m.id === this.state.user) {
              objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300);
          }
      }
  }
  //Gửi event socket newMessage với dữ liệu là nội dung tin nhắn
	 sendnewMessage(m) {
		 const { socket } = this.props;
			 if (m.value) {
					 socket.emit("newMessage", m.value); //gửi event về server
          this.newMessage2(m.value) ;
					 m.value = "";
			 }
	 }
   //Khi có tin nhắn mới, sẽ push tin nhắn vào state mesgages, và nó sẽ được render ra màn hình
   newMessage2(m) {
       const messages = this.state.messages;
       let ids = _map(messages, 'id');
       let max = Math.max(...ids);
       messages.push({
           id: max+1,
           userId: 1,
           message: m
       });

       let objMessage = $('.messages');
       if (objMessage[0].scrollHeight - objMessage[0].scrollTop === objMessage[0].clientHeight ) {
           this.setState({messages});
           objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300); //tạo hiệu ứng cuộn khi có tin nhắn mới

       } else {
           this.setState({messages});
           if (m.id === this.state.user) {
               objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300);
           }
       }
   }
	 enterKey(e) {
			 if (e.keyCode === 13) {
				 this.sendnewMessage(this.refs.tinnhan);
			 }
	 }

  render(){
    return(
      <div>
        <MessageList user={this.state.user} messages={this.state.messages} typing={this.state.typing}/>

        <div className="bottom_wrapper">
        	<div className="message_input_wrapper">
        			<input ref="tinnhan" className="message_input" placeholder="Type your message here..." onKeyUp={(e) => this.enterKey(e)}/>
        	</div>
        	<div className="send_message" >
        			<div className="icon"></div>
        			<div className="text">Send</div>
        	</div>
        </div>
			</div>
    );
  }
}
