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
  TOGGLE_DELETE_USER_FORM,
  INVITE_USER
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
const saveUserSuccess = (selectedProject, projectTeam = []) => ({
  type: `${SAVE_USER}_SUCCESS`,
  selectedProject,
  projectTeam
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
          dispatch(saveUserSuccess(response.data.project, response.data.team));
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
        dispatch(saveUserSuccess(response.data.project, response.data.team));
        return Promise.resolve();
      })
      .catch(error => {
        dispatch(saveUserFailure(error));
        return Promise.reject();
      });
  }
}

const inviteUserRequest = () => ({
  type: `${INVITE_USER}_REQUEST`
})
const inviteUserSuccess = (invitedEmail) => ({
  type: `${INVITE_USER}_SUCCESS`,
  invitedEmail
})
const inviteUserFailure = (error) => ({
  type: `${INVITE_USER}_FAILURE`,
  error
})
export const inviteNewUser = (email) => {
  return (dispatch, getState) => {
    const { team, projects } = getState();
    dispatch(inviteUserRequest())
    return axios
      .post(`/invite`, {
        email
      })
      .then(response => {
        dispatch(inviteUserSuccess(email));
        return Promise.resolve();
      })
      .catch(error => {
        dispatch(inviteUserFailure(error));
        return Promise.reject();
      });
  }
}
