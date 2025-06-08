
import React, { useEffect, useState ,useMemo} from "react";
import { Box, Button, TextField, Typography, Fade, Tooltip } from "@mui/material";
import { useSnackbar } from "notistack";
import EditIcon from '@mui/icons-material/Edit';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import socket from "./Socket";
 //import { io } from "socket.io-client";
import { useLocation } from 'react-router';
function SetName({ onDataChange, initialName = "", initialRoom = ""}) {
  const [name, setName] = useState(initialName);
  const location=useLocation();
  const {roomID}=location.state || "";
  const [roomId, setRoomId] = useState(roomID);
  
  const [hasName, setHasName] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  async function checkRooms() {
    const result=await fetch(`https://ghost-talk-5ofn.onrender.com/check-rooms/${roomId}`);
    const response =await result.json();
    console.log("check room called")
    return response.success;
  }
  const submitHandler =async () => {
    if (name.trim() === "" || roomId.trim() === "") {
      enqueueSnackbar("Please enter both name and room ID.", { variant: "warning" });
      return;
    }
    const obj={
      name:name,
      room:roomId
    }
    console.log("submit hanlder called")
    const ans= await checkRooms();
    console.log("check room ki valuue "+ans)
    if(!ans){
      console.log("submit hanlder ke ander hai")
      enqueueSnackbar("Invalid Room  ID",{variant:"warning"});
      return;
    }
    setHasName(true);
    onDataChange(name, roomId);
    if(ans){
      console.log("room theek hai")
      socket.connect();
      socket.emit("notify-user",obj);
    }
    //postRoom();
    //console.log("postman call ho gya hai")
    enqueueSnackbar(`Welcome, ${name}! Joined room: ${roomId}`, { variant: "success" });
  };

  const resetHandler = () => {
    setHasName(false);
    setName("");
    setRoomId("");
    onDataChange("", "");
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 4,
        borderRadius: 3,
        boxShadow: 6,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        transition: "all 0.3s ease-in-out",
      }}
    >
      {hasName ? (
        <Fade in={hasName}>
          <Box sx={{ textAlign: "center" }}>
            <HowToRegIcon color="primary" sx={{ fontSize: 60, mb: 1 }} />
            <Typography variant="h5" gutterBottom>
              Hello, <strong>{name}</strong>! 👋
            </Typography>
            <Typography variant="h6" gutterBottom>
              Room: <strong>{roomId}</strong>
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              You're now ready to chat securely and anonymously!
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              onClick={resetHandler}
              sx={{ mt: 2 }}
            >
              Change Name / Room
            </Button>
          </Box>
        </Fade>
      ) : (
        <>
          <Typography variant="h5" align="center" gutterBottom>
            Enter your details
          </Typography>
          <TextField
            label="Your Name"
            variant="outlined"
            placeholder="e.g., Alex, Jamie123"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            autoFocus
            helperText="Choose a friendly nickname"
          />
          <TextField
            label="Room ID"
            variant="outlined"
            placeholder="Room to join or create"
            value={roomId || ""}
            onChange={(e) => setRoomId(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
            helperText="Enter the room ID you want to join or create"
          />
          <Tooltip
            title={(name||"").trim() === "" && (roomId||"").trim() === "" ? "Please fill all fields" : "Click to join room"}
          >
            <span>
              <Button
                variant="contained"
                color="primary"
                onClick={submitHandler}
                disabled={(name||"").trim() === "" && (roomId||"").trim() === ""}
                fullWidth
                sx={{ py: 1.5, mt: 2 }}
              >
                Join Room
              </Button>
            </span>
          </Tooltip>
        </>
      )}
    </Box>
  );
}

export default SetName;
