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
  VALIDATE_TASK,
  EDIT_TASK
} = constants;

const taskStatus = {
  TO_DO: 'TO_DO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE'
}

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

const colors = [
  'f1c40f',
  'FF50A8',
  '85FF05',
  'ff4a4a',
  '1586ff'
]
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
      if (tasks.selectedTaskId) {
        const task = project.tasks.find(task => task.id === tasks.selectedTaskId)
        task.name = tasks.name;
        task.description = tasks.description;
      } else {
        project.tasks = [...project.tasks || [], {
          id: '_' + Math.random().toString(36).substr(2, 9),
          name: tasks.name,
          description: tasks.description,
          status: taskStatus.TO_DO,
          deg: Math.floor(Math.random() * 10) - 5,
          color: colors[Math.floor(Math.random() * 5)]
        }];
      }
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

export const changeTask = (task) => ({
  type: EDIT_TASK,
  task
})

export const deleteTask = (deletedTask) => {
  return (dispatch, getState) => {
    const { tasks, projects } = getState();
    dispatch(saveTaskRequest())
    const project = projects.selectedProject;
    project.tasks = project.tasks.filter(task => task.id !== deletedTask.id)
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

export const changeTaskStatus = (id, status) => {
  return (dispatch, getState) => {
    const { projects } = getState();
    dispatch(saveTaskRequest())
    const project = projects.selectedProject;
    const task = project.tasks.find(task => task.id === id)
    task.status = status;
    task.deg = Math.floor(Math.random() * 10) - 5;
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
