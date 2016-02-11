var _ = require('underscore'),
    ModalTemplate = require('../core/modalTemplate'),
    template = require('../core/template'),
    MessageFactory = require('../models/Message/MessageFactory');


var room = global.infoChat.room,
    user = global.infoChat.user,
    port = global.infoChat.Port,
    workMode = global.infoChat.workMode,
    udp = network.udp(port),
    intervalToAnnounceRoom = null,
    onPrivateChat = false,
    userSelected = null;


renderUsers();
room.usersConnected.push(user);

udp.socket.on('message',function(message,rinfo){

  console.log(message.toString());
  handleMessages(JSON.parse(message));

});


function handleMessages(json){

  if(json.room.id !== room.id )
    return;

  switch(json.cod){
    case MessageFactory.types.USER_ADVERTISING:
      handleUser(json.user);
      break;
    case MessageFactory.types.GROUP_MESSAGE:
      if(json.user.id !== user.id)
        handleGroupMessage(json);
      break;
    case MessageFactory.types.SINGLE_MESSAGE:
      handleSingleMessage(json);
      break;
    case MessageFactory.types.DISCONECT_MESSAGE:
      handleUserDisconnection(json);
      break;
    default:
      break;
  }
}

function handleUserDisconnection(json){
  var user = _.findWhere(room.usersConnected,{ id :json.user.id });
  var temp = _.without(room.usersConnected, user);
  room.usersConnected = temp;

  $('#'+ user.id).parent().remove();
}

function handleUser( user ){

  if(!_.findWhere(room.usersConnected,{ id: user.id })){
    user.singleMessages = [];
    room.usersConnected.push(user);
    renderUser(user);
  }
}

function handleSingleMessage(msg){
  var user = _.findWhere(room.usersConnected,{id : msg.user.id });
  user.singleMessages.push(msg);

  if(!onPrivateChat){
    renderMessageBadge(user.id);
  }
  else{

    if(user.id === userSelected.id)
      renderSingleMessage(msg);
    else
      renderMessageBadge(user.id);
  }
}

function handleGroupMessage( json ){
  renderGroupMessage(json);
}

function sendGroupMessage( message ){
  var msg = new MessageFactory.getGroupMessage(message);
  udp.sendMulticast(msg.toString(),port);

  //sent by me
  msg.me = true;
  renderGroupMessage(msg);
}

function sendSingleMessage( message ){
  var msg = MessageFactory.getSingleMessage(message);
  udp.sendTo(msg.toString(),{port : port , address: userSelected.ip});

  //sent by me
  msg.me = true;
  renderSingleMessage(msg);
  userSelected.singleMessages.push(msg);
}


intervalToAnnounceRoom = setInterval(function(){
  var msg;

  if(workMode === 'Server')
    msg = new MessageFactory.getRoomAdvertising();
  else
    msg = new MessageFactory.getUserAdvertising();

  udp.sendMulticast(msg.toString(),port);

}, 5200);


// Renderers
function renderMessageBadge( id ){
  $('#'+id).children('.badge').text(parseInt($('#'+id).children('.badge').text(),10) + 1);
}
function renderSingleMessages(){
  _.each(userSelected.singleMessages,function(message){
    renderSingleMessage(message);
  });
}

function renderSingleMessage(data){
  $('#singleMessages').append(template.singleMessage(data));
}

function renderUsers(){
  _.each(room.usersConnected,function(user){
    user.singleMessages = [];
    renderUser(user);
  });
}

function renderUser( data ){
  $('#users').append(template.user(data));
}

function renderGroupMessage(data){
  $('#messages').append(template.groupMessage(data));
  $("#messages").scrollTop($("#messages .alert")
                .last()
                .position().top + 700);
}

//Events
$('title').text(room.name  + ' - ChatJS');

$('.group-message-input').on('submit','form',function(e){
  e.preventDefault();

  sendGroupMessage($('#input').val());
  $("#input").val('');
});

//Single message input
$('body').on('submit','.single-message-input form',function(e){
  e.preventDefault();
  var element = $(e.currentTarget).children();

  sendSingleMessage(element.val());
  element.val('');
});

//Select user for single message
$('#users').on('click','.presentation a',function(e){
  e.preventDefault();
  var target  = $(e.currentTarget);

  userSelected = _.findWhere(room.usersConnected,{id : target.attr('id')});
  $('#'+userSelected.id).children('.badge').text(0);
  onPrivateChat = true;

  bootbox.dialog({
    message: '<h3>'+ userSelected.name +' </h3>'+ ModalTemplate('CHAT'),
    animation: true,
    onEscape: function(){
                onPrivateChat = false;
              }
  }).find('div.modal-dialog').addClass('full');

  renderSingleMessages();
});