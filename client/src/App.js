import React, { lazy, Suspense } from 'react';
import {
  ErrorBoundary,
  Route,
  BrowserRouter as Router,
  Routes,
  StrictMode
} from 'react-router-dom';

const Chat = lazy(() => import('./components/Chat/Chat'));
const Join = lazy(() => import('./components/Join/Join'));

const baseName = process.env.REACT_APP_BASENAME || '/src';

const App = () => {
  return (
    <StrictMode>
      <Router basename={baseName}>
        <Routes>
          <Route key="join" path="/" element={
            <Suspense fallback={
              <ErrorBoundary fallback={<div>An error occurred. Please try again later. Check your network connection and try refreshing the page.</div>}>
                <div>Loading the join page. Please wait...</div>
              </ErrorBoundary>
            }>
              <Join />
            </Suspense>
          } />
          <Route key="chat" path="/chat" element={
            <Suspense fallback={
              <ErrorBoundary fallback={<div>An error occurred. Please try again later. Check your network connection and try refreshing the page.</div>}>
                <div>Loading the chat room. Please wait...</div>
              </ErrorBoundary>
            }>
              <Chat />
            </Suspense>
          } />
        </Routes>
      </Router>
    </StrictMode>
  );
}

export default App;
