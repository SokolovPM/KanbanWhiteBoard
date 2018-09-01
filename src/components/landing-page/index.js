import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { toggleLoginForm } from '../../actions';

import Overlay from '../overlay';
import LoginPage from '../login-page';

const Header = styled.div`
  height: 300px;
  background-color: #509bfd;
  display: flex;
  justify-content: center;
`;

const Center = styled.div`
  margin: auto;
  text-align: center;
`;

const Title = styled.div`
  color: white;
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
  padding: 20px;
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
  text-align: left;
  padding: 20px;
  white-space: pre-line;

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
`;

const Free = styled(Sticker)`
  font-size: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Features = styled.div`
  display: flex;
  background-color: #509bfd;
  justify-content: center;
  padding: 20px;
`;

const News = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  padding: 20px;
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
        <Button onClick={toggleLoginForm}>LOG IN</Button>
      </Center>
    </Header>
    <Content>
      <Center>
        <Row>
          <BoardTitle>TO DO</BoardTitle>
          <BoardTitle>IN PROGREE</BoardTitle>
          <BoardTitle>DONE</BoardTitle>
        </Row>
        <Row>
          <Sticker deg={5} color={'f1c40f'}>
            text of some task, pretty long I guess to be just in one string
          </Sticker>
          <Sticker deg={-3} color={'85FF05'}></Sticker>
          <Sticker deg={1} color={'ff4a4a'}></Sticker>
        </Row>

        <Row>
          <Sticker deg={5} color={'FF50A8'}>
            text of some task, pretty long I guess to be just in one string
          </Sticker>
          <EmptySticker deg={-3} color={'85FF05'}></EmptySticker>
          <Sticker deg={1} color={'1586ff'}></Sticker>
        </Row>
      </Center>
    </Content>
    <Features>
      <Center>
        <Title>Features</Title>
        <Row>
          <Sticker deg={5} color={'f1c40f'}>
            minimalistic and nice design to not be distracted
          </Sticker>
          <Sticker deg={-3} color={'85FF05'}>
          it is just a place for your plans:<br />
          - travel to London with family<br />
          - write a book<br />
          - create a startup with your friends<br />
          - just  keep here all tasks you want to do
          </Sticker>
          <Sticker deg={1} color={'ff4a4a'}>
            add your own projects, join to other projects
          </Sticker>
        </Row>
        <Row>
          <Sticker deg={5} color={'f1c40f'}>
            invite different people to different projects
          </Sticker>
          <Free deg={-3} color={'85FF05'}>
            it is FREE!
          </Free>
          <EmptySticker deg={1} color={'ff4a4a'} />
        </Row>
      </Center>
    </Features>
    <News>
      <Center>
        <BoardTitle>News</BoardTitle>
        <Article>
          <Run><Date>(09.10.2018)</Date> We've just run this project!</Run>
        </Article>
      </Center>
    </News>
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
