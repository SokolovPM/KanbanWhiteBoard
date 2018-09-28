import React, { Component } from 'react';
import styled from 'styled-components';

import Task from './task';

const Container = styled.div`
  min-width: 300px;
  width: 33%;

  @media only screen and (max-width: 425px) {
    margin: auto;
  }

  @media only screen and (min-width: 768px) {
    min-width: unset;
  }
`;

const Name = styled.div`
  text-align: center;
  font-size: 20px;
  margin-bottom: 30px;
  color: #509bfd;
`;

const HideControl = styled.div`
  text-align: center;
  font-size: 24px;
  cursor: pointer;
  color: #509bfd;
`;

class Column extends Component {
  state = {
    showAll: false
  }

  handleShow = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  render() {
    const {
      title,
      tasks = [],
      changeTask,
      deleteTask,
      changeTaskStatus,
      toggleDeleteTaskForm,
      hide
    } = this.props;
    let resultTasks = tasks;
    if (hide && !this.state.showAll) {
      resultTasks = tasks.slice(0, 15)
    }
    return (
      <Container>
        <Name>{title}</Name>
        <div>
          {resultTasks.map(task => (
            <Task
              key={task.id}
              task={task}
              changeTask={changeTask}
              deleteTask={deleteTask}
              changeTaskStatus={changeTaskStatus}
              toggleDeleteTaskForm={toggleDeleteTaskForm}
            />
          ))}
          {hide && tasks.length > 15 &&
            <HideControl onClick={this.handleShow}>
              {this.state.showAll ? 'Hide old tasks' : 'Show old tasks'}
            </HideControl>
          }
        </div>
      </Container>
    )
  }
}

export default Column;
