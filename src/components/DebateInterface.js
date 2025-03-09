import React, { useState, useEffect, useRef } from 'react';

const DebateInterface = ({ selectedModels }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debateSummary, setDebateSummary] = useState('');
  const messagesEndRef = useRef(null);
  
  // Model display names and properties
  const modelInfo = {
    chatgpt: { name: 'ChatGPT', icon: '/icons/chatgpt.png', color: '#10a37f' },
    claude: { name: 'Claude', icon: '/icons/claude.png', color: '#5436DA' },
    gemini: { name: 'Gemini', icon: '/icons/gemini.png', color: '#8e44ad' },
    perplexity: { name: 'Perplexity', icon: '/icons/perplexity.png', color: '#1a73e8' },
    qwen: { name: 'Qwen', icon: '/icons/qwen.png', color: '#ff7c1f' },
    mistral: { name: 'Mistral', icon: '/icons/mistral.png', color: '#0078D7' },
    manus: { name: 'Manus AI', icon: '/icons/manus.png', color: '#e74c3c' },
    grok: { name: 'Grok', icon: '/icons/grok.png', color: '#1da1f2' },
    llama: { name: 'Llama', icon: '/icons/llama.png', color: '#34495e' }
  };

  // Get active models
  const activeModels = Object.keys(selectedModels).filter(model => selectedModels[model]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === '' || isLoading) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);
    setDebateSummary('');
    
    // Simulate AI responses with different timings
    activeModels.forEach((model, index) => {
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + index + 1,
          text: getMockResponse(model, input),
          sender: 'ai',
          model: model,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prevMessages => [...prevMessages, aiResponse]);
        
        // If this is the last AI to respond, generate a summary
        if (index === activeModels.length - 1) {
          setTimeout(() => {
            generateDebateSummary(input);
            setIsLoading(false);
          }, 1000);
        }
      }, 1000 + (index * 1500)); // Stagger responses
    });
  };

  const getMockResponse = (model, query) => {
    // Mock responses for demo purposes
    const responses = {
      chatgpt: `As ChatGPT, I think ${query} is an interesting topic. My analysis shows several key points: First, we should consider the historical context. Second, there are multiple perspectives to consider. Based on my training data, I believe a balanced approach would be most effective.`,
      claude: `Regarding ${query}, I'd approach this by first principles. The question touches on several domains of knowledge. While there's no definitive answer, we can analyze it from ethical, practical, and theoretical perspectives. I think the most nuanced view would account for both immediate implications and long-term consequences.`,
      gemini: `Thanks for asking about ${query}. Let me provide a comprehensive analysis: The question has technological, social, and economic dimensions. Recent developments suggest that this topic is evolving rapidly. Based on my training, I can identify several trends that might be relevant to your question.`,
      perplexity: `According to recent information about ${query}, several sources indicate varying perspectives. The latest research suggests new approaches, while traditional viewpoints still hold merit in certain contexts. By synthesizing these diverse sources, we can develop a more complete understanding.`,
      qwen: `Qwen's analysis of ${query} reveals several key insights: The question involves complex trade-offs between different values and objectives. Historical precedents suggest caution, while innovation pushes us toward new solutions. A balanced assessment would acknowledge both the potential benefits and risks.`,
      mistral: `In response to your query about ${query}, I can offer these insights: The topic intersects with multiple domains including economics, ethics, and technology. From first principles, we should evaluate both the theoretical foundations and practical implications. My assessment suggests a nuanced approach is warranted.`,
      manus: `As Manus AI, I find that ${query} presents an interesting challenge. Taking a creative approach, I see possibilities that might not be immediately obvious. By reframing the question slightly, we might discover innovative solutions that address the core concerns while avoiding common pitfalls.`,
      grok: `Hey there! ${query}, huh? That's an interesting one. Looking at this from different angles, I see some unconventional patterns. Not to be contrarian, but have you considered the opposite perspective? Sometimes the most obvious answer isn't the best one. Here's my take on it...`,
      llama: `Llama model analysis: ${query} can be understood through the following framework: First, identify core principles. Second, apply relevant theoretical models. Third, consider empirical evidence. Following this approach, I conclude that the question involves nuanced trade-offs between competing values.`
    };
    
    return responses[model] || `I'm analyzing ${query} based on my training data.`;
  };

  const generateDebateSummary = (query) => {
    // In a real app, this would analyze the AI responses and generate a summary
    // For demo purposes, we'll create a static summary
    const summary = `
      <strong>Debate Summary on "${query}"</strong>
      <br/><br/>
      After analyzing responses from ${activeModels.length} AI models, here's a synthesis of their perspectives:
      <br/><br/>
      <strong>Points of Agreement:</strong>
      <ul>
        <li>The topic is complex and multi-faceted</li>
        <li>Historical context is important for understanding</li>
        <li>Both benefits and risks should be considered</li>
      </ul>
      <br/>
      <strong>Unique Perspectives:</strong>
      <ul>
        <li>ChatGPT emphasized a balanced, practical approach</li>
        <li>Claude focused on ethical implications</li>
        <li>Gemini highlighted technological dimensions</li>
        ${activeModels.includes('grok') ? '<li>Grok suggested unconventional alternatives</li>' : ''}
      </ul>
      <br/>
      <strong>Recommended Approach:</strong>
      Consider multiple perspectives while acknowledging the complexity of the issue. The optimal solution likely involves balancing immediate practical concerns with longer-term implications.
    `;
    
    setDebateSummary(summary);
  };

  return (
    <div className="debate-interface">
      <div className="debate-header">
        <h2>AI Debate Mode</h2>
        <p>Ask a question and get perspectives from multiple AI models</p>
      </div>
      
      <div className="debate-area">
        {debateSummary && (
          <div className="debate-summary">
            <div className="debate-summary-title">Collective Intelligence Summary</div>
            <div dangerouslySetInnerHTML={{ __html: debateSummary }}></div>
          </div>
        )}
        
        <div className="debate-messages">
          {messages.length === 0 ? (
            <div className="empty-chat">
              <div className="empty-chat-message">
                <h3>Start a group debate</h3>
                <p>Ask a question to get perspectives from {activeModels.length} AI models</p>
                <div className="active-models">
                  {activeModels.map(model => (
                    <div key={model} className="active-model-badge" style={{ backgroundColor: modelInfo[model].color }}>
                      <img src={modelInfo[model].icon} alt={modelInfo[model].name} className="model-icon-small" />
                      <span>{modelInfo[model].name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            messages.map(message => (
              <div 
                key={message.id} 
                className={`message ${message.sender === 'user' ? 'user' : 'ai'}`}
                style={message.sender === 'ai' ? {borderLeft: `4px solid ${modelInfo[message.model].color}`} : {}}
              >
                {message.sender === 'ai' && (
                  <div className="ai-tag" style={{color: modelInfo[message.model].color}}>
                    <img 
                      src={modelInfo[message.model].icon} 
                      alt={modelInfo[message.model].name} 
                      className="model-icon-small" 
                    />
                    {modelInfo[message.model].name}
                  </div>
                )}
                <div className="message-content">{message.text}</div>
              </div>
            ))
          )}
          {isLoading && activeModels.some(model => 
            !messages.some(msg => msg.sender === 'ai' && msg.model === model)
          ) && (
            <div className="message ai loading-message">
              <div className="ai-tag">
                AIs thinking...
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form className="message-input-container" onSubmit={handleSendMessage}>
        <textarea
          className="message-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask all AIs a question..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage(e);
            }
          }}
          disabled={isLoading}
        />
        <button type="submit" className="send-button" disabled={isLoading}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default DebateInterface;
