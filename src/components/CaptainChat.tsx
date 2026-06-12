import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Anchor, ChevronDown } from 'lucide-react';
import { useT } from '../translations';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isWelcome?: boolean;
}

export default function CaptainChat() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '', isWelcome: true },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
      }, 150);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const quickPrompts = [
    t('chatQuick1'),
    t('chatQuick2'),
    t('chatQuick3'),
    t('chatQuick4'),
  ];

  const send = useCallback(async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = { role: 'user', content };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);

    const apiMessages = next
      .filter(m => !m.isWelcome)
      .map(m => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });
      const data = await res.json();
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.text || "Couldn't get a response — try again." },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Lost the signal out here — give it another shot." },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [input, messages, loading]);

  return (
    <>
      {/* Floating trigger button + label */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1.5">
        <motion.button
          onClick={() => setOpen(v => !v)}
          className="h-14 w-14 rounded-full flex items-center justify-center shadow-2xl relative"
          style={{ background: 'linear-gradient(135deg, #0a2620 0%, #071a14 100%)', border: '1px solid rgba(20,184,166,0.35)' }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Chat with Captain Jorge"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <ChevronDown size={20} className="text-teal-400" />
              </motion.span>
            ) : (
              <motion.span key="anchor" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Anchor size={20} className="text-teal-400" />
              </motion.span>
            )}
          </AnimatePresence>
          {!open && (
            <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-teal-400 animate-pulse border-2 border-[#071a14]" />
          )}
        </motion.button>
        {!open && (
          <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-teal-300 select-none">
            CHAT
          </span>
        )}
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              width: 'min(380px, calc(100vw - 24px))',
              maxHeight: 'calc(100vh - 110px)',
              background: 'linear-gradient(160deg, #071a14 0%, #050d0a 100%)',
              border: '1px solid rgba(255,255,255,0.09)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-black/25 shrink-0">
              <div className="h-9 w-9 rounded-full bg-teal-500/12 border border-teal-500/30 flex items-center justify-center shrink-0">
                <Anchor size={16} className="text-teal-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white leading-none">Captain Jorge</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <p className="text-[10px] font-mono text-teal-400/75 tracking-wide">{t('chatStatus')}</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-white/35 hover:text-white/70 hover:bg-white/8 transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.role === 'assistant' && (
                    <div className="h-6 w-6 rounded-full bg-teal-500/12 border border-teal-500/25 flex items-center justify-center shrink-0 mt-0.5">
                      <Anchor size={11} className="text-teal-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] px-3 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-teal-600/18 border border-teal-500/25 text-white/90 rounded-2xl rounded-tr-sm'
                        : 'bg-white/6 border border-white/8 text-white/80 rounded-2xl rounded-tl-sm'
                    }`}
                  >
                    {msg.isWelcome ? t('chatWelcome') : msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2.5">
                  <div className="h-6 w-6 rounded-full bg-teal-500/12 border border-teal-500/25 flex items-center justify-center shrink-0">
                    <Anchor size={11} className="text-teal-400" />
                  </div>
                  <div className="bg-white/6 border border-white/8 rounded-2xl rounded-tl-sm px-3.5 py-3.5 flex gap-1.5 items-center">
                    {[0, 120, 240].map(delay => (
                      <span
                        key={delay}
                        className="h-1.5 w-1.5 rounded-full bg-teal-400/50 animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick prompts — only shown initially */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {quickPrompts.map(q => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-[10px] font-mono text-teal-300/65 border border-teal-500/20 rounded-full px-2.5 py-1 hover:border-teal-500/50 hover:text-teal-300 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input row */}
            <div className="px-3 pb-3 pt-2 border-t border-white/8 shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') send(); }}
                  placeholder={t('chatPlaceholder')}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/22 outline-none focus:border-teal-500/45 focus:bg-white/8 transition-all"
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  className="h-10 w-10 rounded-xl bg-teal-600/18 border border-teal-500/28 flex items-center justify-center text-teal-400 hover:bg-teal-600/30 transition-colors disabled:opacity-35 disabled:cursor-not-allowed shrink-0"
                >
                  <Send size={15} />
                </button>
              </div>
              <p className="text-[9px] font-mono text-white/12 text-center mt-2 tracking-wide">
                {t('chatPowered')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
