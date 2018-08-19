import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { YesButton, NoButton } from '../buttons';

import { deleteProject } from '../../actions';

const Container = styled.div`
  width: 600px;
  margin: 50px auto;
  background-color: #ffffff;
  padding: 25px;
  overflow: overlay;
  z-index: 1000;
  text-align: center;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Question = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
  color: #509bfd;
`;

const ConfirmationForm = ({ project, close, deleteProject }) => (
  <Container>
    {console.log('here', deleteProject)}
    <Question>Do you really want to delete project "{project.name}"?</Question>
    <Buttons>
      <YesButton callback={(e) => {
        e.stopPropagation();
        deleteProject(project)
      }}/>
      <NoButton callback={(e) => {
        e.stopPropagation();
        close();
      }} />
    </Buttons>
  </Container>
)

export default connect(
  state => ({
    project: state.projects.selectedProject
  }),
  {
    deleteProject
  }
)(ConfirmationForm)
