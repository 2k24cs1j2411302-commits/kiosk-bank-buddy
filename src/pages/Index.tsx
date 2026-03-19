import { useState } from "react";
import { api } from "@/services/mockApi";
import WelcomeScreen from "@/screens/WelcomeScreen";
import DashboardScreen from "@/screens/DashboardScreen";
import OtpScreen from "@/screens/OtpScreen";
import ResultScreen, { ResultData } from "@/screens/ResultScreen";
import AgentScreen from "@/screens/AgentScreen";
import UpdateContactScreen from "@/screens/UpdateContactScreen";

type Screen = "WELCOME" | "DASHBOARD" | "OTP" | "RESULT" | "AGENT" | "UPDATE_CONTACT";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("WELCOME");
  const [sessionId, setSessionId] = useState("");
  const [pendingIntent, setPendingIntent] = useState("");
  const [resultData, setResultData] = useState<ResultData>({ title: "" });
  const [agentId, setAgentId] = useState("");

  const startSession = async () => {
    const res = await api.startSession();
    setSessionId(res.sessionId);
    setScreen("DASHBOARD");
  };

  const handleIntentSelected = async (intent: string) => {
    setPendingIntent(intent);

    if (intent === "ESCALATE_AGENT") {
      const res = await api.escalateToAgent("Service selection");
      setAgentId(res.agentId);
      setScreen("AGENT");
      return;
    }

    if (intent === "LOAN_ENQUIRY") {
      const res = await api.loanEnquiry();
      setResultData({ title: "Loan Enquiry", loanRates: res.rates });
      setScreen("RESULT");
      return;
    }

    if (intent === "UPDATE_CONTACT") {
      await api.requestOtp();
      setScreen("OTP");
      return;
    }

    await api.requestOtp();
    setScreen("OTP");
  };

  const handleOtpVerified = async () => {
    if (pendingIntent === "UPDATE_CONTACT") {
      setScreen("UPDATE_CONTACT");
      return;
    }
    await executeBankingAction();
  };

  const executeBankingAction = async () => {
    try {
      if (pendingIntent === "CHECK_BALANCE") {
        const res = await api.checkBalance();
        setResultData({ title: "Account Balance", balance: res.balance });
      } else if (pendingIntent === "MINI_STATEMENT") {
        const res = await api.miniStatement();
        setResultData({ title: "Mini Statement", transactions: res.transactions });
      } else if (pendingIntent === "BLOCK_CARD") {
        const res = await api.blockCard();
        setResultData({ title: "Card Blocked", message: res.message });
      }
      setScreen("RESULT");
    } catch {
      setResultData({ title: "Error", message: "Something went wrong. Please try again." });
      setScreen("RESULT");
    }
  };

  const handleUpdateContact = async (data: { phone: string; email: string }) => {
    const res = await api.updateContact(data);
    setResultData({ title: "Contact Updated", message: res.message });
    setScreen("RESULT");
  };

  const reset = () => {
    setScreen("WELCOME");
    setSessionId("");
    setPendingIntent("");
    setResultData({ title: "" });
    setAgentId("");
  };

  const goBack = () => setScreen("DASHBOARD");

  switch (screen) {
    case "WELCOME":
      return <WelcomeScreen onStart={startSession} />;
    case "DASHBOARD":
      return <DashboardScreen sessionId={sessionId} onIntentSelected={handleIntentSelected} />;
    case "OTP":
      return <OtpScreen sessionId={sessionId} onVerified={handleOtpVerified} onBack={goBack} />;
    case "RESULT":
      return <ResultScreen sessionId={sessionId} data={resultData} onDone={reset} />;
    case "AGENT":
      return <AgentScreen sessionId={sessionId} agentId={agentId} onCancel={goBack} />;
    case "UPDATE_CONTACT":
      return <UpdateContactScreen sessionId={sessionId} onSubmit={handleUpdateContact} onBack={goBack} />;
    default:
      return <WelcomeScreen onStart={startSession} />;
  }
};

export default Index;
