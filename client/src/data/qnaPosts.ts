export type QnAPost = {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
  content: string;
  password: string;
};

export const qnaPosts: QnAPost[] = [
  {
    id: 12,
    title: "견적 문의드립니다.",
    author: "김OO",
    date: "2026-03-02",
    views: 24,
    content:
      "모니터링 솔루션 도입을 검토 중입니다. 기본 구성과 예상 도입 일정 안내 부탁드립니다.",
    password: "1234",
  },
  {
    id: 11,
    title: "W-CMS 구축 관련 질문",
    author: "이OO",
    date: "2026-02-27",
    views: 39,
    content:
      "W-CMS 구축 전 사전 준비사항과 단계별 적용 절차를 알고 싶습니다.",
    password: "1234",
  },
  {
    id: 10,
    title: "기술 지원 가능 시간 문의",
    author: "박OO",
    date: "2026-02-25",
    views: 17,
    content:
      "평일/주말 기준 기술 지원 가능 시간과 긴급 대응 범위를 문의드립니다.",
    password: "1234",
  },
  {
    id: 9,
    title: "데모 신청 절차 문의",
    author: "최OO",
    date: "2026-02-21",
    views: 52,
    content:
      "제품 데모 신청 시 필요한 정보와 일정 조율 방식을 안내 부탁드립니다.",
    password: "1234",
  },
  {
    id: 8,
    title: "유지보수 계약 관련 문의",
    author: "정OO",
    date: "2026-02-18",
    views: 33,
    content:
      "유지보수 계약 시 제공되는 SLA 옵션, 계약 기간, 비용 산정 방식을 알고 싶습니다.",
    password: "1234",
  },
  {
    id: 7,
    title: "시스템 호환성 문의",
    author: "윤OO",
    date: "2026-02-16",
    views: 21,
    content:
      "현재 사용 중인 ERP 시스템과 연동 가능한지 확인 부탁드립니다.",
    password: "1234",
  },
  {
    id: 6,
    title: "데이터 백업 방식 안내 요청",
    author: "임OO",
    date: "2026-02-13",
    views: 28,
    content:
      "운영 중 발생할 수 있는 데이터 유실에 대비한 백업/복구 체계 설명 부탁드립니다.",
    password: "1234",
  },
  {
    id: 5,
    title: "초기 교육 지원 여부",
    author: "한OO",
    date: "2026-02-10",
    views: 19,
    content:
      "담당자 교체가 있어 초기 교육을 재진행하고 싶습니다. 지원 가능 범위 안내 부탁드립니다.",
    password: "1234",
  },
  {
    id: 4,
    title: "도입 기간 산정 문의",
    author: "오OO",
    date: "2026-02-08",
    views: 34,
    content:
      "현장 규모가 큰 편인데, 통상적인 도입 소요 기간을 사례 기준으로 알 수 있을까요?",
    password: "1234",
  },
  {
    id: 3,
    title: "정기 점검 주기 문의",
    author: "신OO",
    date: "2026-02-05",
    views: 15,
    content:
      "운영 안정성을 위한 정기 점검 주기와 점검 항목에 대해 안내 부탁드립니다.",
    password: "1234",
  },
  {
    id: 2,
    title: "라이선스 구매 단위 문의",
    author: "권OO",
    date: "2026-02-02",
    views: 26,
    content:
      "라이선스 구매 시 사용자 수 기준인지, 설비 수 기준인지 알고 싶습니다.",
    password: "1234",
  },
];
