import { useState } from "react";
import KioskLayout from "@/components/KioskLayout";
import BigButton from "@/components/BigButton";
import { api } from "@/services/mockApi";

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
      <p className="text-lg text-muted-foreground mb-6">
        Enter the 6-digit OTP sent to your registered mobile number.
      </p>
      <input
        className="w-full h-20 text-4xl text-center tracking-[1rem] rounded-lg border-2 border-border mb-4 bg-background text-foreground"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        placeholder="• • • • • •"
      />
      {error && <p className="text-destructive text-lg mb-4 font-semibold">{error}</p>}
      <p className="text-sm text-muted-foreground mb-4">Demo OTP: <strong>123456</strong></p>
      <BigButton label="VERIFY" onClick={verify} disabled={loading || otp.length < 6} />
      <BigButton label="CANCEL" onClick={onBack} variant="secondary" />
    </KioskLayout>
  );
};

export default OtpScreen;
