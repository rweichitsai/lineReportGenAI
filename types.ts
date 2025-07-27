
export interface AnalysisItem {
  item: string;
  planStatus: string;
  details: string;
}

export interface GeminiResponse {
  report: string;
  analysis: AnalysisItem[];
}

export interface NIA_AI_Plan_Item {
    id: number;
    category: string;
    project: string;
    description: string;
}
