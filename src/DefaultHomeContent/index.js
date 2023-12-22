import React from 'react';
import DnaImage from '../images/dna.png';


function DefaultHomeContent() {
    return (
        <div>
            <img src={DnaImage} alt="DNA" style={{height: "400px"}}/>
        </div>
    );
}

export default DefaultHomeContent;
