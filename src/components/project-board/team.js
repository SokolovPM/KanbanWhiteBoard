import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  toggleUserForm,
  toggleDeleteUserForm,
  deleteUser,
  inviteNewUser
} from '../../actions';
import { AddUserButton } from '../buttons';
import ConfirmationForm from '../confirmation-form';

import Overlay from '../overlay';
import UserForm from './user-form';

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

const Email = styled.div`
  color: #509bfd;
  margin-right: 20px;
`;

const Name = styled.div`
  color: #509bfd;
  margin-right: 10px;
`;

const Delete = styled.div`
  color: #509bfd;
  cursor: pointer;
`;

const Invite = styled.div`
  color: #509bfd;
  cursor: pointer;
  margin-right: 10px;
`;

const Invitation = styled.div`
  color: #509bfd;
`;

const Image = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const ImageWrapper = styled.div`
  width: 40px;
  height: 40px;
  background-color: grey;
  border-radius: 50%;
  margin-right: 20px;
`;

const Team = ({
  showDeleteButton,
  toggleUserForm,
  showUserForm,
  selectedProject,
  showDeleteUserForm,
  toggleDeleteUserForm,
  deleteUser,
  selectedUser,
  projectTeam,
  inviteNewUser,
  invitedEmail
}) => (
  <div>
    {showUserForm && (
      <Overlay close={toggleUserForm}>
        <UserForm close={toggleUserForm} />
      </Overlay>
    )}
    {showDeleteUserForm && (
      <Overlay close={() => toggleDeleteUserForm()}>
        <ConfirmationForm
          close={toggleDeleteUserForm}
          object={selectedUser}
          questionText={`Do you really want to delete user ${selectedUser}?`}
          callback={deleteUser}
        />
      </Overlay>
    )}
    {showDeleteButton && (
      <Row>
        <AddUserButton callback={toggleUserForm} />
      </Row>
    )}
    <div>
      {selectedProject &&
        selectedProject.team &&
        selectedProject.team.map(user => {
          const existingUser = projectTeam.find(el => el.email === user);
          if (existingUser) {
            return (
              <Row key={existingUser.name}>
                <ImageWrapper>
                  {existingUser.foto && (
                    <Image src={`/${existingUser.foto}`} alt="" />
                  )}
                </ImageWrapper>
                <Name>{existingUser.name}</Name>
                <Email>({existingUser.email})</Email>
                {showDeleteButton && (
                  <Delete
                    onClick={() => toggleDeleteUserForm(existingUser.email)}
                  >
                    (delete)
                  </Delete>
                )}
              </Row>
            );
          }
          return (
            <Row key={user}>
              <Email>{`${user} - this user isn't registered`}</Email>
              <Invite onClick={() => inviteNewUser(user)}>(invite)</Invite>
              {showDeleteButton && (
                <Delete onClick={() => toggleDeleteUserForm(user)}>
                  (delete)
                </Delete>
              )}
            </Row>
          );
        })}
    </div>
    <div>
      {invitedEmail && (
        <Invitation>{`Invitation for ${invitedEmail} was sent`}</Invitation>
      )}
    </div>
  </div>
);

export default connect(
  state => ({
    showDeleteButton:
      state.authorization.email === state.projects.selectedProject.email,
    showUserForm: state.team.showUserForm,
    selectedProject: state.projects.selectedProject,
    showDeleteUserForm: state.team.showDeleteUserForm,
    selectedUser: state.team.selectedUser,
    projectTeam: state.projects.projectTeam,
    invitedEmail: state.team.invitedEmail
  }),
  {
    toggleUserForm,
    toggleDeleteUserForm,
    deleteUser,
    inviteNewUser
  }
)(Team);
