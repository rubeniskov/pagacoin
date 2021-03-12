import styled from 'styled-components';

const TabHeaderButton = styled.button`
  background-color: transparent;
  border: none;
  display: block;
  width: 100%;
  cursor: pointer;
  outline: none;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-color: #efefef;
  font-size: 1rem;
  padding: 0.5rem;
  &:active, &:focus, &:target {
    color: ${({ theme }) =>  theme.color.primary.lighten };
  }
  &.actived {
    color: ${({ theme }) =>  theme.color.primary.default };
    border-color: ${({ theme }) =>  theme.color.primary.default };
  }
`

export default TabHeaderButton;
