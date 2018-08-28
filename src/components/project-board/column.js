import React from 'react';
import styled from 'styled-components';

import Task from './task';

const Container = styled.div`
  min-width: 300px;
  max-width: 500px;
  width: 33%;
`;

const Name = styled.div`
  text-align: center;
  font-size: 20px;
  margin-bottom: 30px;
  color: #509bfd;
`;

const Column = ({
  title,
  tasks = [],
  changeTask,
  deleteTask,
  changeTaskStatus,
  toggleDeleteTaskForm
}) => (
  <Container>
    <Name>{title}</Name>
    <div>
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          changeTask={changeTask}
          deleteTask={deleteTask}
          changeTaskStatus={changeTaskStatus}
          toggleDeleteTaskForm={toggleDeleteTaskForm}
        />
      ))}
    </div>
  </Container>
);

export default Column;
