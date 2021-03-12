import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LogOut } from '@styled-icons/boxicons-regular';
import SidebarList from './SidebarList';
import SidebarListItem from './SidebarListItem';
import PagacoinLogo from '../../../assets/images/pagantis-logo.png';

const SidebarFooterList = styled(SidebarList)`
  color: #d3d1d1;
  .logo {
    width: 100px;
  }
`

const SidebarFooter: React.FC<any> = () => (
  <SidebarFooterList>
      <SidebarListItem>
        <LogOut className='icon'/><Link to="/logout">logout</Link>
      </SidebarListItem>
      <SidebarListItem>
        <small>Powered by</small><br />
        <img className="logo" src={PagacoinLogo} />
      </SidebarListItem>
  </SidebarFooterList>
)

export default SidebarFooter;
