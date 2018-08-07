import axios from 'axios';
import { browserHistory } from 'react-router'

import constants from '../constants';
import { validateEmail, validatePassword, validatePasswordDuplicate } from '../utils/validation-functions';

import {
  getProjectList,
  changeProjectName,
  checkProjectName,
  changeProjectDescription,
  saveProject,
  toggleProjectForm,
  editProject,
  deleteProject
} from './project';

export {
  getProjectList,
  changeProjectName,
  checkProjectName,
  changeProjectDescription,
  saveProject,
  toggleProjectForm,
  editProject,
  deleteProject
}

const {
  LOG_OUT,
  CHANGE_EMAIL,
  CHECK_EMAIL,
  CHANGE_PASSWORD,
  CHECK_PASSWORD,
  SHOW_REGISTRATION_FORM,
  CHANGE_PASSWORD_DUPLICATE,
  CHECK_PASSWORD_DUPLICATE,
  CHANGE_NAME,
  CHECK_NAME,
  VALIDATE_AUTHORIZATION_FORM,
  VALIDATE_REGISTRATION_FORM,
  AUTHORIZATION_REQUEST,
  AUTHORIZATION_SUCCESS,
  AUTHORIZATION_FAILURE,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE
} = constants;

export const logout = () => {
  browserHistory.push('/')
  return { type: LOG_OUT }
}

export const changeEmail = (email) => ({
  type: CHANGE_EMAIL,
  email
})
export const checkEmail = () => ({
  type: CHECK_EMAIL
})

export const changePassword = (password) => ({
  type: CHANGE_PASSWORD,
  password
})
export const checkPassword = () => ({
  type: CHECK_PASSWORD
})

export const showRegistrationForm = () => ({
  type: SHOW_REGISTRATION_FORM
})

export const changePasswordDuplicate = (passwordDuplicate) => ({
  type: CHANGE_PASSWORD_DUPLICATE,
  passwordDuplicate
})
export const checkPasswordDuplicate = () => ({
  type: CHECK_PASSWORD_DUPLICATE
})

export const changeName = (name) => ({
  type: CHANGE_NAME,
  name
})
export const checkName = () => ({
  type: CHECK_NAME
})

const validateAuthorizationForm = (result) => ({
  type: VALIDATE_AUTHORIZATION_FORM,
  result
})
const authorizationRequest = () => ({
  type: AUTHORIZATION_REQUEST
})
const authorizationSuccess = ({ user, auth }) => ({
  type: AUTHORIZATION_SUCCESS,
  user,
  auth
})
const authorizationFailure = (error) => ({
  type: AUTHORIZATION_FAILURE,
  error
})
export const authorize = () => {
  return (dispatch, getState) => {
    const state = getState().authorization;
    const result = {};
    result.emailError = validateEmail(state.email);
    result.passwordError = validatePassword(state.password);
    if (result.emailError || result.passwordError) {
      dispatch(validateAuthorizationForm(result));
      return Promise.resolve();
    } else {
      dispatch(authorizationRequest())
      return axios
        .post(`/user/auth`, {
          email: state.email,
          password: state.password
        })
        .then(response => {
          dispatch(authorizationSuccess(response.data));
          if (response.data.auth) {
            browserHistory.push('projects')
          }
          return Promise.resolve();
        })
        .catch(error => {
          dispatch(authorizationFailure(error));
          return Promise.reject();
        });
    }
  }
};

const validateRegistrationForm = (result) => ({
  type: VALIDATE_REGISTRATION_FORM,
  result
})
const registrationRequest = () => ({
  type: REGISTRATION_REQUEST
})
const registrationSuccess = ({ auth, user }) => ({
  type: REGISTRATION_SUCCESS,
  auth,
  user
})
const registrationFailure = (error) => ({
  type: REGISTRATION_FAILURE,
  error
})
export const registrate = () => {
  return (dispatch, getState) => {
    const state = getState().authorization;
    const result = {};
    result.emailError = validateEmail(state.email);
    result.passwordError = validatePassword(state.password);
    result.passwordDuplicateError = validatePasswordDuplicate(state.password, state.passwordDuplicate);
    result.nameError = state.name ? '' : 'This field is required';
    if (result.emailError || result.passwordError || result.passwordDuplicateError || result.nameError) {
      dispatch(validateRegistrationForm(result));
      return Promise.resolve();
    } else {
      return axios
        .post(`/user/new`, {
          email: state.email,
          name: state.name,
          password: state.password
        })
        .then(response => {
          dispatch(registrationSuccess(response.data));
          if (response.data.auth) {
            browserHistory.push('projects')
          }
          return Promise.resolve();
        })
        .catch(error => {
          dispatch(registrationFailure(error));
          return Promise.reject();
        });
    }
  }
};
