export interface User {
  id: string;
  name: string;
  email: string;
  abhaNumber?: string;
}

export interface Scheme {
  _id: string;
  name: string;
  type: 'Central' | 'State';
  state: string;
  coverage: string;
  description: string;
  eligibility: {
    income?: string;
    age?: string;
    occupation?: string;
    category?: string;
    residency?: string;
    [key: string]: any;
  };
  benefits: string[];
  link: string;
}

export interface Medicine {
  _id: string;
  brandName: string;
  genericName: string;
  salt: string;
  brandedPrice?: number;
  janAushadhiPrice: number;
  dosage: string;
  category: string;
  savingsPercent: number;
  isAIValidated?: boolean;
  genericAlternative?: Partial<Medicine>;
}

export interface BillItem {
  description: string;
  amount: number;
  isFlagged: boolean;
  flagReason?: string;
  genericAlternative?: string;
}

export interface BillAnalysis {
  hospitalName: string;
  totalAmount: number;
  currency: string;
  potentialSavings: number;
  summary: string;
  lineItems: BillItem[];
  auditMetadata: {
    inflationSeverity: 'Low' | 'Medium' | 'High';
    savingsBreakdown: {
      pharmacy: number;
      consumables: number;
      services: number;
    };
  };
}

export interface ExpensePlan {
  estimatedAnnualCost: number;
  shieldScore: number;
  costBreakdown: Array<{
    category: string;
    amount: number;
    explanation: string;
  }>;
  savingsPotential: {
    genericSavings: number;
    schemeBenefit: number;
    total: number;
  };
  recommendedEmergencyFund: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  planningAdvice: string;
  dpiNextSteps: string[];
}
