import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function FileDepolarizer() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [terminalOutput, setTerminalOutput] = useState([]);

    ////////////// DRAG AND DROP //////////////

    const onDrop = useCallback((acceptedFiles) => {
        // Select the first file from the dropped files
        if (acceptedFiles.length) {
            setSelectedFile(acceptedFiles[0]);
            setUploadProgress(0); // Reset progress on new file selection
        }
    }, []);

    const clearSelection = (event) => {
        event.stopPropagation(); // Prevent the event from propagating to the parent
        // without stopping the event propagation, clicking the x would not only trigger clearSelection
        // but also the click handler that is brough in by ...getRootProps()
        setSelectedFile(null);
        setUploadProgress(0); // Reset progress on clearing selection

    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        noClick: !!selectedFile // Disable click if there's a selected file
    });

    // Dynamically adjust the cursor style based on whether a file is selected
    const dynamicDropzoneStyle = {
        ...dropzoneStyle,
        ...(selectedFile ? selectedFileStyle : {}),
        cursor: selectedFile ? 'default' : 'pointer'
    };

    ////////////// UPLOADING / TERMINAL //////////////

    // Function to create a text-based progress bar
    const renderProgressBar = (progress) => {
        const totalBars = 20; // Total number of bars in the progress bar
        const filledBars = Math.round((progress / 100) * totalBars);
        const emptyBars = totalBars - filledBars;
        return `[${'#'.repeat(filledBars)}${'.'.repeat(emptyBars)}] ${progress}%`;
    };

    const renderTerminalOutput = () => {
        return terminalOutput.map((line, index) => <div key={index}>{line}</div>);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const url = 'http://localhost:5001/upload';

        setTerminalOutput(oldOutput => [...oldOutput, `Uploading file: ${selectedFile.name}`])

        // Initialize the progress bar with 0% completion
        setTerminalOutput(oldOutput => [...oldOutput, renderProgressBar(0)]);

        axios.post(url, formData, {
            onUploadProgress: progressEvent => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted); 
                setTerminalOutput(oldOutput => {
                    const newOutput = [...oldOutput];
                    newOutput[newOutput.length - 1] = renderProgressBar(percentCompleted);
                    return newOutput;
                });
            }
        })
            .then(response => {
                setTerminalOutput(oldOutput => [...oldOutput, `Upload complete: ${response.data.message}`]);
            })
            .catch(error => {
                setTerminalOutput(oldOutput => [...oldOutput, `Failed to upload file: ${error.message}`]);
            });
    };

    return (
        // Spread syntax allows all the properties and event handlers brought in by the getRootProps() function
        // to be assigned all at once, instead of setting onClick=, onDragEnter=, onDragOver=.... and so on
        <div>
            <div {...getRootProps()} style={dynamicDropzoneStyle}>
                <input {...getInputProps()} />
                {
                    selectedFile ? (
                        <div>
                            <span>{selectedFile.name}</span>
                            <button onClick={clearSelection} style={clearButtonStyle}>X</button>
                            <button onClick={handleUpload}>Upload</button>
                        </div>
                    ) : (
                        isDragActive ? <p>Drop the file here...</p> : <p>Drag & drop a file here, or click to select a file</p>
                    )
                }
            </div>
            <div style={terminalStyle}>
                {renderTerminalOutput()}
            </div>
        </div>

    );
}

const dropzoneStyle = {
    border: '2px dashed #007bff',
    borderRadius: '5px',
    padding: '20px',
    textAlign: 'center',
    color: '#007bff',
    transition: 'border .3s ease-in-out',
};

const selectedFileStyle = {
    border: '2px dashed #28a745', // Adjusted to include the full border definition
    backgroundColor: '#f0fff0'
};

const clearButtonStyle = {
    marginLeft: '10px',
    cursor: 'pointer',
    color: '#ff4d4d',
    border: 'none',
    backgroundColor: 'transparent',
};

const terminalStyle = {
    whiteSpace: 'pre-wrap',
    backgroundColor: '#000',
    color: '#fff',
    fontFamily: 'monospace',
    marginTop: '10px',
    padding: '10px',
};

export default FileDepolarizer;


