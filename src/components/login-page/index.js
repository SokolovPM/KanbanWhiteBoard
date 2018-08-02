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

import { Input, Label, Error, Button } from '../common-components';

const RegistrateLabel = styled.div`
  cursor: pointer;
`;

const LoginPage = ({
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
  <div>
    <div>
      <Label>Email: </Label>
      <Input
        value={email}
        onChange={(e) => changeEmail(e.target.value)}
        onBlur={checkEmail}
      />
      {emailError && <Error>{emailError}</Error>}
    </div>
    {registrationForm &&
      <div>
        <Label>Name: </Label>
        <Input
          value={name}
          onChange={(e) => changeName(e.target.value)}
          onBlur={checkName}
        />
        {nameError && <Error>{nameError}</Error>}
      </div>
    }
    <div>
      <Label>Password: </Label>
      <Input
        type="password"
        value={password}
        onChange={(e) => changePassword(e.target.value)}
        onBlur={checkPassword}
      />
      {passwordError && <Error>{passwordError}</Error>}
    </div>
    {registrationForm &&
      <div>
        <Label>Repeat password: </Label>
        <Input
          type="password"
          value={passwordDuplicate}
          onChange={(e) => changePasswordDuplicate(e.target.value)}
          onBlur={checkPasswordDuplicate}
        />
        {passwordDuplicateError && <Error>{passwordDuplicateError}</Error>}
      </div>
    }
    <Button onClick={registrationForm ? registrate : authorize }>{registrationForm ? 'REGISTRATE' : 'LOG IN'}</Button>
    <div>
      <RegistrateLabel onClick={showRegistrationForm}>{registrationForm ? 'Close registration form' : 'Need to registrate?' }</RegistrateLabel>
    </div>
  </div>
)

export default connect(
  state => ({
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
