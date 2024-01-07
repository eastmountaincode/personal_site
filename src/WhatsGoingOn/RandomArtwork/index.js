import React, { useState, useEffect } from 'react';

function RandomArtwork() {
    const [artworkDetails, setArtworkDetails] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchArtwork = async () => {
            try {
                const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects');
                const data = await response.json();
                if (data && data.objectIDs && isMounted) {
                    while (isMounted) {
                        const randomIndex = Math.floor(Math.random() * data.total);
                        const randomArtworkId = data.objectIDs[randomIndex];
                        const artworkResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomArtworkId}`);
                        const artworkData = await artworkResponse.json();
                        if (artworkData.primaryImageSmall) {
                            setArtworkDetails(artworkData);
                            break;
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching artwork details: ', error);
            }
        };

        fetchArtwork();

        return () => {
            isMounted = false;
        };
    }, []);

    if (!artworkDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{padding: "10px"}}>
            <p>Random Artwork from<br/> The Met</p>
            {artworkDetails.primaryImageSmall && (
                <a href={artworkDetails.objectURL} target="_blank" rel="noopener noreferrer">
                    <img src={artworkDetails.primaryImageSmall} alt={artworkDetails.title} style={{ maxWidth: "80%" }} />
                </a>
            )}
            <p>{artworkDetails.title ? `Title: ${artworkDetails.title}` : ''}</p>
            <p>{artworkDetails.artistDisplayName ? `Artist: ${artworkDetails.artistDisplayName}` : ''}</p>

        </div>
    );
}

export default RandomArtwork;

