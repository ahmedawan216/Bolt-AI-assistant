'use client'
import React, { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import MessageList from './components/MessageList'
import ChatInput from './components/ChatInput'

interface Message {
  role: "user" | "assistant"
  content: string
}

const Page = () => {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<Message[]>([])

  const bottomRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" })
}, [history])

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true)

    const userMessage: Message = { role: "user", content: input }
    const newMessages = [...history, userMessage]

    setHistory(newMessages)
    setInput("")

    try {
    const req = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages })
    })

    if (!req.ok) throw new Error("Request Failed")

    const res = await req.json()

    setHistory(prev => [
      ...prev, { role: "assistant", content: res?.content || "No response" }
    ])
  } catch (error) {
    console.error(error)
  }
  setLoading(false)
}

  return (
  <div className="flex h-screen bg-white overflow-hidden">

    {/* 🔥 Sidebar */}
    <div className="w-[260px] bg-gray-100 border-r border-gray-200 p-4">
      <h2 className="font-bold text-lg mb-4">Chats</h2>
      <div className="text-sm text-gray-500">
        No conversations yet
      </div>
    </div>

    {/* 🔥 Main Chat Area */}
    <div className="flex flex-col flex-1 h-full relative overflow-hidden">
      <Navbar />

      <div className="flex-1 overflow-hidden">
  <MessageList 
    history={history}
    bottomRef={bottomRef}
    loading={loading}
  />
</div>

      <ChatInput 
      input={input}
      setInput={setInput}
      loading={loading}
      handleSendMessage={handleSendMessage}  
          />

    </div>
  </div>
)
}
export default Page
