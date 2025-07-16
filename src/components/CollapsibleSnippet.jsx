// src/components/CollapsibleSnippet.jsx
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiChevronDown } from 'react-icons/fi'; // Import the chevron icon

function CollapsibleSnippet({ snippet, onDelete, isActive, onToggle }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="collapsible-snippet">
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
          <button onClick={handleCopy} className="copy-btn">
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
          <button onClick={() => onDelete(snippet.id)} className="delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CollapsibleSnippet;