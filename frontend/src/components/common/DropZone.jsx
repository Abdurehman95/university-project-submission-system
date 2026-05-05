import React, { useState, useCallback } from 'react';
import { FiUploadCloud, FiFile, FiX, FiCheckCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const DropZone = ({ onFileSelect, accept = ".pdf,.zip,.rar", maxSize = 10 }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (selectedFile) => {
    setError('');
    
    // Check file type
    const fileExtension = '.' + selectedFile.name.split('.').pop().toLowerCase();
    const acceptedTypes = accept.split(',');
    if (!acceptedTypes.includes(fileExtension)) {
      setError(`Invalid file type. Accepted: ${accept}`);
      return false;
    }

    // Check file size (MB)
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File is too large. Max size: ${maxSize}MB`);
      return false;
    }

    return true;
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
      onFileSelect(droppedFile);
    }
  }, [accept, maxSize, onFileSelect]);

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      onFileSelect(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    onFileSelect(null);
  };

  return (
    <div className="dropzone-container">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="drop-area"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`drop-area ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <input
              type="file"
              id="fileInput"
              hidden
              accept={accept}
              onChange={handleFileInput}
            />
            <div className="upload-icon-wrapper">
              <FiUploadCloud size={40} />
            </div>
            <h3>Drag & drop your files here</h3>
            <p>or click to browse from computer</p>
            <span className="file-info">Supported: {accept} (Max {maxSize}MB)</span>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="upload-error"
              >
                {error}
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="file-preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="selected-file-card"
          >
            <div className="file-preview-icon">
              <FiFile size={30} />
            </div>
            <div className="file-details">
              <h4>{file.name}</h4>
              <p>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
            <div className="file-status">
              <FiCheckCircle color="var(--color-success)" size={20} />
            </div>
            <button className="remove-file-btn" onClick={removeFile}>
              <FiX />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .dropzone-container {
          width: 100%;
          margin: 1.5rem 0;
        }

        .drop-area {
          border: 2px dashed var(--color-glass-border);
          border-radius: 20px;
          padding: 3rem 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: var(--color-bg-primary);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .drop-area:hover, .drop-area.dragging {
          border-color: var(--color-accent-primary);
          background: var(--color-accent-soft);
          transform: translateY(-2px);
        }

        .upload-icon-wrapper {
          color: var(--color-accent-primary);
          margin-bottom: 1rem;
          animation: bounce 2s infinite;
        }

        .drop-area h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .drop-area p {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
        }

        .file-info {
          font-size: 0.75rem;
          opacity: 0.5;
          margin-top: 0.5rem;
        }

        .upload-error {
          color: #ef4444;
          font-size: 0.85rem;
          margin-top: 1rem;
          font-weight: 500;
        }

        .selected-file-card {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-glass-border);
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
        }

        .file-preview-icon {
          width: 50px;
          height: 50px;
          background: var(--color-accent-soft);
          color: var(--color-accent-primary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .file-details {
          flex: 1;
        }

        .file-details h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 2px;
          word-break: break-all;
        }

        .file-details p {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }

        .remove-file-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: #fee2e2;
          color: #ef4444;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .remove-file-btn:hover {
          background: #fecaca;
          transform: scale(1.1);
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default DropZone;
