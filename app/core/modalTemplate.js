function ModalTemplate(type){

  this.join = '<div class="row">'+
          '<div class="form-horizontal">'+
          '<div class="form-group">'+
          '<label for="name" class="col-md-2 control-label">Nombre</label>'+
          '<div class="col-md-9">'+
          '<input class="form-control" id="name" type="text" placeholder="John Doe">'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>';

  this.create = '<div class="row">'+
          '<div class="form-horizontal">'+
          '<div class="form-group">'+
          '<label for="roomname" class="col-md-2 control-label">Sala</label>'+
          '<div class="col-md-9">'+
          '<input id="roomname" type="text" placeholder="ComuII" class="form-control input-md">'+
          '</div>'+
          '</div>'+
          '<div class="form-group">'+
          '<label for="name" class="col-md-2 control-label">Nombre</label>'+
          '<div class="col-md-9">' +
          '<input class="form-control" id="name" type="text" placeholder="John Doe">'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>';

  this.chat = '<div class="row">'+
          '<div class="col-md-12 chat-history single" id="singleMessages">'+
          '</div>' +
          '<div class="col-md-12 single-message-input">' +
          '<div class="well">' +
          '<form class="form-group">' +
          '<input type="text" class="form-control input-md" id="singleMessage-input">' +
          '</form>' +
          '</div>' +
          '</div>' +
          '</div>';

  switch(type){
    case 'JOIN':
      return this.join;
    case 'CREATE':
      return this.create;
    case 'CHAT':
      return this.chat;
    default:
      return new Error('Template undefined');
  }

}

module.exports = ModalTemplate;