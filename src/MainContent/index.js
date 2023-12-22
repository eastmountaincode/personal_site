import React from 'react';
import DnaImage from '../images/dna.png'; // Adjust the path as necessary

function MainContent({ mainContentProp }) {
    return (
        <div className="main-content">
            {mainContentProp === "defaultContent" && <img src={DnaImage} alt="DNA" style={{height: "400px"}}/>}
            {mainContentProp === "content1" && <p>This is Content 1</p>}
            {mainContentProp === "content2" && <p>This is Content 2</p>}
        </div>
    );
}

export default MainContent;

