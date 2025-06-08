// ek instance hai sever ke liye
import { io } from 'socket.io-client';
const socket = io("https://ghost-talk-5ofn.onrender.com/", {
  autoConnect: false, 
});

export default socket;
