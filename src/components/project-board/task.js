import React, { Component } from 'react'
import styled from 'styled-components';


const Container = styled.div`
  border: 1px solid #ffffff;
  margin-bottom: 30px;
`;

const taskStatus = {
  TO_DO: 'TO_DO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE'
}

class Task extends Component {
  render() {
    const { task, changeTask, deleteTask, changeTaskStatus } = this.props;
    return (
      <Container key={task.id} onClick={() => changeTask(task)} >
        <div>{task.name}</div>
        <div>{task.description}</div>
        <div onClick={(e) => {e.stopPropagation(); deleteTask(task)}}>delete task</div>
        <div>{task.status}</div>

        {task.status === taskStatus.TO_DO &&
          <div onClick={(e) => {e.stopPropagation(); changeTaskStatus(task.id, taskStatus.IN_PROGRESS)}}>to work</div>
        }
        {task.status === taskStatus.IN_PROGRESS &&
          <div>
            <div onClick={(e) => {e.stopPropagation(); changeTaskStatus(task.id, taskStatus.TO_DO)}}>to waiting list</div>
            <div onClick={(e) => {e.stopPropagation(); changeTaskStatus(task.id, taskStatus.DONE)}}>finish</div>
          </div>
        }
        {task.status === taskStatus.DONE &&
          <div onClick={(e) => {e.stopPropagation(); changeTaskStatus(task.id, taskStatus.IN_PROGRESS)}}>back to work</div>
        }
      </Container>
    )
  }
}

export default Task;
