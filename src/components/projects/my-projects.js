import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  toggleProjectForm,
  editProject,
  deleteProject,
  selectProject,
  toggleDeleteProjectForm
} from '../../actions';

import ConfirmationForm from '../confirmation-form';
import Overlay from '../overlay';
import ProjectForm from './project-form';
import ProjectItem from './project-item';
import { AddProjectButton } from '../buttons';

const ProjectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 30px;
  margin-left: 30px;
`;

const Section = styled.div`
  color: #509bfd;
`;


const MyProjects = ({

}) => (
  <div>
    <Section>My projects</Section>
  </div>
)

export default connect(
  state => ({

  }),
  {

  }
)(MyProjects)
