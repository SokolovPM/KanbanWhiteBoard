import constants from '../constants';
import createReducer from '../utils/createReducer';
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
  VALIDATE_REGISTRATION_FORM,
  VALIDATE_AUTHORIZATION_FORM,
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

const getCookie = name => {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`
    )
  );
  return matches ? decodeURIComponent(matches[1]) : '';
};

const initialValues = {
  error: '',
  auth: getCookie('auth'),
  authError: '',
  isLoading: false,
  email: getCookie('email'),
  emailError: '',
  password: '',
  passwordError: '',
  registrationForm: false,
  passwordDuplicate: '',
  passwordDuplicateError: '',
  name: getCookie('name'),
  nameError: '',
  photo: getCookie('photo'),
  newPhoto: '',
  showLoginForm: false,
  about: {}
};

export default createReducer(initialValues, {
  [LOG_OUT]: () => {
    document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'photo=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    return {
      error: '',
      auth: '',
      authError: '',
      isLoading: false,
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      registrationForm: false,
      passwordDuplicate: '',
      passwordDuplicateError: '',
      name: '',
      nameError: '',
      showUserPhotoForm: false,
      photo: '',
      newPhoto: '',
      showLoginForm: false
    };
  },

  [CHANGE_EMAIL]: (state, { email }) => ({ email }),
  [CHECK_EMAIL]: state => ({ emailError: validateEmail(state.email) }),

  [CHANGE_PASSWORD]: (state, { password }) => ({ password }),
  [CHECK_PASSWORD]: state => ({
    passwordError: validatePassword(state.password)
  }),

  [SHOW_REGISTRATION_FORM]: state => ({
    registrationForm: !state.registrationForm
  }),

  [CHANGE_PASSWORD_DUPLICATE]: (state, { passwordDuplicate }) => ({
    passwordDuplicate
  }),
  [CHECK_PASSWORD_DUPLICATE]: state => ({
    passwordDuplicateError: validatePasswordDuplicate(
      state.password,
      state.passwordDuplicate
    )
  }),

  [CHANGE_NAME]: (state, { name }) => ({ name }),
  [CHECK_NAME]: state => ({
    nameError: state.name ? '' : 'This field is required'
  }),

  [VALIDATE_AUTHORIZATION_FORM]: (
    state,
    { result: { emailError, passwordError } }
  ) => ({ emailError, passwordError }),
  [VALIDATE_REGISTRATION_FORM]: (
    state,
    { result: { emailError, passwordError, passwordDuplicateError, nameError } }
  ) => ({
    emailError,
    passwordError,
    passwordDuplicateError,
    nameError
  }),

  [AUTHORIZATION_REQUEST]: () => ({ isLoading: true }),
  [AUTHORIZATION_SUCCESS]: (state, { user, auth }) => ({
    isLoading: false,
    name: user.name,
    email: user.email,
    auth,
    authError: auth ? '' : 'Wrong email or password',
    photo: user.photo
  }),
  [AUTHORIZATION_FAILURE]: (state, { error }) => ({ error }),

  [REGISTRATION_REQUEST]: () => ({ isLoading: true }),
  [REGISTRATION_SUCCESS]: (state, { user, auth }) => ({
    isLoading: false,
    name: user.name,
    email: user.email,
    auth,
    authError: auth ? '' : `User with email ${user.email} already exists`
  }),
  [USER_ALREADY_EXIST]: (state, { error }) => {
    return {
      isLoading: false,
      authError: error
    }
  },
  [REGISTRATION_FAILURE]: (state, { error }) => ({ error }),

  [TOGGLE_USER_PHOTO_FORM]: state => ({
    showUserPhotoForm: !state.showUserPhotoForm
  }),

  [CHANGE_USER_PHOTO]: (state, { newPhoto }) => ({ newPhoto }),

  [`${SAVE_USER_PHOTO}_REQUEST`]: () => ({ isLoading: true }),
  [`${SAVE_USER_PHOTO}_SUCCESS`]: (state, { user }) => ({
    isLoading: false,
    photo: user.photo,
    showUserPhotoForm: false,
    newPhoto: ''
  }),
  [`${SAVE_USER_PHOTO}_FAILURE`]: (state, { error }) => ({ error }),
  [TOGGLE_LOGIN_FORM]: (state) => ({ showLoginForm: !state.showLoginForm }),



  [`${GET_INFO}_REQUEST`]: () => ({ isLoading: true }),
  [`${GET_INFO}_SUCCESS`]: (state, { about }) => ({
    isLoading: false,
    about
  }),
  [`${GET_INFO}_FAILURE`]: (state, { error }) => ({ error }),
});
