import 'dotenv/config';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';
import './Chat.css';

const ENDPOINT = process.env.REACT_APP_CHAT_ENDPOINT || process.env.DEFAULT_ENDPOINT;
if (!ENDPOINT) {
  throw new Error('Endpoint configuration missing. Please set REACT_APP_CHAT_ENDPOINT or DEFAULT_ENDPOINT environment variables.');
}

const useSocket = (endpoint, location) => {
  const [state, setState] = useState({
    name: '',
    room: '',
    users: [],
    message: '',
    messages: []
  });
  const socketRef = useRef();

  const sendMessage = useCallback((event) => {
    event.preventDefault();
    if (state.message) {
      socketRef.current.emit('sendMessage', state.message, (error) => {
        if (error) {
          throw new Error(`Message failed to send: ${error}`);
        }
        setState(prevState => ({ ...prevState, message: '' }));
      });
    }
  }, [state.message]);

  useEffect(() => {
    socketRef.current = io(endpoint);
    const { name, room } = location.search ? Object.fromEntries(new URLSearchParams(location.search)) : {};
    setState(prevState => ({ ...prevState, name, room }));
    if (!name || !room) {
      throw new Error('Name and room are required to join a chat room.');
    }
    socketRef.current.emit('join', { name, room }, (error) => {
      if (error) {
        throw new Error(`Error joining chat room: ${error}`);
      }
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [endpoint, location.search]);

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      setState(prevState => ({ ...prevState, messages: [...prevState.messages, newMessage] }));
    };
    const handleRoomData = ({ users }) => {
      setState(prevState => ({ ...prevState, users }));
    };
    socketRef.current.on('message', handleNewMessage);
    socketRef.current.on("roomData", handleRoomData);
    return () => {
      socketRef.current.off('message', handleNewMessage);
      socketRef.current.off('roomData', handleRoomData);
      socketRef.current.disconnect();
    };
  }, []);

  const { name, room, users, message, messages } = state;
  const setMessage = (newMessage) => setState(prevState => ({ ...prevState, message: newMessage }));

  return { name, room, users, message, messages, setMessage, sendMessage };
};

const Chat = ({ location }) => {
  const { name, room, users, message, messages, setMessage, sendMessage } = useSocket(ENDPOINT, location);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

Chat.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default Chat;