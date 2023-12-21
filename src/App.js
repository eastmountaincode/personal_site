import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import WhatsGoingOn from './WhatsGoingOn';

function App() {
  const [mainContentState, setMainContentState] = useState("defaultContent");

  const handleSidebarChange = (newContent) => {
    setMainContentState(newContent);
  };

  return (
    <div className="App" style={{ display: "flex", height: "100vh" }}>
        <div style={{ width: "20%" }}> {/* Adjusted for Sidebar */}
          <Sidebar selectSidebarOption={handleSidebarChange} />
        </div>
        <div style={{ width: "60%" }}> {/* Adjusted for MainContent */}
          <MainContent mainContentProp={mainContentState} />
        </div>
        <div style={{ width: "20%" }}> {/* Adjusted for WhatsGoingOn */}
          <WhatsGoingOn />
        </div>
    </div>
  );
}

export default App;
