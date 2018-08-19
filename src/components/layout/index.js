import React, { Component } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import LoginPage from '../login-page';
import { Button2 } from '../common-components';
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
  }

  render() {
    const { auth, children, logout } = this.props;
    return (
      <Container>
        {auth && <Button2 onClick={logout}>LOGOUT</Button2>}
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
