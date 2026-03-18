import KioskLayout from "@/components/KioskLayout";
import { ArrowLeft, Video } from "lucide-react";

interface Props {
  sessionId: string;
  agentId?: string;
  onCancel: () => void;
}

const AgentScreen = ({ sessionId, agentId, onCancel }: Props) => (
  <KioskLayout title="Connecting to Agent" sessionId={sessionId}>
    <div className="text-center py-8">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent mb-6">
        <div className="spinner" />
      </div>

      <h3 className="text-2xl font-bold mb-2">Please wait...</h3>
      <p className="text-muted-foreground mb-1">A remote agent is joining your session.</p>
      {agentId && (
        <span className="status-badge status-badge-pending mt-2 inline-flex">
          <span className="status-dot" />
          Agent {agentId}
        </span>
      )}

      <div className="kiosk-card mt-8 text-left">
        <div className="flex items-center gap-3 mb-2">
          <Video size={18} className="text-primary" />
          <span className="font-semibold text-sm">Video session ready</span>
        </div>
        <p className="text-sm text-muted-foreground">Estimated wait: ~2 minutes. Please stay in front of the camera.</p>
      </div>

      <div className="mt-8">
        <button onClick={onCancel} className="kiosk-btn kiosk-btn-ghost">
          <ArrowLeft size={18} /> Cancel & Go Back
        </button>
      </div>
    </div>
  </KioskLayout>
);

export default AgentScreen;
