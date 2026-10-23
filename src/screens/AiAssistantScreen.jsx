import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  User,
  MessageSquare,
  CheckCircle,
  X,
  FileEdit,
  AlertCircle
} from 'lucide-react';
import { useNexa } from '../context/NexaContext';

export default function AiAssistantScreen() {
  const {
    aiChatHistory,
    setAiChatHistory,
    askAiAssistant,
    familyMembers,
    createDraftMessage
  } = useNexa();

  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSynthesisEnabled, setSpeechSynthesisEnabled] = useState(true);
  const chatBottomRef = useRef(null);

  // Voice Dictated Messaging Draft Workflow state (Journey G)
  const [draftingState, setDraftingState] = useState(null); // null, or { step: 'select_member' | 'review', recipient: '', message: '' }

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiChatHistory]);

  const speakText = (text) => {
    if (!speechSynthesisEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error', e);
    }
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    // Check if user is initiating the voice-drafting workflow
    const lower = query.toLowerCase();
    if (lower.includes('message') || lower.includes('send message') || lower.includes('text')) {
      const userMsg = {
        id: 'msg-' + Date.now(),
        sender: 'user',
        text: query,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const aiReply = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'assistant',
        text: 'Initiating family message drafting workflow. Which family member would you like to message?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setAiChatHistory(prev => [...prev, userMsg, aiReply]);
      setInputMessage('');
      setDraftingState({ step: 'select_member', recipient: '', message: '' });
      speakText(aiReply.text);
      return;
    }

    // Standard Query
    const userMsg = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const replyText = askAiAssistant(query);
    const aiMsg = {
      id: 'msg-' + (Date.now() + 1),
      sender: 'assistant',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAiChatHistory(prev => [...prev, userMsg, aiMsg]);
    setInputMessage('');
    speakText(replyText);
  };

  // Simulate or utilize Speech Recognition
  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate recognized command or test speech recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        try {
          const recognition = new SpeechRec();
          recognition.continuous = false;
          recognition.interimResults = false;
          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInputMessage(transcript);
            handleSendMessage(transcript);
            setIsListening(false);
          };
          recognition.onerror = () => setIsListening(false);
          recognition.onend = () => setIsListening(false);
          recognition.start();
          return;
        } catch (e) {
          // fallback to simulation below
        }
      }

      // Voice Simulation fallback for browsers without mic permission
      setTimeout(() => {
        setIsListening(false);
        const sampleCommands = [
          'Show my upcoming bills.',
          'What medicines have reminders today?',
          'Are my home devices connected?',
          'When is my vehicle insurance due?',
          'Give me today family briefing.'
        ];
        const randomCmd = sampleCommands[Math.floor(Math.random() * sampleCommands.length)];
        setInputMessage(randomCmd);
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  const handleConfirmDraft = () => {
    if (!draftingState?.recipient || !draftingState?.message) return;
    createDraftMessage(draftingState.recipient, draftingState.message);

    const confirmationMsg = {
      id: 'msg-' + Date.now(),
      sender: 'assistant',
      text: `Draft to ${draftingState.recipient} successfully archived in Local Memory. Notice: The message has NOT been sent to external mobile carriers because an SMS gateway is unconfigured in this prototype.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setAiChatHistory(prev => [...prev, confirmationMsg]);
    speakText(confirmationMsg.text);
    setDraftingState(null);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 360px) 1fr', gap: '24px', height: 'calc(100vh - 120px)', paddingBottom: '20px' }}>
      {/* Left Column: 3D Holographic AI Core Orb */}
      <div
        className="glass-panel"
        style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div className="badge badge-violet" style={{ marginBottom: '8px' }}>
            NEXA COGNITIVE CORE
          </div>
          <h3 style={{ fontSize: '18px' }}>Unified Ambient AI</h3>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
            Context-aware household neural layer
          </p>
        </div>

        {/* Luminous Animated AI Orb */}
        <div
          style={{
            position: 'relative',
            width: '180px',
            height: '180px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '30px 0'
          }}
        >
          {/* Outer rotating ring */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px dashed rgba(84, 231, 255, 0.4)',
              animation: 'rotateOrbit 16s linear infinite'
            }}
          />

          {/* Middle violet ring */}
          <div
            style={{
              position: 'absolute',
              inset: '16px',
              borderRadius: '50%',
              border: '1px solid rgba(154, 134, 255, 0.4)',
              animation: 'rotateOrbit 10s linear infinite reverse'
            }}
          />

          {/* Glowing Intelligence Core */}
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #54E7FF 0%, #9A86FF 50%, #07101F 100%)',
              boxShadow: '0 0 40px rgba(84, 231, 255, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.6)',
              animation: isListening ? 'pulseGlow 1s infinite' : 'pulseGlow 3s infinite ease-in-out',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Bot size={36} color="#03060b" />
          </div>
        </div>

        {/* Audio Toggle & Quick Command Pills */}
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', fontSize: '12px' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>Spoken Voice Output:</span>
            <button
              onClick={() => {
                setSpeechSynthesisEnabled(!speechSynthesisEnabled);
                if (speechSynthesisEnabled && window.speechSynthesis) window.speechSynthesis.cancel();
              }}
              className="btn-ghost"
              style={{ fontSize: '12px', padding: '4px 8px' }}
            >
              {speechSynthesisEnabled ? <Volume2 size={15} color="var(--color-electric-cyan)" /> : <VolumeX size={15} />}
              <span>{speechSynthesisEnabled ? 'Enabled' : 'Muted'}</span>
            </button>
          </div>

          <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
            RECOMMENDED QUERIES:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              'Show my upcoming bills.',
              'What medicines have reminders today?',
              'Are my home devices connected?',
              'When is my vehicle insurance due?',
              'Draft message to Priya'
            ].map((cmd, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(cmd)}
                style={{
                  padding: '7px 10px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(16, 40, 71, 0.4)',
                  border: '1px solid var(--glass-border)',
                  fontSize: '11.5px',
                  color: 'var(--color-soft-white)',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--color-electric-cyan)';
                  e.currentTarget.style.color = 'var(--color-electric-cyan)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                  e.currentTarget.style.color = 'var(--color-soft-white)';
                }}
              >
                "{cmd}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Chat History & Input Panel */}
      <div
        className="glass-panel"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden'
        }}
      >
        {/* Chat Stream Messages */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {aiChatHistory.map(msg => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: isUser ? 'flex-end' : 'flex-start',
                  gap: '12px',
                  maxWidth: '82%',
                  alignSelf: isUser ? 'flex-end' : 'flex-start'
                }}
              >
                {!isUser && (
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(84, 231, 255, 0.15)',
                      border: '1px solid var(--color-electric-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Bot size={16} color="var(--color-electric-cyan)" />
                  </div>
                )}

                <div
                  style={{
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    background: isUser
                      ? 'linear-gradient(135deg, rgba(84, 231, 255, 0.2) 0%, rgba(16, 40, 71, 0.6) 100%)'
                      : 'rgba(16, 40, 71, 0.55)',
                    border: isUser
                      ? '1px solid rgba(84, 231, 255, 0.35)'
                      : '1px solid var(--glass-border)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <div
                    style={{
                      fontSize: '13.5px',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-line',
                      color: 'var(--color-soft-white)'
                    }}
                  >
                    {msg.text}
                  </div>
                  <div
                    style={{
                      fontSize: '10.5px',
                      color: 'var(--color-text-muted)',
                      marginTop: '6px',
                      textAlign: isUser ? 'right' : 'left'
                    }}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {isUser && (
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(154, 134, 255, 0.2)',
                      border: '1px solid var(--color-violet)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <User size={16} color="var(--color-violet)" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Voice-Dictated Messaging In-Chat Interactive Card (Journey G) */}
          {draftingState && (
            <div
              className="glass-panel"
              style={{
                padding: '20px',
                border: '1px solid var(--color-violet)',
                background: 'rgba(154, 134, 255, 0.08)',
                maxWidth: '85%'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <FileEdit size={18} color="var(--color-violet)" />
                <h4 style={{ fontSize: '15px', color: 'var(--color-violet)' }}>
                  Voice-Dictated Message Workflow
                </h4>
              </div>

              {draftingState.step === 'select_member' && (
                <div>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
                    Select the family recipient for your message:
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    {familyMembers.map(m => (
                      <button
                        key={m.id}
                        onClick={() => setDraftingState({ ...draftingState, step: 'review', recipient: m.name, message: 'Hi, please remember to pick up groceries on the way back from clinic.' })}
                        className="btn-secondary"
                        style={{ fontSize: '12.5px', padding: '6px 14px' }}
                      >
                        {m.name} ({m.relation})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {draftingState.step === 'review' && (
                <div>
                  <div style={{ fontSize: '12.5px', marginBottom: '8px' }}>
                    <strong>Recipient:</strong> {draftingState.recipient}
                  </div>
                  <textarea
                    rows={3}
                    value={draftingState.message}
                    onChange={e => setDraftingState({ ...draftingState, message: e.target.value })}
                    style={{ width: '100%', fontSize: '13px', marginBottom: '12px' }}
                  />
                  <div
                    style={{
                      padding: '8px 12px',
                      background: 'rgba(255, 181, 71, 0.12)',
                      border: '1px solid rgba(255, 181, 71, 0.3)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '11.5px',
                      color: 'var(--color-amber)',
                      marginBottom: '12px'
                    }}
                  >
                    Security Protocol: Clicking confirm saves this draft locally into household records. NEXA does not dispatch external SMS without a verified third-party telecom gateway.
                  </div>

                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button
                      className="btn-secondary"
                      onClick={() => setDraftingState(null)}
                      style={{ fontSize: '12px' }}
                    >
                      Cancel Draft
                    </button>
                    <button
                      className="btn-primary"
                      onClick={handleConfirmDraft}
                      style={{ fontSize: '12px' }}
                    >
                      <CheckCircle size={14} />
                      <span>Confirm & Save Draft</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid var(--glass-border)',
            background: 'rgba(7, 16, 31, 0.85)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <button
            onClick={toggleListening}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-sm)',
              background: isListening ? 'var(--color-coral)' : 'rgba(84, 231, 255, 0.15)',
              border: isListening ? 'none' : '1px solid var(--color-electric-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isListening ? '#fff' : 'var(--color-electric-cyan)',
              animation: isListening ? 'pulseGlow 1.2s infinite' : 'none',
              transition: 'all 0.2s'
            }}
            title={isListening ? 'Listening... Speak now' : 'Click to Speak Voice Command'}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>

          <input
            type="text"
            placeholder={isListening ? 'Listening to voice...' : 'Ask about bills, medicines, devices, vehicles, or briefing...'}
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            style={{ flex: 1, padding: '12px 16px', fontSize: '14px' }}
          />

          <button
            onClick={() => handleSendMessage()}
            className="btn-primary"
            style={{ width: '42px', height: '42px', padding: 0 }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
