import axios from 'axios';
import { browserHistory } from 'react-router'

import constants from '../constants';
import { validateEmail } from '../utils/validation-functions';

const {
  TOGGLE_USER_FORM,
  CHANGE_USER_EMAIL,
  CHECK_USER_EMAIL,
  SAVE_USER,
  VALIDATE_USER,
  TOGGLE_DELETE_USER_FORM
} = constants;

export const toggleUserForm = () => ({
  type: TOGGLE_USER_FORM
})

export const changeUserEmail = (email) => ({
  type: CHANGE_USER_EMAIL,
  email
})

export const checkUserEmail = () => ({
  type: CHECK_USER_EMAIL
})

const validateUserForm = (result) => ({
  type: VALIDATE_USER,
  result
})
const saveUserRequest = () => ({
  type: `${SAVE_USER}_REQUEST`
})
const saveUserSuccess = (selectedProject) => ({
  type: `${SAVE_USER}_SUCCESS`,
  selectedProject
})
const saveUserFailure = (error) => ({
  type: `${SAVE_USER}_FAILURE`,
  error
})
export const saveUser = () => {
  return (dispatch, getState) => {
    const { team, projects } = getState();
    const result = {};
    result.emailError = validateEmail(team.email);
    if (result.emailError) {
      dispatch(validateUserForm(result));
      return Promise.resolve();
    } else {
      dispatch(saveUserRequest())
      const project = projects.selectedProject;
      project.team = [...project.team || [], team.email]
      return axios
        .post(`/project/${project.name}/save`, {
          project
        })
        .then(response => {
          dispatch(saveUserSuccess(response.data.project));
          return Promise.resolve();
        })
        .catch(error => {
          dispatch(saveUserFailure(error));
          return Promise.reject();
        });
    }
  }
}

export const toggleDeleteUserForm = (selectedUser) => ({
  type: TOGGLE_DELETE_USER_FORM,
  selectedUser
})

export const deleteUser = (deletedUser) => {
  return (dispatch, getState) => {
    const { team, projects } = getState();
    dispatch(saveUserRequest())
    const project = projects.selectedProject;
    project.team = project.team.filter(user => user !== deletedUser)
    return axios
      .post(`/project/${project.name}/save`, {
        project
      })
      .then(response => {
        dispatch(saveUserSuccess(response.data.project));
        return Promise.resolve();
      })
      .catch(error => {
        dispatch(saveUserFailure(error));
        return Promise.reject();
      });
  }
}
