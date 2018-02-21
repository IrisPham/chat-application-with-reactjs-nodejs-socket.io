import React from 'react';

import './item.scss';

export default class App extends React.Component {
    render () {
        return (
            <li className="message left">
                <div className="avatar"><img src="" alt="user" /></div>
                <div className="text_wrapper">
                    <div className="box bg-light-info"></div>
                </div>
                <div className="time">10:56 am</div>
            </li>
        )
    }
}
