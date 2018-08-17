import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getProjectWithTasks } from '../../actions';
import { Button } from '../common-components';

import AddTask from './add-task';
import Overlay from '../overlay';


class ProjectBoard extends Component {
  constructor(props) {
    super(props)
    this.props.getProjectWithTasks(this.props.params.name)
  }
  render() {
    return (
      <div>
        <AddTask />
      </div>
    )
  }
}



export default connect(
  state => ({
    project: state.projects.selectedProject
  }),
  {
    getProjectWithTasks
  }
)(ProjectBoard)
