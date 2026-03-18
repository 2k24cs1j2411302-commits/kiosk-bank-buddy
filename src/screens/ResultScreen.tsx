import KioskLayout from "@/components/KioskLayout";
import BigButton from "@/components/BigButton";

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
    <div className="bg-secondary rounded-lg p-6 mb-6">
      {data.balance && (
        <h3 className="text-5xl font-bold text-center">{data.balance}</h3>
      )}
      {data.message && (
        <p className="text-xl">{data.message}</p>
      )}
      {data.transactions && (
        <table className="w-full text-lg">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Description</th>
              <th className="text-right py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.transactions.map((t) => (
              <tr key={t.id} className="border-b border-border">
                <td className="py-3">{t.date}</td>
                <td className="py-3">{t.desc}</td>
                <td className="py-3 text-right font-bold">{t.amt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {data.loanRates && (
        <div className="space-y-4">
          {data.loanRates.map((l) => (
            <div key={l.type} className="bg-background p-4 rounded-lg">
              <h4 className="text-xl font-bold">{l.type}</h4>
              <p className="text-muted-foreground">Rate: {l.rate} • Up to {l.maxAmount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    <BigButton label="DONE — RETURN HOME" onClick={onDone} />
  </KioskLayout>
);

export default ResultScreen;
