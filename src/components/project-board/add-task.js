import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  toggleTaskForm,
} from '../../actions';

import { Button } from '../common-components';

import Overlay from '../overlay';

import TaskForm from './task-form';


const ProjectsList = ({
  toggleTaskForm,
  showTaskForm
}) => (
  <div>
    <Button onClick={toggleTaskForm}>ADD NEW TASK</Button>
    {showTaskForm &&
      <Overlay close={toggleTaskForm}>
        <TaskForm close={toggleTaskForm} />
      </Overlay>
    }
  </div>
)

export default connect(
  state => ({
    showTaskForm: state.tasks.showTaskForm
  }),
  {
    toggleTaskForm
  }
)(ProjectsList)
