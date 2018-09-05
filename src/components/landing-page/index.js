import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { toggleLoginForm } from '../../actions';

import Overlay from '../overlay';
import LoginPage from '../login-page';

import About from './about';

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
  display: flex;
  justify-content: center;
  padding: 50px 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Sticker = styled.div`
  height: 200px;
  width: 250px;
  border: 1px solid transparent;
  margin: 10px 50px;
  padding: 20px;
  white-space: pre-line;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 32px;

  transform: rotate(${props => (props.deg ? props.deg : 0)}deg);
  background-color: #${props => (props.color ? props.color : 'f1c40f')};
  border-radius: 0 0px 200px 7px/ 0 200px 15px 250px;
`;

const EmptySticker = styled(Sticker)`
  background-color: transparent;
`;

const BoardTitle = styled(Title)`
  color: #509bfd;
  width: 250px;
  margin: 10px 70px;
  background-color: #ffffff;
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
    <About toggleLoginForm={toggleLoginForm} />
    <Hr />
    <Content>
      <Center>
        <Row>
          <BoardTitle>TO DO</BoardTitle>
          <BoardTitle>IN PROGRESS</BoardTitle>
          <BoardTitle>DONE</BoardTitle>
        </Row>
        <Row>
          <Sticker deg={5} color={'f1c40f'}>
            minimalistic and nice design to not be distracted
          </Sticker>
          <Sticker deg={-3} color={'85FF05'} style={{ fontSize: '18px', textAlign: 'left'}}>
          it is just a place for your plans:<br />
          - travel to London with family<br />
          - write a book<br />
          - create a startup with your friends<br />
          - just  keep here all tasks you want to do
          </Sticker>
          <Sticker deg={1} color={'ff4a4a'}>
            add your own projects or join to other projects
          </Sticker>
        </Row>
        <Row>
          <Sticker deg={-4} color={'1586ff'}>
            invite different people to different projects
          </Sticker>
          <Free deg={0} color={'FF50A8'}>
            it is FREE!
          </Free>
          <EmptySticker deg={2} color={'ff4a4a'} />
        </Row>
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
    <Plans>
      <Center>
        <Title color={'509bfd'}>OUR PLANS</Title>
        <Row>
          <BoardTitle>TO DO</BoardTitle>
          <BoardTitle>IN PROGRESS</BoardTitle>
          <BoardTitle>DONE</BoardTitle>
        </Row>
        <Row>
          <Sticker deg={5} color={'FF50A8'}>
            task history
          </Sticker>
          <Sticker deg={-2} color={'85FF05'}>
            markdown support
          </Sticker>
          <EmptySticker deg={2} color={'ff4a4a'} />
        </Row>
        <Row>
          <Sticker deg={-4} color={'1586ff'}>
            add subtasks
          </Sticker>
          <EmptySticker deg={1} color={'ff4a4a'} />
          <EmptySticker deg={1} color={'ff4a4a'} />
        </Row>
        <Row>
          <Sticker deg={1} color={'f1c40f'}>
            add sprints
          </Sticker>
          <EmptySticker deg={1} color={'ff4a4a'} />
          <EmptySticker deg={1} color={'ff4a4a'} />
        </Row>
      </Center>
    </Plans>
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
