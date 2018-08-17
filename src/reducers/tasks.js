import constants from '../constants';
import createReducer from '../utils/createReducer';

const {
  TOGGLE_TASK_FORM,
  CHANGE_TASK_NAME,
  CHECK_TASK_NAME,
  CHANGE_TASK_DESCRIPTION,
  VALIDATE_TASK,
  SAVE_TASK
} = constants;

const initialValues = {
  error: '',
  isLoading: false,
  showTaskForm: false,
  name: '',
  nameError: '',
  description: ''
}

export default createReducer(initialValues, {
  [TOGGLE_TASK_FORM]: (state) => ({ showTaskForm: !state.showTaskForm}),

  [CHANGE_TASK_NAME]: (state, { name }) => ({ name }),
  [CHECK_TASK_NAME]: (state) => ({ nameError: state.name ? '' : 'This field is required' }),
  [CHANGE_TASK_DESCRIPTION]: (state, { description }) => ({ description }),

  [VALIDATE_TASK]: (state, {result: { nameError }}) => ({ nameError }),

  [`${SAVE_TASK}_REQUEST`]: (state) => ({ isLoading: true }),
  [`${SAVE_TASK}_SUCCESS`]: (state) => ({
    isLoading: false,
    showTaskForm: false,
    name: '',
    nameError: '',
    description: ''
  }),
  [`${SAVE_TASK}_FAILURE`]: (state, { error }) => ({ error }),
});
