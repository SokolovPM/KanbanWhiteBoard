import React, { Component } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import LoginPage from '../login-page';
import { Button } from '../common-components';
import { logout } from '../../actions';

const Container = styled.div`
  max-width: 1280px;
  margin: 20px auto;
`;
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
    const { auth, children, logout } = this.props;
    return (
      <Container>
        {auth && <Button onClick={logout}>LOGOUT</Button>}
        <Content>
          {auth ?
            <div>{children}</div>
            :
            <LoginPage />
          }
        </Content>
      </Container>
    )
  }
}

export default connect(
  state => ({
    auth: state.authorization.auth,
  }),
  {
    logout
  }
)(Layout)
