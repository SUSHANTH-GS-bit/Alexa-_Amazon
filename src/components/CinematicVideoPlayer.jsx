import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Download,
  Film,
  Sparkles,
  Zap,
  HeartPulse,
  Receipt,
  Car,
  ShieldCheck,
  Bot,
  Subtitles
} from 'lucide-react';
import { useNexa } from '../context/NexaContext';

// 6 Chapters x 30 seconds = 180 seconds (3 minutes)
const VIDEO_CHAPTERS = [
  {
    id: 1,
    start: 0,
    end: 30,
    title: 'Act I: The Living Home Architecture',
    subtitle: 'From fragmented devices to a unified 3D living ecosystem',
    voiceover: 'Welcome to NEXA. Today, our lives are scattered across disconnected apps, smart devices, and documents. NEXA unifies your entire living space into a persistent, intelligent architectural ecosystem. Every room, sensor, and circuit breathes together in real time.',
    themeColor: '#54E7FF',
    icon: Zap,
    visualPrompt: 'ARCHITECTURAL CUTAWAY • REAL-TIME 3D VILLA'
  },
  {
    id: 2,
    start: 30,
    end: 60,
    title: 'Act II: Proactive Family Health Intelligence',
    subtitle: 'Biometric vitals, historical trends, and privacy boundaries',
    voiceover: 'Health is not a single number; it is a family story. NEXA securely partitions health profiles for Rahul, Priya, young Aarav, and grandmother Anita. Continuous vitals tracking monitors blood pressure, glucose, and oxygen saturation with end-to-end local encryption.',
    themeColor: '#00E5A3',
    icon: HeartPulse,
    visualPrompt: 'BIOMETRIC HEALTH SUITE • 6-TILE VITALS MATRIX'
  },
  {
    id: 3,
    start: 60,
    end: 90,
    title: 'Act III: Medication Regimens & Adherence',
    subtitle: 'Synchronized dose reminders with timestamped audit logs',
    voiceover: 'Never miss a critical medication. NEXA coordinates daily prescriptions like Anita’s Metformin, providing timed reminders and timestamped acknowledgment logs. It safeguards your loved ones with proactive supply refill warnings.',
    themeColor: '#FF4D6A',
    icon: Sparkles,
    visualPrompt: 'MEDICATION ADHERENCE • AUDIT LOG PROTOCOL'
  },
  {
    id: 4,
    start: 90,
    end: 120,
    title: 'Act IV: Financial Clarity & Energy Sovereignty',
    subtitle: 'Indian Rupee utility tracking with rooftop solar net metering',
    voiceover: 'Complete clarity over household obligations. From Bescom electricity and water dues to piped gas and society maintenance. NEXA automatically integrates rooftop solar generation, showing real-time grid export credits offset directly against monthly expenses.',
    themeColor: '#FFB547',
    icon: Receipt,
    visualPrompt: 'UTILITY INTELLIGENCE • SOLAR NET-METERING'
  },
  {
    id: 5,
    start: 120,
    end: 150,
    title: 'Act V: Vehicle Intelligence & Home Memory',
    subtitle: 'EV range telemetry, optical security, and relational memory',
    voiceover: 'Your home anticipates your mobility. The Tata Nexon EV docks into smart solar charging while insurance renewal countdowns keep you compliant. Perimeter CCTV feeds feature physical privacy shutters, linked directly into a searchable household memory archive.',
    themeColor: '#9A86FF',
    icon: Car,
    visualPrompt: 'EV DOCKING • CCTV PRIVACY • HOME MEMORY'
  },
  {
    id: 6,
    start: 150,
    end: 180,
    title: 'Act VI: The Unified NEXA Intelligence Core',
    subtitle: 'Context-aware ambient AI and what-if action rehearsals',
    voiceover: 'Connecting it all is the NEXA Cognitive Core. Ask natural questions, rehearse vacation automation modes in simulation, and draft family messages with complete sovereign privacy. This is NEXA. Your Home. Your Health. Your Life. Connected.',
    themeColor: '#54E7FF',
    icon: Bot,
    visualPrompt: 'COGNITIVE CORE • WHAT-IF REHEARSAL • CONNECTED LIVING'
  }
];

export default function CinematicVideoPlayer({ onClose }) {
  const [currentTime, setCurrentTime] = useState(0); // 0 to 180 seconds
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [isRecording, setIsRecording] = useState(false);

  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const timerRef = useRef(null);
  const lastSpokenChapterRef = useRef(-1);

  // Active chapter
  const currentChapter = VIDEO_CHAPTERS.find(
    ch => currentTime >= ch.start && currentTime < ch.end
  ) || VIDEO_CHAPTERS[VIDEO_CHAPTERS.length - 1];

  // Synthesize ambient futuristic pad audio using Web Audio API
  useEffect(() => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        // Create ambient drone oscillators
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gainNode = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(110, ctx.currentTime); // A2
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(164.81, ctx.currentTime); // E3

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);

        gainNode.gain.setValueAtTime(0.04, ctx.currentTime);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start();
        osc2.start();

        return () => {
          try {
            osc1.stop();
            osc2.stop();
            ctx.close();
          } catch (e) {}
        };
      }
    } catch (e) {
      console.warn('Web Audio not supported', e);
    }
  }, []);

  // Voiceover Speech Synthesis per Chapter
  useEffect(() => {
    if (!isPlaying || isMuted) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      return;
    }

    if (currentChapter && currentChapter.id !== lastSpokenChapterRef.current) {
      lastSpokenChapterRef.current = currentChapter.id;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(currentChapter.voiceover);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [currentChapter, isPlaying, isMuted]);

  // Main 180s Playback Timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= 180) {
            setIsPlaying(false);
            return 180;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  // Canvas Motion Graphics Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const render = () => {
      animId = requestAnimationFrame(render);
      const w = canvas.width;
      const h = canvas.height;
      const t = currentTime + (Date.now() % 1000) / 1000;

      // Dark futuristic background gradient
      const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w / 1.2);
      bgGrad.addColorStop(0, '#0c2242');
      bgGrad.addColorStop(0.5, '#07101f');
      bgGrad.addColorStop(1, '#03060b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Grid Lines
      ctx.strokeStyle = 'rgba(84, 231, 255, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw Chapter-Specific Visual Elements
      const chColor = currentChapter.themeColor;

      // Rotating central radar rings
      ctx.save();
      ctx.translate(w / 2, h / 2 - 20);
      ctx.rotate(t * 0.15);
      ctx.strokeStyle = chColor;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.arc(0, 0, 160, 0, Math.PI * 2);
      ctx.stroke();

      // Dashed inner ring
      ctx.setLineDash([8, 12]);
      ctx.strokeStyle = '#54e7ff';
      ctx.beginPath();
      ctx.arc(0, 0, 120, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Animated Sine wave / Telemetry pulse across center
      ctx.save();
      ctx.strokeStyle = chColor;
      ctx.lineWidth = 2.5;
      ctx.globalAlpha = 0.8;
      ctx.shadowColor = chColor;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      for (let x = 80; x < w - 80; x += 4) {
        const wave = Math.sin(x * 0.02 + t * 4) * 24 * Math.sin(t * 0.5);
        const y = h / 2 - 20 + wave;
        if (x === 80) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // HUD Corner brackets
      ctx.strokeStyle = '#54e7ff';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.6;
      // Top left
      ctx.beginPath(); ctx.moveTo(30, 60); ctx.lineTo(30, 30); ctx.lineTo(60, 30); ctx.stroke();
      // Top right
      ctx.beginPath(); ctx.moveTo(w - 60, 30); ctx.lineTo(w - 30, 30); ctx.lineTo(w - 30, 60); ctx.stroke();
      // Bottom left
      ctx.beginPath(); ctx.moveTo(30, h - 60); ctx.lineTo(30, h - 30); ctx.lineTo(60, h - 30); ctx.stroke();
      // Bottom right
      ctx.beginPath(); ctx.moveTo(w - 60, h - 30); ctx.lineTo(w - 30, h - 30); ctx.lineTo(w - 30, h - 60); ctx.stroke();

      // On-screen HUD Telemetry Labels
      ctx.font = '600 12px "Space Grotesk", monospace';
      ctx.fillStyle = '#54e7ff';
      ctx.globalAlpha = 0.9;
      ctx.fillText('NEXA // CINEMATIC PRODUCT REEL', 40, 50);
      ctx.fillText('SYS.TIME: 2026-10-23T20:46:12Z', w - 240, 50);

      // Chapter Badge & Title
      ctx.font = '700 24px "Outfit", sans-serif';
      ctx.fillStyle = '#f3f7fc';
      ctx.fillText(currentChapter.title, 60, 100);

      ctx.font = '400 14px "Inter", sans-serif';
      ctx.fillStyle = '#8e9cb2';
      ctx.fillText(currentChapter.subtitle, 60, 125);

      // Chapter Visual Prompt Badge
      ctx.font = '600 11px "Space Grotesk", monospace';
      ctx.fillStyle = chColor;
      ctx.fillText(`[ ${currentChapter.visualPrompt} ]`, 60, 150);

      // Bottom Subtitles / Narration text on canvas
      if (showCaptions) {
        ctx.fillStyle = 'rgba(7, 16, 31, 0.85)';
        ctx.fillRect(40, h - 110, w - 80, 55);
        ctx.strokeStyle = 'rgba(84, 231, 255, 0.25)';
        ctx.strokeRect(40, h - 110, w - 80, 55);

        ctx.font = '500 14px "Inter", sans-serif';
        ctx.fillStyle = '#f3f7fc';
        ctx.textAlign = 'center';

        // Wrap narration text if needed
        const words = currentChapter.voiceover.split(' ');
        const line1 = words.slice(0, 14).join(' ');
        const line2 = words.slice(14).join(' ');
        ctx.fillText(line1, w / 2, h - 84);
        if (line2) ctx.fillText(line2, w / 2, h - 64);
        ctx.textAlign = 'left';
      }
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [currentTime, currentChapter, showCaptions]);

  // Handle Recording Video Download (WebM)
  const handleStartRecording = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const stream = canvas.captureStream(30);
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      recordedChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `NEXA-3-Minute-Cinematic-Reel.webm`;
        a.click();
        URL.revokeObjectURL(url);
        setIsRecording(false);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch (e) {
      alert('Browser MediaRecorder failed. You can watch the full 3-minute reel live in this interactive player.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="modal-overlay" style={{ background: 'rgba(3, 6, 11, 0.94)', zIndex: 2000 }}>
      <div
        className="modal-card"
        style={{
          maxWidth: '1060px',
          width: '95vw',
          background: '#040a14',
          border: '1px solid rgba(84, 231, 255, 0.3)',
          boxShadow: '0 0 60px rgba(84, 231, 255, 0.25)'
        }}
      >
        {/* Top Header */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid rgba(84, 231, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(7, 16, 31, 0.9)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Film size={20} color="var(--color-electric-cyan)" />
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 700 }}>
                NEXA — The Future of Connected Living (3-Minute Product Film)
              </h2>
              <p style={{ fontSize: '11.5px', color: 'var(--color-text-muted)' }}>
                180-second cinematic presentation with synchronized voiceover narration
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isRecording ? (
              <button
                onClick={handleStopRecording}
                className="btn-primary"
                style={{ background: 'var(--color-coral)', fontSize: '12px', padding: '6px 12px' }}
              >
                Stop & Save Video (.webm)
              </button>
            ) : (
              <button
                onClick={handleStartRecording}
                className="btn-secondary"
                style={{ fontSize: '12px', padding: '6px 12px' }}
                title="Record Canvas stream to WebM file"
              >
                <Download size={14} />
                <span>Export Video File</span>
              </button>
            )}

            <button onClick={onClose} style={{ color: 'var(--color-text-muted)', padding: '6px' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Video Canvas Viewport */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000' }}>
          <canvas
            ref={canvasRef}
            width={1024}
            height={576}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />

          {/* Floating Chapter Index Overlays */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              zIndex: 10
            }}
          >
            {VIDEO_CHAPTERS.map(ch => {
              const isActive = currentChapter.id === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setCurrentTime(ch.start);
                    lastSpokenChapterRef.current = -1;
                  }}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    background: isActive ? 'rgba(84, 231, 255, 0.25)' : 'rgba(7, 16, 31, 0.75)',
                    border: isActive ? `1px solid ${ch.themeColor}` : '1px solid rgba(255, 255, 255, 0.1)',
                    color: isActive ? ch.themeColor : 'var(--color-text-muted)',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                  }}
                >
                  {formatTime(ch.start)} • Act {ch.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* Video Player Controls Bar */}
        <div
          style={{
            padding: '16px 24px',
            background: 'rgba(7, 16, 31, 0.95)',
            borderTop: '1px solid rgba(84, 231, 255, 0.15)'
          }}
        >
          {/* Progress Scrubber */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--color-electric-cyan)' }}>
              {formatTime(currentTime)}
            </span>

            <input
              type="range"
              min="0"
              max="180"
              value={currentTime}
              onChange={e => {
                const val = Number(e.target.value);
                setCurrentTime(val);
                lastSpokenChapterRef.current = -1;
              }}
              style={{
                flex: 1,
                cursor: 'pointer',
                accentColor: 'var(--color-electric-cyan)',
                height: '6px'
              }}
            />

            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
              03:00
            </span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="btn-primary"
                style={{ padding: '8px 18px', fontSize: '13px' }}
              >
                {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={() => {
                  setCurrentTime(0);
                  lastSpokenChapterRef.current = -1;
                  setIsPlaying(true);
                }}
                className="btn-secondary"
                style={{ padding: '8px 14px', fontSize: '13px' }}
              >
                <RotateCcw size={14} />
                <span>Restart</span>
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="btn-ghost"
                style={{ fontSize: '13px' }}
                title="Toggle Voiceover Audio"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} color="var(--color-electric-cyan)" />}
                <span>{isMuted ? 'Muted' : 'Narration ON'}</span>
              </button>

              <button
                onClick={() => setShowCaptions(!showCaptions)}
                className="btn-ghost"
                style={{ fontSize: '13px', color: showCaptions ? 'var(--color-electric-cyan)' : 'var(--color-text-muted)' }}
              >
                <Subtitles size={16} />
                <span>Captions</span>
              </button>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              Now Playing: <strong style={{ color: currentChapter.themeColor }}>{currentChapter.title}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
