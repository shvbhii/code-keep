// src/App.jsx
import { useState, useEffect } from 'react';
import CollapsibleSnippet from './components/CollapsibleSnippet'; // Import the new component
import './main.css';

function App() {
  const [snippets, setSnippets] = useState([]);
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [code, setCode] = useState('');
  
  // --- NEW STATE TO MANAGE WHICH SNIPPET IS OPEN ---
  const [activeSnippetId, setActiveSnippetId] = useState(null);
  // ----------------------------------------------------

  useEffect(() => {
    const savedSnippets = localStorage.getItem('codeSnippets');
    if (savedSnippets) setSnippets(JSON.parse(savedSnippets));
  }, []);

  useEffect(() => {
    localStorage.setItem('codeSnippets', JSON.stringify(snippets));
  }, [snippets]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !code) return;
    const newSnippet = { id: crypto.randomUUID(), title, language, code };
    setSnippets([newSnippet, ...snippets]);
    setTitle('');
    setCode('');
    setLanguage('JavaScript');
  };
  
  const deleteSnippet = (id) => {
    setSnippets(snippets.filter(snippet => snippet.id !== id));
  };
  
  // --- NEW FUNCTION TO HANDLE TOGGLING ---
  const handleToggleSnippet = (id) => {
    // If the clicked snippet is already open, close it. Otherwise, open it.
    setActiveSnippetId(activeSnippetId === id ? null : id);
  };
  // ---------------------------------------

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>CodeKeep</h1>
        <p>Your Personal Code Snippet Manager.</p>
      </header>

      <div className="main-content">
        <form onSubmit={handleSubmit} className="snippet-form">
          <h2>Add a New Snippet</h2>
          <input 
            type="text" value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Snippet Title (e.g., 'Async Fetch Function')" required
          />
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>JavaScript</option> <option>Python</option>
            <option>HTML</option> <option>CSS</option> <option>SQL</option>
          </select>
          <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..." required
          ></textarea>
          <button type="submit">Save Snippet</button>
        </form>

        <div className="snippet-list">
          {snippets.map(snippet => (
            <CollapsibleSnippet 
              key={snippet.id} 
              snippet={snippet} 
              onDelete={deleteSnippet}
              isActive={activeSnippetId === snippet.id} // Pass down if it's active
              onToggle={handleToggleSnippet} // Pass down the toggle handler
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;