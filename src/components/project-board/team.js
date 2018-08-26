import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { toggleUserForm, toggleDeleteUserForm, deleteUser } from '../../actions';
import { AddUserButton } from '../buttons';
import ConfirmationForm from '../confirmation-form';


import Overlay from '../overlay';
import UserForm from './user-form';

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Email = styled.div`
  color: #509bfd;
  margin-right: 20px;
`;

const Delete = styled.div`
  color: #509bfd;
  cursor: pointer;
`;

const Invite = styled.div`
  color: #509bfd;
  cursor: pointer;
`;

const Image = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 20px;
  background-color: grey;
`;

const Team = ({
  toggleUserForm,
  showUserForm,
  selectedProject,
  showDeleteUserForm,
  toggleDeleteUserForm,
  deleteUser,
  selectedUser,
  projectTeam
}) => (
  <div>
    {showUserForm &&
      <Overlay close={toggleUserForm}>
        <UserForm close={toggleUserForm} />
      </Overlay>
    }
    {showDeleteUserForm &&
      <Overlay close={() => toggleDeleteUserForm()}>
        <ConfirmationForm
          close={toggleDeleteUserForm}
          object={selectedUser}
          questionText={`Do you really want to delete user ${selectedUser}?`}
          callback={deleteUser}
        />
      </Overlay>
    }
    <Row>
      <AddUserButton callback={toggleUserForm} />
    </Row>
    <div>


      {selectedProject && selectedProject.team && selectedProject.team.map(user =>{
        const existingUser = projectTeam.find(el => el.email === user);
        if (existingUser) {
          return (
            <Row key={existingUser.name}>
              {existingUser.foto && <Image src={`/${existingUser.foto}`} alt='' />}
              <Email>
                {`${existingUser.name} (${existingUser.email})`}
              </Email>
              <Delete onClick={() => toggleDeleteUserForm(existingUser.email)}>
                (delete)
              </Delete>
            </Row>
          )
        } else {
          return (
            <Row key={user}>
              <Email>
                {user} - this user isn't registered
              </Email>
              <Invite onClick={() => toggleDeleteUserForm(user)}>
                (invite)
              </Invite>
              <Delete onClick={() => toggleDeleteUserForm(user)}>
                (delete)
              </Delete>
            </Row>
          )
        }
      })}
    </div>
  </div>
)

export default connect(
  state => ({
    showUserForm: state.team.showUserForm,
    selectedProject: state.projects.selectedProject,
    showDeleteUserForm: state.team.showDeleteUserForm,
    selectedUser: state.team.selectedUser,
    projectTeam: state.projects.projectTeam
  }),
  {
    toggleUserForm,
    toggleDeleteUserForm,
    deleteUser
  }
)(Team)
