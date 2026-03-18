import KioskLayout from "@/components/KioskLayout";

interface Props {
  sessionId: string;
  onSelect: (intent: string) => void;
  onChat: () => void;
}

const services = [
  { label: "Check Balance", intent: "CHECK_BALANCE" },
  { label: "Mini Statement", intent: "MINI_STATEMENT" },
  { label: "Block Card", intent: "BLOCK_CARD" },
  { label: "Update Contact", intent: "UPDATE_CONTACT" },
  { label: "Loan Enquiry", intent: "LOAN_ENQUIRY" },
  { label: "Talk to Agent", intent: "ESCALATE_AGENT" },
];

const ServicesScreen = ({ sessionId, onSelect, onChat }: Props) => (
  <KioskLayout title="Select a Service" sessionId={sessionId}>
    <div className="grid grid-cols-2 gap-4">
      {services.map((s) => (
        <button
          key={s.intent}
          onClick={() => onSelect(s.intent)}
          className="h-24 text-xl font-semibold rounded-lg bg-primary text-primary-foreground border-none cursor-pointer"
        >
          {s.label}
        </button>
      ))}
    </div>
    <div className="mt-6">
      <button
        onClick={onChat}
        className="w-full h-20 text-xl font-semibold rounded-lg bg-secondary text-secondary-foreground border-none cursor-pointer"
      >
        AI Assistant
      </button>
    </div>
  </KioskLayout>
);

export default ServicesScreen;
