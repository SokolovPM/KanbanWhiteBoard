import React, { Component } from 'react';
import styled from 'styled-components';

import Task from './task';

const Container = styled.div`
  min-width: 300px;
  max-width: 500px;
  width: 33%;
  border: 1px solid #ffffff;
`;

class Column extends Component {
  render() {

    const { title, tasks = [], changeTask, deleteTask, changeTaskStatus } = this.props;

    return (
      <Container>
        <div>{title}</div>
        <div>
          {tasks.map(task => (
            <Task
              key={task.id}
              task={task}
              changeTask={changeTask}
              deleteTask={deleteTask}
              changeTaskStatus={changeTaskStatus}
            />
          ))}
        </div>
      </Container>
    )
  }
}

export default Column;
