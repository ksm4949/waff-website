import { Link, useLocation  } from "wouter";

export default function Footer() {
  const [location] = useLocation();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const headerOffset = 80;
    const y = section.getBoundingClientRect().top + window.pageYOffset - headerOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleMenuClick = (e: React.MouseEvent, href: string, sectionId: string) => {
    e.preventDefault();

    // ✅ /company 또는 /company#xxx 상태도 같은 페이지로 취급
    const currentPath = location.split("#")[0];
    if (currentPath === href) {
      scrollToSection(sectionId);
      // 해시도 같이 맞춰주면 새로고침/공유에 좋아요
      window.history.replaceState(null, "", `${href}#${sectionId}`);
    } else {
      // 다른 페이지면 해시 포함해서 이동
      window.location.href = `${href}#${sectionId}`;
    }
  };

    return (
        <footer className="bg-gradient-to-r from-foreground to-slate-900 text-white py-4 border-t border-white/10">
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-start">
                {/* LEFT: Logo / Description */}
                <div className="self-center">
                  <div className="flex items-center gap-2 mb-4">
                    <img
                        src="/images/logos/logoKR_white.png"
                        alt="logo"
                        className="w-auto h-24 md:h-28 object-contain"
                    />
                  </div>
                  <p className="text-white/80 text-sm">
                    제조 혁신을 이끄는 디지털 전환 파트너
                  </p>
                </div>

                {/* RIGHT GROUP */}
                <div className="md:col-start-3 justify-self-end text-right space-y-6">
                  {/* Contact */}
                  <div>
                    <div className="space-y-2 text-md">
                      <nav className="">
                        <Link 
                          href="/company#contact" 
                          onClick={(e)=> handleMenuClick(e, "/company", "contact")}
                          className="text-white/80 hover:text-white hover:underline"
                        >
                          👉 찾아오시는 길
                        </Link>
                        {/* 다른 추가할 링크들 */}
                      </nav>
                      <p className="text-white/80">
                        경남 창원시 성산구 완암로 147(성산동)
                      </p>
                      <p className="text-white/80">Tel. 055-288-0856</p>
                      <p className="text-white/80">FAX. 055-288-0857</p>
                      <p className="text-white/80">Email. mingu@waff.co.kr</p>
                      <p className="text-white/60 text-sm">
                        © {new Date().getFullYear()} WAFF. All rights reserved.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </footer>
    )
}
