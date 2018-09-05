import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Autocomplete from 'react-autocomplete';

import {
  Input as UsualInput,
  InputWrapper,
  ErrorWrapper,
  Error,
  Button as UsualButton,
  TextArea as UsualTextArea,
  Row,
  Toggle as UsualToggle
} from '../common-components';

import {
  changeTaskDescription,
  checkTaskDescription,
  saveTask,
  changeExecutorName,
  changePriority
} from '../../actions';

const Container = styled.div`
  width: 600px;
  margin: 50px auto;
  padding: 40px 25px 0 25px;
  overflow: overlay;
  z-index: 1000;
  text-align: center;
  position: relative;

  border: 1px solid transparent;
  background-color: #${props => (props.color ? props.color : 'f1c40f')};
  transform: rotate(${props => (props.deg ? props.deg : -3)}deg);
  border-radius: 0 0px 200px 7px/ 0 200px 15px 250px;
  color: #000000;

  @media only screen and (max-width: 425px) {
    width: 280px;
    margin: 20px auto;
    padding: 40px 5px 0 5px;
    transform: rotate(0deg);
  }
`;

const TextArea = styled(UsualTextArea)`
  color: #000000;
  border-color: #000000;

  &:focus {
    outline: none !important;
    background-color: #ffffff;
    color: #000000;
  }

  ::placeholder {
    color: #777777;
    font-size: 18px;
    font-weight: 400;
  }
`;

const Toggle = styled(UsualToggle)`
  color: #000000;
`;

const Input = styled(UsualInput)`
  color: #000000;
  border-color: #000000;

  &:focus {
    outline: none !important;
    background-color: #ffffff;
    color: #000000;
  }

  ::placeholder {
    color: #000000;
    font-size: 18px;
    font-weight: 400;
  }
`;

const Button = styled(UsualButton)`
  border: 2px solid #000000;
  color: #000000;
`;

const SelectWrapper = styled.div`
  position: relative;
  font-family: 'Indie Flower', cursive;
`;
const Select = styled.select`
  display: none;
`;

const Option = styled.div`
  color: #000000;
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
  border: 1px solid #000000;

  @media only screen and (max-width: 425px) {
    width: 270px;
  }
`;

const ToggleRow = styled(Row)`
  justify-content: center;
  margin-bottom: 20px;
  position: absolute;
  top: 10px;
`;

const TaskForm = ({
  description,
  descriptionError,
  checkTaskDescription,
  changeTaskDescription,
  saveTask,
  executor,
  changeExecutorName,
  projectTeam,
  priority,
  changePriority,
  color,
  deg
}) => (
  <Container
    onClick={e => {
      e.stopPropagation();
    }}
    deg={deg}
    color={color}
  >
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
    <ToggleRow>
      <Toggle selected={priority === ''} onClick={() => changePriority('')}>No priority</Toggle>
      <Toggle selected={priority === 'low'} onClick={() => changePriority('low')}>Low</Toggle>
      <Toggle selected={priority === 'middle'} onClick={() => changePriority('middle')}>Middle</Toggle>
      <Toggle selected={priority === 'high'} onClick={() => changePriority('high')}>High</Toggle>
    </ToggleRow>
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
    ],
    priority: state.tasks.priority,
    color: state.tasks.color,
    deg: state.tasks.deg
  }),
  {
    changeTaskDescription,
    checkTaskDescription,
    saveTask,
    changeExecutorName,
    changePriority
  }
)(TaskForm);
