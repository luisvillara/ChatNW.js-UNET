var network = {
  multicast : function(port){
    var dgram = require('dgram');
    var multicastAddress = 'ff02::1234';
    var socket = dgram.createSocket('udp6');
    this.socket = socket;
    this.address = multicastAddress;
    this.port = port;


    socket.bind(port,function(){
      socket.setMulticastTTL(128);
      socket.addMembership(multicastAddress);
      console.log('listening on :' + multicastAddress);
    });

    this.send = function(message){
      var data = new Buffer(message);

      socket.send(data,0,data.length,5000,multicastAddress,function(err){
        if(err) throw err;
        console.log('message sended:' + message);
      });

    };

    return this;
  }

};