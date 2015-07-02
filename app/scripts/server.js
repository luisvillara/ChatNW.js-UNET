var _ = require('underscore');
var multicast = network.multicast(10200);
var room = global.infoChat.room;
var user = global.infoChat.user;
var intervalToAnnounceRoom;
var usersConnected = [];

var template = {
  user : _.template($('#user-template').html()),
  message : _.template($('#user-message').html())
};

usersConnected.push(user);

multicast.socket.on('message',function(message,rinfo){

  console.log(message.toString());
  handleMessages(JSON.parse(message));

});


function handleMessages(json){
  switch(json.COD){
    case 11:
      if(json.IDSALA === room.id )
        handleUser(json.USUARIO);
      break;
    case 20:
      if(json.IDSALA === room.id)
        handleGroupMessage(json);
      break;
    default:
      break;
  }
}

function handleGroupMessage( json ){
  var data = {
    name: json.USUARIO.name,
    message: json.MENSAJE
  };

  $('#messages').append(template.message(data));
}

function sendGroupMessage( message ){
  var data = {
    COD : 20,
    IDSALA : room.id,
    USUARIO : user,
    MENSAJE : message
  };

  multicast.send(JSON.stringify(data),5000);

}

function handleUser( user ){
  usersConnected.push(user);
  console.log(usersConnected);
  //Render user
  $('#users').append(template.user(user));
}

intervalToAnnounceRoom = setInterval(function(){
  room.users = usersConnected;

  var data = {
    COD: 10,
    SALA: room
  };

  //console.log(data);
  multicast.send(JSON.stringify(data),5000);

}, 10200);


$('title').text(room.name  + ' - ChatJS');
$('form').on('submit',function(e){
  e.preventDefault();
  sendGroupMessage($('#input').val());

  $("#input").val('');
  console.log('submit');
});