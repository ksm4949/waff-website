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
    title: "\uC2A4\uB9C8\uD2B8\uD329\uD1A0\uB9AC \uC194\uB8E8\uC158 \uC5C5\uB370\uC774\uD2B8 \uC548\uB0B4",
    author: "\uAD00\uB9AC\uC790",
    date: "2026-03-03",
    views: 102,
    content:
      "\uC2A4\uB9C8\uD2B8\uD329\uD1A0\uB9AC \uC194\uB8E8\uC158\uC758 \uCD5C\uC2E0 \uAE30\uB2A5\uC774 \uBC18\uC601\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uC2DC\uC2A4\uD15C \uC810\uAC80 \uD6C4 \uC801\uC6A9 \uBD80\uD0C1\uB4DC\uB9BD\uB2C8\uB2E4.",
    imageUrl: "/images/it_services/cms.png",
  },
  {
    id: 10,
    title: "\uC815\uAE30 \uC810\uAC80 \uC77C\uC815 \uC548\uB0B4",
    author: "\uAD00\uB9AC\uC790",
    date: "2026-02-26",
    views: 88,
    content:
      "2026\ub144 3\uc6d4 \uccab\uc9f8 \uc8fc \uc815\uae30 \uc810\uac80\uc774 \uc608\uc815\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4. \uc11c\ube44\uc2a4 \uc774\uc6a9\uc5d0 \ucc38\uace0\ud574\uc8fc\uc138\uc694.",
    imageUrl: "/images/it_services/monitoring.png",
  },
  {
    id: 9,
    title: "\uACE0\uAC1D\uC9C0\uC6D0 \uCC44\uB110 \uD655\uB300 \uC548\uB0B4",
    author: "\uAD00\uB9AC\uC790",
    date: "2026-02-21",
    views: 64,
    content:
      "\uC6D0\uD65C\uD55C \uBB38\uC758 \uCC98\uB9AC\ub97c \uc704\ud574 \uACE0\uAC1D\uC9C0\uC6D0 \ucc44\ub110\uC744 \ud655\ub300\ud588\uc2b5\ub2c8\ub2e4.",
    imageUrl: "/images/Landing/about.png",
  },
  {
    id: 8,
    title: "\uBCF4\uC548 \uD328\uCE58 \uC801\uC6A9 \uC644\uB8CC",
    author: "\uAD00\uB9AC\uC790",
    date: "2026-02-14",
    views: 71,
    content:
      "\uc8fc\uc694 \ubcf4\uc548 \ucde8\uc57d\uc810\uc5d0 \ub300\ud55c \ud328\uce58\uac00 \uc644\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4.",
    imageUrl: "/images/intro/award.jpg",
  },
  {
    id: 7,
    title: "\uC11C\uBC84 \uC810\uAC80 \uC791\uC5C5 \uACF5\uC9C0",
    author: "\uAD00\uB9AC\uC790",
    date: "2026-02-07",
    views: 55,
    content:
      "\uc11c\ubc84 \uc548\uc815\uc131 \ud655\ubcf4\ub97c \uc704\ud55c \uc810\uac80 \uc791\uc5c5\uc774 \uc9c4\ud589\ub429\ub2c8\ub2e4.",
    imageUrl: "/images/ot_service/hmi.png",
  },
];
