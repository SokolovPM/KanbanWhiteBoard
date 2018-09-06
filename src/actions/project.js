import axios from 'axios';
import { browserHistory } from 'react-router';

import constants from '../constants';

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
  BACK_TO_THE_PROJECT_LIST,
  TOGGLE_DELETE_PROJECT_FORM,
  CHANGE_SORTING
} = constants;

export const toggleProjectForm = () => ({
  type: TOGGLE_PROJECT_FORM
});

const projectListRequest = () => ({
  type: `${PROJECT_LIST}_REQUEST`
});
const projectListSuccess = projects => ({
  type: `${PROJECT_LIST}_SUCCESS`,
  projects
});
const projectListFailure = error => ({
  type: `${PROJECT_LIST}_FAILURE`,
  error
});
export const getProjectList = () => {
  return (dispatch, getState) => {
    const state = getState().authorization;
    dispatch(projectListRequest());
    return axios
      .post(`/projects`, {
        email: state.email
      })
      .then(response => {
        dispatch(projectListSuccess(response.data.projects));
        return Promise.resolve();
      })
      .catch(error => {
        dispatch(projectListFailure(error));
        return Promise.reject();
      });
  };
};

export const changeProjectName = name => ({
  type: CHANGE_PROJECT_NAME,
  name
});

export const checkProjectName = () => ({
  type: CHECK_PROJECT_NAME
});

export const changeProjectDescription = description => ({
  type: CHANGE_PROJECT_DESCRIPTION,
  description
});

const validateProjectForm = result => ({
  type: VALIDATE_PROJECT,
  result
});
const saveProjectRequest = () => ({
  type: `${SAVE_PROJECT}_REQUEST`
});
const saveProjectSuccess = projects => ({
  type: `${SAVE_PROJECT}_SUCCESS`,
  projects
});
const saveProjectFailure = error => ({
  type: `${SAVE_PROJECT}_FAILURE`,
  error
});
export const saveProject = () => {
  return (dispatch, getState) => {
    const { projects, authorization } = getState();
    const result = {};
    result.nameError = projects.name ? '' : 'This field is required';
    if (result.nameError) {
      dispatch(validateProjectForm(result));
      return Promise.resolve();
    }
    dispatch(saveProjectRequest());
    let team = [];
    if (!projects.projectTeam || projects.projectTeam.length === 0) {
      team = [authorization.email]
    } else {
      team = projects.projectTeam;
    }
    return axios
      .post(`/project/save`, {
        project: {
          _id: projects.selectedProjectId,
          email: authorization.email,
          name: projects.name,
          description: projects.description,
          team
        }
      })
      .then(response => {
        dispatch(saveProjectSuccess(response.data.projects));
        return Promise.resolve();
      })
      .catch(error => {
        dispatch(saveProjectFailure(error));
        return Promise.reject();
      });
  };
};

export const editProject = project => ({
  type: EDIT_PROJECT,
  project
});
const deleteProjectRequest = () => ({
  type: `${DELETE_PROJECT}_REQUEST`
});
const deleteProjectSuccess = projects => ({
  type: `${DELETE_PROJECT}_SUCCESS`,
  projects
});
const deleteProjectFailure = error => ({
  type: `${DELETE_PROJECT}_FAILURE`,
  error
});
export const deleteProject = project => {
  return (dispatch, getState) => {
    dispatch(deleteProjectRequest());
    return axios
      .post(`/project/delete`, {
        _id: project._id,
        email: getState().authorization.email
      })
      .then(response => {
        dispatch(deleteProjectSuccess(response.data.projects));
        return Promise.resolve();
      })
      .catch(error => {
        dispatch(deleteProjectFailure(error));
        return Promise.reject();
      });
  };
};

export const selectProject = selectedProject => {
  browserHistory.push(`/project/${selectedProject._id}`);
  return { type: SELECT_PROJECT, selectedProject };
};

const getTasksRequest = () => ({
  type: `${GET_PROJECT_WITH_TASKS}_REQUEST`
});
const getTasksSuccess = (selectedProject, projectTeam = []) => ({
  type: `${GET_PROJECT_WITH_TASKS}_SUCCESS`,
  selectedProject,
  projectTeam
});
const getTasksFailure = error => ({
  type: `${GET_PROJECT_WITH_TASKS}_FAILURE`,
  error
});
export const getProjectWithTasks = projectId => {
  return dispatch => {
    dispatch(getTasksRequest(projectId));
    return axios
      .post(`/project/${projectId}`, {
        projectId
      })
      .then(response => {
        dispatch(getTasksSuccess(response.data.project, response.data.team));
        return Promise.resolve();
      })
      .catch(error => {
        dispatch(getTasksFailure(error));
        return Promise.reject();
      });
  };
};

export const backToTheProjectList = () => {
  browserHistory.push(`/`);
  return { type: BACK_TO_THE_PROJECT_LIST };
};

export const toggleDeleteProjectForm = (selectedProject = {}) => {
  return {
    type: TOGGLE_DELETE_PROJECT_FORM,
    selectedProject
  };
};

export const changeSorting = (sorting) => ({
  type: CHANGE_SORTING,
  sorting
})
