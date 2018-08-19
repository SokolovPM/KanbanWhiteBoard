import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid #FFFFFF;
  padding: 25px 15px 5px 15px;
  margin-bottom: 25px;
  cursor: pointer;
  width: 288px;
  background-color: #509bfd;
  color: #ffffff;
  white-space: pre-line;
`;

const Name = styled.div`
  text-align: center;
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 25px;
  text-transform: capitalize;
`;

const Description = styled.div`
  height: 145px;
  overflow: overlay;
  margin-bottom: 20px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Control = styled.div`
  cursor: pointer;
  padding: 10px 0;
`;

const ProjectItem = ({
  project,
  selectProject,
  editProject,
  deleteProject
}) => (
  <Container key={project._id} onClick={() => selectProject(project)}>
    <Name>{project.name}</Name>
    <Description>{project.description}</Description>

    <Footer>
      <Control onClick={(e) => {
        e.stopPropagation();
        editProject(project)
      }}>edit project</Control>
      <Control onClick={(e) => {
        e.stopPropagation();
        deleteProject(project)
      }}>delete project</Control>
    </Footer>
  </Container>
)

export default ProjectItem;
