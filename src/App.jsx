import { useState, useEffect } from 'react';
import CollapsibleSnippet from './components/CollapsibleSnippet';
import './main.css';

function App() {
  const [snippets, setSnippets] = useState([]);
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [code, setCode] = useState('');
  
  const [activeSnippetId, setActiveSnippetId] = useState(null);
  const [editingSnippetId, setEditingSnippetId] = useState(null); // State for which snippet is being edited

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
    setTitle(''); setCode(''); setLanguage('JavaScript');
  };
  
  const deleteSnippet = (id) => {
    setSnippets(snippets.filter(snippet => snippet.id !== id));
  };
  
  const handleToggleSnippet = (id) => {
    if (editingSnippetId === id) return; // Don't collapse if we are editing
    setActiveSnippetId(activeSnippetId === id ? null : id);
  };

  // --- NEW FUNCTIONS FOR EDITING LOGIC ---
  const handleSetEditing = (id) => {
    setActiveSnippetId(id); // Force expand when editing
    setEditingSnippetId(id);
  };

  const handleCancelEdit = () => {
    setEditingSnippetId(null);
  };
  
  const handleSaveEdit = (id, updatedData) => {
    setSnippets(prevSnippets => 
      prevSnippets.map(snippet => 
        snippet.id === id ? { ...snippet, ...updatedData } : snippet
      )
    );
    setEditingSnippetId(null); // Exit editing mode
  };
  // ------------------------------------------

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>CodeKeep</h1>
        <p>Your Personal Code Snippet Manager.</p>
      </header>

      <div className="main-content">
        <form onSubmit={handleSubmit} className="snippet-form">
          <h2>Add a New Snippet</h2>
          {/* ... form JSX remains the same ... */}
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Snippet Title..." required />
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>JavaScript</option><option>Python</option><option>HTML</option><option>CSS</option><option>SQL</option>
          </select>
          <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Paste your code here..." required></textarea>
          <button type="submit">Save Snippet</button>
        </form>

        <div className="snippet-list">
          {snippets.map(snippet => (
            <CollapsibleSnippet 
              key={snippet.id} 
              snippet={snippet} 
              onDelete={deleteSnippet}
              isActive={activeSnippetId === snippet.id}
              onToggle={handleToggleSnippet}
              isEditing={editingSnippetId === snippet.id} // Pass down if it's being edited
              onEdit={handleSetEditing}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;