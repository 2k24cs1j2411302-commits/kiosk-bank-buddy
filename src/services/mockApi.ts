// In-memory mock backend simulating Express API

let sessions: Record<string, { id: string; startedAt: string }> = {};

const mockData = {
  balance: "$12,450.50",
  transactions: [
    { id: 1, date: "2025-03-15", desc: "ATM Deposit", amt: "+$500.00" },
    { id: 2, date: "2025-03-14", desc: "Grocery Store", amt: "-$82.10" },
    { id: 3, date: "2025-03-12", desc: "Electric Bill", amt: "-$120.00" },
    { id: 4, date: "2025-03-10", desc: "Salary Credit", amt: "+$3,200.00" },
    { id: 5, date: "2025-03-08", desc: "Restaurant", amt: "-$45.50" },
  ],
  validOtp: "123456",
};

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Intent detection
const getIntent = (text: string) => {
  const t = text.toLowerCase();
  if (t.includes("balance") || t.includes("how much")) return "CHECK_BALANCE";
  if (t.includes("statement") || t.includes("history") || t.includes("transactions")) return "MINI_STATEMENT";
  if (t.includes("block") || t.includes("lost") || t.includes("stolen")) return "BLOCK_CARD";
  if (t.includes("update") || t.includes("contact") || t.includes("phone") || t.includes("email") || t.includes("address")) return "UPDATE_CONTACT";
  if (t.includes("loan") || t.includes("borrow") || t.includes("credit")) return "LOAN_ENQUIRY";
  if (t.includes("agent") || t.includes("human") || t.includes("speak") || t.includes("talk")) return "ESCALATE_AGENT";
  return "UNKNOWN";
};

const intentResponses: Record<string, string> = {
  CHECK_BALANCE: "I can help you check your balance. I'll need to verify your identity via OTP first.",
  MINI_STATEMENT: "I'll prepare your recent transactions. Please verify your identity first.",
  BLOCK_CARD: "I've detected you want to block a card. This is urgent — please verify via OTP immediately.",
  UPDATE_CONTACT: "To update your contact details, I'll need to verify your identity first.",
  LOAN_ENQUIRY: "Our current personal loan rates start at 5.9% APR. Would you like more details or to speak with an agent?",
  ESCALATE_AGENT: "Connecting you to a remote teller. Please wait...",
  UNKNOWN: "I'm not sure I understand. You can ask about balance, statements, blocking a card, updating contact info, or loans.",
};

export const api = {
  startSession: async () => {
    await delay(300);
    const id = "KSK-" + Date.now();
    sessions[id] = { id, startedAt: new Date().toISOString() };
    return { sessionId: id };
  },

  endSession: async (sessionId: string) => {
    await delay(200);
    delete sessions[sessionId];
    return { success: true };
  },

  sendMessage: async (message: string) => {
    await delay(400);
    const intent = getIntent(message);
    return { reply: intentResponses[intent], intent };
  },

  requestOtp: async () => {
    await delay(300);
    return { success: true, message: "OTP sent to registered mobile: ******42" };
  },

  verifyOtp: async (otp: string) => {
    await delay(300);
    if (otp === mockData.validOtp) return { success: true };
    throw new Error("Invalid OTP. Please try again.");
  },

  checkBalance: async () => {
    await delay(300);
    return { balance: mockData.balance };
  },

  miniStatement: async () => {
    await delay(300);
    return { transactions: mockData.transactions };
  },

  blockCard: async () => {
    await delay(400);
    return { success: true, message: "Your card ending in 8821 has been successfully blocked." };
  },

  updateContact: async (data: { phone?: string; email?: string }) => {
    await delay(400);
    return { success: true, message: `Contact details updated successfully.${data.phone ? " Phone: " + data.phone : ""}${data.email ? " Email: " + data.email : ""}` };
  },

  loanEnquiry: async () => {
    await delay(300);
    return {
      rates: [
        { type: "Personal Loan", rate: "5.9% APR", maxAmount: "$50,000" },
        { type: "Home Loan", rate: "3.2% APR", maxAmount: "$500,000" },
        { type: "Auto Loan", rate: "4.5% APR", maxAmount: "$75,000" },
      ],
    };
  },

  escalateToAgent: async (context: string) => {
    await delay(500);
    return { success: true, agentId: "AGT-" + Math.floor(Math.random() * 1000), estimatedWait: "2 minutes", context };
  },
};
