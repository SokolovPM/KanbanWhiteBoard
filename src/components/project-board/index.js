import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getTasks } from '../../actions';

class ProjectBoard extends Component {
  constructor(props) {
    super(props)

    this.props.getTasks(this.props.params.name)
  }
  render() {
    return (
      <div>
        project board
      </div>
    )
  }
}

export default connect(
  state => ({
  }),
  {
    getTasks
  }
)(ProjectBoard)
