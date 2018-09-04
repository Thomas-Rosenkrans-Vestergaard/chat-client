import 'chat-client';

var socket = new WebSocket("ws://localhost:8887");
var chat = new ChatClient(socket);

class MyTriggers extends Triggers {

    onTextMessage(payload) {
        displayTextMessage(payload);
    }
}

function displayTextMessage(payload) {
    var list = $('#output-list');

    var li = $('<li class="message"></li>');
    li.insert($('<span class="author">' + payload['user']['username'] + '</span>'));
    li.insert($('<span class="text">' + payload['text'] + '</span>'));
    list.insert(li);
}

$('#chat-send').on('click', function (e) {
    e.preventDefault();
    chat.send($('#chat-input').val());
    $('#chat-input').val('');
});

