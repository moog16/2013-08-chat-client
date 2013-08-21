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
  initialize: function(data) {
    this.set('text', data.text);
    this.set('username', data.username);
  }
});

var Messages = Backbone.Collection.extend({
  model: Message,
  url: 'https://api.parse.com/1/classes/messages?order=-createdAt'
  // options: {
  //   success: function(collection, response) {
  //     _.each(response.results, function(messageObj, index) {
  //     });
  //   }
  // }
});

var MessagesView = Backbone.View.extend({
  initialize: function() {
    this.collection.on('add', this.appendMessages, this);
    this.collection.on('add', this.appendNewMessage, this);
  },
  appendMessages: function(message) {
    var text = message.get('results');
    var that = this;
    _.each(text, function(responseObj) {
      $(that.el).append($('<div/>').append($('<a/>').text(responseObj.username))
        .append($('<span/>').text(': ' +responseObj.text)));
    });
  },
  appendNewMessage: function(message) {
    // var that = this.fetch.bind(this.collection);
    // var init = _.once(that);

    // init();
    // console.log('asdf');
    this.collection.fetch({add: false});
    $(this.el).prepend($('<div/>').append($('<a/>').text(message.get('username')))
        .append($('<span/>').text(': ' +message.get('text'))));
  }
});

var NewMessageView = Backbone.View.extend({
  events: {
    'submit form': 'addNewMessage'
  },
  initialize: function() {
    this.collection.on('add', this.clearInput, this);
  },
  addNewMessage: function(e) {
    e.preventDefault();
    this.collection.create({
      text: $('#sendMessage').val(),
      username: window.location.search.split('=')[1]
    });
  },
  clearInput: function() {
    $('#sendMessage').val('');
  }
});

$(document).ready(function() {
  var messages = new Messages();
  //messages.fetch(messages.options);
  messages.fetch();
  new MessagesView({ el: '#messageWrapper', collection: messages });
  new NewMessageView({ el: '#new-message', collection: messages });
  // setInterval(function() {
  //   messages.fetch({add:false});
  // }, 500);
  // Backbone.sync('read', messages);
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