// Core
import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
// Hooks
import { useQuery } from '@apollo/client';
import { useRouteMatch, matchPath, generatePath } from 'react-router';
import useOutsideClick from '../hooks/useOutsideClick';
import { useHistory } from 'react-router';
// Queries
import { LIST_USERS } from '../apollo/queries';
// Components
import { Plus } from '@styled-icons/boxicons-regular';
import UserTable from '../components/User/UserTable';
import LinkButton from '../components/LinkButton';


const Jumbo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    color: white;
    border-radius: 50%;
    svg {
      width: 1rem;
    }
  }
`

const ViewUsers = () => {
  
  const layoutRef = useRef(null);
  const { push, location } = useHistory();
  const { path, isExact, ...rest } = useRouteMatch();

  const { loading, error, data } = useQuery(LIST_USERS);

  useOutsideClick(layoutRef, evt => {
    push(`${path}`);
  });
  
  const handleRowClick = useCallback((evt, row) => {
    push(`${path}/${row.id}`);
  }, [push, location]);

  const { params = {} } = matchPath(location.pathname, {
    path: `${path}/:userId`,
    exact: false,
    strict: false
  }) || {};

  
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.toString()}</p>;

  return (
    <div>
      <Jumbo>
        <h1>Users</h1>
        <LinkButton to={generatePath(`${path}/:userId`, { userId: 'create' })}><Plus /></LinkButton>
      </Jumbo>
      <UserTable 
        onRowClick={handleRowClick} 
        data={data.users}
        selectedRow={params.userId}
      />
    </div>
  )
}

export default ViewUsers;
