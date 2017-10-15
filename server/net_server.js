// //-------------------------Module "Importing"-----------------------------//
// var express = require('express'); //used as routing framework
// var app = express(); //creates an instance of express

// //modules required (same idea of #includes or Imports)
// var path = require('path'); //Node.js module used for getting path of file
// var logger = require('morgan'); //used to log in console window all request
// var cookieParser = require('cookie-parser'); //Parse Cookie header and populate req.cookies
// var bodyParser = require('body-parser'); //allows the use of req.body in POST request
// var server = require('http').createServer(app); //creates an HTTP server instance
// var io = require('socket.io')(server);


// //-------------------------Express JS configs-----------------------------//

// app.use(logger('dev')); //debugs logs in terminal
// app.use(bodyParser.json()); //parses json and sets to body
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'front'))); //sets all static file calls to folder

// //-------------Socket IO -------------------//

// io.on('connection', function(socket){
//   console.log('Socket.io user connected');
//   socket.on('disconnect', function(){
//     console.log('Socket.io user disconnected');
//   });
// });
    



// // ------------ Server Setup --------------//


// /**
//  * Get port from environment and store in Express.
//  */
// var port = normalizePort(process.env.PORT || '8000');
// app.set('port', port);

// /**
//  * Listen on provided port, on all network interfaces.
//  */

// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);

// /**
//  * Normalize a port into a number, string, or false.
//  */

// function normalizePort(val) {
//   var port = parseInt(val, 10);

//   if (isNaN(port)) {
//     // named pipe
//     return val;
//   }

//   if (port >= 0) {
//     // port number
//     return port;
//   }

//   return false;
// }

// /**
//  * Event listener for HTTP server "error" event.
//  */

// function onError(error) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }

//   var bind = typeof port === 'string'
//     ? 'Pipe ' + port
//     : 'Port ' + port;

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

// /**
//  * Event listener for HTTP server "listening" event.
//  */

// function onListening() {
//   var addr = server.address();
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   console.log('Listening on ' + bind);
// }


// const PORT_NET = 6419;
// const VERBOSE = false;
// const SCALE = 400;
// var net_key = "";
// var net_option = "";
// var net_value = "";
// var nl_1 = -1; //new line 1
// var nl_2 = -1; 

// var net_vec = [];
// var data_chunks = ""; // concatination of all chunks
// var chunks = false;

// var net = require('net');
// var net_server = net.createServer( (connection) => {
//   console.log('AndroidSocket client connected');

//   connection.on('close', () => {
//     console.log('AndroidSocket client disconnected');
//   });

//   connection.on('data', (data) =>  {
//     console.log(data);	    	    
//   });

//   connection.on('end', () => {
//     console.log('END');
//   });

//   connection.on('error', (err) => {
//     console.log('ERROR: ', err);
//   });

// });

// net_server.listen(PORT_NET, () =>  {
//     console.log('NodeJS Socket Server Ready - Port ' + PORT_NET);
// }); 

var ip = require('ip');

var PORT = 6419;
var HOST = ip.address();

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message.toString().trim());

});

server.bind(PORT, HOST);