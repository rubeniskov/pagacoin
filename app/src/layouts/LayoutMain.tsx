// Core
import React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

const LayoutMainConatiner = styled.div`
  display: flex;
  flex-flow: row;
  &, & > *, & > * > * {
    min-height: 100vh;
    height: 100%; 
  }
  .sidebar {
    overflow: hidden;
  }
  .content {
    flex-grow: 1;
  }
  .compact {
    /* width: 50px; */
    li {
      padding: 1rem 20px;
    }
  }
`

const LayoutMain = ({ children, sidebar }) => {
  return (
    <LayoutMainConatiner>
        <div className={clsx('aside', 'sidebar', 'compact')}>{sidebar}</div>
        <div className="content">{children}</div>
    </LayoutMainConatiner>
  )
}

export default LayoutMain;
