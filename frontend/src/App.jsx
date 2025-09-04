import { useState ,useEffect,useMemo} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {io} from "socket.io-client"
import { useNavigate, Routes, Route,Link} from "react-router-dom"
import GenerateRoom from './components/GenerateRoom'
import HomePage from './components/HomePage'
import ChatRoom from './components/ChatRoom'
import NotFound from './components/NotFound'

function App() {
 // const useMemo(() => first, [second])
   const socket=useMemo(()=>io("https://ghost-talk-3shn.onrender.com"),[]);
   const [hasName,setHasName]=useState(false);
   const [room,setRoom]=useState("")
   const [name,setName]=useState("");
   const [inputMessages,setInputMessages]=useState("");
   const [messages,setMessages]=useState([]);
   const [roomGenerated,isRoomGenerated]=useState(false);
   const  [join,setJoin]=useState(false);
   const navigate=useNavigate();
  useEffect(() => {
    const pingServer = async () => {
      try {
        await fetch('https://ghost-talk-3shn.onrender.com/ping');
        
      } catch (err) {
        console.error('Failed to ping server:', err);
      }
    };
    pingServer();
    const interval = setInterval(pingServer, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
 // useEffect(()=>{
    // socket.on("connection",()=>{
    //   console.log(`user connected ${socket.id}`)
    // })
  //   socket.on("user-notified",(name)=>{
  //     alert(`${name} has joined the room`);
  //   })
  //   socket.on("message-received",(obj)=>{
  //       console.log(obj);
  //       setMessages((prev)=>[...prev,obj.message]);
  //   })
  //   socket.on("user-connect",(id)=>{
  //     console.log(`user connected ${id}`)
  //   })
  //   socket.on("user-disconnect",(id)=>{
  //     console.log(`user disconnected  ${id}`);
  //   })
  //   return ()=>{
  //     socket.off("user-connect");
  //     socket.off("user-disconnect")
  //     socket.off("user-notified")
  //     socket.off("message-received");
  //   }
  // },[])
  const knowHandler=(e)=>{
    const obj={
      room:room,
      name:name

    }
  
    //socket.emit("receive-messages",obj);
    e.preventDefault();
    socket.emit("notify-user",obj)
    setName("");
    setHasName(true);

  }
  const submitHandler=()=>{

  }
  const sendHandler=(e)=>{
    const obj={
      room:room,
      message:inputMessages

    }
    e.preventDefault();
    socket.emit("receive-messages",obj);
    setInputMessages("");
    
  }
  return (
    <>
       <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/join-room'  element={<ChatRoom/>}></Route>
          <Route path='/generate-room' element={<GenerateRoom/>}></Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
      {/* {
        join?(<><label htmlFor="">Enter Your Room ID</label>
          <input type="text" name="" value={room} id="" onChange={(e)=>setRoom(e.target.value)}/>
          <button type="submit" onClick={()=>{navigate("/chat-room",{state:{roomId:room}})}}>Enter Chat</button>
         </>):
          
          (<><Link to="/generate-room">Generate Room</Link></>)
      } */}

    </>
  )
}

export default App


 {/* <p>Hello world</p>
       {
        !hasName ?(<>  <label htmlFor="" >Enter your name</label>
        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/><br />
        <label htmlFor="" >Enter Room</label>
        <input type="text" name="" value={room} id="" onChange={(e)=>setRoom(e.target.value)}/>
         <button onClick={(e)=>knowHandler(e)}>Enter In The Room</button><br></br></>):(<>
           <form onSubmit={submitHandler}>
       
        <input type="text" name="" value={inputMessages} id="" onChange={(e)=>setInputMessages(e.target.value)} placeholder='Enter the Message'/><br />
        
        <button type="submit" onClick={(e)=>{sendHandler(e)}}>Send Message</button>
      </form>
      <ul>
          {messages.map((message,index)=>(
              <li key={index}>{message}</li>
          ))}
      </ul>
          
        </>)
       }
      */}
      {/* {
        roomGenerated?(navigate("/chat-room",{state:{roomId:room}})):(<>
          <label htmlFor="">Enter Your Room ID</label>
          <input type="text" name="" value={room} id="" onChange={(e)=>setRoom(e.target.value)}/>
         <button onClick={(e)=>knowHandler(e)}>Enter In The Room</button><br></br></>
        )
      } */}
