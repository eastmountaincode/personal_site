import React from 'react';

function Sidebar({ selectSidebarOption }) {
  return (
    <div className="sidebar">
      <button onClick={() => selectSidebarOption("content1")}>Content 1</button>
      <button onClick={() => selectSidebarOption("content2")}>Content 2</button>
    </div>
  );
}

export default Sidebar;
