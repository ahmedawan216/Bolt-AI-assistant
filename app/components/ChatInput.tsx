import React, { useEffect } from 'react'

interface Props {
  input: string,
  setInput: (value: string) => void,
  loading: boolean,
  handleSendMessage: () => void
}

const ChatInput = ({ input, setInput, loading, handleSendMessage }: Props) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    
    React.useEffect(() => {
      const textarea = textareaRef.current
      if (textarea) {
        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }, [input])

    useEffect(() => {
      textareaRef.current?.focus()
    }, [])

  return (    
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
  <div className="max-w-3xl mx-auto flex gap-3 items-end">
    
    <textarea
      onChange={(e) => setInput(e.target.value)}
      value={input}
      ref={textareaRef}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault()
          handleSendMessage();
        }
      }}
      placeholder="Ask anything..."
      rows={1}
      className="resize-none flex-grow border border-gray-300 rounded-2xl px-4 py-3 
      focus:outline-none focus:border-black max-h-40 overflow-y-auto text-sm"
    />

    <button
      onClick={handleSendMessage}
      disabled={!input.trim() || loading}
      className="bg-black text-white px-6 py-3 cursor-pointer rounded-lg hover:bg-gray-800 transition"
    >
      Send
    </button>

  </div>
</div>
  )
}

export default ChatInput