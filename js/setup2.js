if(!/(&|\?)username=/.test(window.location.search)){
  var newSearch = window.location.search;
  if(newSearch !== '' & newSearch !== '?'){
    newSearch += '&';
  }
  newSearch += 'username=' + (prompt('What is your name?') || 'anonymous');
  window.location.search = newSearch;
}
// console.log(window.location.search);

// Don't worry about this code, it will ensure that your ajax calls are allowed by the browser
$.ajaxPrefilter(function(settings, _, jqXHR) {
  jqXHR.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
  jqXHR.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");
});

var Message = Backbone.Model.extend({
  url: 'https://api.parse.com/1/classes/messages'
});

var Messages = Backbone.Collection.extend({
  model: Message
});

var NewMessageView = Backbone.View.extend({
  events: {
    'submit form': 'addMessage'
  },
  initialize: function() {
    this.collection.on('add', this.clearInput, this);
  },
  addMessage: function(e) {
    console.log('adding messsage');
    e.preventDefault();
    this.collection.create({ text: this.$('textarea').val() });
  },
  clearInput: function() {
    this.$('#sendMessage').val('');
  }
});

var MessagesView = Backbone.View.extend({
  initialize: function() {
    this.collection.on('add', this.appendMessage, this);
  },
  appendMessage: function(message) {
    this.$('#messageWrapper').append('<span>' + message.escape('text')+'</span>');
  }
});

$(document).ready(function() {
  var messages = new Messages();
  new NewMessageView({ el: $('#new-message'), collection: messages });
  new MessagesView({ el: $('#messageWrapper'), collection: messages });
});



/*

var StatusesView = Backbone.View.extend({
    initialize: function() {
        this.collection.on('add', this.appendStatus, this);
    },

    appendStatus: function(status) {
        this.$('ul').append('<li>' + status.escape('text') + '</li>');
    }
});

$(document).ready(function() {
    var statuses = new Statuses();
    new NewStatusView({ el: $('#new-status'), collection: statuses });
    new StatusesView({ el: $('#statuses'), collection: statuses });
});
*/