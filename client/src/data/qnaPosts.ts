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
    title: "\uACAC\uC801 \uBB38\uC758\uB4DC\uB9BD\uB2C8\uB2E4.",
    author: "\uAE40OO",
    date: "2026-03-02",
    views: 24,
    content:
      "\uBAA8\uB2C8\uD130\uB9C1 \uC194\uB8E8\uC158 \uB3C4\uC785\uC744 \uAC80\uD1A0 \uC911\uC785\uB2C8\uB2E4. \uAE30\uBCF8 \uAD6C\uC131\uACFC \uC608\uC0C1 \uB3C4\uC785 \uC77C\uC815 \uC548\uB0B4 \uBD80\uD0C1\uB4DC\uB9BD\uB2C8\uB2E4.",
    password: "1234",
  },
  {
    id: 11,
    title: "W-CMS \uAD6C\uCD95 \uAD00\uB828 \uC9C8\uBB38",
    author: "\uC774OO",
    date: "2026-02-27",
    views: 39,
    content:
      "W-CMS \uAD6C\uCD95 \uC804 \uC0AC\uC804 \uC900\uBE44\uC0AC\uD56D\uACFC \uB2E8\uACC4\uBCC4 \uC801\uC6A9 \uC808\uCC28\uB97C \uC54C\uACE0 \uC2F6\uC2B5\uB2C8\uB2E4.",
    password: "1234",
  },
  {
    id: 10,
    title: "\uAE30\uC220 \uC9C0\uC6D0 \uAC00\uB2A5 \uC2DC\uAC04 \uBB38\uC758",
    author: "\uBC15OO",
    date: "2026-02-25",
    views: 17,
    content:
      "\uD3C9\uC77C/\uC8FC\uB9D0 \uAE30\uC900 \uAE30\uC220 \uC9C0\uC6D0 \uAC00\uB2A5 \uC2DC\uAC04\uACFC \uAE34\uAE09 \uB300\uC751 \uBC94\uC704\uB97C \uBB38\uC758\uB4DC\uB9BD\uB2C8\uB2E4.",
    password: "1234",
  },
  {
    id: 9,
    title: "\uB370\uBAA8 \uC2E0\uCCAD \uC808\uCC28 \uBB38\uC758",
    author: "\uCD5COO",
    date: "2026-02-21",
    views: 52,
    content:
      "\uC81C\uD488 \uB370\uBAA8 \uC2E0\uCCAD \uC2DC \uD544\uC694\uD55C \uC815\uBCF4\uC640 \uC77C\uC815 \uC870\uC728 \uBC29\uC2DD\uC744 \uC548\uB0B4 \uBD80\uD0C1\uB4DC\uB9BD\uB2C8\uB2E4.",
    password: "1234",
  },
  {
    id: 8,
    title: "\uC720\uC9C0\uBCF4\uC218 \uACC4\uC57D \uAD00\uB828 \uBB38\uC758",
    author: "\uC815OO",
    date: "2026-02-18",
    views: 33,
    content:
      "\uC720\uC9C0\uBCF4\uC218 \uACC4\uC57D \uC2DC \uC81C\uACF5\uB418\uB294 SLA \uC635\uC158, \uACC4\uC57D \uAE30\uAC04, \uBE44\uC6A9 \uC0B0\uC815 \uBC29\uC2DD\uC744 \uC54C\uACE0 \uC2F6\uC2B5\uB2C8\uB2E4.",
    password: "1234",
  },
  {
    id: 7,
    title: "\uC2DC\uC2A4\uD15C \uD638\uD658\uC131 \uBB38\uC758",
    author: "\uC724OO",
    date: "2026-02-16",
    views: 21,
    content:
      "\uD604\uC7AC \uC0AC\uC6A9 \uC911\uC778 ERP \uC2DC\uC2A4\uD15C\uACFC \uC5F0\uB3D9 \uAC00\uB2A5\uD55C\uC9C0 \uD655\uC778 \uBD80\uD0C1\uB4DC\uB9BD\uB2C8\uB2E4.",
    password: "1234",
  },
  {
    id: 6,
    title: "\uB370\uC774\uD130 \uBC31\uC5C5 \uBC29\uC2DD \uC548\uB0B4 \uC694\uCCAD",
    author: "\uC784OO",
    date: "2026-02-13",
    views: 28,
    content:
      "\uC6B4\uC601 \uC911 \uBC1C\uC0DD\uD560 \uC218 \uC788\uB294 \uB370\uC774\uD130 \uC720\uC2E4\uC5D0 \uB300\uBE44\uD55C \uBC31\uC5C5/\uBCF5\uAD6C \uCCB4\uACC4 \uC124\uBA85 \uBD80\uD0C1\uB4DC\uB9BD\uB2C8\uB2E4.",
    password: "1234",
  },
  {
    id: 5,
    title: "\uCD08\uAE30 \uAD50\uC721 \uC9C0\uC6D0 \uC5EC\uBD80",
    author: "\uD55COO",
    date: "2026-02-10",
    views: 19,
    content:
      "\uB2F4\uB2F9\uC790 \uAD50\uCCB4\uAC00 \uC788\uC5B4 \uCD08\uAE30 \uAD50\uC721\uC744 \uC7AC\uC9C4\uD589\uD558\uACE0 \uC2F6\uC2B5\uB2C8\uB2E4. \uC9C0\uC6D0 \uAC00\uB2A5 \uBC94\uC704 \uC548\uB0B4 \uBD80\uD0C1\uB4DC\uB9BD\uB2C8\uB2E4.",
    password: "1234",
  },
  {
    id: 4,
    title: "\uB3C4\uC785 \uAE30\uAC04 \uC0B0\uC815 \uBB38\uC758",
    author: "\uC624OO",
    date: "2026-02-08",
    views: 34,
    content:
      "\uD604\uC7A5 \uADDC\uBAA8\uAC00 \uD070 \uD3B8\uC778\uB370, \uD1B5\uC0C1\uC801\uC778 \uB3C4\uC785 \uC18C\uC694 \uAE30\uAC04\uC744 \uC0AC\uB840 \uAE30\uC900\uC73C\uB85C \uC54C \uC218 \uC788\uC744\uAE4C\uC694?",
    password: "1234",
  },
  {
    id: 3,
    title: "\uC815\uAE30 \uC810\uAC80 \uC8FC\uAE30 \uBB38\uC758",
    author: "\uC2E0OO",
    date: "2026-02-05",
    views: 15,
    content:
      "\uC6B4\uC601 \uC548\uC815\uC131\uC744 \uC704\uD55C \uC815\uAE30 \uC810\uAC80 \uC8FC\uAE30\uC640 \uC810\uAC80 \uD56D\uBAA9\uC5D0 \uB300\uD574 \uC548\uB0B4 \uBD80\uD0C1\uB4DC\uB9BD\uB2C8\uB2E4.",
    password: "1234",
  },
  {
    id: 2,
    title: "\uB77C\uC774\uC120\uC2A4 \uAD6C\uB9E4 \uB2E8\uC704 \uBB38\uC758",
    author: "\uAD8COO",
    date: "2026-02-02",
    views: 26,
    content:
      "\uB77C\uC774\uC120\uC2A4 \uAD6C\uB9E4 \uC2DC \uC0AC\uC6A9\uC790 \uC218 \uAE30\uC900\uC778\uC9C0, \uC124\uBE44 \uC218 \uAE30\uC900\uC778\uC9C0 \uC54C\uACE0 \uC2F6\uC2B5\uB2C8\uB2E4.",
    password: "1234",
  },
];
