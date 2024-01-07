import React from 'react';

function LinksWriting() {
    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '10px' }}>Links</h2>
            <p style={{ marginBottom: '40px' }}>Some links to interesting places on the internet</p>

            <ul style={{textAlign: "left"}}>
                <li>
                    <a href="https://everest-pipkin.com/" target="_blank" rel="noopener noreferrer">https://everest-pipkin.com/</a> - Inspiration and pathways to many things
                </li>
                <li>
                    <a href="https://blog.glyphdrawing.club/" target="_blank" rel="noopener noreferrer">https://blog.glyphdrawing.club/</a> - ASCII drawing tool
                </li>
                <li>
                    <a href="https://travle.earth/" target="_blank" rel="noopener noreferrer">https://travle.earth/</a> - Geography game
                </li>
                <li>
                    <a href="https://geohazards.earth.utah.edu/tones/redrocktones.html" target="_blank" rel="noopener noreferrer">https://geohazards.earth.utah.edu/tones/redrocktones.html</a> - "Measurements of ambient seismic vibration sped up 25X made audible"
                </li>
                <li>
                    <a href="https://github.com/public-apis/public-apis" target="_blank" rel="noopener noreferrer">https://github.com/public-apis/public-apis</a> - Public list of free APIs
                </li>
            </ul>
        </div>
    );
}

export default LinksWriting;
