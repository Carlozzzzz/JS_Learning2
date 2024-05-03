<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Socket.IO CORS Example</title>
</head>
<body>
    <h1>Socket.IO CORS Example</h1>
    <script src="http://localhost:3000/socket.io/socket.io.js"></script>
    <script>
        const socket = io('http://localhost:3000');

        socket.on('server', (data) => {
            console.log('Server message:', data);
        });

        socket.emit('message', 'Hello from client!');
    </script>
</body>
</html>
