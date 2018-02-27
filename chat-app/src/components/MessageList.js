import React from 'react';
import Message from './MessageItem';

export default class MessageList extends React.Component {
    render () {
        return (
          <ul className="messages">
              {this.props.messages.map(item =>
                  <Message key={item.id} user={item.userId === 1? true: false} message={item.message}/>
              )}
          </ul>
        )
    }
}
