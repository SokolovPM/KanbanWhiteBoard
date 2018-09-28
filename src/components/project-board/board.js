import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import Column from './column';

import {
  changeTask,
  deleteTask,
  changeTaskStatus,
  toggleDeleteTaskForm,
  changeSorting
} from '../../actions';

import { Row, Toggle } from '../common-components';

const taskStatus = {
  TO_DO: 'TO_DO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE'
};

const ColumnRow = styled(Row)`
  @media only screen and (max-width: 425px) {
    flex-wrap: wrap;
  }
`;

const priorityDigit = {
  low: 0,
  middle: 1,
  high: 2
}

const getTasks = (tasks, status, sorting, email) => {
  if (sorting === 'mytask') {
    return tasks.filter(task => task.status === status && task.executor && task.executor.email === email).reverse()
  } else {
    return tasks.filter(task => task.status === status).sort((task1, task2) => {
      const priority1 = task1.priority ? priorityDigit[task1.priority] : -1;
      const priority2 = task2.priority ? priorityDigit[task2.priority] : -1;
      return priority1 > priority2 ? -1 : 1;
    })
  }
  return [];
}

const Board = ({
  project,
  changeTask,
  deleteTask,
  changeTaskStatus,
  toggleDeleteTaskForm,
  changeSorting,
  sorting,
  email
}) => (
  <div>
    <Row>
      <Toggle onClick={() => changeSorting('priority')} selected={sorting === 'priority'}>Priority</Toggle>
      <Toggle onClick={() => changeSorting('mytask')} selected={sorting === 'mytask'}>MyTask</Toggle>
    </Row>
    {project.tasks && (
      <ColumnRow>
        <Column
          title="TO DO"
          tasks={getTasks(project.tasks, taskStatus.TO_DO, sorting, email)}
          changeTask={changeTask}
          deleteTask={deleteTask}
          changeTaskStatus={changeTaskStatus}
          toggleDeleteTaskForm={toggleDeleteTaskForm}
        />
        <Column
          title="IN PROGRESS"
          tasks={getTasks(project.tasks, taskStatus.IN_PROGRESS, sorting, email)}
          changeTask={changeTask}
          deleteTask={deleteTask}
          changeTaskStatus={changeTaskStatus}
          toggleDeleteTaskForm={toggleDeleteTaskForm}
        />
        <Column
          title="DONE"
          tasks={getTasks(project.tasks, taskStatus.DONE, sorting, email)}
          changeTask={changeTask}
          deleteTask={deleteTask}
          changeTaskStatus={changeTaskStatus}
          toggleDeleteTaskForm={toggleDeleteTaskForm}
          hide={true}
        />
      </ColumnRow>
    )}
  </div>
);

export default connect(
  state => ({
    project: state.projects.selectedProject,
    sorting: state.projects.sorting,
    email: state.authorization.email
  }),
  {
    changeTask,
    deleteTask,
    changeTaskStatus,
    toggleDeleteTaskForm,
    changeSorting
  }
)(Board);
