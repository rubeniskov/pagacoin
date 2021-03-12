import styled from 'styled-components';
import ListItem from '../List/ListItem';

const SidebarListItem = styled(ListItem)`
  padding: 1rem ${({ theme }) => theme.size.sidebar.margin};
  &.active {
    position: relative;
    color: ${({ theme }) => theme.color.primary.default};
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background-color: ${({ theme }) => theme.color.primary.default};
    }
  }
`

export default SidebarListItem;
