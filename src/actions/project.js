import axios from 'axios';

import constants from '../constants';

const {
  PROJECT_LIST,
  CHANGE_PROJECT_NAME,
  CHECK_PROJECT_NAME,
  CHANGE_PROJECT_DESCRIPTION,
  VALIDATE_NEW_PROJECT,
  NEW_PROJECT
} = constants;

const projectListRequest = () => ({
  type: `${PROJECT_LIST}_REQUEST`
})
const projectListSuccess = (projects) => ({
  type: `${PROJECT_LIST}_SUCCESS`,
  projects
})
const projectListFailure = (error) => ({
  type: `${PROJECT_LIST}_FAILURE`,
  error
})
export const getProjectList = () => {
  return (dispatch, getState) => {
    const state = getState().authorization;
    dispatch(projectListRequest())
    return axios
      .post(`/projects`, {
        email: state.email,
      })
      .then(response => {
        console.log('reposnse projects', response)
        dispatch(projectListSuccess(response.data.projects));
        return Promise.resolve();
      })
      .catch(error => {
        dispatch(projectListFailure(error));
        return Promise.reject();
      });
  }
}

export const changeProjectName = (name) => ({
  type: CHANGE_PROJECT_NAME,
  name
})

export const checkProjectName = () => ({
  type: CHECK_PROJECT_NAME
})

export const changeProjectDescription = (description) => ({
  type: CHANGE_PROJECT_DESCRIPTION,
  description
})

const validateNewProjectForm = (result) => ({
  type: VALIDATE_NEW_PROJECT,
  result
})
const newProjectRequest = () => ({
  type: `${NEW_PROJECT}_REQUEST`
})
const newProjectSuccess = (projects) => ({
  type: `${NEW_PROJECT}_SUCCESS`,
  projects
})
const newProjectFailure = (error) => ({
  type: `${NEW_PROJECT}_FAILURE`,
  error
})
export const createNewProject = () => {
  return (dispatch, getState) => {
    const { projects, authorization } = getState();
    const result = {};
    result.nameError = projects.name ? '' : 'This field is required';
    if (result.nameError) {
      dispatch(validateNewProjectForm(result));
      return Promise.resolve();
    } else {
      dispatch(newProjectRequest())
      return axios
        .post(`/project/new`, {
          email: authorization.email,
          name: projects.name,
          description: projects.description
        })
        .then(response => {
          dispatch(newProjectSuccess(response.data.projects));
          return Promise.resolve();
        })
        .catch(error => {
          dispatch(newProjectFailure(error));
          return Promise.reject();
        });
    }
  }
}
