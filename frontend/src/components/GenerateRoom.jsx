
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import { useSnackbar } from "notistack";
import SendMail from "./SendMail";
import Tagline from "./TagLine";
function GenerateRoom() {
  const [limit,setLimit]=useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [roomCreated, setRoomCreated] = useState(false);
  const [roomCount,setRoomCount]=useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // useEffect(()=>{

  // },[])
  async function getRooms() {
      const result=await fetch("http://localhost:3000/get-roomCount");
      const response=await result.json();
      //console.log("roomcount hai "+roomCount);
      setRoomCount(response.roomCount);

   }
  async function postRoom() {
       if(roomCount>0){
           try{
          const response=await fetch("https://ghost-talk-5ofn.onrender.com/register-room",{
            method:"POST",
             headers: {
            'Content-Type': 'application/json',
            },
            body:JSON.stringify({roomId}),
          });
          const result=await response.json();
          result.roomLeft>=0?setLimit(false):setLimit(true);
          if(result.success){
            enqueueSnackbar(result.message,{variant:"success"});
          }
          else{
            enqueueSnackbar(result.message,{variant:"error"});
           setTimeout(()=>{
                 enqueueSnackbar("Please Try After Sometime ",{variant:"default"})
           },1500)
          }
        
        }
        catch(e){
            enqueueSnackbar(e.toString(),{variant:"error"});
        }
       }
       else{
          enqueueSnackbar("Cannot Map Room ID At Server ",{variant:"error"});
          return;
       }
    }
 
 const generateHandler = async () => {
  setIsGenerating(true);
  const nanoId = nanoid(8);
  const result = await fetch("https://ghost-talk-5ofn.onrender.com/get-roomCount");
  const response = await result.json();
  setRoomCount(response.roomCount);
  setRoomId(nanoId);
  setRoomCreated(true); // triggers postRoom() through useEffect
  setIsGenerating(false);
  if (response.roomCount <= 0) {
    //enqueueSnackbar("Cannot map room on server. Limit reached.", { variant: "error" });
    setLimit(true);
    setIsGenerating(false);
    return;
  }

  
};


  const handleCopy = async () => {
    if (hasCopied) return;
    if(!limit){
       try {
      await navigator.clipboard.writeText(roomId);
      enqueueSnackbar("Room ID copied to clipboard!", { variant: "success" });
      setHasCopied(true);
    } catch (err) {
      enqueueSnackbar("Error copying Room ID", { variant: "warning" });
      //console.error("Clipboard copy failed:", err);
    }
    }
    else{
      enqueueSnackbar("Invalid Room ID , Cannot Copy ",{variant:"warning"})
    }
   
  };

  const handleShare = async () => {
    if (navigator.share && roomId && !limit) {
      try {
        await navigator.share({
          title: "Join My Chat Room",
          text: `Here's the Room ID to join my chat: ${roomId}`,
          url: window.location.origin + `/join-room`,
        });
      } catch (error) {
        enqueueSnackbar("Sharing canceled or failed", { variant: "warning" });
      }
    } 
    else if(limit){
      enqueueSnackbar("Invalid Room ID , Cannot Share ",{variant:"error"})
    }
    else {
      enqueueSnackbar("Sharing is not supported on this device", { variant: "info" });
    }
  };

  useEffect(() => {
  
    
    if(roomCreated){
      postRoom();
       //console.log("room create ho vgya hai"+roomCreated);
    }
    
    //console.log(roomCreated);
    setHasCopied(false);
  }, [roomCreated]);

  return (
    <Box
      sx={{
        minHeight: "85vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#121212" : "#f9f9f9",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 500,
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Tagline/><br /> <br />
        <Typography variant="h4" gutterBottom fontWeight="bold">
          🔐 Generate a Private Chat Room
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Create a secure, temporary room for private conversations. Share the ID with others to join.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {isGenerating ? (
          <Box sx={{ my: 4 }}>
            <CircularProgress color="primary" />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Generating your unique Room ID...
            </Typography>
          </Box>
        ) : !roomCreated ? (
          <>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Click below to create a room. It will expire in 1 hour.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={generateHandler}
              fullWidth
            >
              Generate Room
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Room ID Created:
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                color: "primary.main",
                wordBreak: "break-word",
                fontWeight: "bold",
              }}
            >
              {roomId}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
              <Tooltip title="Copy Room ID">
                <IconButton color="primary" onClick={handleCopy}>
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Share Room ID">
                <IconButton color="primary" onClick={handleShare}>
                  <ShareIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Button
              variant="contained"
              color="success"
              fullWidth
              size="large"
              disabled={limit}
              onClick={() => navigate("/join-room", { state: { roomID :roomId} })}
            >
              Join This Room
            </Button>

            <Typography variant="caption" display="block" sx={{ mt: 2 }} color="text.secondary">
              Share this Room ID with your friends. It expires automatically after 1 hour.
            </Typography>
          </>
        )}
        {limit?<SendMail/>:""}
      </Paper>
      
    </Box>
   
    
  );
}

export default GenerateRoom;

