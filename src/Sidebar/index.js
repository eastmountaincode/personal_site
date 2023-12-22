import React from 'react';
import CollapsibleSidebarItem from '../CollapsibleSidebarItem';

function Sidebar({ selectSidebarOption }) {
  return (
    <div className="sidebar" style={{textAlign: "left"}}>
      <div className='name_header'>
        <span>Andrew Boylan</span>
      </div>
      <div className='sidebar_elements'>
        <CollapsibleSidebarItem label="Projects">
          <p>hello</p>
        </CollapsibleSidebarItem>

        <CollapsibleSidebarItem label="Resources & Tools">
          <p>tool</p>
        </CollapsibleSidebarItem>

        <CollapsibleSidebarItem label="Bioinformatics">
        </CollapsibleSidebarItem>

        <CollapsibleSidebarItem label="Music">
        </CollapsibleSidebarItem>

        <CollapsibleSidebarItem label="About">
        </CollapsibleSidebarItem>
      </div>
    </div>
  );
}

export default Sidebar;

