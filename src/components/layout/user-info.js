import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  color: #509bfd;
  text-align: center;
  cursor: pointer;
  min-width: 100px;
  padding: 0 20px;
  position: relative;
  display: inline-block;
  font-size: 18px;

  & div {
    display: none;
    position: absolute;
    top: 25px;
    left: 0;
    background-color: #ffffff;
    width: 100%;
    box-sizing: border-box;
  }

  &:hover div {
    display: block;
    & span {
      margin: 10px 0;
      color: inherit;
      display: block;
      &:hover {
        background-color: grey;
      }
    }
  }
`;

const Image = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const UserInfo = ({ name, email, logout, changeFoto, foto }) => (
  <Container>
    {foto && <Image src={`/${foto}`} alt="" />}
    <Content>
      <span>{`${name} (${email})`}</span>
      <div>
        <span onClick={changeFoto} onKeyDown={() => {}}>
          CHANGE FOTO
        </span>
        <span onClick={logout} onKeyDown={() => {}}>
          LOGOUT
        </span>
      </div>
    </Content>
  </Container>
);

export default UserInfo;
