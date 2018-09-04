var socket = new WebSocket("ws://localhost:8887");

var triggers = {
    message: function (payload) {
        var list = $('#output-list');

        var li = $('<li class="message"></li>');
        var p = $('<p></p>');
        p.append('<span class="sender">' + payload['sender']['username'] + '</span>');
        p.append('<span class="text">' + payload['message'] + '</span>');
        li.append(p);
        list.append(li);
    },
    'connected-response': function (payload) {
        appendText('You are now connected as ' + payload.user.username);
    },
    'connected-notification': function (payload) {
        appendText(payload.user.username + ' has connected');
    },
    'disconnected-notification': function (payload) {
        appendText(payload.user.username + ' has disconnected');
    }
};

function appendText(text) {
    var list = $('#output-list');
    var li = $('<li class="message notification"></li>');
    var p = $('<p>' + text + '</p>');
    li.append(p);
    list.append(li);
}

var chat = new ChatClient(socket, triggers);

$('#chat-send').on('click', function (e) {
    e.preventDefault();
    chat.send($('#chat-input').val());
    $('#chat-input').val('');
});

