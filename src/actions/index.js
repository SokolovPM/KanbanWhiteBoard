import constants from '../constants';
import { validateEmail, validatePassword, validatePasswordDuplicate } from '../utils/validation-functions';

const {
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
  VALIDATE_REGISTRATION_FORM
} = constants;

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
    }
  }
};

const validateRegistrationForm = (result) => ({
  type: VALIDATE_REGISTRATION_FORM,
  result
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
    }
  }
};
