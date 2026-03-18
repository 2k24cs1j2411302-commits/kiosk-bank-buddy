import { useState } from "react";
import KioskLayout from "@/components/KioskLayout";
import BigButton from "@/components/BigButton";
import { api } from "@/services/mockApi";

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
    { role: "bot", text: "Hello! How can I help you today? You can type a request or use the quick actions below." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
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
      <div className="h-64 border-2 border-border rounded-lg p-4 mb-4 overflow-y-auto">
        {chatLog.map((msg, i) => (
          <div key={i} className={`mb-3 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block px-4 py-2 rounded-2xl text-lg ${
                msg.role === "user"
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {loading && (
          <div className="text-left">
            <span className="inline-block px-4 py-2 rounded-2xl bg-muted text-muted-foreground text-lg">
              Typing...
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {quickActions.map((a) => (
          <button
            key={a}
            onClick={() => sendMessage(a)}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-semibold border-none cursor-pointer text-base"
          >
            {a}
          </button>
        ))}
      </div>

      <input
        className="w-full h-14 text-lg px-4 mb-3 rounded-lg border-2 border-border bg-background text-foreground"
        placeholder="Type your request..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
      />
      <BigButton label="SEND" onClick={() => sendMessage(input)} disabled={loading} />
      <BigButton label="GO BACK" onClick={onBack} variant="secondary" />
    </KioskLayout>
  );
};

export default ChatScreen;
