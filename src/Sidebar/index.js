import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CollapsibleSidebarItem from '../CollapsibleSidebarItem';
import "./sidebar_style.css"

function Sidebar({}) {
  let navigate = useNavigate();

  const handleSidebarItemClick = (itemRoute) => {
    navigate(`${itemRoute}`);
  };

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
        <p className="sidebar-link-header" onClick={() => handleSidebarItemClick('/')}>Andrew Boylan</p>
      </div>
      
      <div className='sidebar_elements'>
        {/* PROJECTS */}
        <CollapsibleSidebarItem label="Projects" openStateSignal={openStateSignal} triggerSignal={triggerSignal}>
          <div style={{ display: "flex" }}>
            <span>➮</span>
            <p className="sidebar-link" onClick={() => handleSidebarItemClick('/projects/bodyLanguageCollaborativeCollage')}>Body Language: A Collaborative Collage</p>
          </div>
          <div style={{ display: "flex" }}>
            <span>➮</span>
            <p className="sidebar-link" onClick={() => handleSidebarItemClick('/projects/virtualLittleFreeLibrary')}>Virtual Little Free Library</p>
          </div>
        </CollapsibleSidebarItem>

        {/* RESOURCES AND TOOLS */}
        <CollapsibleSidebarItem label="Resources / Tools" openStateSignal={openStateSignal} triggerSignal={triggerSignal}>
          <div style={{ display: "flex" }}>
            <span>➮</span>
            <p className="sidebar-link" onClick={() => handleSidebarItemClick('/resources_tools/fileDepolarizer')}>File Depolarizer</p>
          </div>
        </CollapsibleSidebarItem>

        {/* BIOINFORMATICS */}
        <CollapsibleSidebarItem label="Bioinformatics" openStateSignal={openStateSignal} triggerSignal={triggerSignal}>
          <div style={{ display: "flex" }}>
            <span>➮</span>
            <p className="sidebar-link" onClick={() => handleSidebarItemClick('/bioinformatics/autoTrinity')}>AutoTrinity (Transcriptome assembly pipeline)</p>
          </div>
        </CollapsibleSidebarItem>

        {/* ABOUT */}
        <CollapsibleSidebarItem label="About" openStateSignal={openStateSignal} triggerSignal={triggerSignal}>
          <div style={{ display: "flex" }}>
            <span>➮</span>
            <p className="sidebar-link" onClick={() => handleSidebarItemClick('/about/bio')}>Bio</p>
          </div>
          <div style={{ display: "flex" }}>
            <span>➮</span>
            <p className="sidebar-link" onClick={() => handleSidebarItemClick('/about/links')}>Links</p>
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

