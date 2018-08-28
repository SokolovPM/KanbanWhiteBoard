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
  email,
  projects,
  editProject,
  deleteProject,
  selectProject,
  toggleDeleteProjectForm,
  myprojects,
  otherprojects
}) => (
  <div>
    {myprojects &&
      <div>
        <Section>My projects</Section>
        <ProjectContainer>
          {myprojects.map(project => (
            <ProjectItem
              key={project._id}
              project={project}
              selectProject={selectProject}
              editProject={editProject}
              deleteProject={deleteProject}
              toggleDeleteProjectForm={toggleDeleteProjectForm}
              showDeleteButton={email === project.email}
            />
          ))}
        </ProjectContainer>
      </div>
    }
    {otherprojects &&
      <div>
        <Section>Other projects</Section>
        <ProjectContainer>
          {otherprojects.map(project => (
            <ProjectItem
              key={project._id}
              project={project}
              selectProject={selectProject}
              editProject={editProject}
              deleteProject={deleteProject}
              toggleDeleteProjectForm={toggleDeleteProjectForm}
            />
          ))}
        </ProjectContainer>
      </div>
    }
  </div>
)

export default connect(
  state => ({
    email: state.authorization.email,
    projects: state.projects.projects,
    myprojects: state.projects.projects.filter(project => project.email === state.authorization.email),
    otherprojects: state.projects.projects.filter(project => project.email !== state.authorization.email)
  }),
  {
    editProject,
    deleteProject,
    selectProject,
    toggleDeleteProjectForm
  }
)(ProjectsList)
