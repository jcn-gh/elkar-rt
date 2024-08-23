import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { MessagesScrollToBottom } from '../styles';
import Message from './Message/Message';
import './Messages.css';

function ErrorFallback({ error }) {
  const { resetBoundary } = useErrorBoundary();

  const handleTryAgain = () => {
    resetBoundary();
  };

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={handleTryAgain}>Try again</button>
    </div>
  );
}

ErrorFallback.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
};

const Messages = React.forwardRef(({ messages, name }, ref) => {
  const renderMessages = useMemo(() => messages.map(({ id, ...message }) => (
    <Message key={id} message={message} name={name} />
  ), [messages, name]));

  return (
    <ErrorBoundary
      fallbackRender={ErrorFallback}
    >
      <MessagesScrollToBottom ref={ref}>
        {renderMessages()}
      </MessagesScrollToBottom>
    </ErrorBoundary>
  );
});

Messages.displayName = 'Messages';

Messages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
};

export default Messages;