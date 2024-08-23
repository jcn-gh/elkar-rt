import PropTypes from 'prop-types';
import React, { memo } from 'react';
import ErrorBoundary from 'react-error-boundary';
import onlineIcon from '../../icons/onlineIcon.png';
import {
  ActiveContainer,
  ActiveContainerImg,
  ActiveItem,
  Heading1,
  Heading1TextContainer,
  Heading2,
  StyledTextContainer
} from '../styles';
import './TextContainer.css';

const renderActiveUsers = (users) => (
  users.map(({ name }) => (
    <ActiveItem key={name}>
      {name}
      <ActiveContainerImg aria-label="Online User Icon - Indicates users currently online" src={onlineIcon} />
    </ActiveItem>
  ))
);

const TextContainer = memo(({ users = [] }) => (
  <ErrorBoundary>
    <StyledTextContainer>
      <Heading1TextContainer>
        Realtime Chat Application <span><img aria-label="Chat Icon" src="💬" /></span>
      </Heading1TextContainer>
      <Heading2>
        Created with React, Express, Node and Socket.IO <span><img aria-label="Heart Emoji" src="❤️" /></span>
      </Heading2>
      <Heading2>
        Try it out right now! <span><img aria-label="Left Arrow Emoji" src="⬅️" /></span>
      </Heading2>
      {users.length > 0 && (
        <div>
          <Heading1>People currently chatting:</Heading1>
          <ActiveContainer>
            {renderActiveUsers(users)}
          </ActiveContainer>
        </div>
      )}
    </StyledTextContainer>
  </ErrorBoundary>
));

TextContainer.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default TextContainer;