import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getProjectWithTasks, backToTheProjectList } from '../../actions';

import AddTask from './add-task';
import Overlay from '../overlay';

import Board from './board';

import { Button, Button2 } from '../common-components';



class ProjectBoard extends Component {
  constructor(props) {
    super(props)
    this.props.getProjectWithTasks(this.props.params.name)
  }
  render() {
    return (
      <div>
        <Button onClick={this.props.backToTheProjectList}>BACK TO THE PROJECT LIST</Button>
        <Button2>ADD NEW TASK</Button2>
        <AddTask />
        <Board />
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
