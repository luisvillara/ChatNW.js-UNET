var msg = require('./Message'),
    user = global.infoChat.user;


module.exports ={
  types: msg.types,
  getRoomAdvertising : function(){
    var message = new msg.Message(msg.types.ROOM_ADVERTISING);
    return message;
  },
  getUserAdvertising : function(){
    var message = new msg.Message(msg.types.USER_ADVERTISING);
    return  message;
  },
  getSingleMessage : function( msgContent ){
    var message = new msg.Message(msg.types.SINGLE_MESSAGE);
    message.message = msgContent;
    return message;
  },
  getGroupMessage : function ( msgContent ){
    var message = new msg.Message(msg.types.GROUP_MESSAGE);
    message.message = msgContent;
    return message;
  },
  getDisconectMessage : function(){
    var message = new msg.Message(msg.types.DISCONECT_MESSAGE);
    return message;
  }


};