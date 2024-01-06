import React from 'react';

function AutoTrinityWriting() {
    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{marginBottom: '10px'}}>AutoTrinity</h2>
            <div className='paragraphSection'>
                <p>
                    AutoTrinity is an automated pipeline for transcriptome assembly from raw RNA-seq data, based on the pipeline{' '}
                    <a href="https://web.archive.org/web/20221005185422/https://informatics.fas.harvard.edu/best-practices-for-de-novo-transcriptome-assembly-with-trinity.html">
                    outlined by the Harvard FAS informatics group here</a>.       
                </p>
                <p style={{marginTop: '20px'}}>Check it out on Github: <a href="https://github.com/eastmountaincode/AutoTrinity/tree/main">https://github.com/eastmountaincode/AutoTrinity</a></p>
            </div>
        </div>
    );
}

export default AutoTrinityWriting;
 