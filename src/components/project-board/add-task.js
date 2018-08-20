import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  toggleTaskForm,
  toggleDeleteTaskForm,
  deleteTask
} from '../../actions';

import { Button } from '../common-components';
import Overlay from '../overlay';
import TaskForm from './task-form';
import ConfirmationForm from '../confirmation-form';
import { AddTaskButton } from '../buttons';

const Row = styled.div`
  display: flex;
  margin-bottom: 30px;
  margin-left: 30px;
`;

const AddTask = ({
  selectedTask,
  toggleTaskForm,
  showTaskForm,
  showDeleteTaskForm,
  toggleDeleteTaskForm,
  deleteTask
}) => (
  <div>
    <Row>
      <AddTaskButton callback={toggleTaskForm} />
    </Row>
    {showTaskForm &&
      <Overlay close={toggleTaskForm}>
        <TaskForm close={toggleTaskForm} />
      </Overlay>
    }
    {showDeleteTaskForm &&
      <Overlay close={() => toggleDeleteTaskForm()}>
        <ConfirmationForm
          close={toggleDeleteTaskForm}
          object={selectedTask}
          questionText={`Do you really want to delete this task?`}
          callback={deleteTask}
        />
      </Overlay>
    }
  </div>
)

export default connect(
  state => ({
    selectedTask: state.tasks.selectedTask,
    showTaskForm: state.tasks.showTaskForm,
    showDeleteTaskForm: state.tasks.showDeleteTaskForm
  }),
  {
    toggleTaskForm,
    toggleDeleteTaskForm,
    deleteTask
  }
)(AddTask)
