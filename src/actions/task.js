import axios from 'axios';

import constants from '../constants';

const {
  TOGGLE_TASK_FORM,
  CHANGE_TASK_DESCRIPTION,
  CHECK_TASK_DESCRIPTION,
  SAVE_TASK,
  VALIDATE_TASK,
  EDIT_TASK,
  TOGGLE_DELETE_TASK_FORM,
  CHANGE_EXECUTOR_NAME
} = constants;

const taskStatus = {
  TO_DO: 'TO_DO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE'
};

export const toggleTaskForm = () => ({
  type: TOGGLE_TASK_FORM
});

export const changeTaskDescription = description => ({
  type: CHANGE_TASK_DESCRIPTION,
  description
});

export const checkTaskDescription = () => ({
  type: CHECK_TASK_DESCRIPTION
});

const validateTaskForm = result => ({
  type: VALIDATE_TASK,
  result
});
const saveTaskRequest = () => ({
  type: `${SAVE_TASK}_REQUEST`
});
const saveTaskSuccess = selectedProject => ({
  type: `${SAVE_TASK}_SUCCESS`,
  selectedProject
});
const saveProjectFailure = error => ({
  type: `${SAVE_TASK}_FAILURE`,
  error
});

const colors = ['f1c40f', 'FF50A8', '85FF05', 'ff4a4a', '1586ff'];
export const saveTask = () => {
  return (dispatch, getState) => {
    const { tasks, projects } = getState();
    const result = {};
    result.descriptionError = tasks.description ? '' : 'This field is required';
    if (result.descriptionError) {
      dispatch(validateTaskForm(result));
      return Promise.resolve();
    }
    dispatch(saveTaskRequest());
    const project = projects.selectedProject;
    if (tasks.selectedTaskId) {
      const task = project.tasks.find(task => task.id === tasks.selectedTaskId);
      task.name = tasks.name;
      task.description = tasks.description;
      task.executor = tasks.executor;
    } else {
      project.tasks = [
        ...(project.tasks || []),
        {
          id: `_${Math.random()
            .toString(36)
            .substr(2, 9)}`,
          name: tasks.name,
          description: tasks.description,
          status: taskStatus.TO_DO,
          deg: Math.floor(Math.random() * 10) - 5,
          color: colors[Math.floor(Math.random() * 5)],
          executor: tasks.executor
        }
      ];
    }
    return axios
      .post(`/project/${project.name}/save`, {
        project
      })
      .then(response => {
        dispatch(saveTaskSuccess(response.data.project));
        return Promise.resolve();
      })
      .catch(error => {
        dispatch(saveProjectFailure(error));
        return Promise.reject();
      });
  };
};

export const changeTask = task => ({
  type: EDIT_TASK,
  task
});

export const deleteTask = deletedTask => {
  return (dispatch, getState) => {
    const { projects } = getState();
    dispatch(saveTaskRequest());
    const project = projects.selectedProject;
    project.tasks = project.tasks.filter(task => task.id !== deletedTask.id);
    return axios
      .post(`/project/${project.name}/save`, {
        project
      })
      .then(response => {
        dispatch(saveTaskSuccess(response.data.project));
        return Promise.resolve();
      })
      .catch(error => {
        dispatch(saveProjectFailure(error));
        return Promise.reject();
      });
  };
};

export const changeTaskStatus = (id, status) => {
  return (dispatch, getState) => {
    const { projects } = getState();
    dispatch(saveTaskRequest());
    const project = projects.selectedProject;
    const task = project.tasks.find(task => task.id === id);
    task.status = status;
    task.deg = Math.floor(Math.random() * 10) - 5;
    return axios
      .post(`/project/${project.name}/save`, {
        project
      })
      .then(response => {
        dispatch(saveTaskSuccess(response.data.project));
        return Promise.resolve();
      })
      .catch(error => {
        dispatch(saveProjectFailure(error));
        return Promise.reject();
      });
  };
};

export const toggleDeleteTaskForm = (selectedTask = {}) => ({
  type: TOGGLE_DELETE_TASK_FORM,
  selectedTask
});

export const changeExecutorName = (executor) => ({
  type: CHANGE_EXECUTOR_NAME,
  executor
})
