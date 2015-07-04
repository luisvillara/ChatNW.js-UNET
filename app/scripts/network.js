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

    //Some changes
    socket.bind(port,'::',function(){

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
  },
  unicast : function(port, destinationIP){
    var myIP = require('my-ip');
    var dgram = require('dgram')
    var socket = dgram.createSocket('udp6');
    var ip = myIP('IPv6');
    var destIP = destinationIP;

    this.socket = socket;
    this.address = ip;
    this.port = port;

    // Se hace el bind de la ip y el puerto
    // Usando la opcion exclusive para apartar un puerto especifico
    // Simulando un unicast
    socket.bind({
      address:destinationIP,
      port: port,
      exclusive : true
    });

    this.send = function(message,destinationPort){
      var data = new Buffer(message);
      socket.send(data,0,data.length,destinationPort,destinationIP,function(err){
        if(err) throw err;
        //console.log('message sended:' + message);
      });
    };

    return this;
  }


};