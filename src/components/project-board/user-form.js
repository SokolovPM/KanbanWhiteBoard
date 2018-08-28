import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  InputWrapper,
  ErrorWrapper,
  Input,
  Error,
  Button
} from '../common-components';

import { changeUserEmail, checkUserEmail, saveUser } from '../../actions';

const Container = styled.div`
  width: 600px;
  margin: 50px auto;
  background-color: #ffffff;
  padding: 25px 25px 0 25px;
  overflow: overlay;
  z-index: 1000;
  text-align: center;
`;

const UserForm = ({
  email,
  changeUserEmail,
  checkUserEmail,
  emailError,
  saveUser
}) => (
  <Container
    onClick={e => {
      e.stopPropagation();
    }}
  >
    <InputWrapper>
      <Input
        autoFocus
        placeholder="User email"
        value={email}
        onChange={e => changeUserEmail(e.target.value)}
        onBlur={checkUserEmail}
        valid={!emailError}
      />
      <ErrorWrapper>{emailError && <Error>{emailError}</Error>}</ErrorWrapper>
    </InputWrapper>
    <Button onClick={saveUser}>ADD USER</Button>
  </Container>
);

export default connect(
  state => ({
    email: state.team.email,
    emailError: state.team.emailError
  }),
  {
    changeUserEmail,
    checkUserEmail,
    saveUser
  }
)(UserForm);
