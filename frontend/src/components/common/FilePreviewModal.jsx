import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload, FiMaximize2, FiFileText, FiImage } from 'react-icons/fi';

const FilePreviewModal = ({ isOpen, onClose, fileUrl, fileName }) => {
  if (!isOpen) return null;

  const fileExtension = fileName?.split('.').pop().toLowerCase();
  
  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension);
  const isPdf = fileExtension === 'pdf';
  const isText = ['txt', 'md', 'js', 'json', 'css', 'html'].includes(fileExtension);

  return (
    <AnimatePresence>
      <div className="preview-modal-overlay" onClick={onClose}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="preview-modal-content"
          onClick={e => e.stopPropagation()}
        >
          <div className="preview-header">
            <div className="file-info">
              {isImage ? <FiImage /> : <FiFileText />}
              <span>{fileName}</span>
            </div>
            <div className="header-actions">
              <a href={fileUrl} download={fileName} className="action-btn" title="Download">
                <FiDownload />
              </a>
              <button onClick={onClose} className="action-btn close-btn">
                <FiX />
              </button>
            </div>
          </div>

          <div className="preview-body">
            {isImage && (
              <div className="image-preview">
                <img src={fileUrl} alt={fileName} />
              </div>
            )}

            {isPdf && (
              <iframe 
                src={`${fileUrl}#toolbar=0`} 
                title={fileName}
                width="100%" 
                height="100%"
                style={{ border: 'none' }}
              />
            )}

            {isText && (
              <div className="text-preview">
                 <iframe src={fileUrl} width="100%" height="100%" style={{ border: 'none' }} />
              </div>
            )}

            {!isImage && !isPdf && !isText && (
              <div className="unsupported-preview">
                <FiFileText size={60} opacity={0.2} />
                <p>Preview not available for this file type.</p>
                <a href={fileUrl} download={fileName} className="btn btn-primary" style={{marginTop: '1.5rem'}}>
                  Download to View
                </a>
              </div>
            )}
          </div>
        </motion.div>

        <style jsx>{`
          .preview-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(8px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }

          .preview-modal-content {
            background: var(--color-bg-secondary);
            width: 100%;
            height: 100%;
            max-width: 1200px;
            max-height: 90vh;
            border-radius: 20px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          }

          .preview-header {
            padding: 1rem 1.5rem;
            background: var(--color-bg-primary);
            border-bottom: 1px solid var(--color-glass-border);
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .file-info {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 600;
            color: var(--color-text-primary);
          }

          .header-actions {
            display: flex;
            gap: 0.5rem;
          }

          .action-btn {
            width: 36px;
            height: 36px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--color-bg-secondary);
            color: var(--color-text-primary);
            border: 1px solid var(--color-glass-border);
            cursor: pointer;
            transition: all 0.2s;
          }

          .action-btn:hover {
            background: var(--color-accent-soft);
            color: var(--color-accent-primary);
            border-color: var(--color-accent-primary);
          }

          .close-btn:hover {
            background: #fee2e2;
            color: #ef4444;
            border-color: #fecaca;
          }

          .preview-body {
            flex: 1;
            overflow: auto;
            background: #1e293b;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .image-preview {
            max-width: 100%;
            max-height: 100%;
            padding: 2rem;
            display: flex;
            justify-content: center;
          }

          .image-preview img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          }

          .unsupported-preview {
            text-align: center;
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .unsupported-preview p {
            margin-top: 1rem;
            opacity: 0.7;
          }
        `}</style>
      </div>
    </AnimatePresence>
  );
};

export default FilePreviewModal;
