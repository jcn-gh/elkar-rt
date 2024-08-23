import PropTypes from 'prop-types';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigate } from 'react-router-dom';
import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';
import InfoBarHeader, {
  Button,
  CloseIcon,
  Icon,
  InfoBarContainer,
  LeftInnerContainer,
  RightInnerContainer,
  infoBarStyles
} from '../styles';
import './InfoBar.css';

const InfoBar = React.forwardRef(({ room }, ref) => {
  const navigate = useNavigate();

  const handleNavigate = React.useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <InfoBarContainer ref={ref}>
      <LeftInnerContainer>
        <InfoBarHeader>{room}</InfoBarHeader>
        <header>
          <Icon src={onlineIcon} alt="online icon" />
          <h3>{room}</h3>
        </header>
      </LeftInnerContainer>
      <RightInnerContainer>
        <Button onClick={handleNavigate} aria-label='Close'>
          <CloseIcon src={closeIcon} alt="close icon" />
          Close
        </Button>
        <LinearGradient onClick={handleNavigate} colors={['#4c669f', '#3b5998', '#192f6a']} style={infoBarStyles.linearGradient}>
          <Text style={infoBarStyles.buttonText}>
            Close
          </Text>
          <CloseIcon src={closeIcon} alt="close icon" />
        </LinearGradient>
      </RightInnerContainer>
    </InfoBarContainer>
  );
});

InfoBar.propTypes = {
  room: PropTypes.string.isRequired,
};
export default InfoBar;