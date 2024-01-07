import React from 'react';
import DnaImage from '../images/dna.png'; // Adjust the path as necessary

function MainContent({ mainContentProp }) {
    return (
        <div className="main-content">
            {mainContentProp === "defaultContent" && <img src={DnaImage} alt="DNA" style={{height: "400px"}}/>}
        </div>
    );
}

export default MainContent;

