import constants from '../constants';
import createReducer from '../utils/createReducer';

const {
  GET_TASKS
} = constants;

const initialValues = {
  error: '',
  isLoading: false,
  projectName: ''
}

export default createReducer(initialValues, {

  [`${GET_TASKS}_REQUEST`]: (state) => ({ isLoading: true }),
  [`${GET_TASKS}_SUCCESS`]: (state, { projects }) => ({
    isLoading: false,
    projects
  }),
  [`${GET_TASKS}_FAILURE`]: (state, { error }) => ({ error }),

});
