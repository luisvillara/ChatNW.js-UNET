var myIP = require('my-ip');
var _ = require('underscore');

var ip = myIP('IPv6');
var multicast = network.multicast(5000);
var rooms = [];
var templates = {
  room : _.template($('#room-template').html())
};

multicast.socket.on('message',function(message,rinfo){
  console.log(message.toString());
  handledRoom(JSON.parse(message));
});

function handledRoom(room){
  console.log(room);
  if(!_.contains(rooms,room.ip)){
    rooms.push(room.ip);
    $('#rooms').append(templates.room(room));
  }

}



$('#add-room').on('click',function(e){
  e.preventDefault();
    bootbox.dialog({
      title:"Nombre de Usuario",
      message: '<div class="row">'+
          '<div class="col-md-12">'+
          '<div class="form-group">'+
          '<input id="roomname" type="text" placeholder="Nombre de Sala" class="form-control input-md">'+
          '<input id="name" type="text" placeholder="Tu Nombre" class="form-control input-md">'+
          '</div>'+
          '</div>'+
          '</div>',
      buttons: {
        success : {
          label: "<strong>Continuar</strong>",
          className: "btn-success",
          callback: function(){

            var name = $('#name').val();
            var roomname = $('#roomname').val();

            if(name === '' && roomname === ''){
              console.log('Existen campos vacios');
            }else{

              global.infoChat.user = {
                name : name,
                ip: ip
              };

              global.infoChat.room = {
                name: roomname,
                ip: ip
              };

              multicast.socket.close();
              window.location.href = 'groupchat.html';
            }
          }
        }
      }
  });
});