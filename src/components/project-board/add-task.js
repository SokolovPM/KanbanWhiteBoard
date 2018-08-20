import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  toggleTaskForm,
  toggleDeleteTaskForm
} from '../../actions';

import { Button } from '../common-components';

import Overlay from '../overlay';

import TaskForm from './task-form';

import DeleteTaskForm from './delete-task-form';


const ProjectsList = ({
  toggleTaskForm,
  showTaskForm,
  showDeleteTaskForm,
  toggleDeleteTaskForm
}) => (
  <div>
    <Button onClick={toggleTaskForm}>ADD NEW TASK</Button>
    {showTaskForm &&
      <Overlay close={toggleTaskForm}>
        <TaskForm close={toggleTaskForm} />
      </Overlay>
    }

    {showDeleteTaskForm &&
      <Overlay close={() => toggleDeleteTaskForm()}>
        <DeleteTaskForm close={toggleDeleteTaskForm} />
      </Overlay>
    }
  </div>
)

export default connect(
  state => ({
    showTaskForm: state.tasks.showTaskForm,
    showDeleteTaskForm: state.tasks.showDeleteTaskForm
  }),
  {
    toggleTaskForm,
    toggleDeleteTaskForm
  }
)(ProjectsList)
