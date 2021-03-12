import React from 'react';
import styled from 'styled-components';

import SidebarMenu from './SidebarMenu';
import SidebarFooter from './SidebarFooter';
import SidebarHeader from './SidebarHeader';

import { Users } from '@styled-icons/feather';
import { Transfer, HomeAlt, Wallet } from '@styled-icons/boxicons-regular';

const items = [{
  icon: HomeAlt,
  label: 'Home',
  path: '/'
}, {
  icon: Users,
  label: 'Users',
  path: '/users'
}, {
  icon: Wallet,
  label: 'Wallets',
  path: '/wallets'
}, {
  icon: Transfer,
  label: 'Transactions',
  path: '/transactions'
}]

const SidebarContainer = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  width: ${({ theme }) =>  theme.size.sidebar.width };
  .menu {
    flex-grow: 1;
  }
`

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarHeader />
      <SidebarMenu className={"menu"} items={items} />
      <SidebarFooter />
    </SidebarContainer>
  )
}

export default Sidebar;
