import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { InputWrapper, ErrorWrapper, Input, Error, Button, TextArea } from '../common-components';

import {
  changeProjectName,
  checkProjectName,
  changeProjectDescription,
  createNewProject
} from '../../actions';

const Container = styled.div`
  width: 600px;
  height: 400px;
  margin: 50px auto;
  background-color: grey;
  padding: 25px;
  overflow: overlay;
  z-index: 1000;
`;

const ProjectForm = ({
  name,
  nameError,
  changeProjectName,
  checkProjectName,
  description,
  changeProjectDescription,
  createNewProject,
  close
}) => (
  <Container onClick={(e) => {
    e.stopPropagation();
    console.log('click on form!')
  }}>
    <InputWrapper>
      <div>
        <Input
          placeholder="Project name"
          value={name}
          onChange={(e) => changeProjectName(e.target.value)}
          onBlur={checkProjectName}
          valid={!nameError}
        />
      </div>
      <ErrorWrapper>
        {nameError && <Error>{nameError}</Error>}
      </ErrorWrapper>
    </InputWrapper>
    <InputWrapper>
      <TextArea
        placeholder="Project description"
        value={description}
        onChange={(e) => changeProjectDescription(e.target.value)}
      />
    </InputWrapper>
    <Button onClick={createNewProject}>SAVE NEW PROJECT</Button>
  </Container>
)

export default connect(
  state => ({
    name: state.projects.name,
    nameError: state.projects.nameError,
    description: state.projects.description,
  }),
  {
    changeProjectName,
    checkProjectName,
    changeProjectDescription,
    createNewProject
  }
)(ProjectForm)
