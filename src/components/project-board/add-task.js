import React from 'react';
import { connect } from 'react-redux';

import {
  toggleTaskForm,
  toggleDeleteTaskForm,
  deleteTask
} from '../../actions';

import Overlay from '../overlay';
import TaskForm from './task-form';
import ConfirmationForm from '../confirmation-form';

const AddTask = ({
  selectedTask,
  toggleTaskForm,
  showTaskForm,
  showDeleteTaskForm,
  toggleDeleteTaskForm,
  deleteTask
}) => (
  <div>
    {showTaskForm && (
      <Overlay close={toggleTaskForm}>
        <TaskForm close={toggleTaskForm} />
      </Overlay>
    )}
    {showDeleteTaskForm && (
      <Overlay close={() => toggleDeleteTaskForm()}>
        <ConfirmationForm
          close={toggleDeleteTaskForm}
          object={selectedTask}
          questionText="Do you really want to delete this task?"
          callback={deleteTask}
        />
      </Overlay>
    )}
  </div>
);

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
)(AddTask);
