import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState({ feature: '', code: '' });

  const handleGenerate = async () => {
    const res = await fetch('http://localhost:8000/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    setOutput(data);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Requirements Generator</h1>
      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Describe your feature in plain English..."
        rows={5}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleGenerate} className="bg-blue-600 text-white px-4 py-2 rounded">
        Generate
      </button>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">BDD Feature</h2>
        <pre className="bg-gray-100 p-2 rounded overflow-x-auto whitespace-pre-wrap">{output.feature}</pre>

        <h2 className="text-xl font-semibold mt-4">Python Code</h2>
        <pre className="bg-gray-100 p-2 rounded overflow-x-auto whitespace-pre-wrap">{output.code}</pre>
      </div>
    </div>
  );
}

export default App;
