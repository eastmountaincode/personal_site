import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './Sidebar';
import WhatsGoingOn from './WhatsGoingOn';
import FreeLittleLibraryWriting from './projects/FreeLittleLibraryWriting';
import BodyLangCollageWriting from './projects/BodyLangCollageWriting'
import FileDepolarizer from './resources_tools/FileDepolarizer';

import DefaultHomeContent from './DefaultHomeContent'
import AutoTrinityWriting from './bioinformatics/AutoTrinityWriting';
import BioWriting from './about/BioWriting';

function App() {
  return (
    <Router>
      <div className="App" style={{ display: "flex", height: "100vh" }}>

        {/* SIDEBAR */}
        <div className="sidebar" style={{ border: "1px solid red" }}>
          <Sidebar />
        </div>

        {/* MAIN CONTENT */}
        <div className="main-content" style={{ border: "1px solid red" }}>
          <Routes>
          <Route path="/" element={<DefaultHomeContent />} />
            <Route path="/projects/virtualLittleFreeLibrary" element={<FreeLittleLibraryWriting />} />
            <Route path="/projects/bodyLanguageCollaborativeCollage" element={<BodyLangCollageWriting />} />
            <Route path="/resources_tools/fileDepolarizer" element={<FileDepolarizer />} />
            <Route path="/bioinformatics/autoTrinity" element={<AutoTrinityWriting />} />
            <Route path="/about/bio" element={<BioWriting />} />

          </Routes>
        </div>

        {/* WHAT'S GOING ON? */}
        <div className="whats-going-on" style={{ border: "1px solid red" }}>
          <WhatsGoingOn />
        </div>
      </div>
    </Router>
  );
}



export default App;


