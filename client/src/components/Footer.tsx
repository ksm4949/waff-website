import { Link } from "wouter";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-foreground to-slate-900 text-white py-4 border-t border-white/10">
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-start">
                {/* LEFT: Logo / Description */}
                <div className="self-center">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-foreground to-slate-900 flex items-center justify-center shadow-lg">
                      <img
                        src="/images/logos/logo1.png"
                        alt="logo"
                        className="w-full h-full object-contain"
                        />
                    </div>
                    <img
                        src="/images/logos/logo2.png"
                        alt="logo"
                        className="w-25 h-12  object-contain"
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
                        <Link href="/contact" className="text-white/80 hover:text-white hover:underline">
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