
var socket = io();
socket.on('newColor',function(data){
    mesh[0].material.color = new THREE.Color(data.color);
});
socket.on('onJoin',function(data){
    console.log(data)
});

socket.on('newWords',function(data){
    console.log(data.words);

    words = data.words.split(" ");

    addBoxes();
});


socket.on('nextColor',function(data){
    colorIndex++;
    if (colorIndex > colors.length) {
    	colorIndex = 0;
    }

    material.color = colors[colorIndex];
});
socket.on('lightLevel',function(data){
	console.log(data.level);
    light.intensity = data.level / 100;
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
////////////////////////////////////////////
function getSubstr(){
	$.post( "/getSubstr", function( data ) {
	  console.log(data)
	})
}
/////////////////////////////////////////////