import KioskLayout from "@/components/KioskLayout";
import BigButton from "@/components/BigButton";

interface Props {
  sessionId: string;
  agentId?: string;
  onCancel: () => void;
}

const AgentScreen = ({ sessionId, agentId, onCancel }: Props) => (
  <KioskLayout title="Connecting to Agent" sessionId={sessionId}>
    <div className="text-center py-12">
      <div className="w-20 h-20 border-8 border-primary border-t-transparent rounded-full mx-auto mb-8" style={{ animation: "spin 1s linear infinite" }} />
      <p className="text-2xl font-semibold mb-2">Please wait...</p>
      <p className="text-lg text-muted-foreground mb-2">A remote agent is joining your session.</p>
      {agentId && <p className="text-muted-foreground">Agent ID: {agentId}</p>}
      <p className="text-muted-foreground mt-4">Estimated wait: ~2 minutes</p>
      <p className="text-sm text-muted-foreground mt-2">Please stay in front of the camera.</p>
      <div className="mt-10">
        <BigButton label="CANCEL" onClick={onCancel} variant="secondary" />
      </div>
    </div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </KioskLayout>
);

export default AgentScreen;
