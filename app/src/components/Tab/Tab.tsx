import React, { useMemo, useState, useCallback } from 'react';
import clsx from 'clsx';
import TabHeaderButton from './TabHeaderButton';
import TabHeader from './TabHeader';
import TabContent from './TabContent';


const Tab: React.FC<any> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleClick = useCallback((evt) => {
    setSelectedTab(Number(evt.target.id));
  }, []);
  
  const items = useMemo(() => React.Children.toArray(children), [children]);
  const labels = useMemo(() => items.map(({ props: { title }}) => title), [items]);
  const buttons = useMemo(() => labels.map((label, idx) => 
    <TabHeaderButton 
      onClick={handleClick} 
      className={clsx({ actived: selectedTab === idx })} 
      id={`${idx}`} 
      key={label}>{label}
    </TabHeaderButton>
  ), [labels, selectedTab]);

  return (
    <div>
      <TabHeader>
        {buttons}
      </TabHeader>
      <TabContent>
        {items[selectedTab]}
      </TabContent>
    </div>
  );
}

export default Tab;
