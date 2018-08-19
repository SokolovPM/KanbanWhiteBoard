import React, { Component } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import LoginPage from '../login-page';
import { logout, backToTheProjectList } from '../../actions';

import { LogoutButton, HomeButton } from './header-buttons';


const Container = styled.div`
  max-width: 1280px;
  margin: 20px auto;
  font-family: 'Indie Flower', cursive;
`;
const Content = styled.div`
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

class Layout extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { auth, children, logout, backToTheProjectList, location } = this.props;
    return (
      <Container>
        {auth &&
          <Header>
            {location.pathname === '/' ?
              <div />
              :
              <HomeButton callback={backToTheProjectList} />
            }
            <LogoutButton callback={logout} />
          </Header>
        }
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
    logout,
    backToTheProjectList
  }
)(Layout)
