import React, { Component } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import LoginPage from '../login-page';

const Content = styled.div`
`;

class Layout extends Component {
  constructor(props) {
    super(props)

    if (!this.props.auth) {
      browserHistory.push('/')
    } else {
      browserHistory.push('projects')
    }
  }
  render() {
    const { auth, children } = this.props;
    return (
      <div>
        <Content>
          {auth ?
            <div>{children}</div>
            :
            <LoginPage />
          }
        </Content>
      </div>
    )
  }
}


export default connect(
  state => ({
    auth: state.authorization.auth,
  }),
  {
  }
)(Layout)
