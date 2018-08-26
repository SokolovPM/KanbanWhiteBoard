import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
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
    top: 29px;
    left: 0;
    background-color: #ffffff;
    width: 100%;
    box-sizing: border-box;
  }

  &:hover div {
      display: block;
      & p {
        color: inherit;
        display: block;
        &:hover {
          background-color: grey;
        }
      }
  }
`;

const UserInfo = ({
  name,
  email,
  logout
}) => (
  <Container>
    <span>{`${name} (${email})`}</span>
    <div>
        <p>CHANGE FOTO</p>
        <p onClick={logout}>LOGOUT</p>
    </div>
</Container>
)

export default UserInfo;
