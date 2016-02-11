var MD5 = require('MD5'),
    myIP = require('my-ip');


module.exports = Room;
function Room (name){
  this.name = name;
  this.ip = myIP('IPv6');
  this.id = MD5(this.ip + this.name);
  this.usersConnected = [];
}