import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist/public");
const indexPath = path.join(distDir, "index.html");

const pages = [
  {
    path: "otservice",
    title: "CNC Retrofit / OT 서비스 | WAFF",
    description:
      "WAFF는 화낙(FANUC) CNC 개조, CNC Retrofit, 컨트롤러·서보·스핀들·전장·조작반·케이블 교체, PLC Ladder 개선과 FOCAS/MES 데이터 연동을 지원합니다.",
    canonical: "https://www.waff.co.kr/otservice",
    keywords:
      "화낙 CNC 개조, 화낙개조, FANUC retrofit, CNC Retrofit, CNC 개조 업체, 공작기계 리트로핏, PLC Ladder, FOCAS, MES 연동, 창원 CNC 개조",
  },
  {
    path: "cnc-retrofit",
    title: "화낙 CNC 개조·CNC Retrofit 전문 | WAFF",
    description:
      "화낙(FANUC) CNC 개조와 CNC Retrofit 전문 WAFF. 구형 공작기계 컨트롤러, 서보, 스핀들, 전장, 조작반, PLC Ladder, FOCAS/MES 데이터 연동까지 지원합니다.",
    canonical: "https://www.waff.co.kr/cnc-retrofit",
    keywords:
      "화낙 CNC 개조, 화낙개조, FANUC CNC retrofit, CNC Retrofit, CNC 개조 업체, 공작기계 리트로핏, PLC Ladder, FOCAS, MES 연동",
  },
  {
    path: "fanuc-cnc-retrofit",
    title: "FANUC CNC Retrofit·화낙개조 | WAFF",
    description:
      "WAFF는 FANUC 기반 CNC Retrofit, 화낙개조, 서보·스핀들·전장·조작반 개선, PLC Ladder 작성과 제조 데이터 연동을 수행합니다.",
    canonical: "https://www.waff.co.kr/fanuc-cnc-retrofit",
    keywords:
      "FANUC CNC Retrofit, Fanuc retrofit Korea, 화낙개조, 화낙 CNC 개조, CNC retrofit Korea, CNC 개조 업체",
  },
];

function replaceOrInsertMeta(html, selector, tag) {
  const patterns = {
    description: /<meta\s+name="description"\s+content="[^"]*"\s*\/>/i,
    keywords: /<meta\s+name="keywords"\s+content="[^"]*"\s*\/>/i,
    canonical: /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i,
    ogTitle: /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/i,
    ogDescription: /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/i,
    ogUrl: /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/i,
    twitterTitle: /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/i,
    twitterDescription: /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/i,
  };

  const pattern = patterns[selector];
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function serviceJsonLd(page) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${page.canonical}#service`,
      name: "화낙 CNC 개조 및 CNC Retrofit",
      alternateName: ["FANUC CNC Retrofit", "CNC 개조", "공작기계 리트로핏"],
      serviceType: "CNC Retrofit",
      provider: {
        "@type": "ProfessionalService",
        name: "WAFF",
        alternateName: "와프",
        url: "https://www.waff.co.kr/",
        telephone: "+82-55-288-0856",
      },
      areaServed: {
        "@type": "Country",
        name: "대한민국",
      },
      description: page.description,
    },
    null,
    2,
  );
}

function pageHtml(baseHtml, page) {
  let html = baseHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${page.title}</title>`);
  html = replaceOrInsertMeta(html, "description", `<meta name="description" content="${page.description}" />`);
  html = replaceOrInsertMeta(html, "keywords", `<meta name="keywords" content="${page.keywords}" />`);
  html = replaceOrInsertMeta(html, "canonical", `<link rel="canonical" href="${page.canonical}" />`);
  html = replaceOrInsertMeta(html, "ogTitle", `<meta property="og:title" content="${page.title}" />`);
  html = replaceOrInsertMeta(html, "ogDescription", `<meta property="og:description" content="${page.description}" />`);
  html = replaceOrInsertMeta(html, "ogUrl", `<meta property="og:url" content="${page.canonical}" />`);
  html = replaceOrInsertMeta(html, "twitterTitle", `<meta name="twitter:title" content="${page.title}" />`);
  html = replaceOrInsertMeta(
    html,
    "twitterDescription",
    `<meta name="twitter:description" content="${page.description}" />`,
  );

  return html.replace(
    "</head>",
    `    <script type="application/ld+json">${serviceJsonLd(page)}</script>\n  </head>`,
  );
}

if (!fs.existsSync(indexPath)) {
  throw new Error(`Missing built index.html at ${indexPath}`);
}

const baseHtml = fs.readFileSync(indexPath, "utf8");

for (const page of pages) {
  const pageDir = path.join(distDir, page.path);
  fs.mkdirSync(pageDir, { recursive: true });
  fs.writeFileSync(path.join(pageDir, "index.html"), pageHtml(baseHtml, page), "utf8");
}
