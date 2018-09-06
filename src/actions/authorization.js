import axios from 'axios';
import { browserHistory } from 'react-router';

import constants from '../constants';
import {
  validateEmail,
  validatePassword,
  validatePasswordDuplicate
} from '../utils/validation-functions';

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
  REGISTRATION_FAILURE,
  TOGGLE_USER_PHOTO_FORM,
  CHANGE_USER_PHOTO,
  SAVE_USER_PHOTO,
  USER_ALREADY_EXIST,
  TOGGLE_LOGIN_FORM,
  GET_INFO
} = constants;

export const logout = () => {
  browserHistory.push('/');
  return { type: LOG_OUT };
};

export const changeEmail = email => ({
  type: CHANGE_EMAIL,
  email
});
export const checkEmail = () => ({
  type: CHECK_EMAIL
});

export const changePassword = password => ({
  type: CHANGE_PASSWORD,
  password
});
export const checkPassword = () => ({
  type: CHECK_PASSWORD
});

export const showRegistrationForm = () => ({
  type: SHOW_REGISTRATION_FORM
});

export const changePasswordDuplicate = passwordDuplicate => ({
  type: CHANGE_PASSWORD_DUPLICATE,
  passwordDuplicate
});
export const checkPasswordDuplicate = () => ({
  type: CHECK_PASSWORD_DUPLICATE
});

export const changeName = name => ({
  type: CHANGE_NAME,
  name
});
export const checkName = () => ({
  type: CHECK_NAME
});

const validateAuthorizationForm = result => ({
  type: VALIDATE_AUTHORIZATION_FORM,
  result
});
const authorizationRequest = () => ({
  type: AUTHORIZATION_REQUEST
});
const authorizationSuccess = ({ user, auth }) => ({
  type: AUTHORIZATION_SUCCESS,
  user,
  auth
});
const authorizationFailure = error => ({
  type: AUTHORIZATION_FAILURE,
  error
});
export const authorize = () => {
  return (dispatch, getState) => {
    const state = getState().authorization;
    const result = {};
    result.emailError = validateEmail(state.email);
    result.passwordError = validatePassword(state.password);
    if (result.emailError || result.passwordError) {
      dispatch(validateAuthorizationForm(result));
      return Promise.resolve();
    }
    dispatch(authorizationRequest());
    return axios
      .post(`/user/auth`, {
        email: state.email,
        password: state.password
      })
      .then(response => {
        dispatch(authorizationSuccess(response.data));
        return Promise.resolve();
      })
      .catch(error => {
        dispatch(authorizationFailure(error));
        return Promise.reject();
      });
  };
};

const validateRegistrationForm = result => ({
  type: VALIDATE_REGISTRATION_FORM,
  result
});
const registrationRequest = () => ({
  type: REGISTRATION_REQUEST
});
const registrationSuccess = ({ auth, user, error }) => ({
  type: REGISTRATION_SUCCESS,
  auth,
  user
});
const userAlreadyExist = (error) => ({
  type: USER_ALREADY_EXIST,
  error
})
const registrationFailure = error => ({
  type: REGISTRATION_FAILURE,
  error
});

export const registrate = () => {
  return (dispatch, getState) => {
    const state = getState().authorization;
    const result = {};
    result.emailError = validateEmail(state.email);
    result.passwordError = validatePassword(state.password);
    result.passwordDuplicateError = validatePasswordDuplicate(
      state.password,
      state.passwordDuplicate
    );
    result.nameError = state.name ? '' : 'This field is required';
    if (
      result.emailError ||
      result.passwordError ||
      result.passwordDuplicateError ||
      result.nameError
    ) {
      dispatch(validateRegistrationForm(result));
      return Promise.resolve();
    }
    dispatch(registrationRequest());
    return axios
      .post(`/user/new`, {
        email: state.email,
        name: state.name,
        password: state.password
      })
      .then(response => {
        if (response.data.error) {
          dispatch(userAlreadyExist(response.data.error))
          return Promise.resolve();
        }
        dispatch(registrationSuccess(response.data));
        return Promise.resolve();
      })
      .catch(error => {
        dispatch(registrationFailure(error));
        return Promise.reject();
      });
  };
};

export const toggleUserPhotoForm = () => ({
  type: TOGGLE_USER_PHOTO_FORM
});

export const changeUserPhoto = newPhoto => ({
  type: CHANGE_USER_PHOTO,
  newPhoto
});

const saveUserPhotoRequest = () => ({
  type: `${SAVE_USER_PHOTO}_REQUEST`
});
const saveUserPhotoSuccess = ({ auth, user }) => ({
  type: `${SAVE_USER_PHOTO}_SUCCESS`,
  auth,
  user
});
const saveUserPhotoFailure = error => ({
  type: `${SAVE_USER_PHOTO}_FAILURE`,
  error
});
export const saveUserPhoto = () => {
  return (dispatch, getState) => {
    const { authorization } = getState();
    dispatch(saveUserPhotoRequest());
    return axios
      .post(`/user/photo`, {
        email: authorization.email,
        name: authorization.name,
        photo: authorization.newPhoto
      })
      .then(response => {
        dispatch(saveUserPhotoSuccess(response.data));
        return Promise.resolve();
      })
      .catch(error => {
        dispatch(saveUserPhotoFailure(error));
        return Promise.reject();
      });
  };
};

export const toggleLoginForm = () => ({
  type: TOGGLE_LOGIN_FORM
})

const getAboutInfoRequest = () => ({
  type: `${GET_INFO}_REQUEST`
});
const getAboutInfoSuccess = (about) => ({
  type: `${GET_INFO}_SUCCESS`,
  about
});
const getAboutInfoFailure = error => ({
  type: `${GET_INFO}_FAILURE`,
  error
});
export const getAboutInfo = () => {
  return (dispatch, getState) => {
    const { authorization } = getState();
    dispatch(getAboutInfoRequest());
    return axios
      .post(`/about`, {
      })
      .then(response => {
        console.log('reaponse', response)
        dispatch(getAboutInfoSuccess(response.data));
        return Promise.resolve();
      })
      .catch(error => {
        dispatch(getAboutInfoFailure(error));
        return Promise.reject();
      });
  };
};
