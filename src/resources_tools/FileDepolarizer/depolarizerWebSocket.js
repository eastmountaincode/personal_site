import io from 'socket.io-client';

class DepolarizerWebSocket {
    constructor() {
        this.socket = null;
    }

    setupListeners() {
        this.socket.on('connect', () => console.log('WebSocket connected'));
        this.socket.on('disconnect', () => console.log('WebSocket disconnected'));
    }

    connect() {
        if (!this.socket) {
            console.log('Attempting to connect to WebSocket server');
            this.socket = io('http://localhost:5001');
            this.setupListeners();
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    startProcessing(filename) {
        console.log('startProcessing()');
        this.socket.emit('start_processing', { filename });
    }

    onError(handleError) {
        this.socket.on('processing_error', error => {
            handleError(error);
        });
    }

    onFirst5Binary(handleData) {
        this.socket.on('first_5_binary', data => {
            handleData(data);
        });
    }
}

export default new DepolarizerWebSocket();

