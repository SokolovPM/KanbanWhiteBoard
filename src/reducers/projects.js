import constants from '../constants';
import createReducer from '../utils/createReducer';

const {
  PROJECT_LIST,
  CHANGE_PROJECT_NAME,
  CHECK_PROJECT_NAME,
  CHANGE_PROJECT_DESCRIPTION,
  VALIDATE_PROJECT,
  SAVE_PROJECT,
  TOGGLE_PROJECT_FORM,
  EDIT_PROJECT,
  DELETE_PROJECT
} = constants;

const initialValues = {
  error: '',
  isLoading: false,
  name: '',
  nameError: '',
  description: '',
  projects: [],
  showProjectForm: false,
  selectedProjectId: ''
}

export default createReducer(initialValues, {
  [TOGGLE_PROJECT_FORM]: (state) => ({ showProjectForm: !state.showProjectForm}),

  [`${PROJECT_LIST}_REQUEST`]: (state) => ({ isLoading: true }),
  [`${PROJECT_LIST}_SUCCESS`]: (state, { projects }) => ({
    isLoading: false,
    projects
  }),
  [`${PROJECT_LIST}_FAILURE`]: (state, { error }) => ({ error }),

  [CHANGE_PROJECT_NAME]: (state, { name }) => ({ name }),
  [CHECK_PROJECT_NAME]: (state) => ({ nameError: state.name ? '' : 'This field is required' }),
  [CHANGE_PROJECT_DESCRIPTION]: (state, { description }) => ({ description }),
  [VALIDATE_PROJECT]: (state, {result: { nameError }}) => ({ nameError }),

  [`${SAVE_PROJECT}_REQUEST`]: (state) => ({ isLoading: true }),
  [`${SAVE_PROJECT}_SUCCESS`]: (state, { projects }) => ({
    isLoading: false,
    projects,
    name: '',
    nameError: '',
    description: '',
    showProjectForm: false
  }),
  [`${SAVE_PROJECT}_FAILURE`]: (state, { error }) => ({ error }),

  [EDIT_PROJECT]: (state, { project }) => ({
    selectedProjectId: project._id,
    name: project.name,
    description: project.description,
    showProjectForm: true
  }),

  [`${DELETE_PROJECT}_REQUEST`]: (state) => ({ isLoading: true }),
  [`${DELETE_PROJECT}_SUCCESS`]: (state, { projects }) => ({
    isLoading: false,
    projects
  }),
  [`${DELETE_PROJECT}_FAILURE`]: (state, { error }) => ({ error })
});
