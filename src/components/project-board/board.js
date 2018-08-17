import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';

import {
  changeTask,
  deleteTask
} from '../../actions'

const Task = styled.div`
  border: 1px solid #ffffff;
  margin-bottom: 30px;
`;

class Board extends Component {
  render() {
    const { project, changeTask, deleteTask } = this.props;
    return (
      <div>
        this is board with tasks
        {project.tasks && project.tasks.map(task => {
          return (
            <Task key={task.id} onClick={() => changeTask(task)} >
              <div>{task.name}</div>
              <div>{task.description}</div>
              <div onClick={(e) => {e.stopPropagation(); deleteTask(task)}}>delete task</div>
            </Task>
          )
        })}
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
    deleteTask
  }
)(Board)
