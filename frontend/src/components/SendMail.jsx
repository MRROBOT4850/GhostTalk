import React, { useState } from 'react';
//import { Box } from '@mui/material';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { enqueueSnackbar } from 'notistack';
function SendMail(){
    const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');
  async function handleSend(){
      const result=await fetch("https://ghost-talk-5ofn.onrender.com/send-gmail",{
        method:"POST",
         headers: {
            'Content-Type': 'application/json',
            },
        body:JSON.stringify({to:email})
      });
      const response=await result.json();
      setSuccess(response.success);
      //console.log("email ki value"+response);
      success?enqueueSnackbar("Email Sent SuccessFully",{variant:"success"}):enqueueSnackbar(response.message,{variant:"error"});

  }
   return (
    <Container maxWidth="sm" sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          width: '100%',
          border: '1px solid #ddd',
          borderRadius: 2,
          p: 4,
          boxShadow: 1,
          bgcolor: '#fff',
        }}
      >
         <Typography variant="h4" align='center'gutterBottom fontWeight="bold">
          All Rooms are Full
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Enter your Gmail to get notified when one is available
        </Typography>

        <Stack spacing={2} mt={2}>
          <TextField
            label="Your Gmail"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@example.com"
            required
            fullWidth
          />

          <Button
            variant="contained"
            disabled={!email || sending}
            onClick={handleSend}
            startIcon={<GoogleIcon />}
            sx={{
              backgroundColor: '#4285F4',
              '&:hover': { backgroundColor: '#3367D6' },
              color: '#fff',
              textTransform: 'none',
              fontWeight: 'bold',
            }}
            fullWidth
          >
            {sending ? <CircularProgress size={24} color="inherit" /> : 'Notify Me via Gmail'}
          </Button>

          {success && <Alert severity="success">Notification sent!</Alert>}
          {success === false && <Alert severity="error">{error}</Alert>}
        </Stack>
      </Box>
    </Container>
  );
}


export default SendMail;
