var MD5 = require('MD5'),
    _ = require('underscore'),
    User = require('../models/User'),
    Room = require('../models/Room'),
    ModalTemplate = require('../core/modalTemplate'),
    template = require('../core/template');

var port = global.infoChat.Port,
    udp = network.udp(port),
    rooms = [];

udp.socket.on('message',function(message,rinfo){

  var json = JSON.parse(message);
  if( json.cod === 10 )
    handleRoom(json.room);

});

function handleRoom(room){

  if(!_.findWhere(rooms,{ id: room.id })){
    rooms.push(room);
    $('#rooms').append(template.room(room));
  }

}

function modal(modalType , data){

  bootbox.dialog({
    title: data.title,
    message: ModalTemplate(modalType),
    buttons: {
      success : {
        label: "<strong>Continuar</strong>",
        className: "btn-success",
        callback: function(){
          launchChat(modalType,data.room);
        }
        }
      }
  });
}

function launchChat(modalType, data){
          var name = $('#name').val();
          var roomname = $('#roomname').val();
          var user = new User(name);
          var room = new Room(roomname);

          if(modalType === 'JOIN'){
            global.infoChat.workMode = 'Client';
            room = data;
          }

          if(user.name === '' && room.name === ''){
            console.log('Existen campos vacios');
            global.infoChat.workMode = 'Server';
            return;
          }

          global.infoChat.room = room;
          global.infoChat.user = user;

          udp.socket.close();
          window.location.href = 'server.html';
}


//Events
$('#rooms').on('click','.presentation a',function(e){

  e.preventDefault();
  var room = _.findWhere(rooms,{id : e.currentTarget.id});
  modal('JOIN',{title: 'Unirse a sala', room: room });

});

$('#add-room').on('click',function(e){
  e.preventDefault();
  modal('CREATE',{ title: 'Crear Sala'});
});
