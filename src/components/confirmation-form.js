import React from 'react';
import styled from 'styled-components';

import { YesButton, NoButton } from './buttons';

const Container = styled.div`
  width: 600px;
  margin: 50px auto;
  background-color: #ffffff;
  padding: 25px;
  overflow: overlay;
  z-index: 1000;
  text-align: center;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Question = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
  color: #509bfd;
`;

const ConfirmationForm = ({ object, questionText, close, callback }) => (
  <Container>
    <Question>{questionText}</Question>
    <Buttons>
      <YesButton callback={(e) => {
        e.stopPropagation();
        callback(object)
      }}/>
      <NoButton callback={(e) => {
        e.stopPropagation();
        close();
      }} />
    </Buttons>
  </Container>
)

export default ConfirmationForm;
