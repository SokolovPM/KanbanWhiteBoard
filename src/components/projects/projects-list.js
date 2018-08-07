import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  toggleNewProjectForm
} from '../../actions';

import { Button } from '../common-components';

import Overlay from '../overlay';

import ProjectForm from './project-form';


const ProjectItem = styled.div`
  border: 1px solid #FFFFFF;
  padding: 15px;
  margin-bottom: 25px;
  cursor: pointer;
`;

const ProjectsList = ({
  projects,
  toggleNewProjectForm,
  showNewProjectForm
}) => (
  <div>
    <Button onClick={toggleNewProjectForm}>ADD NEW PROJECT</Button>
    {showNewProjectForm &&
      <Overlay close={toggleNewProjectForm}>
        <ProjectForm close={toggleNewProjectForm} />
      </Overlay>
    }
    {projects.map(project => {
      return (
        <ProjectItem key={project._id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <p>{`Project owner: ${project.email}`}</p>
        </ProjectItem>
      )
    })}
  </div>
)

export default connect(
  state => ({
    projects: state.projects.projects,
    showNewProjectForm: state.projects.showNewProjectForm
  }),
  {
    toggleNewProjectForm
  }
)(ProjectsList)
