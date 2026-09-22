import React, { useState } from 'react'
import type { ChatMessage } from '@/types'
import { Send, User, ShieldCheck, CheckCheck } from 'lucide-react'

export const MessengerView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'owner' | 'housekeeping'>('owner')
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const [ownerMessages, setOwnerMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'owner',
      text: 'Hello! Welcome to UrbanNest PG. We have confirmed your visit request for Sept 22nd at 10 AM.',
      timestamp: '10:30 AM',
    },
    {
      id: 'm2',
      sender: 'user',
      text: 'Thanks! Is parking available for two-wheelers in Block B?',
      timestamp: '10:32 AM',
      status: 'read',
    },
    {
      id: 'm3',
      sender: 'owner',
      text: 'Yes, we have covered basement parking with 24/7 CCTV surveillance.',
      timestamp: '10:35 AM',
    },
  ])

  const [housekeepingMessages, setHousekeepingMessages] = useState<ChatMessage[]>([
    {
      id: 'h1',
      sender: 'housekeeping',
      text: 'Daily room cleaning for 3rd floor starts at 11:00 AM today.',
      timestamp: '09:00 AM',
    },
  ])

  const currentMessages = activeTab === 'owner' ? ownerMessages : housekeepingMessages

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    }

    if (activeTab === 'owner') {
      setOwnerMessages((prev) => [...prev, newMsg])
      setInputText('')
      setIsTyping(true)

      setTimeout(() => {
        setIsTyping(false)
        setOwnerMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'owner',
            text: 'Got it! Feel free to ask if you need anything else before your visit.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ])
      }, 1500)
    } else {
      setHousekeepingMessages((prev) => [...prev, newMsg])
      setInputText('')
    }
  }

  return (
    <div className="shadow-soft flex h-[460px] flex-col overflow-hidden rounded-3xl border border-[#214956]/10 bg-white">
      {/* Tab Switcher Header */}
      <div className="flex items-center justify-around border-b border-[#214956]/10 bg-[#FAF6F0] p-3">
        <button
          onClick={() => setActiveTab('owner')}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-center text-xs font-bold transition-all ${
            activeTab === 'owner'
              ? 'shadow-soft bg-[#214956] text-white'
              : 'text-[#64748B] hover:text-[#214956]'
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5 text-[#F87A50]" /> PG Owner
        </button>

        <button
          onClick={() => setActiveTab('housekeeping')}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-center text-xs font-bold transition-all ${
            activeTab === 'housekeeping'
              ? 'shadow-soft bg-[#214956] text-white'
              : 'text-[#64748B] hover:text-[#214956]'
          }`}
        >
          <User className="h-3.5 w-3.5 text-emerald-400" /> Housekeeping
        </button>
      </div>

      {/* Messages Timeline */}
      <div className="flex-1 space-y-3 overflow-y-auto bg-[#FDFBF7] p-4">
        {currentMessages.map((msg) => {
          const isUser = msg.sender === 'user'

          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                  isUser
                    ? 'rounded-br-none bg-[#214956] text-white'
                    : 'rounded-bl-none border border-[#214956]/10 bg-white text-[#1A202C]'
                }`}
              >
                <p>{msg.text}</p>
                <div
                  className={`mt-1 flex items-center justify-end gap-1 font-mono text-[10px] ${
                    isUser ? 'text-slate-300' : 'text-[#64748B]'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {isUser && <CheckCheck className="h-3 w-3 text-emerald-300" />}
                </div>
              </div>
            </div>
          )
        })}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-none border border-[#214956]/10 bg-white px-3 py-2 text-xs text-[#64748B]">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#214956]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#214956] [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#214956] [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 border-t border-[#214956]/10 bg-white p-3"
      >
        <input
          type="text"
          placeholder={`Message ${activeTab === 'owner' ? 'PG Owner' : 'Housekeeping'}...`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 rounded-xl border border-[#214956]/15 bg-[#FAF6F0] px-3 py-2 text-xs font-medium text-[#1A202C] focus:border-[#214956] focus:outline-none"
        />
        <button
          type="submit"
          className="shadow-soft rounded-xl bg-[#214956] p-2.5 text-white transition-all hover:bg-[#1A3843] active:scale-95"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}
