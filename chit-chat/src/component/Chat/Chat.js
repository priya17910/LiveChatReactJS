import React, { useEffect, useState } from 'react';
import socketIo from "socket.io-client";
import { useParams } from 'react-router-dom';
import './Chat.css';
import SendIcon from '@mui/icons-material/Send';
import Message from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

let socket;
const ENDPOINT = "http://localhost:4000";

const Chat = () => {
    const params = useParams();
    const user = params.value;
    const [id, setId] = useState("");
    const [messages, setMessages] = useState([]);
    const send = () => {
        const msg = document.getElementById('chatInput').value;
        socket.emit("message", {
            message: msg,
            id: id
        });
        document.getElementById('chatInput').value = "";
    };


    useEffect(() => {

        //
        socket = socketIo(ENDPOINT, {
            transports: [
                'websocket'
            ]
        });

        //
        socket.on('connect', () => {
            // alert("connected");
            setId(socket.id);
        });

        //
        socket.emit('joined', {
            user
        });

        //
        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        });

        //
        socket.on('userjoined', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        });


        socket.on('leave', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        });

        return () => {
            socket.emit('disconnected');
            socket.off();
        };
    }, [user]);

    useEffect(() => {
        socket.on('sendmessage', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message, data.id);
        });
        return () => {
            socket.off();
        };
    },[messages]);


    return (
    <div className='chatPage'>
        <div className='chatContainer'>
            <div className='header'>
                <h2>CHAT VISTA</h2>
                <a href="/"><HighlightOffIcon /></a>
            </div>
            <ReactScrollToBottom className='chatBox'>
                {
                    messages.map((item, i) => (
                        <Message 
                        message={item.message} 
                        classes={item.id === id ? 'right' : 'left'}
                        user={item.id === id ? '' : item.user}
                        />
                    ))
                }
            </ReactScrollToBottom>
            <div className='inputBox'>
                <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
                <button className='sendBtn' onClick={send}><SendIcon /></button>
            </div>
        </div>
    </div>
  )
}

export default Chat