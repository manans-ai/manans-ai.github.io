import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would validate and authenticate with a backend
    // For this demo, we'll just create a mock user
    const userData = {
      id: '123',
      name: 'Demo User',
      email: email,
      photoUrl: 'https://via.placeholder.com/150',
    };
    onLogin(userData);
  };

  const handleServiceLogin = (service) => {
    // In a real app, this would redirect to OAuth flow
    console.log(`Logging in with ${service}`);
    // Mock login
    const userData = {
      id: '123',
      name: 'Demo User',
      email: `user@${service}.com`,
      photoUrl: 'https://via.placeholder.com/150',
    };
    onLogin(userData);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome to Manan AI</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Sign In</button>
        </form>

        <div className="service-login-buttons">
          <div className="service-login-title">Or connect using your AI accounts</div>
          <div className="service-buttons">
            <button 
              className="service-button"
              onClick={() => handleServiceLogin('openai')}
            >
              <img src="/icons/chatgpt.png" alt="OpenAI" className="service-icon" />
              <span>OpenAI</span>
            </button>
            <button 
              className="service-button"
              onClick={() => handleServiceLogin('anthropic')}
            >
              <img src="/icons/claude.png" alt="Anthropic" className="service-icon" />
              <span>Anthropic</span>
            </button>
            <button 
              className="service-button"
              onClick={() => handleServiceLogin('google')}
            >
              <img src="/icons/gemini.png" alt="Google" className="service-icon" />
              <span>Google</span>
            </button>
            <button 
              className="service-button"
              onClick={() => handleServiceLogin('perplexity')}
            >
              <img src="/icons/perplexity.png" alt="Perplexity" className="service-icon" />
              <span>Perplexity</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
