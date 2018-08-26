import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getProjectList,
  toggleProjectForm,
  toggleDeleteProjectForm,
  deleteProject
} from '../../actions';

import ProjectsList from './projects-list';
import ConfirmationForm from '../confirmation-form';
import Overlay from '../overlay';
import ProjectForm from './project-form';

class Projects extends Component {
  constructor(props) {
    super(props)
    this.props.getProjectList()
  }

  render () {
    const {
      toggleProjectForm,
      toggleDeleteProjectForm,
      deleteProject,
      showProjectForm,
      showDeleteProjectForm,
      selectedProject
    } = this.props;
    return (
      <div>
        {showProjectForm &&
          <Overlay close={toggleProjectForm}>
            <ProjectForm close={toggleProjectForm} />
          </Overlay>
        }
        {showDeleteProjectForm &&
          <Overlay close={toggleDeleteProjectForm}>
            <ConfirmationForm
              close={toggleDeleteProjectForm}
              object={selectedProject}
              questionText={`Do you really want to delete project "${selectedProject.name}"?`}
              callback={deleteProject}
            />
          </Overlay>
        }
        <ProjectsList />
      </div>
    )
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
    deleteProject
  }
)(Projects)
