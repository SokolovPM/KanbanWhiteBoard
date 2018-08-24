import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getProjectWithTasks, backToTheProjectList } from '../../actions';

import Overlay from '../overlay';
import AddTask from './add-task';
import Board from './board';
import Team from './team';

class ProjectBoard extends Component {
  constructor(props) {
    super(props)
    this.props.getProjectWithTasks(this.props.params.name)
  }
  render() {
    return (
      <div>
        <AddTask />
        <Board />
        <Team />
      </div>
    )
  }
}

export default connect(
  state => ({
    project: state.projects.selectedProject
  }),
  {
    getProjectWithTasks,
    backToTheProjectList
  }
)(ProjectBoard)
