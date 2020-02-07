module.exports = io => {
    let userSockets = {};

    io.on("connection", socket => {
        console.log(socket.id);
        socket.on("disconnect", () => {
            console.log(socket.id);
            let userId = userSockets[socket.id];
            delete userSockets[socket.id];
            console.log("dis", userSockets);
            if (userId) {
                io.sockets.emit("user-offline", userId);
            }
        });
        socket.on("online-ping", userId => {
            if (userId) {
                console.log("online-ping");
                userSockets[socket.id] = userId;
                console.log(userSockets);
                socket.broadcast.emit("user-online", userId);
                setTimeout(function() {
                    // Send currently online users
                    socket.emit("online-users", Object.values(userSockets));
                }, 1000);
            }
        });
        socket.on("enter-conversation", conversation => {
            socket.join(conversation);
        });
        socket.on("leave-conversation", conversation => {
            socket.leave(conversation);
        });
        socket.on("send_message", function(message) {
            console.log("send_message", message.conversationId);
            socket.broadcast.emit("new-message", message);
        });
    });
};