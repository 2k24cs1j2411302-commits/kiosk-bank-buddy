import KioskLayout from "@/components/KioskLayout";
import kioskBg from "@/assets/kiosk-bg.jpg";
import bankLogo from "@/assets/bank-logo.png";

interface Props {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: Props) => (
  <div className="kiosk-shell">
    <div className="kiosk-frame">
      {/* Hero section with background */}
      <div
        className="relative flex-1 flex flex-col items-center justify-center text-center p-8"
        style={{
          backgroundImage: `linear-gradient(to bottom, hsl(220 20% 10% / 0.7), hsl(220 20% 10% / 0.95)), url(${kioskBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img src={bankLogo} alt="Citizen Bank" className="w-20 h-20 mb-6" />
        <h1
          className="text-5xl font-bold tracking-tight mb-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "white" }}
        >
          CITIZEN BANK
        </h1>
        <p className="text-lg mb-10" style={{ color: "hsl(0 0% 100% / 0.6)" }}>
          Self-Service Banking Kiosk
        </p>

        <button onClick={onStart} className="kiosk-btn kiosk-btn-primary max-w-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 16 16 12 12 8"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          START SESSION
        </button>

        <div className="flex gap-3 mt-8">
          {["English", "Español", "हिन्दी"].map((lang, i) => (
            <button
              key={lang}
              className="quick-chip"
              style={{
                borderColor: i === 0 ? "hsl(347 77% 50%)" : "hsl(0 0% 100% / 0.2)",
                color: i === 0 ? "hsl(347 77% 50%)" : "hsl(0 0% 100% / 0.5)",
                background: i === 0 ? "hsl(347 77% 50% / 0.1)" : "transparent",
              }}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Decorative bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, transparent, hsl(347 77% 50%), transparent)" }} />
      </div>
    </div>
  </div>
);

export default WelcomeScreen;
