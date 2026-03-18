import { ReactNode } from "react";
import bankLogo from "@/assets/bank-logo.png";

interface KioskLayoutProps {
  children: ReactNode;
  title?: string;
  sessionId?: string;
}

const KioskLayout = ({ children, title, sessionId }: KioskLayoutProps) => (
  <div className="kiosk-shell">
    <div className="kiosk-frame">
      <header className="kiosk-header">
        <img src={bankLogo} alt="Citizen Bank" className="w-10 h-10 relative z-10" />
        <div className="relative z-10">
          <h1 className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            CITIZEN BANK
          </h1>
          <p className="text-xs opacity-70">
            Self-Service Kiosk {sessionId && <span className="ml-1 opacity-60">• {sessionId}</span>}
          </p>
        </div>
        {sessionId && (
          <div className="ml-auto relative z-10">
            <span className="status-badge status-badge-success">
              <span className="status-dot" />
              Active
            </span>
          </div>
        )}
      </header>
      <main className="kiosk-body">
        {title && <h2 className="kiosk-title">{title}</h2>}
        {children}
      </main>
    </div>
  </div>
);

export default KioskLayout;
