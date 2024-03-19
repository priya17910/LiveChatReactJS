const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
const port = 4000 || process.env.PORT;

const users = [{}];

app.use(cors());
app.get("/", (req, res) => {
    res.send("Its Working");
});


const server = http.createServer(app);

const io = socketIO(server);
io.on("connection", (socket) => {
    console.log("New Connection");



    socket.on('joined', ({user}) => {
        users[socket.id] = user;
        socket.broadcast.emit('userjoined', {
            user: "Admin",
            message: users[socket.id] + ' has joined',
        });
        socket.emit('welcome',{
            user: "Admin",
            message: "Welcome to the Chat, " + users[socket.id],
        });
    });


    socket.on("message", ({message, id}) => {
        io.emit('sendmessage', {
            message: message,
            user: users[id],
            id: id
        });
    });


    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', {
            user: "Admin",
            message: users[socket.id] + " has left",
        });
        console.log(`user left`);
    });
    

    


});

server.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
});
