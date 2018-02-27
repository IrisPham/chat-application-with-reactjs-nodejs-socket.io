const io = require('./index.js').io

const { LOGIN} = require('../Events')

module.exports = function(socket){

	// console.log('\x1bc'); //clears console
	console.log("Socket Id:" + socket.id);

	socket.on(LOGIN,()=>{
		io.emit(LOGIN,socket.id);
	});

	//Listen when the user sends the message
  socket.on('newMessage', data => {
  	//Resend messages to all users who are online.
    console.log('data', data);
    var myBox = {
      mes: data,
      userId: socket.id
    };
    socket.broadcast.emit('newMessage',myBox);
  });

	//User disconnects
	socket.on('disconnect', ()=>{
		io.emit(USER_DISCONNECTED, connectedUsers)
		console.log("Disconnect", connectedUsers);
	})
}
