import React, { Component } from 'react';
import styled from 'styled-components';

import Column from './column';

import { connect } from 'react-redux';

import {
  changeTask,
  deleteTask,
  changeTaskStatus
} from '../../actions'

const Task = styled.div`
  border: 1px solid #ffffff;
  margin-bottom: 30px;
`;

const taskStatus = {
  TO_DO: 'TO_DO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE'
}

const Row = styled.div`
  display: flex;
`;

class Board extends Component {
  render() {
    const { project, changeTask, deleteTask, changeTaskStatus } = this.props;

    return (
      <div>
        {
          project.tasks &&
          <Row>
            <Column
              title="TO DO"
              tasks={project.tasks.filter(task => task.status === taskStatus.TO_DO)}
              changeTask={changeTask}
              deleteTask={deleteTask}
              changeTaskStatus={changeTaskStatus}
            />
            <Column
              title="IN PROGRESS"
              tasks={project.tasks.filter(task => task.status === taskStatus.IN_PROGRESS)}
              changeTask={changeTask}
              deleteTask={deleteTask}
              changeTaskStatus={changeTaskStatus}
            />
            <Column
              title="DONE"
              tasks={project.tasks.filter(task => task.status === taskStatus.DONE)}
              changeTask={changeTask}
              deleteTask={deleteTask}
              changeTaskStatus={changeTaskStatus}
            />
          </Row>
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    project: state.projects.selectedProject
  }),
  {
    changeTask,
    deleteTask,
    changeTaskStatus
  }
)(Board)
