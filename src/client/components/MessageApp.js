import React, { PropTypes } from 'react';
import io from 'socket.io-client';
// let messages = {
//   sean: {
//   	user: 'Sean',
//   	room: 'HR42',
//   	pic: 'http://bit.ly/1PgOA2n',
//   	messages: [{1900: 'sup?'}, {1920: 'hello?'}]
//   },
//   alex: {
//   	user: 'Alex',
//   	room: 'HR42',
//   	pic: 'http://bit.ly/1Y7VttI',
//   	messages: [{1921: 'pull request'}]
//   },
//   chris: {
//   	user: 'Chris',
//   	room: 'HR42',
//   	pic: 'http://bit.ly/1PgP9cx',
//   	messages: [{1922: 'no'}]
//   },
//   lynn: {
//   	user: 'Lynn',
//   	room: 'HR42',
//   	pic: 'http://bit.ly/1OcG0XA',
//   	messages: [{1925: 'lynnt'}, {1930: 'this is the worst day of my life'}]
//   },

// }

export default class MessageApp extends React.Component { 

  constructor(props) {
  	super(props);
    this.socket = io.connect('http://localhost:3000');
  	this.socket.on('chat message', this.recieveMessage.bind(this));

  	this.state = {
  	  messages: []
  	}

  };


  recieveMessage(message) {
  	console.log(this.state)
  	let messages = this.state.messages;
  	this.setState({
  	  messages: messages.concat(message)
  	});
  }



  sendMessage(e) {
 	if ( this.refs.inputfield.value !== '' ) {
	  this.socket.emit('chat message', {user: this.props.user.name, text: this.refs.inputfield.value});
	  this.refs.inputfield.value = '';
 	}
	e.preventDefault(); 		
  };

  
  render() {

  return (
  <div className="container">
    <h4 className="center grey-text text-darken-4">M E S S A G E</h4>

    <div className="card">
      <nav>
        <div className="nav-wrapper cyan">
        <a href="#" className="brand-logo"></a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="badges.html"><i className="material-icons">chat</i></a></li>
		    <li><a href="badges.html"><i className="material-icons">contacts</i></a></li>      
	      </ul>
        </div>
      </nav>
      <div className="card-content grey lighten-4">
        <div className='row'>
          <div className='message col s12'>
            <div className='profilepic col s1'><img src='http://bit.ly/1PgOA2n'/></div>
            <div className='username'><strong>Sean</strong></div>
            <div className='col s11 text-wrapper'>This is a link</div>
          </div>
           <div className='message col s12'>
            <div className='profilepic col s1'><img src='http://bit.ly/1Y7VttI'/></div>
            <div className='username'><strong>Alex</strong></div>
            <div className='col s11 text-wrapper'>This is a link</div>
          </div>
           <div className='message col s12'>
            <div className='profilepic col s1'><img src='http://bit.ly/1OcG0XA'/></div>
            <div className='username'><strong>Lynn</strong></div>
            <div className='col s11 text-wrapper'>This is a link</div>
          </div>
           <div className='message col s12'>
            <div className='profilepic col s1'><img src='http://bit.ly/1PgP9cx'/></div>
            <div className='username'><strong>Chris</strong></div>
            <div className='col s11 text-wrapper'>This is a link</div>
          </div>

          {this.state.messages.map((message) => {
          	return (
          	  <div className='message col s12'>
                <div className='profilepic col s1'><img src='http://bit.ly/1PgP9cx'/></div>
                <div className='username'><strong>{message.user}</strong></div>
                <div className='col s11 text-wrapper'>{message.text}</div>
              </div>
          	)
          })}

          <div className='message inputfield col s12'>
            <div className='profilepic col s1'><img src='http://bit.ly/1PgP9cx'/></div>
            <form onSubmit={(e) => {this.sendMessage(e)}}>
              <input className='col s10' ref='inputfield'/>
              <button type='submit' onClick={(e) => {this.sendMessage(e)}}></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  )

}
}

MessageApp.propTypes = {
  user: PropTypes.object
}