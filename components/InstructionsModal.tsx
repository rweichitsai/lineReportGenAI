
import React from 'react';

interface InstructionsModalProps {
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full transform transition-all border border-slate-200"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h2 className="text-2xl font-bold text-[#003366] mb-4">📝 使用說明</h2>
        <div className="space-y-4 text-slate-600">
          <p>歡迎使用【Line 報告小幫手】！我能幫您快速將新聞或事件摘要，轉換成專業的內部 Line 報告。</p>
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>貼上內容：</strong> 將您想要報告的新聞報導、事件摘要或任何文字，直接貼到左側的輸入框中。</li>
            <li><strong>（選用）上傳檔案：</strong> 若有特定範本或更新的 AI 規劃表，可點擊按鈕上傳。</li>
            <li><strong>生成報告：</strong> 點擊「產生報告」按鈕，我會開始分析內容、查核事實，並依照內部格式撰寫報告。</li>
            <li><strong>檢視與應用：</strong> 右側會顯示格式完整的報告初稿。確認無誤後，點擊「複製」按鈕即可貼到 Line，或點擊「下載」儲存為包含比較表的完整 HTML 檔案。</li>
          </ol>
          <p>我的目標是讓您的報告工作更輕鬆、更有效率！🚀</p>
        </div>
        <div className="mt-6 text-right">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-[#003366] text-white font-semibold rounded-lg hover:bg-[#002244] focus:outline-none focus:ring-2 focus:ring-[#003366] focus:ring-opacity-50 transition-colors"
          >
            知道了
          </button>
        </div>
      </div>
    </div>
  );
};
