import React, { useCallback, useState } from 'react';
import {
  Button20,
  Heading1,
  JoinInnerContainer,
  JoinInput,
  JoinInput20,
  JoinOuterContainer
} from '../styles';
import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT.trim();

  async function callApi(name, room) {
    try {
      const response = await fetch(`${apiEndpoint}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, room }),
      });
      if (!response.ok) {
        throw new Error('Failed to sign in');
      }
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error('Failed to fetch data');
    }
  }

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!name || !room || !/^[a-zA-Z0-9]*$/.test(name) || !/^[a-zA-Z0-9]*$/.test(room)) {
      return;
    }

    try {
      setIsSigningIn(true);
      const data = await callApi(encodeURIComponent(name), encodeURIComponent(room));
      window.location.assign(data.url);
    } catch (error) {
      console.error('Error signing in:', error.message);
    } finally {
      setIsSigningIn(false);
    }
  }, [name, room]);

  return (
    <JoinOuterContainer>
      <JoinInnerContainer>
        <form onSubmit={handleFormSubmit}>
          <Heading1>Join</Heading1>
          <JoinInput
            placeholder="Name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value.trim())}
            required
          />
          <JoinInput20
            placeholder="Room"
            type="text"
            value={room}
            onChange={(event) => setRoom(event.target.value.trim())}
            required
          />
          <Button20 type="submit" disabled={isSigningIn}>
            {isSigningIn ? 'Signing In...' : 'Sign In'}
          </Button20>
        </form>
      </JoinInnerContainer>
    </JoinOuterContainer>
  );
}
