
var socket = io();
socket.on('words',function(data){
    words = data;
    init();
});
socket.on('onJoin',function(data){
    console.log(data)
});
function getNumberUsers(){
	$.post( "/getUserCount", function( data ) {
	  console.log(data)
	});
}