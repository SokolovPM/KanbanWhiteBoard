import constants from '../constants';
import createReducer from '../utils/createReducer';

const {
  TOGGLE_TASK_FORM,
  CHANGE_TASK_DESCRIPTION,
  CHECK_TASK_DESCRIPTION,
  VALIDATE_TASK,
  SAVE_TASK,
  EDIT_TASK,
  BACK_TO_THE_PROJECT_LIST,
  TOGGLE_DELETE_TASK_FORM
} = constants;

const initialValues = {
  error: '',
  isLoading: false,
  showTaskForm: false,
  description: '',
  descriptionError: '',
  selectedTaskId: '',
  selectedTask: {},
  showDeleteTaskForm: false
};

export default createReducer(initialValues, {
  [TOGGLE_TASK_FORM]: state => ({ showTaskForm: !state.showTaskForm }),

  [CHANGE_TASK_DESCRIPTION]: (state, { description }) => ({ description }),
  [CHECK_TASK_DESCRIPTION]: state => ({
    descriptionError: state.description ? '' : 'This field is required'
  }),

  [VALIDATE_TASK]: (state, { result: { descriptionError } }) => ({
    descriptionError
  }),

  [`${SAVE_TASK}_REQUEST`]: () => ({ isLoading: true }),
  [`${SAVE_TASK}_SUCCESS`]: () => ({
    isLoading: false,
    showTaskForm: false,
    name: '',
    nameError: '',
    description: '',
    selectedTaskId: '',
    selectedTask: {},
    showDeleteTaskForm: false
  }),
  [`${SAVE_TASK}_FAILURE`]: (state, { error }) => ({ error }),

  [EDIT_TASK]: (state, { task }) => ({
    name: task.name,
    description: task.description,
    selectedTaskId: task.id,
    showTaskForm: true
  }),
  [BACK_TO_THE_PROJECT_LIST]: () => ({
    isLoading: false,
    showTaskForm: false,
    name: '',
    nameError: '',
    description: '',
    selectedTaskId: ''
  }),

  [TOGGLE_DELETE_TASK_FORM]: (state, { selectedTask }) => ({
    showDeleteTaskForm: !state.showDeleteTaskForm,
    selectedTask
  })
});
