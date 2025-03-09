import React, { useState } from 'react';

const Settings = ({ selectedModels, updateSelectedModels, user }) => {
  const [models, setModels] = useState(selectedModels);
  
  // Model information with icons, names, and descriptions
  const modelInfo = [
    { 
      id: 'chatgpt', 
      name: 'ChatGPT', 
      icon: '/icons/chatgpt.png',
      description: 'OpenAI\'s language model with strong dialogue capabilities'
    },
    { 
      id: 'claude', 
      name: 'Claude', 
      icon: '/icons/claude.png',
      description: 'Anthropic\'s helpful, harmless, and honest AI assistant'
    },
    { 
      id: 'gemini', 
      name: 'Gemini', 
      icon: '/icons/gemini.png',
      description: 'Google\'s most capable and general-purpose AI model'
    },
    { 
      id: 'perplexity', 
      name: 'Perplexity', 
      icon: '/icons/perplexity.png',
      description: 'AI search assistant with real-time information'
    },
    { 
      id: 'qwen', 
      name: 'Qwen', 
      icon: '/icons/qwen.png',
      description: 'Alibaba\'s advanced conversational AI model'
    },
    { 
      id: 'mistral', 
      name: 'Mistral', 
      icon: '/icons/mistral.png',
      description: 'Highly capable open-source language model'
    },
    { 
      id: 'manus', 
      name: 'Manus AI', 
      icon: '/icons/manus.png',
      description: 'Specialized AI built for creative assistance'
    },
    { 
      id: 'grok', 
      name: 'Grok', 
      icon: '/icons/grok.png',
      description: 'xAI\'s witty and informative conversational AI'
    },
    { 
      id: 'llama', 
      name: 'Llama', 
      icon: '/icons/llama.png',
      description: 'Meta\'s open-source large language model'
    },
  ];

  const handleToggleModel = (modelId) => {
    const updatedModels = {
      ...models,
      [modelId]: !models[modelId]
    };
    setModels(updatedModels);
    updateSelectedModels(updatedModels);
  };

  const connectAIAccount = (modelId) => {
    // In a real app, this would initiate OAuth flow
    alert(`Connecting to ${modelId} account...`);
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>
      
      <div className="settings-section">
        <h3 className="settings-subtitle">Profile</h3>
        <div className="user-settings">
          <img 
            src={user.photoUrl || '/default-avatar.png'} 
            alt={user.name} 
            className="user-avatar"
            style={{ width: '64px', height: '64px', marginBottom: '10px' }}
          />
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
      
      <div className="settings-section">
        <h3 className="settings-subtitle">AI Models</h3>
        <p className="settings-description">
          Enable or disable AI models for debate mode and manage your AI service connections.
        </p>
        
        {modelInfo.map(model => (
          <div key={model.id} className="model-toggle">
            <div className="model-details">
              <img src={model.icon} alt={model.name} className="model-icon" />
              <div>
                <div><strong>{model.name}</strong></div>
                <div style={{ fontSize: '14px', color: '#666' }}>{model.description}</div>
              </div>
            </div>
            <div className="model-controls">
              <button 
                style={{ marginRight: '15px', padding: '5px 10px' }}
                onClick={() => connectAIAccount(model.id)}
              >
                Connect Account
              </button>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={models[model.id]}
                  onChange={() => handleToggleModel(model.id)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        ))}
      </div>
      
      <div className="settings-section">
        <h3 className="settings-subtitle">Language Preferences</h3>
        <div className="form-group">
          <label className="form-label">Interface Language</label>
          <select className="form-input">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="zh">中文</option>
            <option value="ja">日本語</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
