import React from 'react';

function LinksWriting() {
    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '10px' }}>Links</h2>
            <p style={{ marginBottom: '40px' }}>Some links to interesting places on the internet</p>

            <ul style={{textAlign: "left"}}>
                <li>
                    <a href="https://everest-pipkin.com/">https://everest-pipkin.com/</a> - Inspiration and pathways to many things
                </li>
                <li>
                    <a href="https://blog.glyphdrawing.club/">https://blog.glyphdrawing.club/</a> - ASCII drawing tool
                </li>
                <li>
                    <a href="https://travle.earth/">https://travle.earth/</a> - Geography game
                </li>
                <li>
                    <a href="https://geohazards.earth.utah.edu/tones/redrocktones.html">https://geohazards.earth.utah.edu/tones/redrocktones.html</a> - "Measurements of ambient seismic vibration sped up 25X made audible"
                </li>
            </ul>
        </div>
    );
}

export default LinksWriting;
