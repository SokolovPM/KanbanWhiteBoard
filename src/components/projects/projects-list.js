import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  editProject,
  deleteProject,
  selectProject,
  toggleDeleteProjectForm
} from '../../actions';

import ProjectItem from './project-item';
import { AddProjectButton } from '../buttons';

const ProjectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Section = styled.div`
  color: #509bfd;
`;

const ProjectsList = ({
  projects,
  editProject,
  deleteProject,
  selectProject,
  toggleDeleteProjectForm
}) => (
  <div>
    <Section>Other projects</Section>
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
    projects: state.projects.projects
  }),
  {
    editProject,
    deleteProject,
    selectProject,
    toggleDeleteProjectForm
  }
)(ProjectsList)
