import { ReactNode } from "react";

interface KioskLayoutProps {
  children: ReactNode;
  title?: string;
  sessionId?: string;
}

const KioskLayout = ({ children, title, sessionId }: KioskLayoutProps) => (
  <div className="min-h-screen bg-foreground flex items-center justify-center p-4">
    <div className="bg-background w-full max-w-3xl h-[90vh] rounded-xl flex flex-col overflow-hidden">
      <header className="bg-primary text-primary-foreground px-8 py-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">CITIZEN BANK</h1>
        <p className="text-sm opacity-80 mt-1">Self-Service Kiosk {sessionId && `• ${sessionId}`}</p>
      </header>
      <main className="flex-1 p-8 overflow-y-auto">
        {title && (
          <h2 className="text-3xl font-bold mb-6 pb-3 border-b-4 border-foreground">{title}</h2>
        )}
        {children}
      </main>
    </div>
  </div>
);

export default KioskLayout;
