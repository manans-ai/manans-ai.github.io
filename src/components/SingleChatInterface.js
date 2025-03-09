import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const SingleChatInterface = ({ selectedModels }) => {
  const { model } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Model display names
  const modelNames = {
    chatgpt: 'ChatGPT',
    claude: 'Claude',
    gemini: 'Gemini',
    perplexity: 'Perplexity',
    qwen: 'Qwen',
    mistral: 'Mistral',
    manus: 'Manus AI',
    grok: 'Grok',
    llama: 'Llama'
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    
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
    
    // Simulate AI response (replace with actual API call in production)
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: getMockResponse(model, input),
        sender: 'ai',
        model: model,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getMockResponse = (model, query) => {
    // Mock responses for demo purposes
    const responses = {
      chatgpt: `As ChatGPT, I would respond that ${query} is an interesting topic. Here's what I know about it...`,
      claude: `Claude here. Regarding ${query}, I'd approach this question by considering multiple perspectives...`,
      gemini: `Thanks for asking about ${query}. Based on my knowledge, here's a comprehensive analysis...`,
      perplexity: `According to recent information about ${query}, several sources indicate that...`,
      qwen: `Qwen's analysis of ${query} reveals several key insights that might be relevant to your question...`,
      mistral: `In response to your query about ${query}, I can provide these details based on my training...`,
      manus: `As Manus AI, I find that ${query} presents an interesting challenge. Here's my creative approach...`,
      grok: `Hey there! ${query}, huh? That's a fun one to tackle. Here's what I think about it...`,
      llama: `Llama model analysis: ${query} can be understood through the following framework...`
    };
    
    return responses[model] || `I'm sorry, I don't have a specific response about ${query}.`;
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h2>{modelNames[model] || 'AI'} Chat</h2>
      </div>
      
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <div className="empty-chat-message">
              <h3>Start a conversation with {modelNames[model]}</h3>
              <p>Your messages will appear here</p>
            </div>
          </div>
        ) : (
          messages.map(message => (
            <div 
              key={message.id} 
              className={`message ${message.sender === 'user' ? 'user' : 'ai'}`}
            >
              {message.sender === 'ai' && (
                <div className="ai-tag">{modelNames[message.model]}</div>
              )}
              <div className="message-content">{message.text}</div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message ai">
            <div className="ai-tag">{modelNames[model]}</div>
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
      
      <form className="message-input-container" onSubmit={handleSendMessage}>
        <textarea
          className="message-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask ${modelNames[model]} something...`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage(e);
            }
          }}
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

export default SingleChatInterface;