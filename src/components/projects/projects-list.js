import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  toggleProjectForm,
  editProject,
  deleteProject,
  selectProject
} from '../../actions';

import { Button } from '../common-components';

import Overlay from '../overlay';

import ProjectForm from './project-form';

import ProjectItem from './project-item';

const ProjectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ProjectsList = ({
  projects,
  toggleProjectForm,
  showProjectForm,
  editProject,
  deleteProject,
  selectProject
}) => (
  <div>
    <Button onClick={toggleProjectForm}>ADD NEW PROJECT</Button>
    {showProjectForm &&
      <Overlay close={toggleProjectForm}>
        <ProjectForm close={toggleProjectForm} />
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
        />
      )
    })}
    </ProjectContainer>
  </div>
)

export default connect(
  state => ({
    projects: state.projects.projects,
    showProjectForm: state.projects.showProjectForm
  }),
  {
    toggleProjectForm,
    editProject,
    deleteProject,
    selectProject
  }
)(ProjectsList)
