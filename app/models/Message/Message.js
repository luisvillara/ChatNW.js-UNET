var user = global.infoChat.user,
    room = {
      name: global.infoChat.room.name,
      id: global.infoChat.room.id,
      ip: global.infoChat.room.ip
  };


var types = {
  ROOM_ADVERTISING : 10,
  USER_ADVERTISING : 11,
  GROUP_MESSAGE : 20,
  SINGLE_MESSAGE : 21,
  DISCONECT_MESSAGE : 30
};


function Message( type ){
  this.room = room;
  this.cod = type;

  if(type !== types.ROOM_ADVERTISING)
    this.user = user;
  else{
    this.room.usersConnected = [];
    this.room.usersConnected.push(user);
  }

  if(type === types.SINGLE_MESSAGE || type === types.GROUP_MESSAGE)
    this.message = null;
}

Message.prototype.toString = function(){
  return JSON.stringify(this);
};

exports.types = types;
exports.Message = Message;