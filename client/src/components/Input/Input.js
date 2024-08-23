import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';
import { InputForm, InputText, SendButton } from '../styles';
import './Input.css';

const MessageInput = ({ setMessage, sendMessage, message }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    return () => {
      inputRef.current.blur();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  const handleInputChange = useCallback((e) => {
    setMessage(DOMPurify.sanitize(e.target.value));
  }, [setMessage]);

  return (
    <InputForm onSubmit={handleSubmit}>
      <InputText
        ref={inputRef}
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        type='text'
        placeholder='Type a message...'
        maxLength={255}
        aria-label="Type a message"
        aria-describedby="additional-info"
        aria-live='assertive'
      />
      <SendButton
        type="submit"
        disabled={message.trim() === ''}
      >
        Send
      </SendButton>
    </InputForm>
  );
};

MessageInput.propTypes = {
  setMessage: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default MessageInput;