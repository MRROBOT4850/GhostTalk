
// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Box,
//   Button,
//   Typography,
//   Container,
//   Stack,
//   useMediaQuery,
//   useTheme,
//   AppBar,
//   Toolbar,
//   Grid,
//   Paper,
// } from '@mui/material';
// import ChatIcon from '@mui/icons-material/Chat';
// import LockIcon from '@mui/icons-material/Lock';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import GroupIcon from '@mui/icons-material/Group';
// import TypingText from './TypingText';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import SecurityIcon from '@mui/icons-material/Security';
// import FlashOnIcon from '@mui/icons-material/FlashOn';
// import PeopleIcon from '@mui/icons-material/People';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// const benefits = [
//   {
//     icon: <SecurityIcon color="primary" fontSize="large" />,
//     title: 'Privacy First',
//     description: 'Your conversations are safe — no personal data is collected or stored.',
//   },
//   {
//     icon: <DeleteForeverIcon color="primary" fontSize="large" />,
//     title: 'Automatic Cleanup',
//     description: 'Rooms and chats are deleted automatically after 1 hour, keeping things tidy.',
//   },
//   {
//     icon: <FlashOnIcon color="primary" fontSize="large" />,
//     title: 'Fast & Easy',
//     description: 'Create or join chat rooms instantly without any complicated setup.',
//   },
//   {
//     icon: <PeopleIcon color="primary" fontSize="large" />,
//     title: 'Collaborate Anywhere',
//     description: 'Connect with friends, teams, or strangers from anywhere in the world, anonymously.',
//   },
// ];

// const HomePage = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   useEffect(() => {
//     AOS.init({ duration: 800,once:false ,mirror:true});
//   }, []);

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         background: theme.palette.mode === 'dark'
//           ? 'linear-gradient(to bottom, #0f0f0f, #1c1c1c)'
//           : 'linear-gradient(135deg, #d3cce3, #e9e4f0)',
//         backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')`,
//         backgroundRepeat: 'repeat',
//         backgroundSize: 'auto',
//         color: theme.palette.text.primary,
//         display: 'flex',
//         flexDirection: 'column',
//       }}
//     >

//       <AppBar position="static" color="transparent" elevation={0}>
//         <Toolbar sx={{ justifyContent: 'space-between' }}>
//           <Typography variant="h6" fontWeight="bold">
//             🗨️ Room App
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Container maxWidth="md" sx={{ textAlign: 'center', mt: 6 }}>
//         <TypingText />
//         <Typography variant="h3" gutterBottom fontWeight="bold">
//           Welcome to the Room App
//         </Typography>

//         <Typography variant="body1" color="text.secondary" sx={{ mt: 2, mb: 4 }}>
//           Room App offers fast, anonymous chat with zero data retention. No account or phone
//           number needed — just generate a room, share the link, and start chatting instantly.
//           Perfect for private conversations, quick team sync-ups, or ephemeral discussions that
//           don't need to be stored. Our system guarantees that all messages disappear one hour
//           after room creation, and we don’t log anything — ever. 
//         </Typography>
//         <Box sx={{ mt: 4, mb: 6 }}>
//           <Grid
//             container
//             spacing={4}
//             justifyContent="center"
//             alignItems="stretch"
//           >
//             {features.map((feature, idx) => (
//               <Grid
//                 item
//                 xs={12}
//                 sm={6}
//                 key={idx}
//                 display="flex"
//                 data-aos={idx % 2 === 0 ? 'fade-up' : 'fade-down'}
//               >
//                 <Paper
//                   elevation={3}
//                   sx={{
//                     p: 3,
//                     textAlign: 'center',
//                     width: '100%',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'space-between',
//                     gap: 2,
//                     flexGrow: 1,
//                   }}
//                 >
//                   <Box sx={{ fontSize: 40 }}>{feature.icon}</Box>
//                   <Typography variant="h6" fontWeight="bold" gutterBottom>
//                     {feature.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {feature.description}
//                   </Typography>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>

//           <Stack
//             direction={isMobile ? 'column' : 'row'}
//             spacing={2}
//             justifyContent="center"
//             sx={{ mt: 5 }}
//           >
//             <Button
//               variant="contained"
//               component={Link}
//               to="/join-room"
//               size="large"
//               sx={{ px: 4 }}
//             >
//               Join a Room
//             </Button>
//             <Button
//               variant="outlined"
//               component={Link}
//               to="/generate-room"
//               size="large"
//               sx={{ px: 4 }}
//             >
//               Generate a Room
//             </Button>
//           </Stack>
//         </Box>
//       </Container>
//       <Box
//         component="footer"
//         sx={{
//           mt: 'auto',
//           py: 4,
//           textAlign: 'center',
//           backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f0f0f0',
//           color: theme.palette.text.secondary,
//         }}
//       >
//         <Grid
//             container
//             spacing={4}
//             justifyContent="center"
//             alignItems="stretch"
//           >
//             {benefits.map((benefits, idx) => (
//               <Grid
//                 item
//                 xs={12}
//                 sm={6}
//                 key={idx}
//                 display="flex"
//                 data-aos={idx % 2 === 0 ? 'fade-up' : 'fade-down'}
//               >
//                 <Paper
//                   elevation={3}
//                   sx={{
//                     p: 3,
//                     textAlign: 'center',
//                     width: '100%',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'space-between',
//                     gap: 2,
//                     flexGrow: 1,
//                   }}
//                 >
//                   <Box sx={{ fontSize: 40 }}>{benefits.icon}</Box>
//                   <Typography variant="h6" fontWeight="bold" gutterBottom>
//                     {benefits.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {benefits.description}
//                   </Typography>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         <Typography variant="body2" sx={{ mb: 1 }}>
//          <br /> Built for private, temporary, and secure chats. All rooms are deleted after 1 hour.
//         </Typography>
//         <Typography variant="body2">
//           © {new Date().getFullYear()} Room App ·{' '}
//           <Link to="/privacy-policy" style={{ textDecoration: 'none', color: 'inherit' }}>
//             Privacy Policy
//           </Link>
//         </Typography>
//       </Box>
       
        
//     </Box>
//   );
// };
// const features = [
//   {
//     icon: <LockIcon color="primary" fontSize="large" />,
//     title: 'No Logs, No Tracking',
//     description: 'We don’t store chats or track users. Your privacy is our priority.',
//   },
//   {
//     icon: <AccessTimeIcon color="primary" fontSize="large" />,
//     title: '1-Hour Expiry',
//     description: 'Every chat room expires 1 hour after it’s created — no data left behind.',
//   },
//   {
//     icon: <GroupIcon color="primary" fontSize="large" />,
//     title: '100 Active Rooms',
//     description: 'Use any of the 100 available chat rooms — no limit, no wait.',
//   },
//   {
//     icon: <ChatIcon color="primary" fontSize="large" />,
//     title: 'Instant Messaging',
//     description: 'Join or create a room in seconds. Start chatting instantly.',
//   },
// ];



// export default HomePage;
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Container,
  Stack,
  useMediaQuery,
  useTheme,
  AppBar,
  Toolbar,
  Paper,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import LockIcon from '@mui/icons-material/Lock';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import TypingText from './TypingText';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SecurityIcon from '@mui/icons-material/Security';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import PeopleIcon from '@mui/icons-material/People';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const benefits = [
  {
    icon: <SecurityIcon color="primary" fontSize="large" />,
    title: 'Privacy First',
    description: 'Your conversations are safe — no personal data is collected or stored.',
  },
  {
    icon: <DeleteForeverIcon color="primary" fontSize="large" />,
    title: 'Automatic Cleanup',
    description: 'Rooms and chats are deleted automatically after 1 hour, keeping things tidy.',
  },
  {
    icon: <FlashOnIcon color="primary" fontSize="large" />,
    title: 'Fast & Easy',
    description: 'Create or join chat rooms instantly without any complicated setup.',
  },
  {
    icon: <PeopleIcon color="primary" fontSize="large" />,
    title: 'Collaborate Anywhere',
    description: 'Connect with friends, teams, or strangers from anywhere in the world, anonymously.',
  },
];

const features = [
  {
    icon: <LockIcon color="primary" fontSize="large" />,
    title: 'No Logs, No Tracking',
    description: 'We don’t store chats or track users. Your privacy is our priority.',
  },
  {
    icon: <AccessTimeIcon color="primary" fontSize="large" />,
    title: '1-Hour Expiry',
    description: 'Every chat room expires 1 hour after it’s created — no data left behind.',
  },
  {
    icon: <GroupIcon color="primary" fontSize="large" />,
    title: '100 Active Rooms',
    description: 'Use any of the 100 available chat rooms — no limit, no wait.',
  },
  {
    icon: <ChatIcon color="primary" fontSize="large" />,
    title: 'Instant Messaging',
    description: 'Join or create a room in seconds. Start chatting instantly.',
  },
];

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror: true });
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(to bottom, #0f0f0f, #1c1c1c)'
            : 'linear-gradient(135deg, #d3cce3, #e9e4f0)',
        backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        color: theme.palette.text.primary,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight="bold">
            🗨️ Room App
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 6 }}>
        <TypingText />
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Welcome to the Room App
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mt: 2, mb: 4 }}>
          Room App offers fast, anonymous chat with zero data retention. No account or phone
          number needed — just generate a room, share the link, and start chatting instantly.
          Perfect for private conversations, quick team sync-ups, or ephemeral discussions that
          don't need to be stored. Our system guarantees that all messages disappear one hour
          after room creation, and we don’t log anything — ever.
        </Typography>

        <Box sx={{ mt: 4, mb: 6 }}>
          {/* Features Section using CSS Grid */}
          <Box
            display="grid"
            gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
            gap={4}
            justifyContent="center"
            sx={{ maxWidth: 800, mx: 'auto' }}
          >
            {features.map((feature, idx) => (
              <Box
                key={idx}
                data-aos={idx % 2 === 0 ? 'fade-up' : 'fade-down'}
                display="flex"
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 2,
                    flexGrow: 1,
                  }}
                >
                  <Box sx={{ fontSize: 40 }}>{feature.icon}</Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Box>

          <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 5 }}
          >
            <Button
              variant="contained"
              component={Link}
              to="/join-room"
              size="large"
              sx={{ px: 4 }}
            >
              Join a Room
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to="/generate-room"
              size="large"
              sx={{ px: 4 }}
            >
              Generate a Room
            </Button>
          </Stack>
        </Box>
      </Container>

      <Box
        component="footer"
        sx={{
          mt: 'auto',
          py: 4,
          textAlign: 'center',
          backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f0f0f0',
          color: theme.palette.text.secondary,
        }}
      >
        {/* Benefits Section using CSS Grid */}
        <Box
          display="grid"
          gridTemplateColumns={{ xs: '1fr', sm: ' 1fr' }}
          gap={4}
          justifyContent="center"
          sx={{maxWidth:500,mx:'auto',px:{xs:2,sm:0}}}
          
        >
          {benefits.map((benefit, idx) => (
            <Box
              key={idx}
              data-aos={idx % 2 === 0 ? 'fade-up' : 'fade-down'}
              display="flex"
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 2,
                  flexGrow: 1,
                }}
              >
                <Box sx={{ fontSize: 40 }}>{benefit.icon}</Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {benefit.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {benefit.description}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>

        <Typography variant="body2" sx={{ mb: 1 }}>
          <br /> Built for private, temporary, and secure chats. All rooms are deleted after 1 hour.
        </Typography>
        <Typography variant="body2">
          © {new Date().getFullYear()} Room App ·{' '}
          <Link to="/privacy-policy" style={{ textDecoration: 'none', color: 'inherit' }}>
            Privacy Policy
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
