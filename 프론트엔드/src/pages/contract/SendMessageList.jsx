import { state } from 'react';
import NextButtonUI from '../../components/NextButton/NextButton';
import styled from 'styled-components';
import Message from './SendMessageUi/Message/Message';
import MessageHeader from './SendMessageUi/Message/MessageHeader';


const Button = styled(NextButtonUI)`
  background-color: #d5d5d5;
  color: black;
`;

export default function DetailList() {
  const contract = state?.contract;

  // 


  return (
    <>
          <MessageHeader/>
          <Message contract={contract} /> 
          </>
  );
}