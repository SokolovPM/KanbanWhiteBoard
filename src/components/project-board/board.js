import React from 'react';
import styled from 'styled-components';

import Column from './column';

import { connect } from 'react-redux';

import {
  changeTask,
  deleteTask,
  changeTaskStatus,
  toggleDeleteTaskForm
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

const Board = ({
  project,
  changeTask,
  deleteTask,
  changeTaskStatus,
  toggleDeleteTaskForm
}) => (
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
          toggleDeleteTaskForm={toggleDeleteTaskForm}
        />
        <Column
          title="IN PROGRESS"
          tasks={project.tasks.filter(task => task.status === taskStatus.IN_PROGRESS)}
          changeTask={changeTask}
          deleteTask={deleteTask}
          changeTaskStatus={changeTaskStatus}
          toggleDeleteTaskForm={toggleDeleteTaskForm}
        />
        <Column
          title="DONE"
          tasks={project.tasks.filter(task => task.status === taskStatus.DONE)}
          changeTask={changeTask}
          deleteTask={deleteTask}
          changeTaskStatus={changeTaskStatus}
          toggleDeleteTaskForm={toggleDeleteTaskForm}
        />
      </Row>
    }
  </div>
)

export default connect(
  state => ({
    project: state.projects.selectedProject
  }),
  {
    changeTask,
    deleteTask,
    changeTaskStatus,
    toggleDeleteTaskForm
  }
)(Board)
