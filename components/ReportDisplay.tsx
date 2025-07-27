
import React from 'react';
import { useClipboard } from '../hooks/useClipboard';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { AnalysisItem } from '../types';

interface ReportDisplayProps {
  reportText: string;
  analysis: AnalysisItem[] | null;
}

const generateHtmlForDownload = (reportText: string, analysis: AnalysisItem[] | null): string => {
  const getStatusChipColor = (status: string) => {
    if (status.includes('已規劃')) return 'background-color: #dbeafe; color: #1e40af;';
    if (status.includes('可評估')) return 'background-color: #fef9c3; color: #854d0e;';
    return 'background-color: #f1f5f9; color: #1e293b;';
  };

  const analysisTableHtml = analysis && analysis.length > 0 ? `
    <div class="mt-8">
      <h2 class="text-lg font-semibold text-slate-800 mb-4">AI 規劃項目比對分析</h2>
      <div class="overflow-x-auto rounded-lg border border-slate-200">
        <table class="min-w-full divide-y divide-slate-200">
          <thead class="bg-slate-100">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">提及項目</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">規劃狀態</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">說明</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-slate-200">
            ${analysis.map(item => `
              <tr class="hover:bg-slate-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">${item.item}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  <span class="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full" style="${getStatusChipColor(item.planStatus)}">
                    ${item.planStatus}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-normal text-sm text-slate-600">${item.details}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  ` : '';

  return `
    <!DOCTYPE html>
    <html lang="zh-TW">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>移民署 Line 報告</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="font-sans bg-slate-50">
      <nav class="bg-white shadow-md w-full sticky top-0 z-40 border-b-4 border-[#003366]">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-20">
            <div class="flex items-center space-x-4">
              <h1 class="text-xl font-bold text-[#003366]">移民署 Line 報告</h1>
            </div>
          </div>
        </div>
      </nav>
      <main class="container mx-auto p-4 sm:p-6 lg:p-8">
        <div class="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h2 class="text-lg font-semibold text-slate-800 mb-4">產生的 Line 報告</h2>
          <pre class="bg-slate-50 p-4 rounded-md border border-slate-200 text-slate-800 whitespace-pre-wrap font-mono text-sm leading-relaxed">${reportText}</pre>
          ${analysisTableHtml}
        </div>
      </main>
    </body>
    </html>
  `;
};

export const ReportDisplay: React.FC<ReportDisplayProps> = ({ reportText, analysis }) => {
  const [isCopied, copy] = useClipboard();

  const handleDownload = () => {
    const htmlContent = generateHtmlForDownload(reportText, analysis);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'line-report.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-800">產生的 Line 報告</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors bg-slate-100 text-slate-600 hover:bg-slate-200"
          >
            <DownloadIcon className="w-4 h-4" />
            <span>下載 HTML</span>
          </button>
          <button
            onClick={() => copy(reportText)}
            className={`flex items-center space-x-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              isCopied
                ? 'bg-green-100 text-green-700'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isCopied ? <CheckIcon className="w-4 h-4" /> : <ClipboardIcon className="w-4 h-4" />}
            <span>{isCopied ? '已複製!' : '複製'}</span>
          </button>
        </div>
      </div>
      <pre className="bg-slate-50 p-4 rounded-md border border-slate-200 text-slate-800 whitespace-pre-wrap font-mono text-sm leading-relaxed">
        {reportText}
      </pre>
    </div>
  );
};
