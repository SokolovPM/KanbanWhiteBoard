import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  toggleProjectForm,
  editProject,
  deleteProject,
  selectProject,
  toggleDeleteProjectForm
} from '../../actions';

import ConfirmationForm from '../confirmation-form';
import Overlay from '../overlay';
import ProjectForm from './project-form';
import ProjectItem from './project-item';
import { AddProjectButton } from '../buttons';

const ProjectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 30px;
  margin-left: 30px;
`;

const ProjectsList = ({
  projects,
  toggleProjectForm,
  showProjectForm,
  editProject,
  deleteProject,
  selectProject,
  selectedProject,
  showDeleteProjectForm,
  toggleDeleteProjectForm
}) => (
  <div>
    <Row>
      <AddProjectButton callback={toggleProjectForm} />
    </Row>
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
    <ProjectContainer>
    {projects.map(project => {
      return (
        <ProjectItem
          key={project._id}
          project={project}
          selectProject={selectProject}
          editProject={editProject}
          deleteProject={deleteProject}
          toggleDeleteProjectForm={toggleDeleteProjectForm}
        />
      )
    })}
    </ProjectContainer>
  </div>
)

export default connect(
  state => ({
    projects: state.projects.projects,
    showProjectForm: state.projects.showProjectForm,
    showDeleteProjectForm: state.projects.showDeleteProjectForm,
    selectedProject: state.projects.selectedProject
  }),
  {
    toggleProjectForm,
    editProject,
    deleteProject,
    selectProject,
    toggleDeleteProjectForm
  }
)(ProjectsList)
