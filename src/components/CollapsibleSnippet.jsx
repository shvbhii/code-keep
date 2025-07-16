import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiChevronDown, FiEdit2, FiTrash2, FiCopy } from 'react-icons/fi'; // Import new icons
import EditSnippetForm from './EditSnippetForm'; // Import the new form

function CollapsibleSnippet({ snippet, onDelete, onEdit, isEditing, onSave, onCancel, isActive, onToggle }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Stop propagation on button clicks to prevent the snippet from toggling
  const handleButtonClick = (e, callback) => {
    e.stopPropagation();
    callback();
  }

  return (
    <div className="collapsible-snippet">
      {/* If we are editing this snippet, show the form */}
      {isEditing ? (
        <EditSnippetForm snippet={snippet} onSave={onSave} onCancel={onCancel} />
      ) : (
        // Otherwise, show the normal collapsible view
        <>
          <div className="snippet-header" onClick={() => onToggle(snippet.id)}>
            <h3>{snippet.title}</h3>
            <div className="header-right">
              <span className="language-tag">{snippet.language}</span>
              <FiChevronDown className={`chevron-icon ${isActive ? 'open' : ''}`} />
            </div>
          </div>

          <div className={`snippet-content ${isActive ? 'expanded' : ''}`}>
            <div className="code-block">
              <SyntaxHighlighter language={snippet.language.toLowerCase()} style={atomDark} showLineNumbers>
                {snippet.code}
              </SyntaxHighlighter>
            </div>
            <div className="card-footer">
              <button onClick={(e) => handleButtonClick(e, handleCopy)} className="footer-btn">
                <FiCopy /> {copied ? 'Copied!' : 'Copy'}
              </button>
              <button onClick={(e) => handleButtonClick(e, () => onEdit(snippet.id))} className="footer-btn">
                <FiEdit2 /> Edit
              </button>
              <button onClick={(e) => handleButtonClick(e, () => onDelete(snippet.id))} className="footer-btn delete-btn">
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CollapsibleSnippet;