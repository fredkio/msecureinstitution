import React, { useState } from 'react';
import { useInstitution } from '../context/InstitutionContext';
import { FormalMessage } from '../types/institution';
import {
  Inbox,
  Send,
  FolderLock,
  Clock,
  CheckCircle,
  Paperclip,
  Plus,
  ArrowRight,
  ShieldCheck,
  Building2,
  Reply
} from 'lucide-react';

export const MessagesInboxView: React.FC = () => {
  const {
    formalMessages,
    replyToFormalMessage,
    convertMessageToCase,
    openComposer,
    activePersona,
    activeInstitution
  } = useInstitution();

  const [inboxTab, setInboxTab] = useState<'MY' | 'TEAM' | 'INSTITUTION'>('MY');
  const [selectedMessageId, setSelectedMessageId] = useState<string>(formalMessages[0]?.id || 'MSC-MSG-28382');
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const filteredMessages = formalMessages.filter(m => {
    if (inboxTab === 'MY') return m.recipientPersonaId === activePersona.id || m.senderPersonaId === activePersona.id;
    if (inboxTab === 'TEAM') return m.recipientTeam === activePersona.team || m.senderTeam === activePersona.team;
    return true;
  });

  const currentMessage = formalMessages.find(m => m.id === selectedMessageId) || filteredMessages[0] || formalMessages[0];

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !currentMessage) return;
    replyToFormalMessage(currentMessage.id, replyText);
    setReplyText('');
    setIsReplying(false);
  };

  return (
    <div className="h-full flex overflow-hidden bg-[#f8fafc] text-slate-900">
      {/* Left: Inboxes List */}
      <div className="w-96 bg-white border-r border-slate-200 flex flex-col h-full shrink-0">
        <div className="p-5 border-b border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-extrabold text-base text-slate-900">Institutional Inboxes</h2>
              <p className="text-xs text-slate-500">Formal bilateral dispatches</p>
            </div>
            <button
              onClick={() => openComposer('message')}
              className="px-3 py-1.5 bg-[#05362a] hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              + Dispatch
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-semibold text-slate-600">
            <button
              onClick={() => setInboxTab('MY')}
              className={`py-1.5 rounded-lg transition cursor-pointer ${
                inboxTab === 'MY' ? 'bg-white text-slate-950 font-bold shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              My Inbox
            </button>
            <button
              onClick={() => setInboxTab('TEAM')}
              className={`py-1.5 rounded-lg transition cursor-pointer ${
                inboxTab === 'TEAM' ? 'bg-white text-slate-950 font-bold shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Team Inbox
            </button>
            <button
              onClick={() => setInboxTab('INSTITUTION')}
              className={`py-1.5 rounded-lg transition cursor-pointer ${
                inboxTab === 'INSTITUTION' ? 'bg-white text-slate-950 font-bold shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Institution
            </button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
          {filteredMessages.map((msg) => {
            const isSelected = msg.id === selectedMessageId;
            return (
              <div
                key={msg.id}
                onClick={() => setSelectedMessageId(msg.id)}
                className={`p-4 cursor-pointer transition text-left text-xs ${
                  isSelected ? 'bg-emerald-50/60 border-l-4 border-[#05362a]' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-bold text-xs text-[#05362a]">{msg.id}</span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    msg.status === 'CONVERTED_TO_CASE' ? 'bg-blue-50 text-blue-800' :
                    msg.status === 'DELIVERED' ? 'bg-amber-50 text-amber-800' :
                    'bg-emerald-50 text-emerald-800'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>{msg.status.replace('_', ' ')}</span>
                  </span>
                </div>

                <div className="font-bold text-slate-900 text-xs truncate mt-1">{msg.subject}</div>
                <div className="text-[11px] text-slate-500 mt-1 truncate">
                  {msg.senderInstitutionName} → {msg.recipientInstitutionName}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                  <span>{msg.createdAt}</span>
                  <span className="text-amber-800 font-semibold font-sans">{msg.priority}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Message Detail & Thread */}
      <div className="flex-1 flex flex-col h-full bg-[#f8fafc] overflow-hidden">
        {currentMessage ? (
          <>
            {/* Top Action Ribbon */}
            <div className="px-8 py-4 border-b border-slate-200 bg-white flex items-center justify-between shadow-xs">
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold text-sm text-[#05362a]">{currentMessage.id}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-900 font-bold">{currentMessage.subject}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsReplying(true)}
                  className="px-3.5 py-2 bg-[#05362a] hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </button>
                <button
                  onClick={() => convertMessageToCase(currentMessage.id)}
                  className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <FolderLock className="w-3.5 h-3.5" />
                  <span>Convert to Formal Case</span>
                </button>
              </div>
            </div>

            {/* Scrollable Message Details */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 text-xs max-w-4xl mx-auto w-full">
              {/* Main Message Card */}
              <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-4 shadow-sm">
                <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                  <div>
                    <h1 className="text-base font-bold text-slate-900">{currentMessage.subject}</h1>
                    <div className="text-[11px] text-slate-500 mt-1">
                      From: <strong className="text-slate-900">{currentMessage.senderName}</strong> ({currentMessage.senderInstitutionName})
                    </div>
                    <div className="text-[11px] text-slate-500">
                      To: <strong className="text-slate-900">{currentMessage.recipientTeam}</strong> ({currentMessage.recipientInstitutionName})
                    </div>
                  </div>
                  <div className="text-right font-mono text-[11px] text-slate-400">
                    <div>Sent: {currentMessage.createdAt}</div>
                    {currentMessage.responseDeadline && (
                      <div className="text-amber-800 font-bold mt-1">SLA Target: {currentMessage.responseDeadline}</div>
                    )}
                  </div>
                </div>

                <div className="leading-relaxed text-slate-800 text-xs whitespace-pre-wrap font-sans bg-slate-50 p-5 rounded-xl border border-slate-100">
                  {currentMessage.body}
                </div>

                {currentMessage.attachments && currentMessage.attachments.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="text-slate-400 font-bold text-[10px] uppercase font-mono">Attachments</div>
                    {currentMessage.attachments.map((att) => (
                      <div key={att.name} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Paperclip className="w-4 h-4 text-[#05362a]" />
                          <span className="font-mono text-slate-900 font-bold">{att.name}</span>
                        </div>
                        <span className="text-slate-400 font-mono text-[11px]">{att.size}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Thread Replies */}
              {currentMessage.replies && currentMessage.replies.length > 0 && (
                <div className="space-y-3">
                  <div className="font-bold text-xs text-slate-400 uppercase tracking-wider font-mono">Thread Responses</div>
                  {currentMessage.replies.map((rep) => (
                    <div key={rep.id} className="p-5 bg-white border border-slate-200/90 rounded-2xl space-y-2 shadow-sm">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-bold text-slate-900">{rep.senderName} ({rep.senderInstitution})</span>
                        <span className="text-slate-400 font-mono">{rep.timestamp}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed text-xs">{rep.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reply Modal */}
            {isReplying && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-sm text-slate-900">Reply to Bilateral Message</h3>
                    <button onClick={() => setIsReplying(false)} className="text-slate-400 hover:text-slate-800">✕</button>
                  </div>

                  <form onSubmit={handleReplySubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Reply Message</label>
                      <textarea
                        rows={4}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-[#05362a]"
                        placeholder="Type official reply to counterparty..."
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsReplying(false)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#05362a] hover:bg-emerald-900 text-white font-bold rounded-xl shadow"
                      >
                        Send Reply
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
            Select a message to inspect.
          </div>
        )}
      </div>
    </div>
  );
};
