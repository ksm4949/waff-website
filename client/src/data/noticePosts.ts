export type NoticePost = {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
  content: string;
  imageUrl?: string;
};

export const noticePosts: NoticePost[] = [
  {
    id: 11,
    title: "스마트팩토리 솔루션 업데이트 안내",
    author: "관리자",
    date: "2026-03-03",
    views: 102,
    content:
      "스마트팩토리 솔루션의 최신 기능이 반영되었습니다. 시스템 점검 후 적용 부탁드립니다.",
    imageUrl: "/images/it_services/cms.png",
  },
  {
    id: 10,
    title: "정기 점검 일정 안내",
    author: "관리자",
    date: "2026-02-26",
    views: 88,
    content:
      "2026년 3월 첫째 주 정기 점검이 예정되어 있습니다. 서비스 이용에 참고해주세요.",
    imageUrl: "/images/it_services/monitoring.png",
  },
  {
    id: 9,
    title: "고객지원 채널 확대 안내",
    author: "관리자",
    date: "2026-02-21",
    views: 64,
    content:
      "원활한 문의 처리를 위해 고객지원 채널을 확대했습니다.",
    imageUrl: "/images/Landing/about.png",
  },
  {
    id: 8,
    title: "보안 패치 적용 완료",
    author: "관리자",
    date: "2026-02-14",
    views: 71,
    content:
      "주요 보안 취약점에 대한 패치가 완료되었습니다.",
    imageUrl: "/images/intro/award.jpg",
  },
  {
    id: 7,
    title: "서버 점검 작업 공지",
    author: "관리자",
    date: "2026-02-07",
    views: 55,
    content:
      "서버 안정성 확보를 위한 점검 작업이 진행됩니다.",
    imageUrl: "/images/ot_service/hmi.png",
  },
];
