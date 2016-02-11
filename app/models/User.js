var myIP = require('my-ip'),
    MD5 = require('MD5');

module.exports = User;
function User(name){
  this.name = name;
  this.ip = myIP('IPv6');
  this.id = MD5(this.ip + this.name);
}