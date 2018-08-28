import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getProjectList,
  toggleProjectForm,
  toggleDeleteProjectForm,
  deleteProject,
  selectProject,
  editProject,
  saveProject,
  changeProjectName,
  checkProjectName,
  changeProjectDescription
} from '../../actions';

import ProjectsList from './projects-list';
import ConfirmationForm from '../confirmation-form';
import Overlay from '../overlay';
import ProjectForm from './project-form';

class Projects extends Component {
  constructor(props) {
    super(props);
    const { getProjectList } = this.props;
    getProjectList();
  }

  render() {
    const {
      toggleProjectForm,
      toggleDeleteProjectForm,
      deleteProject,
      showProjectForm,
      showDeleteProjectForm,
      selectedProject,
      selectProject,
      editProject,
      saveProject,
      changeProjectName,
      checkProjectName,
      changeProjectDescription
    } = this.props;
    return (
      <div>
        {showProjectForm && (
          <Overlay close={toggleProjectForm}>
            <ProjectForm
              saveProject={saveProject}
              changeProjectName={changeProjectName}
              checkProjectName={checkProjectName}
              changeProjectDescription={changeProjectDescription}
            />
          </Overlay>
        )}
        {showDeleteProjectForm && (
          <Overlay close={toggleDeleteProjectForm}>
            <ConfirmationForm
              close={toggleDeleteProjectForm}
              object={selectedProject}
              questionText={`Do you really want to delete project "${
                selectedProject.name
              }"?`}
              callback={deleteProject}
            />
          </Overlay>
        )}
        <ProjectsList
          toggleDeleteProjectForm={toggleDeleteProjectForm}
          deleteProject={deleteProject}
          selectProject={selectProject}
          editProject={editProject}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    showProjectForm: state.projects.showProjectForm,
    showDeleteProjectForm: state.projects.showDeleteProjectForm,
    selectedProject: state.projects.selectedProject
  }),
  {
    getProjectList,
    toggleProjectForm,
    toggleDeleteProjectForm,
    deleteProject,
    selectProject,
    editProject,
    saveProject,
    changeProjectName,
    checkProjectName,
    changeProjectDescription
  }
)(Projects);
