// src/components/EditSnippetForm.jsx
import { useState } from 'react';

function EditSnippetForm({ snippet, onSave, onCancel }) {
  // Create internal state for the form, pre-filled with the snippet's data
  const [title, setTitle] = useState(snippet.title);
  const [language, setLanguage] = useState(snippet.language);
  const [code, setCode] = useState(snippet.code);

  const handleSave = (e) => {
    e.preventDefault();
    onSave(snippet.id, { title, language, code });
  };

  return (
    <form onSubmit={handleSave} className="edit-snippet-form">
      <input 
        type="text" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option>JavaScript</option> <option>Python</option>
        <option>HTML</option> <option>CSS</option> <option>SQL</option>
      </select>
      <textarea 
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      ></textarea>
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
        <button type="submit" className="save-btn">Save Changes</button>
      </div>
    </form>
  );
}

export default EditSnippetForm;