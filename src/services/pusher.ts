import Pusher from 'pusher-js';

Pusher.logToConsole = true;

// Configura Pusher
const pusher = new Pusher('07f871ddb43ea7c54a41', {
    cluster: 'us2',
  });
  
export default pusher;