import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { YesButton, NoButton } from '../buttons';

import { deleteTask } from '../../actions';

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

const DeleteTaskForm = ({ task, close, deleteTask }) => (
  <Container>
    <Question>Do you really want to delete this task?</Question>
    <Buttons>
      <YesButton callback={(e) => {
        e.stopPropagation();
        deleteTask(task)
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
    task: state.tasks.selectedTask
  }),
  {
    deleteTask
  }
)(DeleteTaskForm)
