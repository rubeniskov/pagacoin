import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SidebarList from './SidebarList';
import SidebarListItem from './SidebarListItem';
import clsx from 'clsx';

export type menuItems = {
  icon: React.FC<any>
  path: string,
  label: string,
}

export type sidebarMenuItemProps = menuItems;

const SidebarMenuItem: React.FC<sidebarMenuItemProps> = ({ path, icon: Icon, label }) => {
  const { pathname } = useLocation();
  return (<SidebarListItem className={clsx({ active: pathname === path || (path !== '/' && pathname.indexOf(path)) === 0})}><Link className="link" to={path}><Icon className="icon"/> {label}</Link></SidebarListItem>);
}

export type  sidebarMenuProps = {
  items: menuItems
}

const SidebarMenu: React.FC<sidebarMenuProps>  = ({ items, className }) => {
  const menuItems = useMemo(() => items.map((itemProps) => <SidebarMenuItem key={itemProps.path} {...itemProps}/>), [items])
  return (
    <SidebarList className={className}>
      {menuItems}
    </SidebarList>
  );
}

export default SidebarMenu;
