import { ReactNodeArray } from 'react';
import { matchPath } from 'react-router';


/**
 * Retrieve two arrays of nodes with the in and out bounds which matches with the pathname
 * @param nodes 
 * @param pathname 
 * @param max Max retrieved nodes
 * @returns 
 */
const boundNodesByPathname = (nodes: ReactNodeArray, pathname: string) => {
  const inbound = [];
  const outbound = [];
  let idx = nodes.length

  for (;idx--;) {
    const { props: { path } } = nodes[idx];
    if(matchPath(pathname, { path })) {
      inbound.unshift(nodes[idx]);
    } else {
      outbound.unshift(nodes[idx])
    };
  }
  return [inbound, outbound];
}

export default boundNodesByPathname;
