import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import usersIcon from './users.png';
import projectsIcon from './projects.png';


import {
  getAboutInfo
} from '../../actions';

const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  padding: 50px 20px;
`;

const Center = styled.div`
  margin: auto;
  text-align: center;
`;

const Title = styled.div`
  color: #509bfd;
  font-size: 32px;
  font-weight: 700;
`;

const Image = styled.img`
  margin: 0 20px;
`;

const Button = styled(Title)`
  cursor: pointer;
  margin-top: 30px;
  border: 1px solid #509bfd;
  display: inline-block;
  padding: 5px 50px;
  border-radius: 5px;
`;

class About extends Component {
  constructor(props) {
    super(props)
    this.props.getAboutInfo()
  }

  render () {
    const { info, toggleLoginForm } = this.props;
    return (
      <Container>
        <Center>
          <Title>WE ARE</Title>
          <Title>{
            `${info.projects || 0} projects`}
            <Image
              src={projectsIcon}
              alt="users"
            />
            and
            {` ${info.users || 0} users`}
            <Image
              src={usersIcon}
              alt="projects"
            />
          </Title>
          <Title>but we have just started</Title>
          <Button onClick={toggleLoginForm}>JOIN US!</Button>
        </Center>
      </Container>
    )
  }
}

export default connect(
  state => ({
    info: state.authorization.about
  }),
  {
    getAboutInfo
  }
)(About)
