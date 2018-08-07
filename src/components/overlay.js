import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0,0,0,0.5);
`;

const Overlay = ({ children, close }) => (
  <Container onClick={close}>
    {children}
  </Container>
)

export default Overlay;
