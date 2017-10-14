
var socket = io();
socket.on('newColor',function(data){
    mesh[0].material.color = new THREE.Color(data.color);
});
socket.on('onJoin',function(data){
    console.log(data)
});
function getNumberUsers(){
	$.post( "/getUserCount", function( data ) {
	  console.log(data)
	});
}
function sendWords(){
	$.post("/form", function(data){
		console.log(data)
	})
}