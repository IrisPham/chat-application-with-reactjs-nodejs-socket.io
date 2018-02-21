import React from 'react';

export default class App extends React.Component{
  render (){
    return(
      <div className="">
              <div className="bottom_wrapper">
                  <div  className="message_input_wrapper">
                       <input ref="messageInput" type="text" className="message_input" placeholder="Type your message here"/>
                  </div>
                  <div className="send_message">
                       <div className='icon'></div>
                       <div className='text'>Send</div>
                  </div>
              </div>
          </div>
    );
  }
}
