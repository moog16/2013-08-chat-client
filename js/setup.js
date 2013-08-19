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

var subMessage = function() {
  console.log('this is working');
  var textMessage = $('#sendMessage').val();

  console.log(textMessage);

  var message = {
    'username': window.location.search.split('=')[1],
    'text': textMessage,
    'roomname': 'level8'
  };

  $.ajax('https://api.parse.com/1/classes/messages', {
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify(message),
    success: function() {
      console.log('we sent a message, maybe');
    }
  });

  updateMessages();
};

var updateMessages = function() {
  var params = encodeURI('order=-createdAt');
  console.log(params);
  $.ajax('https://api.parse.com/1/classes/messages?'+params, {
    contentType: 'application/json',
    success: function(data){
      $('#messageWrapper').html('');
      console.log(data);
      for(var i=0; i < data.results.length; i++) {
        var $text = data.results[i].text;
        var $user = data.results[i].username;
        $('#messageWrapper').append('<a href="" id='+ i+data.results.length +'>  </a><span id="' + i + '"></span><br />');
        $('#'+i).text($text);
        $('#'+i+data.results.length).text($user + ':  ');
      }
      console.log(data);
    },
    error: function(data) {
      console.log('Ajax request failed');
    }
  });
};
updateMessages();
