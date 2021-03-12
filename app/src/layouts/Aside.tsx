import React from 'react';
import styled, { keyframes } from 'styled-components';


const wideIn = keyframes`
  0% {
    max-width: 0;    
  }
  100% {
    max-width: 100%;
  }
`

const AsideContainer = styled.div`
  display: flex;
  flex-flow: row;
  .content {
    background-color: ${({ theme }) =>  theme.color.fg.default };
  }
  .aside {
    animation: 1s ${wideIn} ease-in-out;
    > div {
      width: 350px;
      padding: 0 2rem;
    }
  }
`

const Aside: React.FC<any> = React.forwardRef(({ children, aside, showAside }, ref) => {
  return (
    <AsideContainer ref={ref}>
      <div className="content">
        {children}
      </div>
      {showAside && <div className="aside">
        <div>{aside}</div>
      </div>}
    </AsideContainer>
  )
})


export default Aside;
