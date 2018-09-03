 var chat = new WebSocket("ws://localhost:8887");

    chat.onmessage = function (event) {
        console.log(event.data);
    };
