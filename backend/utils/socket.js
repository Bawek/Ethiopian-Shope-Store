let io = null;

module.exports = {
    initialize: (server) => {
        io = require('socket.io')(server, {
            cors: {
                origin: ['http://localhost:3000', 'https://checkout.chapa.co'],
                methods: ['GET', 'POST']
            }
        });

        io.on('connection', (socket) => {
            console.log('Client connected');

            socket.on('join-admin-room', () => {
                socket.join('admin-room');
                console.log('Admin joined the room');   
            });
            // Merchant room join handler
            socket.on('join-merchant-room', (merchantId) => {
                if (!merchantId) {
                    return socket.emit('error', 'Merchant ID is required');
                }
                const roomName = `merchant-${merchantId}`;
                socket.join(roomName);
                console.log(`Merchant ${merchantId} joined their room`);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });

        return io;
    },

    getIO: () => {
        if (!io) throw new Error('Socket.io not initialized!');
        return io;
    }
};