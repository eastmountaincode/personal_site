import React from 'react';
import LittleLibraryScreenshot from '../../images/lending_library_screenshot.png'

function FreeLittleLibraryWriting() {

    const imageStyle = {
        maxWidth: '80%',
        height: 'auto',
        display: 'block', // Centers the image in the div
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px',
        marginBottom: '20px',
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '10px' }}>Virtual Little Free Library (2023)</h2>
            <div className='paragraphSection'>
                <p><i>Premise:</i></p>
                <ul>
                    <li>There are four boxes.</li>
                    <li>Users can add files to a box, or download files. </li>
                    <li>Downloading a file "removes" it from the box, and the file is deleted from the server.</li>
                </ul>
                <p>Live at <a href="https://freewaterhouse.com/library/lending_library.php">https://freewaterhouse.com/library/lending_library.php</a></p>
            </div>
            {/* <div className='paragraphSection'>
                <p>Inspired by the <a href="https://en.wikipedia.org/wiki/Little_Free_Library" target='_blank' rel='noopener noreferrer'>Free Little Library</a> project, Virtual Little Free Library is an experiment that asks, "What does digital artifact sharing look like through the lens of neighborhood book exchange?" In a time reckoning with NFT absurdity and notions of digital ownership, this project investigates whether a <a href="https://en.wikipedia.org/wiki/The_Work_of_Art_in_the_Age_of_Mechanical_Reproduction" target='_blank' rel="noopener noreferrer">Benjaminian aura</a> can be bestowed upon a digital file if:</p>
                <ul>
                    <li>Users know that downloading the file will cause it to be unavailable to other users.</li>
                    <li>Users come across a file in a way that is discontinuous with their own motives.</li>
                </ul>
            </div>
            <div className='paragraphSection'>
                <p>Finally, Virtual Little Free Library explores the notion of digital placemaking and public common and attempts to create opportunities for unforeseen outcomes.</p>
            </div> */}
            <img src={LittleLibraryScreenshot} alt="Virtual Little Free Library Screenshot" style={imageStyle} />
        </div>
    );
}

export default FreeLittleLibraryWriting;
