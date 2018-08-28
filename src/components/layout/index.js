import React, { Component } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import LoginPage from '../login-page';
import {
  logout,
  backToTheProjectList,
  toggleTaskForm,
  toggleProjectForm,
  toggleUserFotoForm
} from '../../actions';

import { LogoutButton, HomeButton, AddTaskButton, AddProjectButton } from '../buttons';

import UserInfo from './user-info';


import Overlay from '../overlay';
import UserFotoForm from './user-foto-form';

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
  padding-bottom: 20px;
`;

const BlueLine = styled.div`
  border: 3px solid black;
  border-image: linear-gradient(to right, rgba(0, 111,255,0) 0%, rgba(0, 111,255,1) 20%, rgba(0, 111,255,1) 80%, rgba(0, 111,255,0) 100%);
  border-image-slice: 1;
`;

const Footer = styled.div`
  padding: 30px;
  text-align: center;
  color: #509bfd;
`;

class Layout extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      auth,
      children,
      logout,
      backToTheProjectList,
      location,
      toggleTaskForm,
      toggleProjectForm,
      name,
      email,
      toggleUserFotoForm,
      showUserFotoForm,
      foto
    } = this.props;
    return (
      <WhiteBoard>
        <Container>
          {auth &&
            <div>
              <Header>
                {location.pathname === '/' ?
                  <div style={{ width: '120px' }}/>
                  :
                  <HomeButton callback={backToTheProjectList} />
                }
                {location.pathname === '/' ?
                  <AddProjectButton callback={toggleProjectForm} />
                  :
                  <AddTaskButton callback={toggleTaskForm} />
                }
                <UserInfo
                  name={name}
                  email={email}
                  logout={logout}
                  changeFoto={toggleUserFotoForm}
                  foto={foto}
                />
              </Header>
              <BlueLine style={{ marginBottom: '30px' }} />
            </div>
          }
          <Content>
            {auth ?
              <div>{children}</div>
              :
              <LoginPage />
            }
          </Content>
        </Container>
        {showUserFotoForm &&
          <Overlay close={() => toggleUserFotoForm()}>
            <UserFotoForm close={toggleUserFotoForm} />
          </Overlay>
        }
        <div>
          <BlueLine style={{ marginTop: '30px' }}/>
          <Footer>
            <div>Petr Sokolov</div>
            <div><a href="https://github.com/SokolovPM">github</a></div>
            <div>email: tenebrise@mail.ru</div>
          </Footer>
        </div>
      </WhiteBoard>
    )
  }
}

export default connect(
  state => ({
    auth: state.authorization.auth,
    name: state.authorization.name,
    email: state.authorization.email,
    showUserFotoForm: state.authorization.showUserFotoForm,
    foto: state.authorization.foto
  }),
  {
    logout,
    backToTheProjectList,
    toggleTaskForm,
    toggleProjectForm,
    toggleUserFotoForm
  }
)(Layout)
