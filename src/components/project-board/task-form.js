import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  InputWrapper,
  ErrorWrapper,
  Error,
  Button,
  TextArea
} from '../common-components';

import {
  changeTaskDescription,
  checkTaskDescription,
  saveTask
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

const TaskForm = ({
  description,
  descriptionError,
  checkTaskDescription,
  changeTaskDescription,
  saveTask
}) => (
  <Container
    onClick={e => {
      e.stopPropagation();
    }}
  >
    <InputWrapper>
      <TextArea
        autoFocus
        placeholder="Task description"
        value={description}
        onChange={e => changeTaskDescription(e.target.value)}
        onBlur={checkTaskDescription}
        valid={!descriptionError}
      />
      <ErrorWrapper>
        {descriptionError && <Error>{descriptionError}</Error>}
      </ErrorWrapper>
    </InputWrapper>
    <Button onClick={saveTask}>SAVE TASK</Button>
  </Container>
);

export default connect(
  state => ({
    description: state.tasks.description,
    descriptionError: state.tasks.descriptionError
  }),
  {
    changeTaskDescription,
    checkTaskDescription,
    saveTask
  }
)(TaskForm);
