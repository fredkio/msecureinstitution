import React, { useState } from 'react';
import { useInstitution } from '../context/InstitutionContext';
import { InstitutionId, PersonaId } from '../types/institution';
import { INITIAL_INSTITUTIONS } from '../data/mockData';
import { ChatTicketExtractorModal } from '../components/modals/ChatTicketExtractorModal';
import {
  Send,
  Paperclip,
  Ticket,
  FolderLock,
  ArrowRight,
  ShieldCheck,
  Building2,
  Lock,
  Plus,
  PhoneOff,
  History,
  MessageSquare,
  CheckCircle2,
  BadgeCheck,
  Archive,
  Search,
  X,
  UserCheck,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const ChatWorkspaceView: React.FC = () => {
  const {
    chatThreads,
    chatMessages,
    sendChatMessage,
    startHierarchicalChat,
    endChatThread,
    openComposer,
    activePersona,
    activeInstitution
  } = useInstitution();

  const [chatTab, setChatTab] = useState<'ACTIVE' | 'HISTORY'>('ACTIVE');
  const [activeThreadId, setActiveThreadId] = useState<string>(chatThreads[0]?.id || 'MSC-CHAT-10382');
  const [inputText, setInputText] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  // New Chat Wizard Modal States
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [targetInstId, setTargetInstId] = useState<InstitutionId>('SUMMIT_BANK');
  const [targetDeptIndex, setTargetDeptIndex] = useState<number>(0);
  const [targetTeam, setTargetTeam] = useState<string>('Fixed Income');
  const [targetPersonaId, setTargetPersonaId] = useState<PersonaId | ''>('ngozi_umeh');
  const [initialMessageText, setInitialMessageText] = useState('');

  // End Chat & Extractor Modal States
  const [isEndChatConfirmOpen, setIsEndChatConfirmOpen] = useState(false);
  const [isExtractorModalOpen, setIsExtractorModalOpen] = useState(false);

  const activeThreads = chatThreads.filter(t => t.status !== 'ENDED');
  const historyThreads = chatThreads.filter(t => t.status === 'ENDED');

  const currentList = (chatTab === 'ACTIVE' ? activeThreads : historyThreads).filter(t =>
    !searchFilter ||
    t.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    t.id.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const currentThread = chatThreads.find(t => t.id === activeThreadId) || currentList[0] || chatThreads[0];
  const messages = (currentThread && chatMessages[currentThread.id]) || [];

  // Profile data for wizard
  const selectedInstitution = INITIAL_INSTITUTIONS[targetInstId];
  const departments = selectedInstitution?.departments || [];
  const selectedDepartment = departments[targetDeptIndex] || departments[0];
  const availableTeams = selectedDepartment?.teams || [];

  const filteredPersonas = selectedInstitution?.personas.filter(p =>
    p.department.toLowerCase().includes(selectedDepartment?.name.toLowerCase()) ||
    selectedDepartment?.name.toLowerCase().includes(p.department.toLowerCase())
  ) || selectedInstitution?.personas || [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !currentThread || currentThread.status === 'ENDED') return;
    sendChatMessage(currentThread.id, inputText);
    setInputText('');
  };

  const handleStartNewChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newThreadId = startHierarchicalChat(
      targetInstId,
      selectedDepartment?.name || 'General Operations',
      targetTeam || availableTeams[0] || 'Operations',
      targetPersonaId ? (targetPersonaId as PersonaId) : undefined,
      initialMessageText || 'Good day, opening institutional communication channel.'
    );
    setActiveThreadId(newThreadId);
    setChatTab('ACTIVE');
    setIsNewChatModalOpen(false);
    setInitialMessageText('');
  };

  const handleConfirmEndChat = () => {
    if (!currentThread) return;
    endChatThread(currentThread.id, 'Formally concluded by participant');
    setIsEndChatConfirmOpen(false);
    // Prompt term extraction upon session closure
    setIsExtractorModalOpen(true);
  };

  return (
    <div className="h-full flex overflow-hidden bg-[#f8fafc] text-slate-900">
      {/* Left: Chat Channels & History Tabs */}
      <div className="w-96 bg-white border-r border-slate-200 flex flex-col h-full shrink-0">
        {/* Header & New Chat Button */}
        <div className="p-5 border-b border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-extrabold text-base text-slate-950">Institutional Chat</h2>
              <p className="text-xs text-slate-500">Verified bilateral desk channels</p>
            </div>
            <button
              onClick={() => setIsNewChatModalOpen(true)}
              className="px-3.5 py-1.5 bg-[#05362a] hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ New Chat</span>
            </button>
          </div>

          {/* Active vs History Tabs */}
          <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
            <button
              onClick={() => setChatTab('ACTIVE')}
              className={`py-1.5 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                chatTab === 'ACTIVE'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'hover:text-slate-900 text-slate-500'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#05362a]" />
              <span>Active ({activeThreads.length})</span>
            </button>
            <button
              onClick={() => setChatTab('HISTORY')}
              className={`py-1.5 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                chatTab === 'HISTORY'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'hover:text-slate-900 text-slate-500'
              }`}
            >
              <History className="w-3.5 h-3.5 text-slate-500" />
              <span>Past History ({historyThreads.length})</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search chat corridors or counterparties..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#05362a]"
            />
          </div>
        </div>

        {/* Channel List */}
        <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
          {currentList.map((thread) => {
            const isSelected = thread.id === activeThreadId;
            const isEnded = thread.status === 'ENDED';

            return (
              <div
                key={thread.id}
                onClick={() => setActiveThreadId(thread.id)}
                className={`p-4 cursor-pointer transition text-left text-xs ${
                  isSelected
                    ? isEnded ? 'bg-slate-100/80 border-l-4 border-slate-500' : 'bg-emerald-50/60 border-l-4 border-[#05362a]'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 truncate flex items-center gap-1.5">
                    {!isEnded && <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />}
                    <span>{thread.title}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-1">{thread.lastMessageTime}</span>
                </div>

                <div className="text-[11px] text-[#05362a] font-semibold truncate flex items-center justify-between">
                  <span>{thread.sourceContext || thread.targetTeam || thread.type}</span>
                  {isEnded && (
                    <span className="px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded text-[9px] font-mono font-bold">
                      CONCLUDED
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-slate-500 truncate mt-1">{thread.lastMessageText}</div>
              </div>
            );
          })}

          {currentList.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-xs">
              {chatTab === 'ACTIVE' ? 'No active conversations. Start a new chat above.' : 'No archived chat history.'}
            </div>
          )}
        </div>
      </div>

      {/* Right: Message Stream Canvas */}
      <div className="flex-1 flex flex-col h-full bg-[#f8fafc] overflow-hidden">
        {currentThread ? (
          <>
            {/* Top Channel Header Ribbon */}
            <div className="px-8 py-4 border-b border-slate-200 bg-white flex items-center justify-between shadow-xs">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <h2 className="font-bold text-base text-slate-950">{currentThread.title}</h2>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    currentThread.status === 'ENDED'
                      ? 'bg-slate-100 text-slate-700 border-slate-300'
                      : 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  }`}>
                    {currentThread.status === 'ENDED' ? '• CONCLUDED SESSION' : '• ACTIVE VERIFIED CHANNEL'}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  Channel Ref: <span className="font-mono font-bold text-slate-700">{currentThread.id}</span>
                  {currentThread.targetPersonaTitle && ` • ${currentThread.targetPersonaTitle}`}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* AI TERM EXTRACTOR & TICKET BUTTON */}
                <button
                  onClick={() => setIsExtractorModalOpen(true)}
                  className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#05362a] border border-emerald-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Extract terms from chat transcript into editable trade ticket"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Extract Trade Ticket</span>
                </button>

                {currentThread.status !== 'ENDED' && (
                  <>
                    <button
                      onClick={() => openComposer('case')}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <FolderLock className="w-3.5 h-3.5" />
                      <span>Convert to Case</span>
                    </button>

                    {/* PROMINENT END CHAT BUTTON */}
                    <button
                      onClick={() => setIsEndChatConfirmOpen(true)}
                      className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      title="End and formally close this chat session"
                    >
                      <PhoneOff className="w-3.5 h-3.5 text-rose-700" />
                      <span>End Chat</span>
                    </button>
                  </>
                )}

                {currentThread.status === 'ENDED' && (
                  <button
                    onClick={() => {
                      if (currentThread.targetInstitutionId) {
                        setTargetInstId(currentThread.targetInstitutionId);
                        if (currentThread.targetPersonaId) setTargetPersonaId(currentThread.targetPersonaId);
                        setIsNewChatModalOpen(true);
                      }
                    }}
                    className="px-4 py-2 bg-[#05362a] hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Start New Chat with Counterpart →</span>
                  </button>
                )}
              </div>
            </div>

            {/* Formally Ended / Archived Banner */}
            {currentThread.status === 'ENDED' && (
              <div className="bg-slate-100 border-b border-slate-200 px-8 py-3 flex items-center justify-between text-xs text-slate-700">
                <div className="flex items-center space-x-2">
                  <Archive className="w-4 h-4 text-slate-500" />
                  <span>
                    This conversation was formally concluded on <strong className="font-mono text-slate-900">{currentThread.endedAt}</strong> by {currentThread.endedBy}. All historical records are permanently preserved.
                  </span>
                </div>
                <button
                  onClick={() => setIsExtractorModalOpen(true)}
                  className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#05362a] border border-emerald-300 rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1 font-mono"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Extract Ticket from History →</span>
                </button>
              </div>
            )}

            {/* Messages Stream */}
            <div className="flex-1 overflow-y-auto p-8 space-y-4 max-w-4xl mx-auto w-full">
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-center text-xs text-emerald-950 flex items-center justify-center gap-2 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#05362a]" />
                <span>Mutual authenticated corridor active between {activeInstitution.displayName} and {currentThread.title.split('—')[0]}.</span>
              </div>

              {messages.map((msg) => {
                const isMe = msg.senderPersonaId === activePersona.id;
                const isSystem = msg.classification === 'RESTRICTED';

                if (isSystem) {
                  return (
                    <div key={msg.id} className="p-3 bg-slate-200/80 border border-slate-300 rounded-xl text-center text-xs text-slate-800 font-medium">
                      {msg.text}
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className="text-[10px] text-slate-400 mb-1 px-1">
                      <strong className="text-slate-600">{msg.senderName}</strong> ({msg.senderInstitution}) • {msg.timestamp}
                    </div>

                    <div
                      className={`max-w-lg p-4 rounded-2xl text-xs leading-relaxed shadow-xs ${
                        isMe
                          ? 'bg-[#05362a] text-white rounded-br-xs'
                          : 'bg-white text-slate-900 border border-slate-200/90 rounded-bl-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Form (Disabled if session is ENDED) */}
            {currentThread.status !== 'ENDED' ? (
              <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex items-center space-x-3 shadow-xs">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Type verified message to ${currentThread.title}...`}
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#05362a]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#05362a] hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            ) : (
              <div className="p-4 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-500">
                This chat session is closed. To initiate a new conversation with this counterparty, click <strong>"Start New Chat with Counterpart"</strong> above.
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
            Select a conversation thread or start a new chat.
          </div>
        )}
      </div>

      {/* AI CHAT TICKET EXTRACTOR MODAL */}
      <ChatTicketExtractorModal
        isOpen={isExtractorModalOpen}
        onClose={() => setIsExtractorModalOpen(false)}
        thread={currentThread}
      />

      {/* 3-STEP CORRIDOR SELECTION MODAL */}
      {isNewChatModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#05362a] flex items-center justify-center font-bold">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-950">Initiate New Chat Corridor</h3>
                  <p className="text-[11px] text-slate-500">3-Step verified institutional routing</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewChatModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleStartNewChatSubmit} className="p-6 space-y-5 text-xs">
              {/* STEP 1: SELECT BANK / INSTITUTION */}
              <div className="space-y-1.5">
                <label className="block text-slate-700 font-bold flex items-center justify-between">
                  <span>1. Select Profiled Institution / Bank</span>
                  <span className="text-[10px] text-slate-400 font-mono">Step 1 of 3</span>
                </label>
                <select
                  value={targetInstId}
                  onChange={(e) => {
                    setTargetInstId(e.target.value as InstitutionId);
                    setTargetDeptIndex(0);
                    setTargetPersonaId('');
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-bold focus:outline-none focus:border-[#05362a]"
                >
                  {Object.values(INITIAL_INSTITUTIONS).filter(inst => inst.id !== activeInstitution.id).map((inst) => (
                    <option key={inst.id} value={inst.id}>
                      {inst.legalName} ({inst.typeLabel.split('(')[0]})
                    </option>
                  ))}
                </select>
              </div>

              {/* STEP 2: SELECT DEPARTMENT & UNIT */}
              <div className="space-y-1.5">
                <label className="block text-slate-700 font-bold flex items-center justify-between">
                  <span>2. Select Functional Department & Desk Unit</span>
                  <span className="text-[10px] text-slate-400 font-mono">Step 2 of 3</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-500 mb-1 block font-medium">Department:</span>
                    <select
                      value={targetDeptIndex}
                      onChange={(e) => {
                        const idx = parseInt(e.target.value);
                        setTargetDeptIndex(idx);
                        setTargetTeam(departments[idx]?.teams[0] || '');
                        setTargetPersonaId('');
                      }}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
                    >
                      {departments.map((dept, idx) => (
                        <option key={dept.name} value={idx}>{dept.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-500 mb-1 block font-medium">Desk Unit / Team:</span>
                    <select
                      value={targetTeam}
                      onChange={(e) => setTargetTeam(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
                    >
                      {availableTeams.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* STEP 3: SELECT INDIVIDUAL WITHIN UNIT */}
              <div className="space-y-1.5">
                <label className="block text-slate-700 font-bold flex items-center justify-between">
                  <span>3. Select Individual Officer / Signatory</span>
                  <span className="text-[10px] text-slate-400 font-mono">Step 3 of 3</span>
                </label>
                <div className="space-y-2 max-h-44 overflow-y-auto border border-slate-200 rounded-2xl p-2 bg-slate-50/50">
                  {filteredPersonas.map((p) => {
                    const isSelected = targetPersonaId === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setTargetPersonaId(p.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-50 border-[#05362a] text-slate-950 font-bold shadow-2xs'
                            : 'bg-white border-slate-200/80 hover:bg-slate-100/80 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                            isSelected ? 'bg-[#05362a] text-white' : 'bg-slate-200 text-slate-800'
                          }`}>
                            {p.avatarInitials}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-950">{p.name}</div>
                            <div className="text-[11px] text-slate-500 font-normal">{p.title}</div>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded text-[10px] font-mono font-bold">
                          {p.roleType}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Initial Message */}
              <div className="space-y-1.5">
                <label className="block text-slate-700 font-bold">Initial Inquiry Message</label>
                <input
                  type="text"
                  value={initialMessageText}
                  onChange={(e) => setInitialMessageText(e.target.value)}
                  placeholder="e.g. Good morning, initiating interbank inquiry on settlement trace..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-[#05362a]"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewChatModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#05362a] hover:bg-emerald-900 text-white font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <span>Open Chat Corridor →</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* END CHAT CONFIRMATION MODAL */}
      {isEndChatConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-md p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                <PhoneOff className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-950">End Active Chat Session?</h3>
                <p className="text-xs text-slate-500">Ref: {currentThread?.id}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              Ending this chat will formally conclude this session with <strong className="text-slate-900">{currentThread?.title}</strong>. All messages and attachments will be permanently archived into immutable chat history. Future discussions with this desk will begin in a fresh thread.
            </p>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEndChatConfirmOpen(false)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold cursor-pointer"
              >
                Keep Active
              </button>
              <button
                type="button"
                onClick={handleConfirmEndChat}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <PhoneOff className="w-4 h-4" />
                <span>Confirm End & Extract Ticket ✨</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
