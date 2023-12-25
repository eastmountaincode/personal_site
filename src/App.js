import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './Sidebar';
import WhatsGoingOn from './WhatsGoingOn';
import FreeLittleLibraryWriting from './projects/FreeLittleLibraryWriting';
import BodyLangCollageWriting from './projects/BodyLangCollageWriting'

import DefaultHomeContent from './DefaultHomeContent'

function App() {
  return (
    <Router>
      <div className="App" style={{ display: "flex", height: "100vh" }}>
          {/* SIDEBAR */}
          <div style={{ width: "30%" }}>
            <Sidebar />
          </div>

          {/* MAIN CONTENT */}
          <div style={{ width: "50%" }}>
            <Routes>
              <Route path="/" element={<DefaultHomeContent />} />
              <Route path="/projects/virtualLittleFreeLibrary" element={<FreeLittleLibraryWriting/>} />
              <Route path="/projects/bodyLanguageCollaborativeCollage" element={<BodyLangCollageWriting />} />
            </Routes>
          </div>

          {/* WHAT'S GOING ON? */}
          <div style={{ width: "20%" }}>
            <WhatsGoingOn />
          </div>
      </div>
    </Router>
  );
}

export default App;
