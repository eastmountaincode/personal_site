import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function FileDepolarizer() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [terminalOutput, setTerminalOutput] = useState([]);

    const MAX_FILE_SIZE = 300 * 1024 * 1024; // 300 MB in bytes

    ////////////// DRAG AND DROP //////////////

    const onDrop = useCallback((acceptedFiles) => {
        // Select the first file from the dropped files
        if (acceptedFiles.length) {
            setSelectedFile(acceptedFiles[0]);
            setUploadProgress(0); // Reset progress on new file selection
        }
    }, []);

    const clearSelectionWithXButton = (event) => {
        event.stopPropagation(); // Prevent the event from propagating to the parent
        // without stopping the event propagation, clicking the x would not only trigger clearSelectionWithXButton
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
        setTerminalOutput([])
        setSelectedFile(null);
        setUploadProgress(0);

        if (selectedFile.size > MAX_FILE_SIZE) {
            // If file size exceeds the limit, output an error and return
            setTerminalOutput(oldOutput => [...oldOutput, `Error: File too large. Maximum size is 300 MB.`]);
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);

        const url = 'http://localhost:5001/upload';

        setTerminalOutput(oldOutput => [...oldOutput, `Uploading file: ${selectedFile.name}`])
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

                // Convert hex to binary 
                const hexToBinary = hexString => hexString.split('').map(hexDigit =>
                    parseInt(hexDigit, 16).toString(2).padStart(4, '0')
                ).join('');

                const binaryDataHead = hexToBinary(response.data.data_head);
                const binaryDataHeadFlipped = hexToBinary(response.data.data_head_flipped);

                setTerminalOutput(oldOutput => [...oldOutput, `Depolarizing...`]);
                setTerminalOutput(oldOutput => [...oldOutput, `First 20 bytes in binary: ${binaryDataHead}`]);
                setTerminalOutput(oldOutput => [...oldOutput, `First 20 bytes after processing in binary: ${binaryDataHeadFlipped}`]);
            })
            .catch(error => {
                let errorMessage = "Failed to upload file: ";

                // Check if the response is available and has data
                if (error.response && error.response.data && error.response.data.error) {
                    errorMessage += error.response.data.error;
                } else if (error.message) {
                    // Fallback to a more generic error message
                    errorMessage += `${error.message}`;
                }

                setTerminalOutput(oldOutput => [...oldOutput, errorMessage]);
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
                            <button onClick={clearSelectionWithXButton} style={clearButtonStyle}>X</button>
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


