import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CollapsibleSidebarItem from '../CollapsibleSidebarItem';
import "./sidebar_style.css"

function Sidebar({}) {
  const [openStateSignal, setOpenStateSignal] = useState(false);
  const [triggerSignal, setTriggerSignal] = useState(0); // New state

  const expandAll = () => {
    setOpenStateSignal(true);
    setTriggerSignal(prev => prev + 1); // Increment the trigger
  };

  const collapseAll = () => {
    setOpenStateSignal(false);
    setTriggerSignal(prev => prev + 1); // Increment the trigger
  };

  return (
    <div style={{ textAlign: "left", padding: "10px" }}>

      <div className='name_header'>
        <Link to='/' className="sidebar-link-header">Andrew Boylan</Link>
      </div>
      
      <div className='sidebar_elements'>
        {/* PROJECTS */}
        <CollapsibleSidebarItem label="Projects" openStateSignal={openStateSignal} triggerSignal={triggerSignal}>
          <div style={{ display: "flex" }}>
            <span>➮</span>
            <Link to='/projects/bodyLanguageCollaborativeCollage' className="sidebar-link">Body Language: A Collaborative Collage</Link>
          </div>
          <div style={{ display: "flex" }}>
            <span>➮</span>
            <Link to='/projects/virtualLittleFreeLibrary' className="sidebar-link">Virtual Little Free Library</Link>
          </div>
        </CollapsibleSidebarItem>

        {/* RESOURCES AND TOOLS */}
        <CollapsibleSidebarItem label="Resources / Tools" openStateSignal={openStateSignal} triggerSignal={triggerSignal}>
          <div style={{ display: "flex" }}>
            <span>➮</span>
            <Link to='/resources_tools/fileDepolarizer' className="sidebar-link">File Depolarizer</Link>
          </div>
        </CollapsibleSidebarItem>

        {/* BIOINFORMATICS */}
        <CollapsibleSidebarItem label="Bioinformatics" openStateSignal={openStateSignal} triggerSignal={triggerSignal}>
          <div style={{ display: "flex" }}>
            <span>➮</span>
            <Link to='/bioinformatics/autoTrinity' className="sidebar-link">AutoTrinity (Transcriptome assembly pipeline)</Link>
          </div>
        </CollapsibleSidebarItem>

        {/* ABOUT */}
        <CollapsibleSidebarItem label="About" openStateSignal={openStateSignal} triggerSignal={triggerSignal}>
          <div style={{ display: "flex" }}>
            <span>➮</span>
            <Link to='/about/bio' className="sidebar-link">Bio</Link>
          </div>
          <div style={{ display: "flex" }}>
            <span>➮</span>
            <Link to='/about/links' className="sidebar-link">Links</Link>
          </div>
        </CollapsibleSidebarItem>

      </div>

      <div className='collapse_expand_buttons' 
        style={{display: "flex",
          flexDirection: "column", 
          width: "100px",
          paddingTop: "20px"}}>
        <button style={{marginBottom: "7px"}} onClick={expandAll}>Expand All</button>
        <button onClick={collapseAll}>Collapse All</button>
      </div>

    </div>
  );
}

export default Sidebar;
