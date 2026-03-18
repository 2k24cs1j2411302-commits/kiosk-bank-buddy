import { useState } from "react";
import KioskLayout from "@/components/KioskLayout";
import { api } from "@/services/mockApi";
import { ShieldCheck, ArrowLeft } from "lucide-react";

interface Props {
  sessionId: string;
  onVerified: () => void;
  onBack: () => void;
}

const OtpScreen = ({ sessionId, onVerified, onBack }: Props) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    setLoading(true);
    setError("");
    try {
      await api.verifyOtp(otp);
      onVerified();
    } catch {
      setError("Invalid OTP. For demo, use: 123456");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KioskLayout title="Identity Verification" sessionId={sessionId}>
      <div className="kiosk-card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="service-icon service-icon-red">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="font-semibold">OTP Verification Required</p>
            <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to ******42</p>
          </div>
        </div>

        <input
          className="kiosk-input kiosk-input-otp mb-4"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          placeholder="• • • • • •"
        />

        {error && (
          <p className="text-destructive text-sm font-semibold mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
            {error}
          </p>
        )}

        <p className="text-xs text-muted-foreground mb-4">
          Demo OTP: <code className="font-mono font-bold text-foreground bg-muted px-1.5 py-0.5 rounded">123456</code>
        </p>
      </div>

      <button onClick={verify} disabled={loading || otp.length < 6} className="kiosk-btn kiosk-btn-primary">
        <ShieldCheck size={20} />
        VERIFY IDENTITY
      </button>
      <button onClick={onBack} className="kiosk-btn kiosk-btn-ghost">
        <ArrowLeft size={18} /> Cancel
      </button>
    </KioskLayout>
  );
};

export default OtpScreen;
