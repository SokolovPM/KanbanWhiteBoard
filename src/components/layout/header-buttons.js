import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  color: #509bfd;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  font-family: 'Indie Flower', cursive;
`;

const Text = styled.div`
  transform: rotate(${props => props.deg}deg);
  text-align: center;
`;
const Underline = styled.div`
  transform: rotate(${props => props.deg}deg);
  ${props =>
    props.toLeft ?
      `border-left: 120px solid transparent;
      border-right: 0px solid transparent;`
      :
      `border-left: 0px solid transparent;
      border-right: 120px solid transparent;`
  }
  border-top: 5px solid #509bfd94;
  wid
`;

export const LogoutButton = ({ callback }) => (
  <Container onClick={callback}>
    <Text deg={5}>LOGOUT</Text>
    <Underline deg={2} toLeft={true} />
  </Container>
)

export const HomeButton = ({ callback }) => (
  <Container onClick={callback}>
    <Text deg={-4}>HOME</Text>
    <Underline deg={3} toLeft={false}/>
  </Container>
)
