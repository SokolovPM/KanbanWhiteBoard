import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProjectList } from '../../actions';


import ProjectsList from './projects-list';

class Projects extends Component {
  constructor(props) {
    super(props)
    this.props.getProjectList()
  }

  render () {
    return (
      <div>
        <ProjectsList />
      </div>
    )
  }
}


export default connect(
  state => ({
  }),
  {
    getProjectList
  }
)(Projects)
