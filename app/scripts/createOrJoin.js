var myIP = require('my-ip'),
    MD5 = require('MD5'),
    _ = require('underscore');

var ip = myIP('IPv6');
var multicast = network.multicast(5000);
var rooms = [];
var templates = {
  room : _.template($('#room-template').html())
};

multicast.socket.on('message',function(message,rinfo){
  console.log(message.toString());
  var json = JSON.parse(message);



  if( json.COD === 10 )
    handleRoom(json.SALA);

});

function handleRoom(room){

  if(!_.findWhere(rooms,{ id: room.id })){
    rooms.push(room);
    renderRoom(room);
  }

}

function renderRoom(room){
  $('#rooms').append(templates.room(room));
}


//Events

$('#rooms').on('click','.presentation a',function(e){
  e.preventDefault();
  var room = _.findWhere(rooms,{id : e.currentTarget.id});
  dialog(room);
  console.log(room);
});

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
                id: MD5(ip),
                name: roomname,
                ip: ip
              };

              multicast.socket.close();
              window.location.href = 'server.html';
            }
          }
        }
      }
  });
});

function dialog(data){
  bootbox.dialog({
      title:"Nombre de Usuario",
      message: '<div class="row">'+
          '<div class="col-md-12">'+
          '<div class="form-group">'+
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

            if(name === ''){
              console.log('Existen campos vacios');
            }else{

              global.infoChat.user = {
                name : name,
                ip: ip
              };

              global.infoChat.room = {
                id: MD5(data.ip),
                name: data.name,
                ip: data.ip,
                users: data.users
              };

              multicast.socket.close();
              window.location.href = 'client.html';
            }
          }
        }
      }
  });
}