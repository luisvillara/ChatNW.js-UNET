var multicast = network.multicast(10200);
var room = global.infoChat.room;
var user = global.infoChat.name;
var intervalToAnnounceRoom;

intervalToAnnounceRoom = setInterval(function(){

  multicast.send(JSON.stringify(room));

}, 5000);


$('title').text(room.name  + ' - ChatJS');
