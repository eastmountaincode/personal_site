import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
let socket;

function FileDepolarizer() {
    const defaultTerminalOutput = [
    'Depolarizer Terminal v1.0.1',
    '----------------------------------']

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [terminalOutput, setTerminalOutput] = useState(defaultTerminalOutput);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [depolarizedFileName, setDepolarizedFileName] = useState('');


    const MAX_FILE_SIZE = 300 * 1024 * 1024; // 300 MB in bytes

    // Establish WebSocket and listeners
    useEffect(() => {
        socket = io('http://localhost:5001')

        socket.on('processing_error', error => {
            setTerminalOutput(oldOutput => [...oldOutput, `Processing Error: ${error.error}`]);
        });
    
        socket.on('first_5_binary', data => {
            setTerminalOutput(oldOutput => [...oldOutput, `Head: ${data.data}`]);
        });

        socket.on('reading_file', () => {
            setTerminalOutput(oldOutput => [...oldOutput, "Reading file..."])
        });

        socket.on('initiating_depolarization', () => {
            setTerminalOutput(oldOutput => [...oldOutput, `Initiating depolarization...`]);
        });

        socket.on('complete_message', () => {
            setTerminalOutput(oldOutput => [...oldOutput, '~~~ DEPOLARIZATION COMPLETE ~~~']);
        });

        socket.on('flipping_bits_status', () => {
            setTerminalOutput(oldOutput => [...oldOutput, "Flipping bits..."])
        });

        socket.on('file_ready', data => {
            const downloadLink = data.download_url;
            setDownloadUrl(downloadLink);
            setTerminalOutput(oldOutput => [...oldOutput, `File is ready for download. It will remain available for 60 seconds.`]);

            // Extract filename from URL
            const urlParts = downloadLink.split('/');
            const fileName = urlParts[urlParts.length - 1];
            setDepolarizedFileName(fileName);
        });

        return () => socket.disconnect();
    }, []);

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
        setTerminalOutput(defaultTerminalOutput)
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
                const filename = selectedFile.name;
                socket.emit('start_processing', { filename });
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

    const downloadFile = () => {
        if (!downloadUrl) return;

        axios.get(downloadUrl, { responseType: 'blob' })
            .then(response => {
                // Create a blob link to download
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', depolarizedFileName);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch(error => {
                let errorMessage = "Failed to download file: ";
            
                // Check if the error response exists and has a status code of 404
                if (error.response && error.response.status === 404) {
                    // Attempt to use the custom error message from the server
                    errorMessage += error.response.data.error || "File not found or has expired. Refresh and try again.";
                } else if (error.message) {
                    errorMessage += `${error.message}`;
                } else {
                    errorMessage += "An unknown error occurred.";
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
            <div style={{marginTop: "10px", textAlign: "left"}}>
                <button onClick={downloadFile} disabled={!downloadUrl}>Download Depolarized File</button>
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
    textAlign: 'left',

    minWidth: '370px',
    minHeight: '215px'
};

export default FileDepolarizer;


