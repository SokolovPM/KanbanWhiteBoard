import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { InputWrapper, ErrorWrapper, Input, Error, Button, TextArea } from '../common-components';

import {
  changeProjectName,
  checkProjectName,
  changeProjectDescription,
  saveProject
} from '../../actions';

const Container = styled.div`
  width: 600px;
  margin: 50px auto;
  background-color: #ffffff;
  padding: 25px 25px 0 25px;
  overflow: overlay;
  z-index: 1000;
  text-align: center;
`;

const ProjectForm = ({
  name,
  nameError,
  changeProjectName,
  checkProjectName,
  description,
  changeProjectDescription,
  saveProject,
  close
}) => (
  <Container onClick={(e) => {
    e.stopPropagation();
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
    <Button onClick={saveProject}>SAVE PROJECT</Button>
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
    saveProject
  }
)(ProjectForm)
