import React from 'react'

interface Props {
  role: "user" | "assistant",
  content: string
}

const MessageBubble = ({ role, content }: Props) => {
  const isUser = role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      
      <div
        className={`
          px-4 py-2 rounded-2xl text-sm leading-relaxed
          max-w-[75%] whitespace-pre-wrap
          ${isUser 
            ? "bg-black text-white rounded-br-md" 
            : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"}
        `}
      >
        {content}
      </div>

    </div>
  )
}

export default MessageBubble