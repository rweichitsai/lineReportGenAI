
import React from 'react';
import { AnalysisItem } from '../types';

interface ComparisonTableProps {
  data: AnalysisItem[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ data }) => {
    const getStatusChipColor = (status: string) => {
        if (status.includes('已規劃')) return 'bg-blue-100 text-blue-800';
        if (status.includes('可評估')) return 'bg-yellow-100 text-yellow-800';
        return 'bg-slate-100 text-slate-800';
    }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">AI 規劃項目比對分析</h2>
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                提及項目
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                規劃狀態
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                說明
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.item}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusChipColor(item.planStatus)}`}>
                        {item.planStatus}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-normal text-sm text-slate-600">{item.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
