var _ = require('underscore');
var myIP = require('my-ip');
var multicast = network.multicast(5000);
var room = global.infoChat.room;
var user = global.infoChat.user;
var usersConnected = [];
usersConnected = room.users;


var clientIP = myIP('IPv6');  //Se guarda la ip del cliente
var portList = [];  //Array para guardar lista de puertos usados
var randPort = _.random(2000, 65000); //Se genera un numero random de puertos
var unicast;
if (! _.findWhere(portList, randPort)){   //Se comprueba que el puerto no se este usando
  portList.push(randPort);
  unicast = network.unicast(randPort, clientIP);
}
console.log(portList);
console.log(usersConnected);

var template = {
  user : _.template($('#user-template').html()),
  message : _.template($('#user-message').html())
};


announceConnection();
renderUsers();

function renderUsers(){
  _.each(usersConnected,function(user){
    $('#users').append(template.user(user));
  });

}

multicast.socket.on('message',function(message,rinfo){

  //console.log(JSON.parse(message));
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
    message: json.MENSAJE,
    type: 'alert-danger'
  };

  $('#messages').append(template.message(data));

  $("#messages").scrollTop($("#messages .alert").last().position().top + 700);
}

function announceConnection(){

  var data = {
    COD : 11,
    IDSALA: room.id,
    USUARIO : user
  };

  multicast.send(JSON.stringify(data),10200);

}

function sendGroupMessage( message ){
  var data = {
    COD : 20,
    IDSALA : room.id,
    USUARIO : user,
    MENSAJE : message
  };

  multicast.send(JSON.stringify(data),10200);

  data = {
    name: 'Tu',
    message: message,
    type: 'alert-primary'
  };

  $('#messages').append(template.message(data));

  console.log($("#messages .alert").last().position());
  $("#messages").scrollTop($("#messages .alert").last().position().top + 700);

}

$('form').on('submit',function(e){
  e.preventDefault();
  sendGroupMessage($('#input').val());

  $("#input").val('');
  console.log('submit');
});