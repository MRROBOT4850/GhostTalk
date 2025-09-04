// ek instance hai sever ke liye
import { io } from 'socket.io-client';
const socket = io("https://ghost-talk-3shn.onrender.com/", {
  autoConnect: false, 
});

export default socket;
