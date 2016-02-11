var myIP = require('my-ip');
var dgram = require('dgram');

// ----------------
//  Network Component
// ----------------
// This component allows comunication over UDP protocol
// allow send multicast and unicast messages

var network = {

  udp : function(port){
    var self = this;
    this.multicastAddress = 'ff02::1234';
    this.socket = dgram.createSocket('udp6');
    this.ip = myIP('IPv6');


    this.socket.bind(port,'::0',function(){

      self.socket.setMulticastTTL(128);
      self.socket.addMembership(self.multicastAddress,self.ip);
      console.log('listening on :' + self.multicastAddress);
    });


    this.sendMulticast = function(message,destinationPort){

      var data = new Buffer(message);

      self.socket.send(data,0,data.length,destinationPort,self.multicastAddress,function(err){
        if(err) throw err;
        //console.log('message sended:' + message);
      });

    };



    this.sendTo = function(message , channel){

      var data = new Buffer(message);

      self.socket.send(data,0,data.length,channel.port, channel.address, function(err){
        if(err) throw err;
        console.log('message sended to :' +  channel.address + ' message: ' + message);
      });

    };

    return this;
  }

};