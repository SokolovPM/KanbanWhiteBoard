import axios from 'axios';
import { browserHistory } from 'react-router'

import constants from '../constants';

const {
  GET_TASKS
} = constants;

const getTasksRequest = (projectName) => ({
  type: `${GET_TASKS}_REQUEST`,
  projectName
})
const getTasksSuccess = (tasks) => ({
  type: `${GET_TASKS}_SUCCESS`,
  projects
})
const getTasksFailure = (error) => ({
  type: `${GET_TASKS}_FAILURE`,
  error
})
export const getTasks = (projectName) => {
  return (dispatch, getState) => {
    const state = getState().projects;
    dispatch(getTasksRequest(projectName))
    return axios
      .post(`/project/${projectName}`, {
        projectName
      })
      .then(response => {
        console.log('reposnse projects', response)
        dispatch(getTasksSuccess(response.data.tasks));
        return Promise.resolve();
      })
      .catch(error => {
        dispatch(getTasksFailure(error));
        return Promise.reject();
      });
  }
}
