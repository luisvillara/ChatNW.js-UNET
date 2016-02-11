var $ = require('jquery'),
    _ = require('underscore');

var templates = {
      room : _.template($('#room-template').html()),
      user: _.template($('#user-template').html()),
      groupMessage : _.template($('#user-message').html()),
      singleMessage: _.template( $('#single-message').html())
    };

module.exports = {
  room : function( room ){
    return templates.room(room);
  },
  user: function( user ){
    return templates.user(user);
  },
  groupMessage : function( msg ){
    var data = {
      name : msg.user.name,
      message: msg.message,
      type: 'alert-danger'
    };

    if(msg.me){
      data.name = "Tu";
      data.type = 'alert-primary  pull-rigth';
    }

    return templates.groupMessage(data);
  },
  singleMessage : function( msg ){
    var data = {
      message: msg.message,
      type: 'alert-danger'
    };

    if(msg.me)
      data.type = 'alert-primary pull-rigth';

    return templates.singleMessage(data);
  }
};