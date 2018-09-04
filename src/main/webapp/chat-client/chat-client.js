function ChatClient(socket) {
    this.socket = socket;
}

ChatClient.prototype.transmit = function (object) {
    this.socket.send(object);
};

ChatClient.prototype.socket.onmessage = function (e) {
    console.log(e.data);
}

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