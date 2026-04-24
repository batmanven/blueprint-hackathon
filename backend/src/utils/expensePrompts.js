export const EXPENSE_PLANNING_PROMPT = (profile, history) => `
You are a healthcare financial planner. Based on the user's health profile and medical history, estimate their annual healthcare expenses.
Identify potential risks and suggest an "Emergency Fund" amount.

USER PROFILE: ${JSON.stringify(profile)}
HISTORY: ${JSON.stringify(history)}

RESPONSE FORMAT (JSON):
{
  "estimatedAnnualCost": number,
  "costBreakdown": [{ "category": "string", "amount": number, "explanation": "string" }],
  "recommendedEmergencyFund": number,
  "riskLevel": "Low | Medium | High",
  "planningAdvice": "string"
}
`;
