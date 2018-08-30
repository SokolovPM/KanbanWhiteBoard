import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid transparent;
  margin-bottom: 30px;
  margin: 0 auto 20px;
  width: 300px;
  height: 200px;
  position: relative;
  background-color: #${props => (props.color ? props.color : 'f1c40f')};
  transform: rotate(${props => (props.deg ? props.deg : 0)}deg);
  border-radius: 0 0px 200px 7px/ 0 200px 15px 250px;
  white-space: pre-line;
`;

const Description = styled.div`
  padding: 0 15px;
  overflow: overlay;
  height: 120px;
  margin: 20px 0 5px 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
`;

const Control = styled.div`
  cursor: pointer;
`;

const DeleteControl = styled.div`
  font-size: 12px;
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 15px;
  cursor: pointer;
`;

const Executor = styled.div`
  text-align: center;
  height: 20px;
`;

const taskStatus = {
  TO_DO: 'TO_DO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE'
};


const Task = ({ task, changeTask, changeTaskStatus, toggleDeleteTaskForm }) => (
  <Container
    key={task.id}
    onClick={() => changeTask(task)}
    deg={task.deg}
    color={task.color}
  >
    <Description>{task.description}</Description>
    <Executor>
      {task.executor ? task.executor.name : ''}
    </Executor>
    <DeleteControl
      onClick={e => {
        e.stopPropagation();
        toggleDeleteTaskForm(task);
      }}
    >
      delete task
    </DeleteControl>
    {task.status === taskStatus.TO_DO && (
      <Footer>
        <div />
        <Control
          onClick={e => {
            e.stopPropagation();
            changeTaskStatus(task.id, taskStatus.IN_PROGRESS);
          }}
        >
          to work
        </Control>
      </Footer>
    )}
    {task.status === taskStatus.IN_PROGRESS && (
      <Footer>
        <Control
          onClick={e => {
            e.stopPropagation();
            changeTaskStatus(task.id, taskStatus.TO_DO);
          }}
        >
          to waiting list
        </Control>
        <Control
          onClick={e => {
            e.stopPropagation();
            changeTaskStatus(task.id, taskStatus.DONE);
          }}
        >
          finish
        </Control>
      </Footer>
    )}
    {task.status === taskStatus.DONE && (
      <Footer>
        <Control
          onClick={e => {
            e.stopPropagation();
            changeTaskStatus(task.id, taskStatus.IN_PROGRESS);
          }}
        >
          back to work
        </Control>
        <div />
      </Footer>
    )}
  </Container>
);

export default Task;
