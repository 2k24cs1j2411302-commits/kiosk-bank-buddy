import { useState } from "react";
import KioskLayout from "@/components/KioskLayout";
import { ArrowLeft, Save } from "lucide-react";

interface Props {
  sessionId: string;
  onSubmit: (data: { phone: string; email: string }) => void;
  onBack: () => void;
}

const UpdateContactScreen = ({ sessionId, onSubmit, onBack }: Props) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  return (
    <KioskLayout title="Update Contact Details" sessionId={sessionId}>
      <div className="kiosk-card mb-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">
            Phone Number
          </label>
          <input
            className="kiosk-input"
            placeholder="Enter new phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">
            Email Address
          </label>
          <input
            className="kiosk-input"
            placeholder="Enter new email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={() => onSubmit({ phone, email })}
        disabled={!phone && !email}
        className="kiosk-btn kiosk-btn-primary"
      >
        <Save size={20} />
        SUBMIT CHANGES
      </button>
      <button onClick={onBack} className="kiosk-btn kiosk-btn-ghost">
        <ArrowLeft size={18} /> Cancel
      </button>
    </KioskLayout>
  );
};

export default UpdateContactScreen;
