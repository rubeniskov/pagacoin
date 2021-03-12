import React from 'react';
import styled from 'styled-components';
import PagacoinLogo from '../../../assets/images/pagacoin-logo.png';


const SidebarHeaderCointainer = styled.div`
  margin: 30px 50px 20px 25px;
  .logo { 
    width: 100% 
  };
`
const SidebarHeader: React.FC<any> = ({ className }) => {
  return (
    <SidebarHeaderCointainer className={className}>
      <img className="logo" src={PagacoinLogo} />
    </SidebarHeaderCointainer>
  )
}

export default SidebarHeader;
