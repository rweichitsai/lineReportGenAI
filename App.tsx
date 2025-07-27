
import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { InstructionsModal } from './components/InstructionsModal';
import { generateReport } from './services/geminiService';
import { AnalysisItem } from './types';
import { parsePdf } from './utils/pdfParser';
import { DEFAULT_REPORT_TEMPLATE, DEFAULT_AI_PLAN_TEXT } from './constants';

function App() {
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisItem[] | null>(null);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  const [reportTemplate, setReportTemplate] = useState<string>(DEFAULT_REPORT_TEMPLATE);
  const [aiPlan, setAiPlan] = useState<string>(DEFAULT_AI_PLAN_TEXT);
  const [reportTemplateFileName, setReportTemplateFileName] = useState<string>('預設範本');
  const [aiPlanFileName, setAiPlanFileName] = useState<string>('預設規劃表');

  const handleFileChange = useCallback(async (
    file: File | null,
    contentSetter: React.Dispatch<React.SetStateAction<string>>,
    fileNameSetter: React.Dispatch<React.SetStateAction<string>>,
    defaultContent: string,
    defaultFileName: string
  ) => {
    if (!file) {
      contentSetter(defaultContent);
      fileNameSetter(defaultFileName);
      return;
    }

    setIsLoading(true);
    setError(null);
    fileNameSetter(`讀取中: ${file.name}`);
    try {
      let text = '';
      if (file.type === 'application/pdf') {
        text = await parsePdf(file);
      } else {
        text = await file.text();
      }
      contentSetter(text);
      fileNameSetter(file.name);
    } catch (e: any) {
      setError(`無法讀取檔案 ${file.name}: ${e.message}`);
      contentSetter(defaultContent);
      fileNameSetter(defaultFileName);
    } finally {
      setIsLoading(false);
    }
  }, []);


  const handleGenerate = useCallback(async () => {
    if (!userInput.trim()) return;

    setIsLoading(true);
    setError(null);
    setGeneratedReport(null);
    setAnalysisData(null);

    try {
      const result = await generateReport(userInput, reportTemplate, aiPlan);
      setGeneratedReport(result.report);
      setAnalysisData(result.analysis);
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [userInput, reportTemplate, aiPlan]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800">
      <Navbar onShowInstructions={() => setShowInstructions(true)} />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full min-h-[75vh]">
          <InputPanel
            userInput={userInput}
            setUserInput={setUserInput}
            onGenerate={handleGenerate}
            isLoading={isLoading}
            reportTemplateFileName={reportTemplateFileName}
            aiPlanFileName={aiPlanFileName}
            onReportTemplateChange={(e) => handleFileChange(e.target.files?.[0] || null, setReportTemplate, setReportTemplateFileName, DEFAULT_REPORT_TEMPLATE, '預設範本')}
            onAiPlanChange={(e) => handleFileChange(e.target.files?.[0] || null, setAiPlan, setAiPlanFileName, DEFAULT_AI_PLAN_TEXT, '預設規劃表')}
          />
          <OutputPanel
            isLoading={isLoading}
            error={error}
            report={generatedReport}
            analysis={analysisData}
          />
        </div>
      </main>
      {showInstructions && <InstructionsModal onClose={() => setShowInstructions(false)} />}
      <footer className="text-center py-4 text-slate-500 text-xs bg-slate-100 border-t border-slate-200">
        <p>內政部移民署 版權所有 © {new Date().getFullYear()}</p>
        <p>NATIONAL IMMIGRATION AGENCY, MOI. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}

export default App;
