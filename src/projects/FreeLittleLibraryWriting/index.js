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
            <div className='paragraphSection' style={{paddingBottom: "10px"}}>
                <p><i>Premise:</i></p>
                <ul>
                    <li>There are four boxes.</li>
                    <li>Users can add files to a box, or download files. </li>
                    <li>Downloading a file "removes" it from the box, and the file is deleted from the server.</li>
                </ul>
                <p className='linkStyleBreak'>
                    Live at <a href="https://freewaterhouse.com/library/lending_library.php">https://freewaterhouse.com/library/lending_library.php</a>
                </p>            
            </div>
            <img src={LittleLibraryScreenshot} alt="Virtual Little Free Library Screenshot" style={imageStyle} />
        </div>
    );
}

export default FreeLittleLibraryWriting;
