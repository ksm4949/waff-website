import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HomeSection () {
    return (
        <section id="home" className="relative overflow-hidden bg-gradient-to-br from-white to-gray-500  py-20 md:py-40">
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-block px-4 py-2 bg-primary/90 rounded-full border border-primary/20 backdrop-blur-sm">
                    <span className="text-sm font-semibold text-white/90">제조 혁신을 이끄는 디지털 전환</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight tracking-tight">
                    스마트 제조의
                    <span className="block text-transparent bg-clip-text bg-gradient-to-tl from-primary via-cyan-500 to-accent">
                      미래를 함께
                    </span>
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    <span className="text-accent font-bold">와프</span>
                    는 IT와 OT의 완벽한 통합을 통해 제조업의 디지털 전환을 선도합니다.
                    <br/> 
                    스마트팩토리, CNC Retrofit, HMI 솔루션으로 당신의 공장을 미래로 이끕니다.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <a href="#about">
                        <Button className="group px-6 py-3 flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 rounded-lg font-semibold">
                          <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                            회사개요
                          </span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                        </Button>
                    </a>
                    <a href="#core-solutions">
                      <Button className="group px-8 py-3 flex items-center justify-center gap-2 bg-gradient-to-br from-primary via-cyan-500 to-accent hover:from-primary hover:via-cyan-600 hover:to-accent text-white transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 rounded-lg font-semibold">
                        <span className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5">
                            솔루션 알아보기
                        </span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                      </Button>
                    </a>
                  </div>
                </div>
        
                <div className="relative h-96 md:h-full animate-float">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl" />
                  <img
                    src="/images/Landing/main.png"
                    alt="Smart Manufacturing"
                    className="relative w-full h-full object-cover rounded-2xl shadow-2xl border border-white/40"
                  />
                </div>
              </div>
            </div>
        </section>
    )
}