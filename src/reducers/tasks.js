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
  TOGGLE_DELETE_TASK_FORM,
  CHANGE_EXECUTOR_NAME,
  CHANGE_TASK_PRIORITY
} = constants;

const initialValues = {
  error: '',
  isLoading: false,
  showTaskForm: false,
  description: '',
  descriptionError: '',
  selectedTaskId: '',
  selectedTask: {},
  showDeleteTaskForm: false,
  executor: '',
  priority: '',
  color: '',
  deg: ''
};

const colors = ['f1c40f', 'FF50A8', '85FF05', 'ff4a4a', '1586ff'];
export default createReducer(initialValues, {
  [TOGGLE_TASK_FORM]: state => ({
    showTaskForm: !state.showTaskForm,
    description: '',
    selectedTaskId: '',
    executor: '',
    priority: '',
    color: colors[Math.floor(Math.random() * 5)],
    deg: Math.floor(Math.random() * 10) - 5
  }),

  [CHANGE_TASK_DESCRIPTION]: (state, { description }) => ({
    description,
    descriptionError: description ? '' : 'This field is required',
  }),
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
    description: '',
    selectedTaskId: '',
    selectedTask: {},
    showDeleteTaskForm: false,
    executor: '',
    priority: '',
    color: '',
    deg: ''
  }),
  [`${SAVE_TASK}_FAILURE`]: (state, { error }) => ({ error }),

  [EDIT_TASK]: (state, { task }) => ({
    description: task.description,
    descriptionError: task.description ? '' : 'This field is required',
    selectedTaskId: task.id,
    showTaskForm: true,
    executor: task.executor,
    priority: task.priority || '',
    color: task.color,
    deg: task.deg
  }),
  [BACK_TO_THE_PROJECT_LIST]: () => ({
    isLoading: false,
    showTaskForm: false,
    description: '',
    selectedTaskId: '',
    executor: '',
    priority: ''
  }),

  [TOGGLE_DELETE_TASK_FORM]: (state, { selectedTask }) => ({
    showDeleteTaskForm: !state.showDeleteTaskForm,
    selectedTask
  }),

  [CHANGE_EXECUTOR_NAME]: (state, { executor }) => ({
    executor
  }),

  [CHANGE_TASK_PRIORITY]: (state, { priority }) => ({
    priority
  })
});
