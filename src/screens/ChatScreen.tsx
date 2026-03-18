import { useState, useRef, useEffect } from "react";
import KioskLayout from "@/components/KioskLayout";
import { api } from "@/services/mockApi";
import { Send, ArrowLeft } from "lucide-react";

interface ChatMsg {
  role: "user" | "bot";
  text: string;
}

interface Props {
  sessionId: string;
  onIntentDetected: (intent: string) => void;
  onBack: () => void;
}

const quickActions = ["Check Balance", "Mini Statement", "Block Card", "Loan Info", "Talk to Agent"];

const ChatScreen = ({ sessionId, onIntentDetected, onBack }: Props) => {
  const [chatLog, setChatLog] = useState<ChatMsg[]>([
    { role: "bot", text: "Hello! I'm your banking assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatLog, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const newLog: ChatMsg[] = [...chatLog, { role: "user", text }];
    setChatLog(newLog);
    setInput("");
    setLoading(true);

    try {
      const res = await api.sendMessage(text);
      setChatLog([...newLog, { role: "bot", text: res.reply }]);
      if (res.intent !== "UNKNOWN") {
        setTimeout(() => onIntentDetected(res.intent), 1500);
      }
    } catch {
      setChatLog([...newLog, { role: "bot", text: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KioskLayout title="AI Assistant" sessionId={sessionId}>
      <div ref={chatRef} className="h-56 border border-border rounded-xl p-4 mb-4 overflow-y-auto bg-secondary/50">
        {chatLog.map((msg, i) => (
          <div key={i} className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <span className={`chat-bubble ${msg.role === "user" ? "chat-bubble-user" : "chat-bubble-bot"}`}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <span className="chat-bubble chat-bubble-bot opacity-60">Typing...</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {quickActions.map((a) => (
          <button key={a} onClick={() => sendMessage(a)} className="quick-chip">{a}</button>
        ))}
      </div>

      <div className="flex gap-2 mb-3">
        <input
          className="kiosk-input flex-1"
          placeholder="Type your request..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
          className="kiosk-btn kiosk-btn-primary !w-16 !mb-0 flex-shrink-0"
        >
          <Send size={20} />
        </button>
      </div>

      <button onClick={onBack} className="kiosk-btn kiosk-btn-ghost">
        <ArrowLeft size={18} /> Back to Services
      </button>
    </KioskLayout>
  );
};

export default ChatScreen;
