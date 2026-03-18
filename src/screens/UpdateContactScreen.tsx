import { useState } from "react";
import KioskLayout from "@/components/KioskLayout";
import BigButton from "@/components/BigButton";

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
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-lg font-semibold mb-2">Phone Number</label>
          <input
            className="w-full h-14 text-lg px-4 rounded-lg border-2 border-border bg-background text-foreground"
            placeholder="Enter new phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Email Address</label>
          <input
            className="w-full h-14 text-lg px-4 rounded-lg border-2 border-border bg-background text-foreground"
            placeholder="Enter new email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <BigButton label="SUBMIT" onClick={() => onSubmit({ phone, email })} disabled={!phone && !email} />
      <BigButton label="CANCEL" onClick={onBack} variant="secondary" />
    </KioskLayout>
  );
};

export default UpdateContactScreen;
