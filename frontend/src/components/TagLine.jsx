
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Fade } from '@mui/material';

const taglines = [
  "Welcome to the place where the unseen find their voice.",
  "Ghosts don’t haunt… they talk. And you’re invited.",
  "Where silence breaks and the shadows speak.",
  "Not every voice has a face. Welcome to Ghost Talk.",
  "When the rooms are quiet, the whispers begin.",
  "A world beyond usernames — just voices in the void.",
  "Conversations without names, from spirits that remain.",
  "Enter a space where the invisible becomes audible.",
];

const Tagline = () => {
  const [index, setIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % taglines.length);
        setFadeIn(true);
      }, 900);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ mb: 2 }}> {/* marginBottom reduced to close the gap */}
      <Fade in={fadeIn} timeout={{ enter: 600, exit: 1500 }}>
        <Card elevation={3} sx={{ textAlign: 'center', borderRadius: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontStyle: 'italic', fontWeight: 500 }}>
              "{taglines[index]}"
            </Typography>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default Tagline;
