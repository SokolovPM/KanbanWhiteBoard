import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Media from "react-media";

import LoginPage from '../login-page';
import LandingPage from '../landing-page';
import {
  logout,
  backToTheProjectList,
  toggleTaskForm,
  toggleProjectForm,
  toggleUserPhotoForm
} from '../../actions';

import { HomeButton, AddTaskButton, AddProjectButton } from '../buttons';

import UserInfo from './user-info';

import Overlay from '../overlay';
import UserPhotoForm from './user-photo-form';

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

  @media only screen and (max-width: 1280px) {
    margin: 20px 5px;
  }
`;
const Content = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;

  @media only screen and (max-width: 425px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const BlueLine = styled.div`
  border: 3px solid black;
  border-image: linear-gradient(
    to right,
    rgba(0, 111, 255, 0) 0%,
    rgba(0, 111, 255, 1) 20%,
    rgba(0, 111, 255, 1) 80%,
    rgba(0, 111, 255, 0) 100%
  );
  border-image-slice: 1;
`;

const Footer = styled.div`
  padding: 30px;
  text-align: center;
  color: #509bfd;
`;

class Layout extends Component {
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
      toggleUserPhotoForm,
      showUserPhotoForm,
      photo
    } = this.props;
    return (
      <WhiteBoard>
        <Container>
          {auth && (
            <div>
              <Header>
                {location.pathname !== '/' &&
                  <Media query="(max-width: 425px)">
                    {matches =>
                      matches ? (
                        <HomeButton callback={backToTheProjectList} style={{ marginRight: '50px' }}/>
                      ) : (
                        <HomeButton callback={backToTheProjectList} />
                      )
                    }
                  </Media>
                }
                {location.pathname === '/' ? (
                  <Media query="(max-width: 425px)">
                    {matches =>
                      matches ? (
                        <div />
                      ) : (
                        <AddProjectButton callback={toggleProjectForm} />
                      )
                    }
                  </Media>
                ) : (
                  <AddTaskButton callback={toggleTaskForm} />
                )}
                <UserInfo
                  name={name}
                  email={email}
                  logout={logout}
                  changePhoto={toggleUserPhotoForm}
                  photo={photo}
                />
              </Header>
              <BlueLine style={{ marginBottom: '30px' }} />
            </div>
          )}
          <Content>{auth ? <div>{children}</div> : <LandingPage />}</Content>
        </Container>
        {showUserPhotoForm && (
          <Overlay close={() => toggleUserPhotoForm()}>
            <UserPhotoForm close={toggleUserPhotoForm} />
          </Overlay>
        )}
        <div>
          <BlueLine style={{ marginTop: '30px' }} />
          <Footer>
            <div>Petr Sokolov</div>
            <div>
              <a href="https://github.com/SokolovPM">github</a>
            </div>
            <div>email: tenebrise@mail.ru</div>
          </Footer>
        </div>
      </WhiteBoard>
    );
  }
}

export default connect(
  state => ({
    auth: state.authorization.auth,
    name: state.authorization.name,
    email: state.authorization.email,
    showUserPhotoForm: state.authorization.showUserPhotoForm,
    photo: state.authorization.photo
  }),
  {
    logout,
    backToTheProjectList,
    toggleTaskForm,
    toggleProjectForm,
    toggleUserPhotoForm
  }
)(Layout);
