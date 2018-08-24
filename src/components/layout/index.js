import React, { Component } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import LoginPage from '../login-page';
import { logout, backToTheProjectList, toggleTaskForm, toggleProjectForm } from '../../actions';

import { LogoutButton, HomeButton, AddTaskButton, AddProjectButton } from '../buttons';

const WhiteBoard = styled.div`
  background-color: #f2f2f2;
  position: relative;
  border-radius: 5px;
  min-height: 100%;
  border: 10px solid #adb2bd;
  box-shadow: inset -1px 2px 2px #404040, 6px 9px 1px rgba(0, 0, 0, 0.1);
`;
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
  padding-bottom: 20px;
  border-bottom: 5px solid black;
	border-image: linear-gradient(to right, rgba(0, 111,255,0) 0%, rgba(0, 111,255,1) 20%, rgba(0, 111,255,1) 80%, rgba(0, 111,255,0) 100%);
	border-image-slice: 1;
`;

class Layout extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { auth, children, logout, backToTheProjectList, location, toggleTaskForm, toggleProjectForm } = this.props;
    return (
      <WhiteBoard>
        <Container>
          {auth &&
            <Header>
              {location.pathname === '/' ?
                <div />
                :
                <HomeButton callback={backToTheProjectList} />
              }
              {location.pathname === '/' ?
                <AddProjectButton callback={toggleProjectForm} />
                :
                <AddTaskButton callback={toggleTaskForm} />
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
      </WhiteBoard>
    )
  }
}

export default connect(
  state => ({
    auth: state.authorization.auth,
  }),
  {
    logout,
    backToTheProjectList,
    toggleTaskForm,
    toggleProjectForm
  }
)(Layout)
