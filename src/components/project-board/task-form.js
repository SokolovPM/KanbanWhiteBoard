import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { InputWrapper, ErrorWrapper, Input, Error, Button, TextArea } from '../common-components';

import {
  changeTaskName,
  checkTaskName,
  changeTaskDescription,
  saveTask
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

const TaskForm = ({
  name,
  nameError,
  changeTaskName,
  checkTaskName,
  description,
  changeTaskDescription,
  saveTask,
  close
}) => (
  <Container onClick={(e) => {
    e.stopPropagation();
  }}>
    <InputWrapper>
      <div>
        <Input
          placeholder="Task name"
          value={name}
          onChange={(e) => changeTaskName(e.target.value)}
          onBlur={checkTaskName}
          valid={!nameError}
        />
      </div>
      <ErrorWrapper>
        {nameError && <Error>{nameError}</Error>}
      </ErrorWrapper>
    </InputWrapper>
    <InputWrapper>
      <TextArea
        placeholder="Task description"
        value={description}
        onChange={(e) => changeTaskDescription(e.target.value)}
      />
    </InputWrapper>
    <Button onClick={saveTask}>SAVE TASK</Button>
  </Container>
)

export default connect(
  state => ({
    name: state.tasks.name,
    nameError: state.tasks.nameError,
    description: state.tasks.description,
  }),
  {
    changeTaskName,
    checkTaskName,
    changeTaskDescription,
    saveTask
  }
)(TaskForm)
