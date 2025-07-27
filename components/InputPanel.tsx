
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { UploadIcon } from './icons/UploadIcon';

interface InputPanelProps {
  userInput: string;
  setUserInput: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  reportTemplateFileName: string;
  aiPlanFileName: string;
  onReportTemplateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAiPlanChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInputButton: React.FC<{
  id: string;
  label: string;
  fileName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}> = ({ id, label, fileName, onChange, disabled }) => (
  <div className="mt-2">
    <label htmlFor={id} className={`w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white text-slate-700 font-medium rounded-md border border-slate-300 ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-slate-100 cursor-pointer'} transition-colors`}>
      <UploadIcon className="w-5 h-5" />
      <span>{label}</span>
    </label>
    <input
      id={id}
      type="file"
      className="hidden"
      onChange={onChange}
      disabled={disabled}
      accept=".pdf,.txt"
    />
    <p className="text-xs text-slate-500 mt-1 text-center truncate" title={fileName}>
      目前: {fileName}
    </p>
  </div>
);


export const InputPanel: React.FC<InputPanelProps> = ({ 
    userInput, setUserInput, onGenerate, isLoading,
    reportTemplateFileName, aiPlanFileName, onReportTemplateChange, onAiPlanChange
}) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col h-full">
      <h2 className="text-lg font-semibold text-slate-800 mb-2">輸入內容</h2>
      <p className="text-sm text-slate-500 mb-4">將新聞或事件內容貼入下方，或上傳自訂範本。</p>
      
      <textarea
        className="w-full flex-grow p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#003366] focus:border-[#003366] transition-shadow duration-200 resize-none text-slate-800 bg-white"
        placeholder="請在此貼上新聞報導、事件摘要或任何相關文字..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        disabled={isLoading}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 mt-2">
          <FileInputButton
            id="template-upload"
            label="上傳報告範本"
            fileName={reportTemplateFileName}
            onChange={onReportTemplateChange}
            disabled={isLoading}
          />
          <FileInputButton
            id="ai-plan-upload"
            label="上傳 AI 規劃表"
            fileName={aiPlanFileName}
            onChange={onAiPlanChange}
            disabled={isLoading}
          />
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || !userInput.trim()}
        className="mt-4 w-full flex justify-center items-center space-x-2 px-6 py-3 bg-[#003366] text-white font-bold rounded-lg hover:bg-[#002244] disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:ring-opacity-50"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>處理中...</span>
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5 mr-1" />
            <span>產生報告</span>
          </>
        )}
      </button>
    </div>
  );
};
