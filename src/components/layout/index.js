import React from 'react'
import styled from 'styled-components';

import LoginPage from '../login-page';

const Content = styled.div`
`;

export const Layout = ({ children }) => (
  <div>
    <Content>
      <LoginPage />

    </Content>
  </div>
)
