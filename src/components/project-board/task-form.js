import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Autocomplete from 'react-autocomplete';

import {
  Input,
  InputWrapper,
  ErrorWrapper,
  Error,
  Button,
  TextArea
} from '../common-components';

import {
  changeTaskDescription,
  checkTaskDescription,
  saveTask,
  changeExecutorName
} from '../../actions';

const Container = styled.div`
  width: 600px;
  margin: 50px auto;
  background-color: #ffffff;
  padding: 25px 25px 0 25px;
  overflow: overlay;
  z-index: 1000;
  text-align: center;
`;

const SelectWrapper = styled.div`
  position: relative;
  font-family: 'Indie Flower', cursive;
`;
const Select = styled.select`
  display: none;
`;

const Option = styled.div`
  color: #509bfd;
  font-size: 18px;
  cursor: pointer;
  padding: 5px 0;
  margin: 10px 0;

  &:hover {
    background-color: #ece6e6;
  }
`;

const List =styled.div`
  position: absolute;
  background-color: #ffffff;
  width: 330px;
  border: 1px solid #509bfd;
`;

const TaskForm = ({
  description,
  descriptionError,
  checkTaskDescription,
  changeTaskDescription,
  saveTask,
  executor,
  changeExecutorName,
  projectTeam
}) => (
  <Container
    onClick={e => {
      e.stopPropagation();
    }}
  >
    <InputWrapper>
      <Autocomplete
        getItemValue={(item) => item.name}
        items={projectTeam}
        renderItem={(item, isHighlighted) =>
          <Option key={item.name}>
            {item.name}
          </Option>
        }
        renderMenu={(items, value) => (
          <List>
            {items}
          </List>
        )}
        renderInput={(props) => {
          const { ref, ...rest } = props;
          return <Input {...rest} innerRef={ref} valid={true} />
        }}
        value={executor ? executor.name : ''}
        onChange={(e) => changeExecutorName({})}
        onSelect={(val) => changeExecutorName(projectTeam.find(executor => executor.name === val))}
      />
    </InputWrapper>
    <InputWrapper>
      <TextArea
        autoFocus
        placeholder="Task description"
        value={description}
        onChange={e => changeTaskDescription(e.target.value)}
        onBlur={checkTaskDescription}
        valid={!descriptionError}
      />
      <ErrorWrapper>
        {descriptionError && <Error>{descriptionError}</Error>}
      </ErrorWrapper>
    </InputWrapper>
    <Button onClick={saveTask}>SAVE TASK</Button>
  </Container>
);

export default connect(
  state => ({
    description: state.tasks.description,
    descriptionError: state.tasks.descriptionError,
    executor: state.tasks.executor,
    projectTeam: [
      ...state.projects.projectTeam,
      {
        name: state.authorization.name,
        email: state.authorization.email
      }
    ]
  }),
  {
    changeTaskDescription,
    checkTaskDescription,
    saveTask,
    changeExecutorName
  }
)(TaskForm);
