export default function Contact() {
    const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.680257626875!2d128.66585347621555!3d35.21443255547466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568cd2401e94a59%3A0x11814da8185e7eca!2z6rK97IOB64Ko64-EIOywveybkOyLnCDshLHsgrDqtawg7JmE7JWU66GcIDE0Nw!5e0!3m2!1sko!2skr!4v1770191521644!5m2!1sko!2skr";

    return (
        <section id="contact" className="py-20 md:py-28 bg-gradient-to-br from-slate-50 to-gray-500">
          <div className="container">
            <div className="text-center mb-14">
              <h1 className="text-3xl md:text-4xl font-bold">찾아오시는 길</h1>
              <div className="divider-modern mx-auto w-24 mb-6" />
              <p className="mt-3 text-muted-foreground">오시는 길 및 연락처 안내</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* 주소/연락처 */}
              <div className="rounded-2xl border p-8 bg-background">
                <h2 className="text-xl font-semibold mb-6">회사 정보</h2>

                <div className="space-y-4 text-sm">
                  <div>
                    <div className="font-semibold">주소</div>
                    <div className="text-muted-foreground mt-1">
                      경남 창원시 성산구 완암로 147
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold">연락처</div>
                    <div className="text-muted-foreground mt-1">055-288-0856</div>
                  </div>

                  <div>
                    <div className="font-semibold">팩스</div>
                    <div className="text-muted-foreground mt-1">055-288-0857</div>
                  </div>

                  <div>
                    <div className="font-semibold">이메일</div>
                    <div className="text-muted-foreground mt-1">mingu@waff.co.kr</div>
                  </div>
                </div>
              </div>

              {/* 지도 */}
              <div className="rounded-2xl overflow-hidden border bg-gray-50">
                <div className="aspect-[16/11] w-full">
                  <iframe
                    src={mapSrc}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}