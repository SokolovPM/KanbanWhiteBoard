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
  DELETE_PROJECT,
  SELECT_PROJECT,
  GET_PROJECT_WITH_TASKS,
  SAVE_TASK,
  BACK_TO_THE_PROJECT_LIST,
  TOGGLE_DELETE_PROJECT_FORM,
  SAVE_USER,
  CHANGE_SORTING
} = constants;

const initialValues = {
  error: '',
  isLoading: false,
  name: '',
  nameError: '',
  description: '',
  projects: [],
  selectedProject: {},
  showProjectForm: false,
  selectedProjectId: '',
  showDeleteProjectForm: false,
  projectTeam: [],
  sorting: ''
};

export default createReducer(initialValues, {
  [TOGGLE_PROJECT_FORM]: state => ({ showProjectForm: !state.showProjectForm }),

  [`${PROJECT_LIST}_REQUEST`]: () => ({ isLoading: true }),
  [`${PROJECT_LIST}_SUCCESS`]: (state, { projects }) => ({
    isLoading: false,
    projects
  }),
  [`${PROJECT_LIST}_FAILURE`]: (state, { error }) => ({ error }),

  [CHANGE_PROJECT_NAME]: (state, { name }) => ({ name }),
  [CHECK_PROJECT_NAME]: state => ({
    nameError: state.name ? '' : 'This field is required'
  }),
  [CHANGE_PROJECT_DESCRIPTION]: (state, { description }) => ({ description }),
  [VALIDATE_PROJECT]: (state, { result: { nameError } }) => ({ nameError }),

  [`${SAVE_PROJECT}_REQUEST`]: () => ({ isLoading: true }),
  [`${SAVE_PROJECT}_SUCCESS`]: (state, { projects }) => ({
    isLoading: false,
    projects,
    name: '',
    nameError: '',
    description: '',
    showProjectForm: false,
    selectedProjectId: '',
    showDeleteProjectForm: false,
    selectedProject: {},
  }),
  [`${SAVE_PROJECT}_FAILURE`]: (state, { error }) => ({ error }),

  [EDIT_PROJECT]: (state, { project }) => ({
    selectedProjectId: project._id,
    name: project.name,
    description: project.description,
    showProjectForm: true,
    projectTeam: project.team || []
  }),

  [`${DELETE_PROJECT}_REQUEST`]: () => ({ isLoading: true }),
  [`${DELETE_PROJECT}_SUCCESS`]: (state, { projects }) => ({
    isLoading: false,
    projects,
    selectedProject: {},
    showDeleteProjectForm: false
  }),
  [`${DELETE_PROJECT}_FAILURE`]: (state, { error }) => ({ error }),

  [SELECT_PROJECT]: (state, { selectedProject }) => ({ selectedProject }),

  [`${GET_PROJECT_WITH_TASKS}_REQUEST`]: () => ({ isLoading: true }),
  [`${GET_PROJECT_WITH_TASKS}_SUCCESS`]: (
    state,
    { selectedProject, projectTeam }
  ) => ({
    isLoading: false,
    selectedProject,
    projectTeam
  }),
  [`${GET_PROJECT_WITH_TASKS}_FAILURE`]: (state, { error }) => ({ error }),

  [`${SAVE_TASK}_REQUEST`]: () => ({ isLoading: true }),
  [`${SAVE_TASK}_SUCCESS`]: (state, { selectedProject }) => ({
    isLoading: false,
    selectedProject
  }),
  [`${SAVE_TASK}_FAILURE`]: (state, { error }) => ({ error }),

  [`${SAVE_USER}_REQUEST`]: () => ({ isLoading: true }),
  [`${SAVE_USER}_SUCCESS`]: (state, { selectedProject, projectTeam }) => ({
    isLoading: false,
    selectedProject,
    projectTeam
  }),
  [`${SAVE_USER}_FAILURE`]: (state, { error }) => ({ error }),

  [BACK_TO_THE_PROJECT_LIST]: () => ({
    name: '',
    nameError: '',
    description: '',
    selectedProject: {},
    showProjectForm: false,
    selectedProjectId: ''
  }),

  [TOGGLE_DELETE_PROJECT_FORM]: (state, { selectedProject }) => ({
    showDeleteProjectForm: !state.showDeleteProjectForm,
    selectedProject
  }),

  [CHANGE_SORTING]: (state, { sorting }) => ({ sorting })
});
