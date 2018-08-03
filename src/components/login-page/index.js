import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  changeEmail,
  checkEmail,
  changePassword,
  checkPassword,
  showRegistrationForm,
  changePasswordDuplicate,
  checkPasswordDuplicate,
  changeName,
  checkName,
  registrate,
  authorize
} from '../../actions';

import { InputWrapper, ErrorWrapper, Input, Label, Error, Button } from '../common-components';

const Container = styled.div`
  text-align: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  display: inline-block;
  margin: 50px auto;
  border: 1px solid #FFFFFF;
`;

const RegistrateLabel = styled.div`
  cursor: pointer;
  color: #FFFFFF;
  font-weight: 500;
  text-decoration: underline;
`;

const LoginPage = ({
  authError,
  isLoading,
  email,
  emailError,
  changeEmail,
  checkEmail,
  password,
  passwordError,
  changePassword,
  checkPassword,
  registrationForm,
  showRegistrationForm,
  passwordDuplicate,
  passwordDuplicateError,
  changePasswordDuplicate,
  checkPasswordDuplicate,
  name,
  nameError,
  changeName,
  checkName,
  registrate,
  authorize
}) => (
  <Container>
    <Wrapper>
      {authError && <Error>{authError}</Error>}
      {isLoading && <div>...wait</div>}
      <InputWrapper>
        <div>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => changeEmail(e.target.value)}
            onBlur={checkEmail}
            valid={!emailError}
          />
        </div>
        <ErrorWrapper>
          {emailError && <Error>{emailError}</Error>}
        </ErrorWrapper>
      </InputWrapper>
      {registrationForm &&
        <InputWrapper>
          <div>
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => changeName(e.target.value)}
              onBlur={checkName}
              valid={!nameError}
            />
          </div>
          <ErrorWrapper>
            {nameError && <Error>{nameError}</Error>}
          </ErrorWrapper>
        </InputWrapper>
      }
      <InputWrapper>
        <div>
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => changePassword(e.target.value)}
            onBlur={checkPassword}
            valid={!passwordError}
          />
        </div>
        <ErrorWrapper>
          {passwordError && <Error>{passwordError}</Error>}
        </ErrorWrapper>
      </InputWrapper>
      {registrationForm &&
        <InputWrapper>
          <div>
            <Input
              placeholder="repeat password"
              type="password"
              value={passwordDuplicate}
              onChange={(e) => changePasswordDuplicate(e.target.value)}
              onBlur={checkPasswordDuplicate}
              valid={!passwordDuplicateError}
            />
          </div>
          <ErrorWrapper>
              {passwordDuplicateError && <Error>{passwordDuplicateError}</Error>}
          </ErrorWrapper>
        </InputWrapper>
      }
      <Button onClick={registrationForm ? registrate : authorize }>{registrationForm ? 'REGISTRATE' : 'LOG IN'}</Button>
      <div>
        <RegistrateLabel onClick={showRegistrationForm}>{registrationForm ? 'Close registration form' : 'Need to registrate?' }</RegistrateLabel>
      </div>
    </Wrapper>
  </Container>
)

export default connect(
  state => ({
    auth: state.authorization.auth,
    authError: state.authorization.authError,
    isLoading: state.authorization.isLoading,
    email: state.authorization.email,
    emailError: state.authorization.emailError,
    password: state.authorization.password,
    passwordError: state.authorization.passwordError,
    registrationForm: state.authorization.registrationForm,
    passwordDuplicate: state.authorization.passwordDuplicate,
    passwordDuplicateError: state.authorization.passwordDuplicateError,
    name: state.authorization.name,
    nameError: state.authorization.nameError,
  }),
  {
    changeEmail,
    checkEmail,
    changePassword,
    checkPassword,
    showRegistrationForm,
    changePasswordDuplicate,
    checkPasswordDuplicate,
    changeName,
    checkName,
    registrate,
    authorize
  }
)(LoginPage)
