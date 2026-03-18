import KioskLayout from "@/components/KioskLayout";
import { CheckCircle2, Home } from "lucide-react";

interface Transaction {
  id: number;
  date: string;
  desc: string;
  amt: string;
}

interface LoanRate {
  type: string;
  rate: string;
  maxAmount: string;
}

export interface ResultData {
  title: string;
  message?: string;
  balance?: string;
  transactions?: Transaction[];
  loanRates?: LoanRate[];
}

interface Props {
  sessionId: string;
  data: ResultData;
  onDone: () => void;
}

const ResultScreen = ({ sessionId, data, onDone }: Props) => (
  <KioskLayout title={data.title} sessionId={sessionId}>
    <div className="flex items-center gap-2 mb-4">
      <span className="status-badge status-badge-success">
        <span className="status-dot" />
        Completed
      </span>
    </div>

    <div className="kiosk-card mb-6">
      {data.balance && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-medium">Available Balance</p>
          <h3 className="text-5xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {data.balance}
          </h3>
        </div>
      )}

      {data.message && (
        <div className="flex items-start gap-3">
          <CheckCircle2 size={22} className="text-emerald-600 mt-0.5 flex-shrink-0" />
          <p className="text-lg">{data.message}</p>
        </div>
      )}

      {data.transactions && (
        <div className="overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-2 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Date</th>
                <th className="text-left py-2 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Description</th>
                <th className="text-right py-2 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.transactions.map((t) => (
                <tr key={t.id} className="border-b border-border">
                  <td className="py-3 text-muted-foreground">{t.date}</td>
                  <td className="py-3 font-medium">{t.desc}</td>
                  <td className={`py-3 text-right font-bold font-mono ${t.amt.startsWith("+") ? "text-emerald-600" : "text-foreground"}`}>
                    {t.amt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.loanRates && (
        <div className="space-y-3">
          {data.loanRates.map((l) => (
            <div key={l.type} className="bg-background p-4 rounded-lg border border-border">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-base">{l.type}</h4>
                  <p className="text-sm text-muted-foreground">Up to {l.maxAmount}</p>
                </div>
                <span className="text-xl font-bold text-primary" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {l.rate}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    <button onClick={onDone} className="kiosk-btn kiosk-btn-primary">
      <Home size={20} />
      DONE — RETURN HOME
    </button>
  </KioskLayout>
);

export default ResultScreen;
