import constants from '../constants';
import createReducer from '../utils/createReducer';
import { validateEmail } from '../utils/validation-functions';

const {
  TOGGLE_USER_FORM,
  CHANGE_USER_EMAIL,
  CHECK_USER_EMAIL,
  SAVE_USER,
  VALIDATE_USER,
  TOGGLE_DELETE_USER_FORM
} = constants;

const initialValues = {
  error: '',
  isLoading: false,
  email: '',
  emailError: '',
  showUserForm: false,
  showDeleteUserForm: false,
  selectedUser: ''
}

export default createReducer(initialValues, {
  [TOGGLE_USER_FORM]: (state) => ({ showUserForm: !state.showUserForm}),

  [CHANGE_USER_EMAIL]: (state, { email }) => ({ email }),
  [CHECK_USER_EMAIL]: (state) => ({ emailError: validateEmail(state.email) }),

  [VALIDATE_USER]: (state, {result: { emailError }}) => ({ emailError }),

  [`${SAVE_USER}_REQUEST`]: (state) => ({ isLoading: true }),
  [`${SAVE_USER}_SUCCESS`]: (state) => ({
    isLoading: false,
    showUserForm: false,
    email: '',
    emailError: '',
    selectedUser: '',
    showDeleteUserForm: false
  }),
  [`${SAVE_USER}_FAILURE`]: (state, { error }) => ({ error }),

  [TOGGLE_DELETE_USER_FORM]: (state, { selectedUser }) => ({ showDeleteUserForm: !state.showDeleteUserForm, selectedUser })
});
