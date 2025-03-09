import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ user, selectedModels }) => {
  // Model information with icons and names
  const models = [
    { id: 'chatgpt', name: 'ChatGPT', icon: '/icons/chatgpt.png' },
    { id: 'claude', name: 'Claude', icon: '/icons/claude.png' },
    { id: 'gemini', name: 'Gemini', icon: '/icons/gemini.png' },
    { id: 'perplexity', name: 'Perplexity', icon: '/icons/perplexity.png' },
    { id: 'qwen', name: 'Qwen', icon: '/icons/qwen.png' },
    { id: 'mistral', name: 'Mistral', icon: '/icons/mistral.png' },
    { id: 'manus', name: 'Manus AI', icon: '/icons/manus.png' },
    { id: 'grok', name: 'Grok', icon: '/icons/grok.png' },
    { id: 'llama', name: 'Llama', icon: '/icons/llama.png' },
  ];

  // Filter models based on user selection
  const enabledModels = models.filter(model => selectedModels[model.id]);

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-title">Features</div>
        <NavLink to="/" className={({ isActive }) => 
          `sidebar-item ${isActive ? 'active' : ''}`}>
          AI Debate Mode
        </NavLink>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-title">AI Models</div>
        {enabledModels.map(model => (
          <NavLink 
            key={model.id}
            to={`/chat/${model.id}`} 
            className={({ isActive }) => 
              `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <img src={model.icon} alt={model.name} className="model-icon" />
            <span>{model.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-title">Account</div>
        <NavLink to="/settings" className={({ isActive }) => 
          `sidebar-item ${isActive ? 'active' : ''}`}>
          Settings
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
