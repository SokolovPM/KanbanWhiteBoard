import constants from '../constants';
import createReducer from '../utils/createReducer';

const {
  PROJECT_LIST,
  CHANGE_PROJECT_NAME,
  CHECK_PROJECT_NAME,
  CHANGE_PROJECT_DESCRIPTION,
  VALIDATE_NEW_PROJECT,
  NEW_PROJECT,
  TOGGLE_NEW_PROJECT_FORM
} = constants;

const initialValues = {
  error: '',
  isLoading: false,
  name: '',
  nameError: '',
  description: '',
  projects: [],
  showNewProjectForm: false
}

export default createReducer(initialValues, {
  [TOGGLE_NEW_PROJECT_FORM]: (state) => ({ showNewProjectForm: !state.showNewProjectForm}),

  [`${PROJECT_LIST}_REQUEST`]: (state) => ({ isLoading: true }),
  [`${PROJECT_LIST}_SUCCESS`]: (state, { projects }) => ({
    isLoading: false,
    projects
  }),
  [`${PROJECT_LIST}_FAILURE`]: (state, { error }) => ({ error }),

  [CHANGE_PROJECT_NAME]: (state, { name }) => ({ name }),
  [CHECK_PROJECT_NAME]: (state) => ({ nameError: state.name ? '' : 'This field is required' }),
  [CHANGE_PROJECT_DESCRIPTION]: (state, { description }) => ({ description }),
  [VALIDATE_NEW_PROJECT]: (state, {result: { nameError }}) => ({ nameError }),

  [`${NEW_PROJECT}_REQUEST`]: (state) => ({ isLoading: true }),
  [`${NEW_PROJECT}_SUCCESS`]: (state, { projects }) => ({
    isLoading: false,
    projects,
    name: '',
    nameError: '',
    description: '',
    showNewProjectForm: false
  }),
  [`${NEW_PROJECT}_FAILURE`]: (state, { error }) => ({ error }),
});
