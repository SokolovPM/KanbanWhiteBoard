import constants from '../constants';
import createReducer from '../utils/createReducer';
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
  VALIDATE_REGISTRATION_FORM,
  VALIDATE_AUTHORIZATION_FORM
} = constants;

const initialValues = {
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
  registrationForm: false,
  passwordDuplicate: '',
  passwordDuplicateError: '',
  name: '',
  nameError: ''
}

export default createReducer(initialValues, {
  [CHANGE_EMAIL]: (state, { email }) => ({ email }),
  [CHECK_EMAIL]: (state) => ({ emailError: validateEmail(state.email) }),

  [CHANGE_PASSWORD]: (state, { password }) => ({ password }),
  [CHECK_PASSWORD]: (state) => ({ passwordError: validatePassword(state.password) }),

  [SHOW_REGISTRATION_FORM]: (state) => ({ registrationForm: !state.registrationForm }),

  [CHANGE_PASSWORD_DUPLICATE]: (state, { passwordDuplicate }) => ({ passwordDuplicate }),
  [CHECK_PASSWORD_DUPLICATE]: (state) => ({ passwordDuplicateError: validatePasswordDuplicate(state.password, state.passwordDuplicate) }),

  [CHANGE_NAME]: (state, { name }) => ({ name }),
  [CHECK_NAME]: (state) => ({ nameError: state.name ? '' : 'This field is required' }),

  [VALIDATE_AUTHORIZATION_FORM]: (state, {result: { emailError, passwordError }}) => ({ emailError, passwordError }),
  [VALIDATE_REGISTRATION_FORM]: (state, {result: { emailError, passwordError, passwordDuplicateError, nameError }}) => ({
    emailError,
    passwordError,
    passwordDuplicateError,
    nameError
  }),
});
