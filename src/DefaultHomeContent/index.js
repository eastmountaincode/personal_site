import React from 'react';
import DnaImage from '../images/dna.png';


function DefaultHomeContent() {
    return (
        <div style={{padding: "10px"}}>
            <img src={DnaImage} alt="DNA" style={{height: "400px"}}/>
        </div>
    );
}

export default DefaultHomeContent;
