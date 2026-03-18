import KioskLayout from "@/components/KioskLayout";
import BigButton from "@/components/BigButton";

interface Props {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: Props) => (
  <KioskLayout>
    <div className="text-center mt-16">
      <h2 className="text-5xl font-bold mb-4">Welcome</h2>
      <p className="text-muted-foreground text-lg mb-10">Touch the button below to begin</p>
      <div className="max-w-md mx-auto">
        <BigButton label="START SESSION" onClick={onStart} />
      </div>
      <div className="mt-8 flex justify-center gap-3">
        <button className="px-5 py-2 border border-border rounded bg-background text-foreground font-semibold">English</button>
        <button className="px-5 py-2 border border-border rounded bg-background text-muted-foreground">Español</button>
        <button className="px-5 py-2 border border-border rounded bg-background text-muted-foreground">हिन्दी</button>
      </div>
    </div>
  </KioskLayout>
);

export default WelcomeScreen;
