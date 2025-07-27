
import React from 'react';
import { AnalysisItem } from '../types';
import { ReportDisplay } from './ReportDisplay';
import { ComparisonTable } from './ComparisonTable';

interface OutputPanelProps {
  isLoading: boolean;
  error: string | null;
  report: string | null;
  analysis: AnalysisItem[] | null;
}

const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-4 bg-slate-200 rounded w-1/4"></div>
    <div className="space-y-3">
      <div className="h-3 bg-slate-200 rounded"></div>
      <div className="h-3 bg-slate-200 rounded w-5/6"></div>
      <div className="h-3 bg-slate-200 rounded w-4/6"></div>
    </div>
    <div className="h-4 bg-slate-200 rounded w-1/3 mt-4"></div>
     <div className="space-y-3">
      <div className="h-3 bg-slate-200 rounded"></div>
      <div className="h-3 bg-slate-200 rounded w-5/6"></div>
    </div>
    <div className="mt-8">
        <div className="h-8 bg-slate-200 rounded-t-lg"></div>
        <div className="h-10 bg-slate-100"></div>
        <div className="h-10 bg-slate-200"></div>
        <div className="h-10 bg-slate-100"></div>
    </div>
  </div>
);

const InitialState: React.FC = () => (
    <div className="text-center text-slate-500 flex flex-col items-center justify-center h-full p-8 border-2 border-dashed border-slate-200 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        <h3 className="text-lg font-semibold text-slate-700">報告將顯示在此</h3>
        <p className="text-slate-500">完成輸入後點擊「產生報告」即可預覽。</p>
    </div>
);

export const OutputPanel: React.FC<OutputPanelProps> = ({ isLoading, error, report, analysis }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col h-full">
        {isLoading && <LoadingSkeleton />}
        {!isLoading && error && (
            <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-bold">發生錯誤</h3>
                <p>{error}</p>
            </div>
        )}
        {!isLoading && !error && !report && <InitialState />}
        {!isLoading && !error && report && (
          <div className="overflow-y-auto h-full -mr-2 pr-2">
            <ReportDisplay reportText={report} analysis={analysis} />
            {analysis && analysis.length > 0 && <ComparisonTable data={analysis} />}
          </div>
        )}
    </div>
  );
};
