import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function FileDepolarizer() {
    const [selectedFile, setSelectedFile] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        // Select the first file from the dropped files
        if (acceptedFiles.length) {
            setSelectedFile(acceptedFiles[0]);
        }
    }, []);

    const clearSelection = (event) => {
        event.stopPropagation(); // Prevent the event from propagating to the parent
        // without stopping the event propagation, clicking the x would not only trigger clearSelection
        // but also the click handler that is brough in by ...getRootProps()
        setSelectedFile(null);
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

    return (
        // Spread syntax allows all the properties and event handlers brought in by the getRootProps() function
        // to be assigned all at once, instead of setting onClick=, onDragEnter=, onDragOver=.... and so on
        <div {...getRootProps()} style={dynamicDropzoneStyle}>
            <input {...getInputProps()} />
            {
                selectedFile ? (
                    <div>
                        <span>{selectedFile.name}</span>
                        <button onClick={clearSelection} style={clearButtonStyle}>X</button>
                    </div>
                ) : (
                    isDragActive ? <p>Drop the file here...</p> : <p>Drag & drop a file here, or click to select a file</p>
                )
            }
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
    borderColor: '#28a745',
    backgroundColor: '#f0fff0'
};

const clearButtonStyle = {
    marginLeft: '10px',
    cursor: 'pointer',
    color: '#ff4d4d',
    border: 'none',
    backgroundColor: 'transparent',
};

export default FileDepolarizer;


