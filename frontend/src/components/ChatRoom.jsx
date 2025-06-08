import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  Paper,
  Snackbar,
  Divider,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import socket from './Socket'; 
import SetName from './SetName';
import { useLocation } from 'react-router';
const ChatRoom = () => {
  const [name, setName] = useState('');
 
  const [inputMessages, setInputMessages] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const location=useLocation();
  const {roomID}=location.state?.roomID || "";
  //const roomId = location.state?.roomId || "";
  //const [room, setRoom] = useState(roomId === "" ? "" : roomId);
   const [room, setRoom] = useState(roomID===""?"":roomID);
   const [roomCount,setRoomCount]=useState(0);
 async function getRooms() {
      const result=await fetch("https://ghost-talk-5ofn.onrender.com/get-roomCount");
      const response=await result.json();
      setRoomCount(response.roomCount);

   }
  useEffect(() => {
    socket.connect();
    //getRooms();
    socket.on('user-notified', (joinedName) => {
      enqueueSnackbar(`${joinedName} joined the chat`, { variant: 'default' });
    });

    socket.on('message-received', (obj) => {
      console.log("message received "+obj.message)
      setMessages((prev) => [...prev, obj]);
    });

    socket.on('user-connect', (id) => {
      console.log(`User connected: ${id}`);
    });
    socket.on("roomClosed",(msg)=>{
      enqueueSnackbar(`Welcome, ${name}! Joined room: ${roomId}`, {
  variant: "success",
  autoHideDuration: null,
  persist: true,
  action: (key) => (
    <Button onClick={() => closeSnackbar(key)} color="inherit" size="small">
      Dismiss
    </Button>
  ),
});

    })
    socket.on('user-disconnect', (id) => {
      console.log(`User disconnected: ${id}`);
    });

    return () => {
      socket.off('user-connect');
      socket.off('user-disconnect');
      socket.off('user-notified');
      socket.off('message-received');
    };
  }, [room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendHandler = (e) => {
    e.preventDefault();
    if (inputMessages.trim() === '') {
      alert('Cannot send empty message');
      return;
    }

    const obj = {
      sender: name,
      room,
      message: inputMessages,
    };

    socket.emit('receive-messages', obj);
    console.log("message bhej diya "+obj.message +"send by "+obj.sender )
    setInputMessages('');
  };

  const onDataChange = (newName, newRoom) => {
    setName(newName);
    setRoom(newRoom);
  };

  const isReady = name.trim() !== '' && room.trim() !== '';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        px: 2,
        backgroundColor: '#f0f2f5',
      }}
    >
      {!isReady ? (
        <SetName onDataChange={onDataChange} initialName={name} initialRoom={room}  room={room}/>
      ) : (
        <Paper
          elevation={3}
          sx={{
            p: 2,
            width: '100%',
            maxWidth: 700,
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Chat Room: {room}
          </Typography>
          <Typography>{roomCount}</Typography>
          <Divider sx={{ mb: 2 }} />

          {/* Scrollable Message Area */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              px: 2,
              py: 1,
              mb: 2,
              border: '1px solid #ccc',
              borderRadius: 2,
              backgroundColor: '#f9f9f9',
            }}
          >
            <List disablePadding>
              {messages.map((msg, index) => {
                const isSelf = msg.sender === name;
                return (
                  <ListItem
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: isSelf ? 'flex-end' : 'flex-start',
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: isSelf ? '#1976d2' : '#e0e0e0',
                        color: isSelf ? 'white' : 'black',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        maxWidth: '70%',
                        wordBreak: 'break-word',
                        textAlign: isSelf ? 'right' : 'left',
                      }}
                    >
                      <Typography variant="body1">{msg.message}</Typography>
                      {!isSelf && (
                        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                          — {msg.sender}
                        </Typography>
                      )}
                    </Box>
                  </ListItem>
                );
              })}
              <div ref={messagesEndRef} />
            </List>
          </Box>

          {/* Message Input */}
          <form onSubmit={sendHandler}>
            <TextField
              fullWidth
              label="Enter a message"
              variant="outlined"
              value={inputMessages}
              onChange={(e) => setInputMessages(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Send Message
            </Button>
          </form>

          {/* Change Name / Room Button */}
          <Button
            variant="text"
            color="secondary"
            sx={{ mt: 1 }}
            onClick={() => {
              setName('');
              setRoom('');
              setMessages([]);
            }}
          >
            Change Name / Room
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default ChatRoom;
