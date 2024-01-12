import React from 'react';
import FullPageCollage from '../../images/full_page_collage.png'
import FriendCollage from '../../images/friend_collage.png'

const imageStyle = {
    maxWidth: '100%',
    height: 'auto',
    
    marginTop: '10px',
    marginBottom: '0px',
    textAlign: 'left'
};

const captionStyle = {
    fontSize: '14px', 
    textAlign: 'center', 
    marginTop: '5px'
};

function BodyLangCollageWriting() {
    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{marginBottom: '10px'}}>Body Language: A Collaborative Collage (2023)</h2>
            <div className='paragraphSection'>
                <p>
                    Utilizing web sockets to enable real-time interaction, <i>Body Language</i> is a collaborative collage platform for virtual rendezvous, digital puppetry, and image-oriented anonymous semantic cooperation.
                </p>
                <p className="linkStyleBreak" style={{marginTop: '20px'}}>Live at <a href="https://freewaterhouse.com/collage">https://freewaterhouse.com/collage</a></p>
            </div>
            <figure>
                <img src={FullPageCollage} alt="Full page collage" style={imageStyle} />
                <figcaption style={captionStyle}>
                    Collage created by anonymous individuals in response to a request to contribute images of food and guests
                </figcaption>
            </figure>
            <br></br>
            <figure>
                <img src={FriendCollage} style={{width: "80%"}} alt="Full page collage"/>
                <figcaption style={captionStyle}>
                    Made by my friend Alayt and I
                </figcaption>
            </figure>

        </div>
    );
}

export default BodyLangCollageWriting;
