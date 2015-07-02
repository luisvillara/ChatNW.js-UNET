var network = {
  multicast : function(port){
    var myIP = require('my-ip');
    var dgram = require('dgram')
    var multicastAddress = 'ff02::1234';
    var socket = dgram.createSocket('udp6');
    var ip = myIP('IPv6');

    this.socket = socket;
    this.address = multicastAddress;
    this.port = port;


    socket.bind(port,function(){

      socket.setMulticastTTL(128);
      socket.addMembership(multicastAddress,ip);
      console.log('listening on :' + multicastAddress);
    });

    this.send = function(message,destinationPort){

      var data = new Buffer(message);

      socket.send(data,0,data.length,destinationPort,multicastAddress,function(err){
        if(err) throw err;
        //console.log('message sended:' + message);
      });

    };

    return this;
  }

};