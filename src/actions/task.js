import axios from 'axios';
import { browserHistory } from 'react-router'

import constants from '../constants';

const {
  GET_TASKS,
  TOGGLE_TASK_FORM,
  CHANGE_TASK_NAME,
  CHECK_TASK_NAME,
  CHANGE_TASK_DESCRIPTION,
  SAVE_TASK,
  VALIDATE_TASK
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
export const getProjectWithTasks = (projectName) => {
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

export const toggleTaskForm = () => ({
  type: TOGGLE_TASK_FORM
})

export const changeTaskName = (name) => ({
  type: CHANGE_TASK_NAME,
  name
})

export const checkTasktName = () => ({
  type: CHECK_TASK_NAME
})

export const changeTaskDescription = (description) => ({
  type: CHANGE_TASK_DESCRIPTION,
  description
})

const validateTaskForm = (result) => ({
  type: VALIDATE_TASK,
  result
})
const saveTaskRequest = () => ({
  type: `${SAVE_TASK}_REQUEST`
})
const saveProjectSuccess = (selectedProject) => ({
  type: `${SAVE_TASK}_SUCCESS`,
  selectedProject
})
const saveProjectFailure = (error) => ({
  type: `${SAVE_TASK}_FAILURE`,
  error
})
export const saveTask = () => {
  return (dispatch, getState) => {
    const { tasks, projects } = getState();
    const result = {};
    result.nameError = tasks.name ? '' : 'This field is required';
    if (result.nameError) {
      dispatch(validateTaskForm(result));
      return Promise.resolve();
    } else {
      dispatch(saveTaskRequest())
      const project = projects.selectedProject;
      project.tasks = [...project.tasks || [], {name: tasks.name, description: tasks.description } ];
      return axios
        .post(`/project/${project.name}/save`, {
          project
        })
        .then(response => {
          dispatch(saveProjectSuccess(response.data.project));
          return Promise.resolve();
        })
        .catch(error => {
          dispatch(saveProjectFailure(error));
          return Promise.reject();
        });
    }
  }
}
