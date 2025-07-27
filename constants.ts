
import { NIA_AI_Plan_Item } from './types';

export const DEFAULT_REPORT_TEMPLATE = `
移民資訊組報告
有關{新聞媒體}{YYY.M.D}報導「新聞標題」一案，謹說明如下：

一、案情摘要
{建議摘要250字以內}

二、擬處作為
（一）初步處理情形
{建議摘要150字以內，以本組立場撰寫}
本組已000；另本署000。
（二）未來處理方向
{建議摘要150字以內，以本組立場撰寫}
依未來000。

相關報導：{貼上新聞網址}

以上
`.trim();


export const NIA_AI_PLAN_DATA: NIA_AI_Plan_Item[] = [
    { id: 1, category: '已完成建置,使用中', project: '自動查驗通關系統', description: '99年建置第一代系統66座,108年建置第三代系統(單向33、雙向12),112年開發第四代系統,汰換41座第一代並建置43座(1座114年完成)' },
    { id: 2, category: '已完成建置,使用中', project: '臉辨差勤與門禁系統', description: '113年6月啟用,運用臉部辨識提供刷到、退勤及門禁服務,避免代刷卡,確保場域安全' },
    { id: 3, category: '已完成建置,使用中', project: '人工智慧影像搜尋系統', description: '109年依國安局經費,應用AI物件辨識及人臉比對技術協助偵蒐與數位取證影像分析' },
    { id: 4, category: '勤(業)務規劃', project: '旅客風險綜合評估系統', description: '114-117年韌性計畫項目,115年啟動開發,AI自動分析旅客入出境資料,提高查驗效率並即時處置高風險旅客' },
    { id: 5, category: '勤(業)務規劃', project: 'AI旅客證件自動歸戶系統', description: '114年7月31日決標,融入AI文本及生物特徵比對,加速旅客證件自動歸戶及身份審查,降低人工負擔' },
    { id: 6, category: '勤(業)務規劃', project: '一站式線上聯合會商平臺', description: '114年7月31日決標,開發至115年8月31日,AI預審及風險評估,跨機關案件協審提效' },
    { id: 7, category: '勤(業)務規劃', project: '智能客服系統', description: '114年3月5日決標,導入AI大語言模型建置線上知識庫,智慧生成回應,提升客服能力並降低成本' },
    { id: 8, category: '勤(業)務規劃', project: '雲端數位監控智慧行為分析平臺', description: '評估中,114年5月前決標,115-116年執行,AI即時發現異常行為輔助值勤官處置' },
    { id: 9, category: '一般公務規劃', project: '智慧公務', description: '114年5月決標AI伺服器、9月底建置完成,自115年起逐步導入AI生成會議紀錄、新聞稿、報告等文書處理功能' },
    { id: 10, category: '一般公務規劃', project: '智慧公文', description: '113年11月起測試AI輔助校對及分文推薦,114年開始導入AI生成公文內容POC,以提升撰寫與校對效率' }
];

export const DEFAULT_AI_PLAN_TEXT = `
本署人工智慧規劃與推動情形一覽表:
${NIA_AI_PLAN_DATA.map(item => `
序號 ${item.id}
分類: ${item.category}
項目: ${item.project}
詳細說明: ${item.description}
`.trim()).join('\n\n')}
`.trim();
