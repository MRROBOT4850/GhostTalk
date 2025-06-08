import React, { useState, useEffect } from "react";

const messages = [
  "Say Anything. It Disappears Forever.",
  "Private. Instant. Gone.",
  "No Logs. No Traces. Just Talk.",
];

function TypingText({
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 1600,
}) {
  const [text, setText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;

    if (!isDeleting) {
      if (text.length < messages[messageIndex].length) {
        timeout = setTimeout(() => {
          setText(messages[messageIndex].slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(messages[messageIndex].slice(0, text.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setMessageIndex((prev) => (prev + 1) % messages.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, messageIndex, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <>
      <h1 style={{ fontFamily: "monospace", fontWeight: "bold" }}>
        <span
          style={{
            whiteSpace: "nowrap",
            borderRight: "2px solid black",
            animation: "blink-caret 1s step-end infinite",
          }}
        >
          {text}
        </span>
      </h1>

      <style>{`
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: black; }
        }
      `}</style>
    </>
  );
}

export default TypingText;
// import React, { useState, useEffect } from "react";

// const messages = [
//   "Say Anything. It Disappears Forever.",
//   "Private. Instant. Gone.",
//   "No Logs. No Traces. Just Talk.",
// ];

// function TypingText({
//   typingSpeed = 100,
//   deletingSpeed = 50,
//   pauseTime = 1600,
// }) {
//   const [text, setText] = useState("");
//   const [messageIndex, setMessageIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     let timeout;

//     if (!isDeleting) {
//       if (text.length < messages[messageIndex].length) {
//         timeout = setTimeout(() => {
//           setText(messages[messageIndex].slice(0, text.length + 1));
//         }, typingSpeed);
//       } else {
//         timeout = setTimeout(() => setIsDeleting(true), pauseTime);
//       }
//     } else {
//       if (text.length > 0) {
//         timeout = setTimeout(() => {
//           setText(messages[messageIndex].slice(0, text.length - 1));
//         }, deletingSpeed);
//       } else {
//         setIsDeleting(false);
//         setMessageIndex((prev) => (prev + 1) % messages.length);
//       }
//     }

//     return () => clearTimeout(timeout);
//   }, [text, isDeleting, messageIndex, typingSpeed, deletingSpeed, pauseTime]);

//   return (
//     <>
//       <h1 style={{ fontFamily: "monospace", fontWeight: "bold" }}>
//         <span
//           style={{
//             whiteSpace: "nowrap",
//             borderRight: "2px solid black",
//             animation: "blink-caret 1s step-end infinite",
//           }}
//         >
//           {text}
//         </span>
//       </h1>

//       <style>{`
//         @keyframes blink-caret {
//           from, to { border-color: transparent }
//           50% { border-color: black; }
//         }
//       `}</style>
//     </>
//   );
// }

// export default TypingText;
// import React, { useState, useEffect } from "react";
// import { Typography } from "@mui/material";

// const messages = [
//   "Say Anything. It Disappears Forever.",
//   "Private. Instant. Gone.",
//   "No Logs. No Traces. Just Talk.",
// ];

// function TypingText({ typingSpeed = 100, deletingSpeed = 50, pauseTime = 1600 }) {
//   const [text, setText] = useState("");
//   const [messageIndex, setMessageIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     let timeout;

//     if (!isDeleting) {
//       if (text.length < messages[messageIndex].length) {
//         timeout = setTimeout(() => {
//           setText(messages[messageIndex].slice(0, text.length + 1));
//         }, typingSpeed);
//       } else {
//         timeout = setTimeout(() => setIsDeleting(true), pauseTime);
//       }
//     } else {
//       if (text.length > 0) {
//         timeout = setTimeout(() => {
//           setText(messages[messageIndex].slice(0, text.length - 1));
//         }, deletingSpeed);
//       } else {
//         setIsDeleting(false);
//         setMessageIndex((prev) => (prev + 1) % messages.length);
//       }
//     }

//     return () => clearTimeout(timeout);
//   }, [text, isDeleting, messageIndex, typingSpeed, deletingSpeed, pauseTime]);

//   return (
//     <>
//       <Typography
//         variant="h3"
//         component="h1"
//         sx={{
//           fontFamily: "monospace",
//           fontWeight: "bold",
//           whiteSpace: "nowrap",
//           borderRight: "2px solid black",
//           animation: "blink-caret 1s step-end infinite",
//           fontSize: {
//             xs: "1.5rem",  // mobile
//             sm: "2.5rem",  // tablets
//             md: "3rem",    // desktop
//           },
//           maxWidth: "100%",
//           mx: "auto",
//           overflowWrap: "break-word",
//         }}
//       >
//         {text}
//       </Typography>

//       <style>{`
//         @keyframes blink-caret {
//           from, to { border-color: transparent }
//           50% { border-color: black; }
//         }
//       `}</style>
//     </>
//   );
// }

// export default TypingText;
