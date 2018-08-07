import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  toggleProjectForm,
  editProject,
  deleteProject
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
  toggleProjectForm,
  showProjectForm,
  editProject,
  deleteProject
}) => (
  <div>
    <Button onClick={toggleProjectForm}>ADD NEW PROJECT</Button>
    {showProjectForm &&
      <Overlay close={toggleProjectForm}>
        <ProjectForm close={toggleProjectForm} />
      </Overlay>
    }
    {projects.map(project => {
      return (
        <ProjectItem key={project._id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <p>{`Project owner: ${project.email}`}</p>
          <div onClick={() => editProject(project)}>edit project</div>
          <div onClick={() => deleteProject(project)}>delete project</div>
        </ProjectItem>
      )
    })}
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
    deleteProject
  }
)(ProjectsList)
