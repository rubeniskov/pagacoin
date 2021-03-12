//Core
import React, { Fragment, Children, ReactNodeArray } from 'react';
import styled from 'styled-components';
// Utils
import boundNodesByPathname from '../utils/boundNodesByPathname';
import { useHistory, useRouteMatch, Route, generatePath, matchPath } from 'react-router';
// Components
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { ArrowBack } from '@styled-icons/boxicons-regular';

const ViewRoutingContainer = styled.div`
  display: flex;
  flex-flow: column;
`

const ViewRoutingBreadcrumb = styled.div`
  position: absolute;
  bottom: 10px;
  font-size: 0.8rem;
  color: #c0c0c0;
  > * {
    padding: 1rem;
    /* margin: 10px 15px; */
  }
`

const ViewRoutingNav = styled.div`
  display: flex;
  flex-flow: row;
  align-items: stretch;
  > * {
    flex-grow: 1;
  };
`

const ViewRoutingBackButton = styled(Button)`
  position: absolute;
  border-radius: 50%;
  top: 0;
  transform: translate(-15px, 30px);
  svg {
    width: 1rem;
    height: 1rem;
  }
}
`

export const ViewRoutingRoute = ({ children, layout: Layout = Fragment, path, ...restProps }) => {
  return (
    <Route path={path}>
      <Layout {...restProps}>
        {children}
      </Layout>
    </Route>
  );
}

type ViewRoutingProps = {
  maxRoutingViews: number,
  children: ReactNodeArray
}

const ViewRouting: React.FC<ViewRoutingProps> = ({ children, maxRoutingViews = Infinity, maxRoutingShows = 2 }) => {
  const { location, push } = useHistory();
  // To bind the navigation changes
  useRouteMatch();
  const nodes = Children.toArray(children);
  const [inbound] = boundNodesByPathname(nodes, location.pathname);

  const prevNode = inbound[inbound.length - 2];
  const { url: prevUrlNode } = matchPath(location.pathname, {
    path: prevNode && prevNode.props.path
  }) || {};

  return (
    <ViewRoutingContainer>
      {prevUrlNode && <ViewRoutingBackButton onClick={(evt) => {
        push(prevUrlNode);
      }} style={{position: 'absolute'}}><ArrowBack /></ViewRoutingBackButton>}
      <ViewRoutingNav>
        {inbound.map(({ 
          props, 
          type: Component 
        }, idx, { 
          length 
        }) => <Component 
          key={idx} 
          {...props} 
          style={ idx < (length - maxRoutingShows) ? { 
          width: '0px',
          overflow: 'hidden',
          padding:0,
          margin: 0,
          flexGrow: '0',
        } : {}}
        />)}
      </ViewRoutingNav>
      <ViewRoutingBreadcrumb>
      {nodes.map(({ props: { path } }) => path).filter(Boolean).map((path, idx) => {
        const { url = '' } = matchPath(location.pathname, {
          path
        }) || {};

        if (!url)
        return null;
        return <>
          {idx === 0 ? null : '>'}
          <Link to={url}>{url.split(/\//).slice(-1)[0]}</Link>
        </>
      })}
      </ViewRoutingBreadcrumb>
    </ViewRoutingContainer>
  );
}

export default ViewRouting;
