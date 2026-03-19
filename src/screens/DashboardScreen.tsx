import { useState, useRef, useEffect } from "react";
import { api } from "@/services/mockApi";
import bankLogo from "@/assets/bank-logo.png";
import {
  Wallet, FileText, ShieldOff, CreditCard, Landmark, MessageSquare,
  Send, Mic, User, CreditCard as CardIcon, ScanFace, Smartphone, Shield
} from "lucide-react";

interface ChatMsg {
  role: "user" | "bot";
  text: string;
}

interface Props {
  sessionId: string;
  onIntentSelected: (intent: string) => void;
}

const services = [
  { label: "Balance & Statement", sub: "Check balance & mini stmt", intent: "CHECK_BALANCE", icon: <Wallet size={22} />, accent: "bg-primary/10 text-primary border-primary/20" },
  { label: "Fund Transfer", sub: "NEFT, RTGS, IMPS & UPI", intent: "MINI_STATEMENT", icon: <CreditCard size={22} />, accent: "bg-destructive/10 text-destructive border-destructive/20" },
  { label: "Card Services", sub: "Block PIN & card mgmt", intent: "BLOCK_CARD", icon: <CardIcon size={22} />, accent: "bg-[hsl(210,60%,50%)]/10 text-[hsl(210,60%,50%)] border-[hsl(210,60%,50%)]/20" },
  { label: "New Account", sub: "Open savings / current", intent: "UPDATE_CONTACT", icon: <User size={22} />, accent: "bg-[hsl(210,60%,50%)]/10 text-[hsl(210,60%,50%)] border-[hsl(210,60%,50%)]/20" },
  { label: "Loans & Apply", sub: "Home, Personal & Gold", intent: "LOAN_ENQUIRY", icon: <Landmark size={22} />, accent: "bg-destructive/10 text-destructive border-destructive/20" },
  { label: "Support & FAQs", sub: "Help, complaints & more", intent: "ESCALATE_AGENT", icon: <MessageSquare size={22} />, accent: "bg-primary/10 text-primary border-primary/20" },
];

const recentTxns = [
  { desc: "NEFT — Ramesh Kumar", date: "12 Mar 2025", amt: "₹ 12,500", type: "debit" },
  { desc: "UPI Credit — GPay", date: "11 Mar 2025", amt: "+ ₹ 8,000", type: "credit" },
  { desc: "ATM Withdrawal", date: "10 Mar 2025", amt: "₹ 5,000", type: "debit" },
];

const quickChips = ["BALANCE", "LOANS", "CARDS", "TRANSFER", "SUPPORT"];

const DashboardScreen = ({ sessionId, onIntentSelected }: Props) => {
  const [chatLog, setChatLog] = useState<ChatMsg[]>([
    { role: "bot", text: "Namaste! Welcome to Citizen Bank. How can I assist you today? I support Hindi, Tamil, Telugu and more." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [authMethod, setAuthMethod] = useState<string | null>(null);
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
        setTimeout(() => onIntentSelected(res.intent), 1500);
      }
    } catch {
      setChatLog([...newLog, { role: "bot", text: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = (method: string) => {
    setAuthMethod(method);
    setAuthenticated(true);
  };

  return (
    <div className="dashboard-shell">
      {/* Top Header Bar */}
      <header className="dashboard-header">
        <div className="flex items-center gap-3">
          <img src={bankLogo} alt="Citizen Bank" className="w-8 h-8" />
          <div>
            <h1 className="text-sm font-bold tracking-wide text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              CITIZEN BANK
            </h1>
            <p className="text-[10px] text-white/50">AI SELF-SERVICE KIOSK (LANDSCAPE)</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-white/60 text-xs">
          <span>{sessionId}</span>
          <span className="status-badge status-badge-success text-[10px] py-0.5 px-2">● Online</span>
        </div>
      </header>

      {/* 3-Column Body */}
      <div className="dashboard-body">
        {/* LEFT — AI Assistant */}
        <aside className="dashboard-left">
          <div className="flex items-center gap-2 mb-3">
            <img src={bankLogo} alt="" className="w-7 h-7" />
            <div>
              <p className="text-sm font-bold text-white">Aria — AI Assistant</p>
              <p className="text-[10px] text-white/40">Citizen Bank AI · Powered by Gen-AI</p>
            </div>
          </div>

          {/* Voice indicator */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-0.5 bg-primary/60 rounded-full" style={{ height: `${8 + Math.random() * 12}px` }} />
              ))}
            </div>
            <p className="text-[10px] text-white/50">Listening? speak or touch a service</p>
          </div>

          {/* Chat */}
          <div ref={chatRef} className="dashboard-chat">
            {chatLog.map((msg, i) => (
              <div key={i} className={`mb-2 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <span className={`dashboard-bubble ${msg.role === "user" ? "dashboard-bubble-user" : "dashboard-bubble-bot"}`}>
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <span className="dashboard-bubble dashboard-bubble-bot opacity-60">Typing...</span>
              </div>
            )}
          </div>

          {/* Quick chips */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {quickChips.map((c) => (
              <button key={c} onClick={() => sendMessage(c.toLowerCase())} className="dashboard-chip">{c}</button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-1.5">
            <input
              className="dashboard-input flex-1"
              placeholder="Type or speak..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <button onClick={() => sendMessage(input)} disabled={loading || !input.trim()} className="dashboard-send-btn">
              <Send size={14} />
            </button>
          </div>
        </aside>

        {/* CENTER — Services + Transactions */}
        <main className="dashboard-center">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              What can we help you with?
            </h2>
            <p className="text-xs text-muted-foreground">Touch a service, speak your request, or insert your card to begin</p>
          </div>

          {/* Service Grid */}
          <div className="grid grid-cols-3 gap-2.5 mb-5">
            {services.map((s) => (
              <button
                key={s.intent}
                onClick={() => onIntentSelected(s.intent)}
                className="dashboard-service-card"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${s.accent}`}>
                  {s.icon}
                </div>
                <div className="mt-2">
                  <p className="text-sm font-semibold text-foreground">{s.label}</p>
                  <p className="text-[10px] text-muted-foreground">{s.sub}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Recent Transactions */}
          <div className="dashboard-txn-section">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-1 h-3.5 bg-primary rounded-full" />
              Recent Transactions (Last Login)
            </h3>
            <div className="space-y-0">
              {recentTxns.map((t, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-xs font-medium text-foreground">{t.desc}</p>
                    <p className="text-[10px] text-muted-foreground">{t.date}</p>
                  </div>
                  <span className={`text-xs font-bold font-mono ${t.type === "credit" ? "text-emerald-600" : "text-primary"}`}>
                    {t.amt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* RIGHT — Auth Panel */}
        <aside className="dashboard-right">
          {/* Auth Methods */}
          <div className="mb-4">
            <h3 className="text-[11px] font-bold text-primary uppercase tracking-wider mb-3">Authenticate to Begin</h3>
            <div className="space-y-2">
              <button onClick={() => handleAuth("card")} className={`dashboard-auth-btn ${authMethod === "card" ? "dashboard-auth-btn-active" : ""}`}>
                <CreditCard size={16} className="text-primary" />
                <div className="text-left flex-1">
                  <p className="text-xs font-semibold">Insert / Tap Card</p>
                  <p className="text-[9px] text-muted-foreground">NFC chip or swipe contactless</p>
                </div>
              </button>
              <button onClick={() => handleAuth("face")} className={`dashboard-auth-btn ${authMethod === "face" ? "dashboard-auth-btn-active" : ""}`}>
                <ScanFace size={16} className="text-muted-foreground" />
                <div className="text-left flex-1">
                  <p className="text-xs font-semibold">Face ID</p>
                  <p className="text-[9px] text-muted-foreground">Camera + biometric verify</p>
                </div>
              </button>
              <button onClick={() => handleAuth("otp")} className={`dashboard-auth-btn ${authMethod === "otp" ? "dashboard-auth-btn-active" : ""}`}>
                <Smartphone size={16} className="text-muted-foreground" />
                <div className="text-left flex-1">
                  <p className="text-xs font-semibold">Mobile OTP</p>
                  <p className="text-[9px] text-muted-foreground">Send OTP to registered number</p>
                </div>
              </button>
            </div>
          </div>

          {/* Authenticated Account Card */}
          {authenticated && (
            <div className="dashboard-account-card">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[10px] font-bold text-primary uppercase tracking-wider">Authenticated Account</h3>
                <Shield size={14} className="text-primary" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-foreground">Priya Sharma</p>
                  <p className="text-[9px] text-muted-foreground font-mono">A/C XXXXXXXX XXXXXXXXXXXX 4521</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Available balance</p>
                  <p className="text-lg font-bold text-primary" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    ₹ 1,84,320
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>N</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <p className="text-[9px] text-emerald-600 font-medium">Secure session • RBI compliant • Encrypted</p>
              </div>
            </div>
          )}

          {!authenticated && (
            <div className="p-4 rounded-xl border-2 border-dashed border-border text-center">
              <User size={24} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Please authenticate to view account details</p>
            </div>
          )}
        </aside>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p className="text-[9px] text-white/30">Citizen Bank AI Kiosk v2.1 • Regulated by Reserve Bank • Data encrypted end-to-end</p>
        <p className="text-[9px] text-white/30">© 2025 Citizen Bank</p>
      </footer>
    </div>
  );
};

export default DashboardScreen;
