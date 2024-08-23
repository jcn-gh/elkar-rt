import PropTypes from 'prop-types';
import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import styled from 'styled-components';
import onlineIcon from '../../icons/onlineIcon.png';

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 6.25rem;
  color: white;
  height: 60%;
  justify-content: space-between;
`;
const ActiveContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50%;
`;
const ActiveContainerImg = styled.img`
  padding-left: .625rem;
`;
const ActiveItem = styled.div`
  display: flex;
  align-items: center;
`;
const MessagesScrollToBottom = styled(ScrollToBottom)`
  padding: 5% 0;
  overflow: auto;
  flex: auto;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2979FF;
  border-radius: .25rem .25rem 0 0;
  height: 3.75rem;
  width: 100%;
`;

const InnerContainer = styled.div`
  flex: 0.5;
  display: flex;
  align-items: center;
  margin-left: 5%;
  color: white;
`;

const RightContainer = styled.div`
  flex: 0.5;
  display: flex;
  justify-content: flex-end;
  margin-right: 5%;
`;

const Icon = styled.img`
  margin: 0 1rem;
`;

const CloseIcon = styled(Icon)`
  cursor: pointer;
  title: 'Close';
`;

const OnlineIcon = styled(Icon)`
  /* Add styling for online icon if needed */
`;

const Button = styled.button`
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #2979FF;
  padding: 1.25rem;
  border-radius: .3125rem;
  display: inline-block;
  border: none;
  width: 100%;
  &:focus{
    outline: 0;
  }
`;
const Button20 = styled(Button)`
  margin-top: 1.25rem;
`;
const SendButton = styled(Button)`
  width: 20%;
`;

const InputText = styled.input`
  border: none;
  border-radius: 0;
  padding: 5%;
  width: 80%;
  font-size: 1.2rem;
  &:focus{
    outline: none;
  }
`;

const infoBarStyles = {
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
};

const InputForm = styled.form`
  display: flex;
  border - top: .125rem solid #D3D3D3;
`;

const RoomHeader = styled.header`
  /* Add styling for header if needed */
`;

const Heading1 = styled.h1`
  color: white;
  font-size: 2.5rem;
  padding-bottom: 1.6rem;
  border-bottom: .125rem solid white;
`;
const Heading2 = styled.h2`
  color: white;
  font-size: 1.8rem;
  padding-bottom: 1.6rem;
  border-bottom: .125rem solid white;
`;
const Heading3 = styled.h3`
  color: white;
  font-size: 1.4rem;
  padding-bottom: 1.6rem;
  border-bottom: .125rem solid white;
`;
const Heading1TextContainer = styled(Heading1)`
  margin-bottom: 0;
`;
const JoinOuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  background-color: #1A1A1D;
`;
const JoinInnerContainer = styled.div`
  width: 20 %;
`;
const JoinInput = styled.input`
  border-radius: 0;
  padding: .9375rem 1.25rem;
  width: 100 %;
`;
const JoinInput20 = styled(JoinInput)`
  margin-top: 1.25rem;
`;

const InfoBarHeader = ({ room }) => {
  return (
    <RoomHeader>
      <OnlineIcon src={onlineIcon} alt='online icon' />
      <Heading3>{room}</Heading3>
    </RoomHeader>
  );
};

InfoBarHeader.propTypes = {
  room: PropTypes.string.isRequired,
};

export default InfoBarHeader;