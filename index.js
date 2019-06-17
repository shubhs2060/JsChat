var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

var clients = 0
io.on('connection', function(socket){
    clients ++
    io.sockets.emit('broadcast',clients);

    console.log('a user connected');
    socket.on('disconnect', function(){
      clients --
      io.sockets.emit('broadcast',clients);
      console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    socket.on('type message', function(msg){
        io.emit('type message', msg);
    });
    socket.on('image message', function(msg){
        io.emit('image message', msg);
    });
  });  

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});
