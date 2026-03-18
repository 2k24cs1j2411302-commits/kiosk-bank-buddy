import KioskLayout from "@/components/KioskLayout";
import { Wallet, FileText, ShieldOff, Phone, Landmark, Headphones, MessageSquare } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  sessionId: string;
  onSelect: (intent: string) => void;
  onChat: () => void;
}

const services: { label: string; intent: string; icon: ReactNode; color: string }[] = [
  { label: "Check Balance", intent: "CHECK_BALANCE", icon: <Wallet size={22} />, color: "service-icon-red" },
  { label: "Mini Statement", intent: "MINI_STATEMENT", icon: <FileText size={22} />, color: "service-icon-dark" },
  { label: "Block Card", intent: "BLOCK_CARD", icon: <ShieldOff size={22} />, color: "service-icon-red" },
  { label: "Update Contact", intent: "UPDATE_CONTACT", icon: <Phone size={22} />, color: "service-icon-dark" },
  { label: "Loan Enquiry", intent: "LOAN_ENQUIRY", icon: <Landmark size={22} />, color: "service-icon-red" },
  { label: "Talk to Agent", intent: "ESCALATE_AGENT", icon: <Headphones size={22} />, color: "service-icon-dark" },
];

const ServicesScreen = ({ sessionId, onSelect, onChat }: Props) => (
  <KioskLayout title="How can we help you?" sessionId={sessionId}>
    <div className="grid grid-cols-2 gap-3 mb-4">
      {services.map((s) => (
        <button key={s.intent} onClick={() => onSelect(s.intent)} className="service-grid-btn">
          <div className={`service-icon ${s.color}`}>{s.icon}</div>
          <span className="text-base font-semibold">{s.label}</span>
        </button>
      ))}
    </div>
    <button onClick={onChat} className="kiosk-btn kiosk-btn-secondary">
      <MessageSquare size={20} />
      AI Assistant — Ask Anything
    </button>
  </KioskLayout>
);

export default ServicesScreen;
