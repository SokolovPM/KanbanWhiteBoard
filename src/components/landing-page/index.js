import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { toggleLoginForm } from '../../actions';

import Overlay from '../overlay';
import LoginPage from '../login-page';

import About from './about';

import bookIcon from './book.png';
import startupIcon from './startup.png';
import tripIcon from './trip.png';

const Header = styled.div`
  background-color: #509bfd;
  display: flex;
  justify-content: center;
  padding: 50px 20px;
`;

const Center = styled.div`
  margin: auto;
  text-align: center;
`;

const Title = styled.div`
  color: white;
  color: #${props => props.color ? props.color : 'ffffff'};
  font-size: 32px;
  font-weight: 700;
  text-align: center;
`;

const Button = styled(Title)`
  cursor: pointer;
  margin-top: 30px;
  border: 1px solid white;
  display: inline-block;
  padding: 5px 50px;
  border-radius: 5px;
`;

const Content = styled.div`
  background-color: white;
  padding: 50px 20px;

  @media only screen and (max-width: 425px) {
    padding: 30px 0;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Sticker = styled.div`
  height: 200px;
  width: 250px;
  border: 1px solid transparent;
  margin: 20px auto;
  padding: 20px;
  white-space: pre-line;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 32px;

  transform: rotate(${props => (props.deg ? props.deg : 0)}deg);
  background-color: #${props => (props.color ? props.color : 'f1c40f')};
  border-radius: 0 0px 200px 7px/ 0 200px 15px 250px;

  @media only screen and (max-width: 768px) {
    margin: 20px auto;
    width: 200px;
    height: 170px;
    font-size: 24px;
  }
`;

const BoardTitle = styled(Title)`
  color: #509bfd;
  width: 250px;
  margin: 10px auto;
  background-color: #ffffff;
  text-align: center;

  @media only screen and (max-width: 768px) {
    margin: 10px auto;
  }
`;

const Free = styled(Sticker)`
  font-size: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Plans = styled.div`
  display: flex;
  background-color: #ffffff;
  justify-content: center;
  padding: 50px 20px;
`;

const News = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  padding: 50px 20px;
`;

const Article = styled.div``;

const Run = styled.div`
  text-align: center;
  font-size: 24px;

  &:hover {
    background-color:
  }
`;

const Date = styled.span`
  color: grey;
`;

const Hr = styled.hr`
  border: 1px solid #509bfd;
  margin: 0;
`;

const Column = styled.div`
  min-width: 300px;
  width: 33%;

  @media only screen and (max-width: 425px) {
    margin: auto;
  }

  @media only screen and (min-width: 768px) {
    min-width: unset;
  }
`;

const ColumnRow = styled(Row)`
  @media only screen and (max-width: 425px) {
    flex-wrap: wrap;
  }
`;

const LongSticker = styled(Sticker)`
  font-size: 18px;
  text-align: left;

  @media only screen and (min-width: 320px) {
    font-size: 16px;
  }
`;

const Description = styled.div`
  background-color: #ffffff;
  padding: 50px 20px 0 20px; 

  @media only screen and (max-width: 425px) {
    padding: 30px 0;
  }
`;

const Text = styled.div`
  padding: 0 100px;
  font-size: 22px;
  margin-bottom: 20px;

  @media only screen and (max-width: 425px) {
    padding: 5px;
  }
`;

const Image = styled.img`
  margin: 0 20px;
`;

const LandingPage = ({
  showLoginForm,
  toggleLoginForm
}) => (
  <div>
    {showLoginForm && (
      <Overlay close={toggleLoginForm}>
        <LoginPage close={toggleLoginForm} />
      </Overlay>
    )}
    <div>
    </div>
    <Header>
      <Center>
        <Title>So much plans and ideas...</Title>
        <Title>need a place where all tasks can be recorded?</Title>
        <Title style={{ margin: '30px 0', fontSize: '46px' }}>KANBAN WHITE BOARD!</Title>
        <Button onClick={toggleLoginForm}>LOG IN</Button>
      </Center>
    </Header>
    <Description>
      <Text>{`This is a simple Kanban board implementation to use for small
        or private projects when there are no many participants in the team.
        Simple design and ease of use help you create tasks fast without
        many useless steps and useless info. You see only that you need to
        see - description of task, executor and a priority.`}
      </Text>
      <Text>{`You can create a project just for yourself or invite some people
        to join you. You could be invited in some project - in this case you
        get an email (if you are not registered) or you will see the new
        project in your project list.`}
      </Text>
      <Text>
        {`You can create a project for everything when you need to keep set of tasks`}
      </Text>
      <Text>
        <Image src={startupIcon} alt="startup" />
        {`you want to run a small startup with friends`}
      </Text>
      <Text>
        <Image src={tripIcon} alt="startup" />
        {`you want to plan the trip and don't want to forget something`}
      </Text>
      <Text>
        <Image src={bookIcon} alt="startup" />
        {`you want to write a historical novel and you need to read dozens of articles and books`}
      </Text>
      <Title color={'509bfd'}>This online Kanban board will help you!</Title>
    </Description>
    <About toggleLoginForm={toggleLoginForm} />
    <Hr />
    <Content>
      <Center>
        <ColumnRow>
          <Column>
            <BoardTitle>TO DO</BoardTitle>
            <Sticker deg={5} color={'f1c40f'}>
              minimalistic and nice design to not be distracted
            </Sticker>
            <Sticker deg={-4} color={'1586ff'}>
              invite different people to different projects
            </Sticker>
          </Column>
          <Column>
            <BoardTitle>IN PROGRESS</BoardTitle>
            <LongSticker deg={-3} color={'85FF05'}>
              it is just a place for your plans:<br />
              - travel to London with family<br />
              - write a book<br />
              - create a startup with your friends<br />
              - just  keep here all tasks you want to do
            </LongSticker>
            <Free deg={0} color={'FF50A8'}>
              it is FREE!
            </Free>
          </Column>
          <Column>
            <BoardTitle>DONE</BoardTitle>
            <Sticker deg={1} color={'ff4a4a'}>
              add your own projects or join to other projects
            </Sticker>
          </Column>
        </ColumnRow>
      </Center>
    </Content>

    <Hr />
    <News>
      <Center>
        <Title color={'509bfd'}>News</Title>
        <Article>
          <Run><Date>(09.10.2018)</Date> We've just run this project!</Run>
        </Article>
      </Center>
    </News>
    <Hr />
    <Content>
        <Title color={'509bfd'}>OUR PLANS</Title>
        <ColumnRow>
          <Column>
            <BoardTitle>TO DO</BoardTitle>
            <Sticker deg={5} color={'FF50A8'}>
              task history
            </Sticker>
            <Sticker deg={-4} color={'1586ff'}>
              add subtasks
            </Sticker>
            <Sticker deg={1} color={'f1c40f'}>
              add sprints
            </Sticker>
          </Column>
          <Column>
            <BoardTitle>IN PROGRESS</BoardTitle>
            <Sticker deg={-2} color={'85FF05'}>
              markdown support
            </Sticker>
          </Column>
          <Column>
            <BoardTitle>DONE</BoardTitle>
          </Column>
        </ColumnRow>
    </Content>
  </div>
)

export default connect(
  state => ({
    showLoginForm: state.authorization.showLoginForm
  }),
  {
    toggleLoginForm
  }
)(LandingPage);
