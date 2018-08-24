import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { toggleUserForm } from '../../actions';
import { AddUserButton } from '../buttons';

import Overlay from '../overlay';
import UserForm from './user-form';

const Row = styled.div`
  display: flex;
`;

const Team = ({
  toggleUserForm,
  showUserForm,
  selectedProject
}) => (
  <div>
    {showUserForm &&
      <Overlay close={toggleUserForm}>
        <UserForm close={toggleUserForm} />
      </Overlay>
    }
    <Row>
      <AddUserButton callback={toggleUserForm} />
    </Row>
    <div>
      {selectedProject && selectedProject.team && selectedProject.team.map(user => (
        <div>
          {user}
        </div>
      ))}
    </div>
  </div>
)

export default connect(
  state => ({
    showUserForm: state.team.showUserForm,
    selectedProject: state.projects.selectedProject
  }),
  {
    toggleUserForm
  }
)(Team)
