import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const ProjectItem = styled.div`
  border: 1px solid #FFFFFF;
  padding: 15px;
  margin-bottom: 25px;
`;

const ProjectsList = ({
  projects
}) => (
  <div>
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
    projects: state.projects.projects
  }),
  {
  }
)(ProjectsList)
