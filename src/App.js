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
import LinksWriting from './about/LinksWriting';

import { useState } from 'react';

function App() {
  return (
    <Router>
      <div className="App" style={{ backgroundColor: "whitesmoke" }}>

        {/* SIDEBAR */}
        <div className={`sidebar`}>
          <Sidebar />
        </div>

        {/* MAIN CONTENT */}
        <div className="main-content" style={{}}>
          <Routes>
            <Route path="/" element={<DefaultHomeContent />} />
            <Route path="/projects/virtualLittleFreeLibrary" element={<FreeLittleLibraryWriting />} />
            <Route path="/projects/bodyLanguageCollaborativeCollage" element={<BodyLangCollageWriting />} />
            <Route path="/resources_tools/fileDepolarizer" element={<FileDepolarizer />} />
            <Route path="/bioinformatics/autoTrinity" element={<AutoTrinityWriting />} />
            <Route path="/about/bio" element={<BioWriting />} />
            <Route path="/about/links" element={<LinksWriting />} />

          </Routes>
        </div>

        {/* WHAT'S GOING ON? */}
        <div className="whats-going-on" style={{}}>
          <WhatsGoingOn />
        </div>
      </div>
    </Router>
  );
}



export default App;


