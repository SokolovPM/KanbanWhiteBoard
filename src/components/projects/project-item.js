import React from 'react';
import styled from 'styled-components';
import Media from "react-media";

const Container = styled.div`
  border: 1px solid #ffffff;
  padding: 25px 15px 5px 15px;
  margin: 5px;
  margin-bottom: 25px;
  cursor: pointer;
  width: 250px;
  background-color: #509bfd;
  color: #ffffff;
  white-space: pre-line;
  border-radius: 10px;

  @media only screen and (max-width: 768px) {
    margin: auto;
    margin-bottom: 25px;
  }
`;

const Name = styled.div`
  text-align: center;
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 5px;
  text-transform: capitalize;
`;

const Owner = styled.div`
  text-align: center;
  font-size: 12px;
  margin-bottom: 25px;
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
  toggleDeleteProjectForm,
  showDeleteButton
}) => (
  <Container key={project._id} onClick={() => selectProject(project)}>
    <Name>{project.name}</Name>
    <Owner>{project.email}</Owner>
    <Media query="(max-width: 375px)">
      {matches =>
        matches ? (
          <div />
        ) : (
          <Description>{project.description}</Description>
        )
      }
    </Media>

    <Media query="(max-width: 375px)">
      {matches =>
        matches ? (
          <div />
        ) : (
          <Footer>
            <Control
              onClick={e => {
                e.stopPropagation();
                editProject(project);
              }}
            >
              edit project
            </Control>

            {showDeleteButton && (
              <Control
                onClick={e => {
                  e.stopPropagation();
                  toggleDeleteProjectForm(project);
                }}
              >
                delete project
              </Control>
            )}
          </Footer>
        )
      }
    </Media>
  </Container>
);

export default ProjectItem;
