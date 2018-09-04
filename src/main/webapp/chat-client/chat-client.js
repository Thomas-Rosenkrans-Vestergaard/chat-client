/**
 * Creates a new ChatClient object.
 * @param socket The socket to use for the chat.
 * @param triggers The triggers called when a message is received.
 * @constructor
 */
function ChatClient(socket, triggers) {
    this.socket = socket;
    this.triggers = triggers;
    this.socket.onmessage = function (message) {
        var object = JSON.parse(message.data);
        console.log(object);
        var type = object['type'];
        if (object === undefined || triggers[type] === undefined) {
            console.log("No trigger for type " + object['type'])
            return;
        }

        triggers[object['type']](object['payload']);
    };

}

ChatClient.prototype.transmit = function (object) {
    this.socket.send(JSON.stringify(object));
};

ChatClient.prototype.rename = function (newUsername) {
    this.transmit({
        type: 'rename',
        payload: {'new-username': newUsername}
    });
};

/**
 * Sends a message.
 * @param message The message to send.
 */
ChatClient.prototype.send = function (message) {
    this.transmit({
        'type': 'message',
        'payload': {'message': message}
    });
};