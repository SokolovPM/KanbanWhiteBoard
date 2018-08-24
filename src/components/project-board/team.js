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
`;

const Email = styled.div`
  color: #509bfd;
  margin-right: 20px;
`;

const Delete = styled.div`
  color: #509bfd;
  cursor: pointer;
`;

const Team = ({
  toggleUserForm,
  showUserForm,
  selectedProject,
  showDeleteUserForm,
  toggleDeleteUserForm,
  deleteUser,
  selectedUser
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
      {selectedProject && selectedProject.team && selectedProject.team.map(user => (
        <Row key={user}>
          <Email>
            {user}
          </Email>
          <Delete onClick={() => toggleDeleteUserForm(user)}>
            (delete)
          </Delete>
        </Row>
      ))}
    </div>
  </div>
)

export default connect(
  state => ({
    showUserForm: state.team.showUserForm,
    selectedProject: state.projects.selectedProject,
    showDeleteUserForm: state.team.showDeleteUserForm,
    selectedUser: state.team.selectedUser
  }),
  {
    toggleUserForm,
    toggleDeleteUserForm,
    deleteUser
  }
)(Team)
