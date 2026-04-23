import React from 'react'
import MessageBubble from "./MessageBubble";

interface Message {
  role: "user" | "assistant",
  content: string
}

interface Props {
  history: Message[]
  bottomRef: React.RefObject<HTMLDivElement>
  loading: boolean
}

const MessageList = ({ history, bottomRef, loading }: Props) => {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-6">
      
      {/* CENTERED CHAT CONTAINER */}
      <div className="max-w-5xl mx-auto w-full px-4 flex flex-col gap-4">
        
        {history.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            Start a conversation!
          </div>
        )}

        {history.map((message, index) => (
          <MessageBubble
            key={index}
            role={message.role}
            content={message.content}
          />
        ))}

        {loading && (
          <div className="text-sm text-gray-400">
            AI is thinking...
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  )
}

export default MessageList